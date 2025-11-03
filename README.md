# OneShotsmith

Build D&D 5e characters and one-shots in minutes. OneShotsmith runs entirely in
the browser without accounts, databases, or external services, and now ships
with a local Character Vault plus a pacing clock for game masters.

---

## Highlights

- **Three-step character creator** - choose a role and level to generate a
  complete sheet with stats, tactics, PDF export, and clipboard summary.
- **Character Vault** - save heroes locally, rename them, reopen in the creator,
  copy the summary, or export to JSON for backups and sharing.
- **Pregenerated heroes** - load curated pregens with concept blurbs and
  highlight notes directly into the creator.
- **One-shot generator** - produce hooks, act beats, encounters, NPCs, treasure,
  and twists ready to run the same night.
- **Session pacing clock** - auto-generated timing guidance that adapts to
  session length, theme, and difficulty so finales land on time.
- **Modern dark UI** - responsive Tailwind + shadcn design with accessible
  contrast and tailored artwork.

---

## Quick start

```bash
git clone https://github.com/rages4calm/oneshotsmith.git
cd oneshotsmith
pnpm install

# optional: local environment overrides
cp apps/web/.env.example apps/web/.env.local

pnpm dev
```

| Service   | URL                  |
|-----------|----------------------|
| Web app   | http://localhost:3000 |
| PartyKit* | http://localhost:1999 |

\*PartyKit powers future real-time features. You can stop it while working on
the UI if you like.

Need more detail? See [QUICK_START.md](./QUICK_START.md) or the full
[SETUP_GUIDE.md](./SETUP_GUIDE.md).

---

## What's new

### Character Vault

- Saves directly from the creator with friendly labels and role badges.
- Supports rename, delete, reopen, clipboard summary, and JSON export.
- Lives entirely in `localStorage` so no account is ever required.

### Session pacing clock

- Generates a complete timeline for 2, 3, or 4 hour runs.
- Adds theme- and difficulty-aware guidance for each segment.
- Uses progress bars to keep track of the remaining time at a glance.

### Creator upgrades

- Pregens pull their concept and highlight notes into the final sheet.
- Save/clipboard actions include those highlights when relevant.
- Header actions link directly to the vault for quick reopen flows.

---

## Project snapshot

```
apps/
  web/                     Next.js 15 frontend
    src/app/
      page.tsx             Landing page
      character-creator/   Character wizard
      character-vault/     Local save/load UI
      one-shot-generator/  Adventure tools
      pregen-library/      Curated pregenerated heroes
    public/images/         Marketing artwork
  worker/                  PartyKit server (future multiplayer)
packages/
  core/                    Character & adventure generators
  ui/                      Shared shadcn/ui components
  adapters/                PDF/VTT helpers (scaffolding)
scripts/
  post-export.mjs          Copies export aliases for cPanel hosting
```

---

## Tooling

| Area     | Stack                                                     |
|----------|-----------------------------------------------------------|
| Frontend | Next.js 15, React 18, TypeScript 5.7, Tailwind, shadcn/ui |
| Build    | pnpm workspace, static export, ESLint 9 flat config       |
| Testing  | Vitest, Playwright, TypeScript strict mode                |

Common scripts:

```bash
pnpm dev                               # run dev servers
pnpm --filter @oneshotsmith/web build  # static export in apps/web/out
pnpm lint                              # ESLint
pnpm typecheck                         # TypeScript
pnpm test                              # Vitest
pnpm e2e                               # Playwright
```

Extended commands for database scaffolding (if you enable it later) live in
`package.json` and mirror the scripts documented in `SETUP_GUIDE.md`.

---

## Deployment

- **Vercel:** import the repository and ship with no extra configuration required.
- **Static hosting / cPanel:** run the filtered build command above, upload
  `apps/web/out`, and include the generated `.htaccess`. The export script also
  creates `oneshot.html` and `oneshot.txt` for existing hosting requirements.
- **Docker:** build with `docker build -t oneshotsmith .` and run with
  `docker run -p 3000:3000 oneshotsmith`.

Full instructions, including environment variables and troubleshooting, live in
[SETUP_GUIDE.md](./SETUP_GUIDE.md).

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for
coding standards, branching strategy, and commit conventions before opening an
issue or pull request.

---

## License

- **Code:** [MIT License](./LICENSE)
- **D&D 5e SRD content:** Creative Commons Attribution 4.0 (CC-BY-4.0)

If OneShotsmith helps your table, star the repo and share your session notes!


