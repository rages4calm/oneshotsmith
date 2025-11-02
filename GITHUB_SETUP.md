# 🚀 GitHub Repository Setup Guide

Complete guide to create and push your OneShotsmith project to GitHub.

---

## 📋 Prerequisites

- Git installed on your computer ([Download](https://git-scm.com/))
- GitHub account ([Sign up](https://github.com/join))
- Project files ready in `c:\Users\crono\Desktop\oneshot\`

---

## 🎯 Step 1: Create GitHub Repository

### Option A: Via GitHub Website (Easiest)

1. **Go to GitHub**: https://github.com/new

2. **Repository Settings:**
   - **Repository name:** `oneshotsmith`
   - **Description:** `⚔️ Fast D&D 5e character creator and one-shot adventure generator. Get players table-ready in 10 minutes!`
   - **Visibility:** ✅ Public (so others can use it)
   - **Initialize:** ❌ Do NOT add README, .gitignore, or license (we have them)

3. **Click** "Create repository"

### Option B: Via GitHub CLI

```bash
# Install GitHub CLI: https://cli.github.com/
gh repo create oneshotsmith --public --description "⚔️ Fast D&D 5e character creator and one-shot adventure generator"
```

---

## 🔧 Step 2: Initialize Local Repository

Open **Command Prompt** or **PowerShell** in your project folder:

```bash
cd c:\Users\crono\Desktop\oneshot

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Complete OneShotsmith D&D character creator

- Character creator wizard (5 roles, 3 levels)
- One-shot adventure generator (5 themes)
- Beautiful modern UI with dark theme
- Full test coverage (9/9 passing)
- No deprecated dependencies
- Complete documentation"
```

---

## 🌐 Step 3: Connect to GitHub

Replace `rages4calm` with your GitHub username:

```bash
# Add remote repository
git remote add origin https://github.com/rages4calm/oneshotsmith.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

**If prompted for credentials:**
- Use your GitHub username
- For password, use a [Personal Access Token](https://github.com/settings/tokens)

---

## 🔐 Step 4: Generate Personal Access Token (If Needed)

If GitHub asks for a password:

1. Go to: https://github.com/settings/tokens/new
2. **Note:** "OneShotsmith Development"
3. **Expiration:** 90 days (or longer)
4. **Scopes:** Select `repo` (full control of private repositories)
5. Click **Generate token**
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

---

## ✅ Step 5: Verify Upload

Visit: `https://github.com/rages4calm/oneshotsmith`

You should see:
- ✅ All project files
- ✅ Beautiful README with badges
- ✅ Documentation files
- ✅ License information

---

## 🎨 Step 6: Customize Your Repository

### Update README.md

Replace `rages4calm` in the README with your actual GitHub username:

```bash
# Find and replace (Windows PowerShell)
(Get-Content README.md) -replace 'rages4calm', 'youractualusername' | Set-Content README.md

# Commit the change
git add README.md
git commit -m "docs: update GitHub username in README"
git push
```

### Add Repository Topics (Tags)

On GitHub, go to your repository → Click ⚙️ next to "About" → Add topics:

```
dnd, dungeons-and-dragons, character-creator, dnd5e, nextjs,
typescript, tailwindcss, react, adventure-generator, tabletop-rpg
```

### Enable GitHub Pages (Optional)

1. Go to **Settings** → **Pages**
2. Source: `Deploy from a branch`
3. Branch: `main` → `/ (root)` → Save
4. Your site will be at: `https://rages4calm.github.io/oneshotsmith`

---

## 📝 Step 7: Create Releases (Optional)

Tag your first release:

```bash
git tag -a v0.1.0 -m "Initial release - MVP complete"
git push origin v0.1.0
```

On GitHub:
1. Go to **Releases** → **Create a new release**
2. Choose tag: `v0.1.0`
3. Title: `🎉 v0.1.0 - Initial Release`
4. Description:
   ```markdown
   ## 🎉 First Release!

   ### Features
   - ✅ Character creator with 5 roles
   - ✅ One-shot adventure generator with 5 themes
   - ✅ Beautiful modern UI
   - ✅ Full documentation
   - ✅ Complete test coverage

   ### Tech Stack
   - Next.js 15
   - TypeScript 5.7
   - TailwindCSS
   - shadcn/ui
   - PartyKit
   - Drizzle ORM

   Get started: [Quick Start Guide](./QUICK_START.md)
   ```
5. Click **Publish release**

---

## 🔄 Daily Development Workflow

### Making Changes

```bash
# Check status
git status

# Stage changes
git add .

# Commit with message
git commit -m "feat: add new adventure theme"

# Push to GitHub
git push
```

### Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     New feature
fix:      Bug fix
docs:     Documentation changes
style:    Code style (formatting, no logic change)
refactor: Code refactoring
test:     Adding tests
chore:    Maintenance tasks
```

**Examples:**
```bash
git commit -m "feat: add wizard class to character creator"
git commit -m "fix: resolve dice roller calculation error"
git commit -m "docs: update deployment guide for Vercel"
git commit -m "style: improve button hover animations"
```

---

## 🌟 Step 8: Make It Discoverable

### Add Social Preview Image

1. Go to **Settings** → **Options**
2. Scroll to **Social preview**
3. Upload an image (1280x640px recommended)
4. Shows when sharing on social media

### Update Repository Details

On your repository page, click ⚙️ next to "About":

- ✅ **Website**: https://oneshotsmith.vercel.app (after deploying)
- ✅ **Topics**: dnd, dnd5e, character-creator, nextjs, typescript
- ✅ **Include in home page**: ✓

### Create FUNDING.yml (Optional)

If you want to accept donations:

```bash
# Create .github/FUNDING.yml
mkdir .github
echo "github: rages4calm" > .github/FUNDING.yml

git add .github/FUNDING.yml
git commit -m "chore: add funding options"
git push
```

---

## 🔒 Step 9: Secure Your Repository

### Add Branch Protection Rules

1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

### Add Code Owners (Optional)

Create `.github/CODEOWNERS`:

```
# These owners will be requested for review when someone opens a PR

* @rages4calm
/docs/ @rages4calm
```

---

## 📊 Step 10: Set Up GitHub Actions (CI/CD)

Your project already has `.github/workflows/ci.yml`! This will:
- ✅ Run on every push and pull request
- ✅ Check TypeScript
- ✅ Run tests
- ✅ Build the project
- ✅ Run E2E tests

View workflows: `https://github.com/rages4calm/oneshotsmith/actions`

---

## 🎯 Complete Command Reference

```bash
# Initial setup (do once)
cd c:\Users\crono\Desktop\oneshot
git init
git add .
git commit -m "Initial commit: Complete OneShotsmith"
git remote add origin https://github.com/rages4calm/oneshotsmith.git
git branch -M main
git push -u origin main

# Daily workflow
git status                          # Check what changed
git add .                          # Stage all changes
git commit -m "feat: your message" # Commit changes
git push                           # Push to GitHub

# Useful commands
git log --oneline                  # View commit history
git diff                           # See what changed
git restore <file>                 # Undo changes to file
git reset --soft HEAD~1            # Undo last commit (keep changes)
git pull                           # Get latest from GitHub
```

---

## 🆘 Troubleshooting

### "Permission denied (publickey)"

**Solution:** Use HTTPS instead of SSH:

```bash
git remote set-url origin https://github.com/rages4calm/oneshotsmith.git
```

### "Updates were rejected"

**Solution:** Pull first, then push:

```bash
git pull origin main --rebase
git push
```

### "Failed to push some refs"

**Solution:** Force push (⚠️ Use with caution):

```bash
git push -f origin main
```

### Large Files Error

**Solution:** Add to `.gitignore`:

```bash
echo "node_modules/" >> .gitignore
echo ".next/" >> .gitignore
echo "*.db" >> .gitignore
git add .gitignore
git commit -m "chore: update gitignore"
git push
```

---

## ✅ Checklist

Before pushing to GitHub, verify:

- [ ] `.gitignore` is configured (node_modules, .env, etc.)
- [ ] No sensitive data in commits (.env files, API keys)
- [ ] README.md is up to date
- [ ] Tests are passing (`pnpm test`)
- [ ] Build works (`pnpm build`)
- [ ] License file is present
- [ ] Documentation is complete

---

## 🎉 You're Done!

Your OneShotsmith project is now on GitHub! 🚀

**Next steps:**
1. Deploy to Vercel: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. Invite contributors
3. Share with the D&D community
4. Start building awesome features!

**Repository URL:**
```
https://github.com/rages4calm/oneshotsmith
```

---

## 📚 Additional Resources

- [GitHub Docs](https://docs.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Vercel Deployment](https://vercel.com/docs)

---

**Need help?** Open an issue or check the [SETUP_GUIDE.md](./SETUP_GUIDE.md) for more details!
