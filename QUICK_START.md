# Quick Start

Spin up OneShotsmith locally in under two minutes.

---

## 1. Install & Run

```bash
git clone https://github.com/rages4calm/oneshotsmith.git
cd oneshotsmith
pnpm install

# Optional: copy local env template
cp apps/web/.env.example apps/web/.env.local

pnpm dev
```

| Service   | URL                  |
|-----------|----------------------|
| Web app   | http://localhost:3000 |
| PartyKit  | http://localhost:1999 |

> Tip: If you do not need PartyKit during UI work, stop it with `Ctrl+C` in the
> terminal running `pnpm dev`; the web app will keep running.

---

## 2. Explore the App

### Landing Page
- Gradient hero, animated feature cards, and direct links to all tools.

### Character Creator
1. Choose level (3, 5, 8)
2. Pick a role (Frontliner, Skirmisher, Support, Control, Face)
3. Review the generated sheet, export to PDF, copy the summary, or save to the **Character Vault**.
   - Pregens can be loaded instantly from the pregen library.
   - Saved heroes appear in the vault with rename, reopen, copy, and JSON export options.

### One-Shot Generator
1. Select a theme, level, session length (2/3/4h), and difficulty.
2. Generate a complete packet: hook, acts, twist, finale, encounters, NPCs, treasure.
3. Use the **Session Pacing Clock** to keep your table on schedule.
4. Export the adventure as PDF or copy the summary for your prep notes.

---

## 3. Production Build

```bash
pnpm --filter @oneshotsmith/web build
```

This creates a static export in `apps/web/out`, suitable for cPanel or any static host. The root `pnpm build` command will build every package in the workspace.

---

## 4. Useful Commands

```bash
pnpm dev            # Run dev servers (web + PartyKit)
pnpm lint           # ESLint (flat config)
pnpm typecheck      # TypeScript strict mode
pnpm test           # Vitest unit tests
pnpm test:watch     # Vitest in watch mode
pnpm e2e            # Playwright end-to-end suite
```

---

## 5. Deployment Options

- **Vercel:** Zero config. Push to GitHub and import the repo in Vercel.
- **Static hosting / cPanel:** Use the static export (`apps/web/out`) plus the supplied `.htaccess` from the export directory.
- **Docker:** Build with `docker build -t oneshotsmith .` and run on port 3000.

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for step-by-step instructions and environment variable reference.

---

## Troubleshooting

| Issue                     | Fix |
|---------------------------|-----|
| Port 3000 already in use  | `npx kill-port 3000` or `PORT=3001 pnpm dev` |
| Stale dependencies        | `rm -rf node_modules pnpm-lock.yaml && pnpm install` |
| TypeScript errors         | `pnpm typecheck` and resolve reported issues |
| Lint errors               | `pnpm lint --fix` for auto-fixable rules |

---

## Next Steps

1. Save a few characters to try the new vault functionality.
2. Generate an adventure and review the pacing clock guidance.
3. Customize UI themes, add new pregens, or extend the core generators.
4. Deploy to your preferred host and share the link with your table.

Happy adventuring!
