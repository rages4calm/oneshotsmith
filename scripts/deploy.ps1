# Deploy the built static export to the live site.
#
# Credentials are NEVER stored in this repo. They come from environment
# variables you set yourself, so nothing secret is ever pasted into a chat,
# committed, or logged. Prefer SSH key auth (no password at all).
#
#   Key auth (recommended, if your host allows SFTP):
#     $env:ONESHOT_DEPLOY_HOST = "carl-prewitt.com"
#     $env:ONESHOT_DEPLOY_USER = "your-cpanel-user"
#     $env:ONESHOT_DEPLOY_KEY  = "$env:USERPROFILE\.ssh\id_ed25519.ppk"   # WinSCP wants .ppk
#     $env:ONESHOT_DEPLOY_PATH = "/public_html/oneshot"
#
#   Password auth (FTP or SFTP):
#     $env:ONESHOT_DEPLOY_PASS = "..."     # set it in your own shell, not in a file
#     $env:ONESHOT_DEPLOY_PROTOCOL = "ftp" # or "sftp" (default)
#
# Then:  pnpm deploy         (builds for /oneshot, audits, uploads)
#        pnpm deploy -DryRun (shows what would change, uploads nothing)

param(
    [switch]$DryRun,
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
$repo = Split-Path $PSScriptRoot -Parent
$out = Join-Path $repo "apps\web\out"

function Require-Env($name) {
    $value = [Environment]::GetEnvironmentVariable($name)
    if ([string]::IsNullOrWhiteSpace($value)) {
        throw "Missing $name. See the header of scripts/deploy.ps1 for setup."
    }
    return $value
}

$hostName = Require-Env "ONESHOT_DEPLOY_HOST"
$user = Require-Env "ONESHOT_DEPLOY_USER"
$remotePath = Require-Env "ONESHOT_DEPLOY_PATH"
$keyFile = [Environment]::GetEnvironmentVariable("ONESHOT_DEPLOY_KEY")
$password = [Environment]::GetEnvironmentVariable("ONESHOT_DEPLOY_PASS")
$protocol = [Environment]::GetEnvironmentVariable("ONESHOT_DEPLOY_PROTOCOL")
if ([string]::IsNullOrWhiteSpace($protocol)) { $protocol = "sftp" }

if ([string]::IsNullOrWhiteSpace($keyFile) -and [string]::IsNullOrWhiteSpace($password)) {
    throw "Set either ONESHOT_DEPLOY_KEY (recommended) or ONESHOT_DEPLOY_PASS."
}

# --- Build for the /oneshot subdirectory ------------------------------------
if (-not $SkipBuild) {
    Write-Host "Building for the /oneshot subdirectory..." -ForegroundColor Cyan
    Push-Location $repo
    try {
        $env:USE_BASE_PATH = "true"
        & pnpm --filter "@oneshotsmith/web" build
        if ($LASTEXITCODE -ne 0) { throw "Build failed." }
    } finally {
        Remove-Item Env:\USE_BASE_PATH -ErrorAction SilentlyContinue
        Pop-Location
    }
}

# --- Refuse to upload the wrong build ---------------------------------------
$index = Join-Path $out "index.html"
if (-not (Test-Path $index)) { throw "No build found at $out." }
if (-not (Select-String -Path $index -Pattern "/oneshot/_next/" -Quiet)) {
    throw "This build is NOT configured for the /oneshot subdirectory. Rebuild with USE_BASE_PATH=true."
}
if (-not (Test-Path (Join-Path $out ".htaccess"))) {
    throw "The .htaccess is missing from the build — refusing to deploy without it."
}
Write-Host "Build verified for /oneshot." -ForegroundColor Green

# --- Upload ------------------------------------------------------------------
$winscp = (Get-Command winscp.com -ErrorAction SilentlyContinue).Source
if (-not $winscp) { $winscp = "${env:ProgramFiles(x86)}\WinSCP\WinSCP.com" }
if (-not (Test-Path $winscp)) { throw "WinSCP not found. Install it, or upload apps/web/out manually." }

if ($keyFile) {
    $openCommand = "open ${protocol}://${user}@${hostName}/ -privatekey=""$keyFile"""
} else {
    $openCommand = "open ${protocol}://${user}:${password}@${hostName}/"
}

$mode = if ($DryRun) { "-preview" } else { "" }
$script = @"
option batch abort
option confirm off
$openCommand
synchronize remote -delete -criteria=size,time $mode "$out" "$remotePath"
exit
"@

$scriptFile = Join-Path ([System.IO.Path]::GetTempPath()) "oneshot-deploy-$([guid]::NewGuid()).txt"
try {
    Set-Content -Path $scriptFile -Value $script -Encoding utf8
    Write-Host "$(if ($DryRun) { 'Previewing' } else { 'Uploading' }) to ${hostName}:${remotePath} ..." -ForegroundColor Cyan
    & $winscp /ini=nul /script="$scriptFile"
    if ($LASTEXITCODE -ne 0) { throw "WinSCP exited with code $LASTEXITCODE." }
} finally {
    # The temp script can contain a password — always remove it.
    Remove-Item $scriptFile -Force -ErrorAction SilentlyContinue
}

if ($DryRun) {
    Write-Host "Dry run complete — nothing was uploaded." -ForegroundColor Yellow
} else {
    Write-Host "Deployed. Verify with: node scripts/prod-audit.mjs https://$hostName/oneshot" -ForegroundColor Green
}
