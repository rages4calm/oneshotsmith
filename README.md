# ⚔️ OneShotsmith

<div align="center">

![OneShotsmith Banner](https://img.shields.io/badge/D%26D_5e-Character_Creator-purple?style=for-the-badge&logo=dungeonsanddragons)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Get players table-ready in under 10 minutes**

A fast, friendly web app for D&D 5e character creation and one-shot adventure generation. Zero prep panic. Zero experience needed.

[Live Demo](#) • [Documentation](./SETUP_GUIDE.md) • [Quick Start](./QUICK_START.md) • [Contributing](./CONTRIBUTING.md)

</div>

---

## ✨ Features

### v0.7 (Current)
- [x] Character creator with 5 roles
- [x] One-shot adventure generator
- [x] Beautiful modern UI
- [x] Export to PDF for characters and adventures
- [x] Clipboard summaries for instant sharing
- [x] Full test coverage

### v1.0 (Next)
- [ ] Database integration (Turso)
- [ ] User authentication (Supabase)
- [ ] Save/load characters
- [ ] Real-time multiplayer lobbies
- [ ] Party balance meter
- [ ] VTT exports (Foundry, Roll20)

### v1.1+ (Future)
- [ ] Custom homebrew content
- [ ] More adventure themes
- [ ] Spell slot tracker
- [ ] Encounter builder
- [ ] Mobile PWA with offline mode

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **pnpm** 9+ (Install: `npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/rages4calm/oneshotsmith.git
cd oneshotsmith

# Install dependencies
pnpm install

# Set up environment
cp apps/web/.env.example apps/web/.env.local

# Start development server
pnpm dev
```

**Your app is now running at:**
- Frontend: http://localhost:3000
- PartyKit: http://localhost:1999

📖 **Need more help?** See [QUICK_START.md](./QUICK_START.md) for detailed instructions.

---

## 📁 Project Structure

```
oneshotsmith/
├── apps/
│   ├── web/                  # Next.js 15 frontend
│   │   ├── src/app/         # App Router pages
│   │   │   ├── page.tsx                  # Landing page
│   │   │   ├── character-creator/        # Character wizard
│   │   │   └── one-shot-generator/       # Adventure generator
│   │   └── public/          # Static assets
│   └── worker/              # PartyKit WebSocket server
│
├── packages/
│   ├── ui/                  # shadcn/ui components
│   ├── core/                # Character & adventure generators
│   ├── db/                  # Drizzle ORM + database schema
│   └── adapters/            # PDF & VTT exporters
│
├── tests/
│   └── e2e/                 # Playwright E2E tests
│
└── docs/
    ├── SETUP_GUIDE.md       # Complete deployment guide
    ├── QUICK_START.md       # 2-minute setup
    └── CONTRIBUTING.md      # Contribution guidelines
```

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful components

### Backend & Real-time
- **[PartyKit](https://partykit.io/)** - WebSocket rooms for multiplayer
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe database ORM
- **[LibSQL/Turso](https://turso.tech/)** - Edge database (SQLite-compatible)

### Testing & Tooling
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Playwright](https://playwright.dev/)** - E2E testing
- **[ESLint 9](https://eslint.org/)** - Code linting
- **[pnpm](https://pnpm.io/)** - Fast package manager

---

## 📸 Screenshots

<div align="center">

### Landing Page
![Landing Page](./docs/screenshots/landing.png)

### Character Creator
![Character Creator](./docs/screenshots/character-creator.png)

### One-Shot Generator
![Adventure Generator](./docs/screenshots/adventure-generator.png)

</div>

---

## 🧪 Development

### Available Commands

```bash
# Development
pnpm dev              # Start all dev servers
pnpm typecheck        # Run TypeScript checks
pnpm lint             # Run ESLint
pnpm test             # Run unit tests
pnpm test:watch       # Run tests in watch mode
pnpm e2e              # Run E2E tests

# Production
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Drizzle Studio
```

### Running Tests

```bash
# All tests
pnpm test             # Unit tests (9 passing)
pnpm typecheck        # TypeScript validation
pnpm e2e              # End-to-end tests
```

All tests passing ✅ | No deprecated packages ✅ | TypeScript strict mode ✅

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rages4calm/oneshotsmith)

```bash
npm i -g vercel
cd apps/web
vercel
```

### cPanel / Shared Hosting

See [SETUP_GUIDE.md](./SETUP_GUIDE.md#cpanel-hosting-deployment) for detailed instructions on:
- Static export configuration
- .htaccess setup for client-side routing
- PartyKit deployment options

### Docker

```bash
docker build -t oneshotsmith .
docker run -p 3000:3000 oneshotsmith
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/rages4calm/oneshotsmith.git`
3. **Create** a branch: `git checkout -b feature/amazing-feature`
4. **Commit** changes: `git commit -m 'Add amazing feature'`
5. **Push** to branch: `git push origin feature/amazing-feature`
6. **Open** a Pull Request

📖 Read [CONTRIBUTING.md](./CONTRIBUTING.md) for coding standards and guidelines.

---

## 📝 License

### Code
This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file.

### D&D 5e SRD Content
Portions of the materials used are property of Wizards of the Coast LLC and are used under the **Creative Commons Attribution 4.0 International License (CC-BY-4.0)**.

See [licenses/SRD-CC-BY-4.0.md](./licenses/SRD-CC-BY-4.0.md) for details.

---

## 🙏 Acknowledgments

- **Wizards of the Coast** - D&D 5e SRD 5.1 content
- **Vercel** - Hosting and deployment platform
- **shadcn** - Beautiful UI components
- **The D&D Community** - Inspiration and feedback

---

## 📞 Support

- 📖 **Documentation**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/rages4calm/oneshotsmith/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/rages4calm/oneshotsmith/discussions)
- 🎮 **Discord**: [Join our community](#)

---

## 🗺️ Roadmap

### ✅ MVP (Current)
- [x] Character creator with 5 roles
- [x] One-shot adventure generator
- [x] Beautiful modern UI
- [x] Export to PDF (placeholder)
- [x] Full test coverage

### 🚧 v1.0 (Next)
- [ ] Database integration (Turso)
- [ ] User authentication (Supabase)
- [ ] Save/load characters
- [ ] Real-time multiplayer lobbies
- [ ] Party balance meter
- [ ] PDF export implementation

### 🔮 v1.1+ (Future)
- [ ] VTT exports (Foundry, Roll20)
- [ ] Custom homebrew content
- [ ] More adventure themes
- [ ] Spell slot tracker
- [ ] Encounter builder
- [ ] Mobile PWA with offline mode

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=rages4calm/oneshotsmith&type=Date)](https://star-history.com/#rages4calm/oneshotsmith&Date)

---

<div align="center">

**Built with ❤️ for the D&D community**

[⬆ Back to Top](#-oneshotsmith)

</div>

## Copyright

© 2025 Carl Prewitt Jr. All rights reserved.

