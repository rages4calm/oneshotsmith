# Start Here - OneShotsmith

Welcome! This repository already contains a fully working D&D 5e character creator, adventure generator, and the new Character Vault. Use this guide to decide your next move.

---

## 1. Run It Locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 and explore:

- **Character Creator:** Generate heroes, export to PDF, and save them to the Character Vault.
- **Character Vault:** Manage locally saved characters-rename, reopen, export JSON, and copy summaries.
- **One-Shot Generator:** Produce full adventures plus the new Session Pacing Clock to keep table timing tight.

Need more detail? See [QUICK_START.md](./QUICK_START.md).

---

## 2. Prepare the Repository

1. Review and update docs (README, QUICK_START, SETUP_GUIDE) - already refreshed in this update.
2. Confirm new assets under `apps/web/public/images/` are included in Git.
3. Run checks:
   ```bash
   pnpm lint
   pnpm --filter @oneshotsmith/web build
   ```
4. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Add Character Vault workflow and session pacing clock"
   git push origin main
   ```

Refer to [GITHUB_SETUP.md](./GITHUB_SETUP.md) if you need a full walkthrough.

---

## 3. Deploy

Choose the option that fits your hosting plan:

- **Vercel (Recommended):** Import the repo and deploy automatically.
- **Static Hosting / cPanel:** Use `pnpm --filter @oneshotsmith/web build`, upload `apps/web/out`, and include the provided `.htaccess`.
- **Docker:** Build with `docker build -t oneshotsmith .` and run with `docker run -p 3000:3000 oneshotsmith`.

Details and troubleshooting live in [SETUP_GUIDE.md](./SETUP_GUIDE.md).

---

## 4. Share & Iterate

- Create/save a few characters and adventures to verify the new vault and pacing clock in production.
- Update issues or roadmap items in GitHub if you plan to extend features (e.g., authentication, database storage).
- Collect player feedback after a session and open feature requests or pull requests as needed.

Enjoy running faster, friendlier one-shots!
