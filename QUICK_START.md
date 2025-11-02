# 🚀 Quick Start Guide - OneShotsmith

Get up and running in 2 minutes!

---

## ⚡ Start Development Server

```bash
pnpm dev
```

**That's it!** Your app is now running at:
- **Frontend:** http://localhost:3000
- **PartyKit:** http://localhost:1999

---

## 🎯 What You Can Do Right Now

### 1. **Visit the Landing Page**
Open http://localhost:3000

You'll see a beautiful gradient design with:
- Animated background
- Feature cards
- "How It Works" section
- Full navigation

### 2. **Create a Character**
Click "Create Character" or visit http://localhost:3000/character-creator

**Step 1:** Choose Level (3, 5, or 8)
**Step 2:** Pick Role (Frontliner, Skirmisher, Support, Control, Face)
**Step 3:** View your complete character sheet!

### 3. **Generate an Adventure**
Click "Generate One-Shot" or visit http://localhost:3000/one-shot-generator

**Step 1:** Choose Theme (Heist, Rescue, Dungeon Sprint, Horror, Travel)
**Step 2:** Configure level, time, and difficulty
**Step 3:** Get a complete adventure with NPCs, encounters, and treasure!

---

## 🎨 What Makes It Look Good

- **Modern Gradients:** Purple/Blue color scheme
- **Smooth Animations:** Hover effects, transitions, pulse animations
- **Glass Morphism:** Backdrop blur effects on cards
- **Responsive Design:** Works on mobile, tablet, and desktop
- **Dark Theme:** Professional dark mode with great contrast

---

## 📦 Build for Production

```bash
pnpm build
```

Your optimized production build will be in `apps/web/.next/`

---

## 🚀 Deploy to Vercel (Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/web
vercel
```

Follow the prompts, and your site will be live in minutes!

---

## 🌐 Deploy to cPanel

1. **Build static site:**
   ```bash
   cd apps/web
   # Edit next.config.js - add: output: 'export'
   pnpm build
   ```

2. **Upload `out/` folder to your cPanel public_html**

3. **Add `.htaccess` for client-side routing** (see SETUP_GUIDE.md)

4. **Deploy PartyKit separately:**
   ```bash
   cd apps/worker
   npx partykit deploy
   ```

**Full instructions:** See [SETUP_GUIDE.md](./SETUP_GUIDE.md#cpanel-hosting-deployment)

---

## 🧪 Run Tests

```bash
# Unit tests
pnpm test

# Type checking
pnpm typecheck

# E2E tests
pnpm e2e
```

---

## 📝 All Available Commands

```bash
pnpm dev              # Start dev servers
pnpm build            # Build for production
pnpm typecheck        # Check TypeScript
pnpm lint             # Run linter
pnpm test             # Run unit tests
pnpm test:watch       # Run tests in watch mode
pnpm e2e              # Run E2E tests
pnpm db:generate      # Generate database migrations
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Drizzle Studio
```

---

## 🎓 Learn More

- **Full Setup Guide:** [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Project Status:** [PROJECT_STATUS.md](./PROJECT_STATUS.md)
- **Contributing:** [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 pnpm dev
```

### Dependencies Issue
```bash
rm -rf node_modules
pnpm install
```

### Build Errors
```bash
pnpm typecheck
# Fix any TypeScript errors shown
```

---

## ✨ Features Overview

### Character Creator
- **5 Roles:** Frontliner, Skirmisher, Support, Control, Face
- **3 Levels:** 3, 5, 8 (beginner to advanced)
- **Complete Stats:** HP, AC, abilities, skills, equipment
- **Tactical Tips:** "How to play this character" guide
- **Export Ready:** PDF and VTT formats (placeholder buttons ready)

### One-Shot Generator
- **5 Themes:** Heist, Rescue, Dungeon Sprint, Horror-Lite, Travel Gauntlet
- **Flexible Settings:** Level, session length (2-4h), difficulty
- **Complete Adventures:** Hook, 3-act structure, twist, finale
- **Ready-to-Run:** Encounters, NPCs with goals/quirks, treasure
- **GM-Friendly:** All you need to run a session tonight

### Landing Page
- **Professional Design:** Modern, animated, beautiful
- **Clear Navigation:** Easy to find what you need
- **Feature Showcase:** Shows what the app can do
- **Social Proof:** "Trusted by GMs worldwide"
- **Full Footer:** Links, attribution, license info

---

## 🎯 Your Next Steps

1. **Start the dev server:** `pnpm dev`
2. **Open http://localhost:3000**
3. **Try creating a character**
4. **Try generating an adventure**
5. **Customize the UI to your liking**
6. **Deploy to Vercel or your cPanel**

---

## 💡 Pro Tips

1. **Development:**
   - Keep dev server running while you code
   - Changes hot-reload automatically
   - Check TypeScript errors with `pnpm typecheck`

2. **UI Customization:**
   - Colors: Edit `apps/web/src/app/globals.css`
   - Components: All in `packages/ui/src/components/`
   - Pages: All in `apps/web/src/app/`

3. **Adding Content:**
   - Character logic: `packages/core/src/generators/character.ts`
   - Adventure logic: `packages/core/src/generators/oneshot.ts`
   - Add more races/classes in SRD data

---

**🎉 You're all set! Happy coding! 🎉**

Questions? Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed documentation.
