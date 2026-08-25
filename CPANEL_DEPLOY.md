# 🚀 cPanel Deployment - Simple Guide

> **Fastest path (zip upload):** run `$env:USE_BASE_PATH="true"; pnpm build`, then
> upload `apps/web/out` as a zip to `public_html/oneshot` and use cPanel File
> Manager's **Extract**. This guarantees the hidden `.htaccess` makes it, which is
> the one file FTP clients love to skip.
>
> **One-command deploys:** `pnpm deploy` builds, verifies the `/oneshot` basePath
> and `.htaccess`, then syncs over SFTP/FTP. It reads credentials from environment
> variables you set in your own shell (see the header of `scripts/deploy.ps1`) —
> nothing secret is ever stored in this repo. Use `pnpm deploy:preview` to see what
> would change without uploading anything.

Your OneShotsmith app will be deployed to **carl-prewitt.com/oneshot**

This guide is for deploying to a **subdirectory** on your cPanel hosting.

---

## 🔨 Build for cPanel (Subdirectory)

**IMPORTANT:** Before uploading, build with the basePath enabled:

```bash
cd c:\Users\crono\Desktop\oneshot\apps\web
USE_BASE_PATH=true pnpm build
```

Or on Windows PowerShell:
```powershell
$env:USE_BASE_PATH="true"; pnpm build
```

Or on Windows CMD:
```cmd
set USE_BASE_PATH=true && pnpm build
```

This creates the `out` folder configured for the `/oneshot` subdirectory.

---

## 📦 What to Upload

Upload **everything** from this folder to your cPanel:

```
c:\Users\crono\Desktop\oneshot\apps\web\out\
```

This folder contains:
- `index.html` - Your main page
- `_next/` folder - All JavaScript, CSS, and assets
- `.htaccess` - Server configuration (already included!)
- All other HTML pages for each route

---

## 📤 How to Upload to cPanel

### Step 1: Log into cPanel
- Go to your hosting control panel
- Find **File Manager**

### Step 2: Navigate to Your Subdirectory
- Go to `public_html/oneshot` folder
- Create the `oneshot` folder if it doesn't exist yet

### Step 3: Upload Files
1. **Click "Upload"** button in File Manager
2. **Select ALL files** from: `c:\Users\crono\Desktop\oneshot\apps\web\out\`
3. **Upload everything** (this will take a few minutes)

**OR use FTP:**
- Use FileZilla or your preferred FTP client
- Connect to your server
- Upload the entire `out` folder contents to `public_html/oneshot`

---

## ✅ Verify It Works

After uploading, visit your website:
- **Homepage**: `https://carl-prewitt.com/oneshot`
- **Character Creator**: `https://carl-prewitt.com/oneshot/character-creator`
- **Adventure Generator**: `https://carl-prewitt.com/oneshot/one-shot-generator`
- **Character Vault**: `https://carl-prewitt.com/oneshot/character-vault`

---

## 🔧 Important Notes

### .htaccess File
The `.htaccess` file is **already in the `out` folder** and will:
- Enable client-side routing (so links work properly)
- Add security headers
- Enable Gzip compression
- Set up browser caching

**Make sure it uploads!** Some FTP clients hide files starting with `.` (dot files).

### File Permissions
If you get errors, check that file permissions are set correctly:
- **Files**: 644
- **Folders**: 755

You can change this in cPanel File Manager (right-click → Permissions).

### HTTPS/SSL
If your domain has an SSL certificate, the `.htaccess` file can force HTTPS.

To enable this, edit `.htaccess` on your server and **uncomment** these lines:
```apache
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

Remove the `#` symbols to activate HTTPS redirect.

---

## ⚠️ Limitations of Static Export

Since this is a **static HTML export**, server-side API routes are unavailable —
and OneShotsmith doesn't need any:

- ✅ One-shot generator (modules, maps, encounter math — all client-side)
- ✅ Character creator and pregen library
- ✅ Vault saves (browser localStorage — no database required)
- ✅ Shareable seed URLs, printing, Markdown export

Everything generates instantly in the browser.

---

## 🔄 Updating Your Site

When you make changes:

1. **Rebuild** the project with basePath:
   ```bash
   cd c:\Users\crono\Desktop\oneshot\apps\web
   USE_BASE_PATH=true pnpm build
   ```

   Or Windows PowerShell:
   ```powershell
   $env:USE_BASE_PATH="true"; pnpm build
   ```

2. **Upload new files** from the `out` folder to `public_html/oneshot`
   - You can just replace the changed files
   - Or upload everything again to be safe

---

## 🆘 Troubleshooting

### "404 Not Found" on /character-creator
**Problem:** `.htaccess` file didn't upload or isn't working

**Solution:**
- Make sure `.htaccess` is in your root folder
- Check if your host supports `.htaccess` files
- Contact your host if mod_rewrite isn't enabled

### Blank page or JavaScript errors
**Problem:** Files uploaded to wrong location

**Solution:**
- Make sure you uploaded to the correct root folder
- Check that `_next` folder is in the same directory as `index.html`

### Images not loading
**Problem:** File paths might be incorrect

**Solution:**
- Verify all files from `out` folder were uploaded
- Check browser console (F12) for errors

---

## 📁 Folder Structure After Upload

Your `public_html/oneshot` should look like this:

```
public_html/oneshot/
├── index.html
├── 404.html
├── .htaccess
├── _next/
│   └── static/ ...
├── art/
├── character-creator/index.html
├── character-vault/index.html
├── one-shot-generator/index.html
├── pregen-library/index.html
├── icon.svg, icon-192.png, icon-512.png
└── manifest.json
```

Every page is a real folder with an `index.html`, so deep links work on any
web server with zero rewrite rules. One optional touch: edit `.htaccess` and
change the `ErrorDocument` line to `/oneshot/404.html` so bad URLs show the
styled 404 page.

---

## ✨ You're Done!

Your D&D character creator is now **live** on the web!

Share it with your gaming group and the D&D community!

---

## 🚀 Want More Features?

For real-time multiplayer and database features, consider deploying to **Vercel** instead:

```bash
npm i -g vercel
cd c:\Users\crono\Desktop\oneshot\apps\web
vercel
```

See the [README](./README.md) for project details.
