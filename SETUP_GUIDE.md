# OneShotsmith - Complete Setup & Deployment Guide

**Version:** 0.1.0
**Last Updated:** 2025-01-02

A professional D&D 5e character creator and one-shot adventure generator. Get players table-ready in under 10 minutes.

## 🎉 What's Included

This project includes a **fully functional, beautifully designed** web application with:

- ✨ **Stunning Landing Page** - Modern gradient design with animations
- 🎲 **Character Creator Wizard** - 3-step process to generate characters
- 📖 **One-Shot Adventure Generator** - Complete adventures with NPCs, encounters, and treasure
- 🎨 **Professional UI** - Built with shadcn/ui and TailwindCSS
- ✅ **All Dependencies Updated** - No deprecated packages
- 🧪 **Fully Tested** - Unit tests passing, TypeScript configured correctly

**All features are working and ready to use!**

---

## Table of Contents

1. [Quick Start (Local Development)](#quick-start-local-development)
2. [Project Structure](#project-structure)
3. [Working with the Codebase](#working-with-the-codebase)
4. [Testing](#testing)
5. [Building for Production](#building-for-production)
6. [Deployment Options](#deployment-options)
   - [Vercel (Recommended)](#vercel-deployment-recommended)
   - [cPanel Hosting](#cpanel-hosting-deployment)
   - [Docker](#docker-deployment)
7. [Environment Variables](#environment-variables)
8. [Troubleshooting](#troubleshooting)
9. [Development Workflow](#development-workflow)

---

## Quick Start (Local Development)

### Prerequisites

- **Node.js 20+** ([Download](https://nodejs.org/))
- **pnpm 9+** (Install: `npm install -g pnpm`)
- **Git** ([Download](https://git-scm.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/rages4calm/oneshotsmith.git
cd oneshot

# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env.local

# Generate database schema
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Start development servers
pnpm dev
```

Your app will be available at:
- **Frontend:** http://localhost:3000
- **PartyKit:** http://localhost:1999

---

## Project Structure

```
oneshot/
├── apps/
│   ├── web/                    # Next.js 15 Frontend
│   │   ├── src/
│   │   │   ├── app/           # App Router pages
│   │   │   ├── components/    # Page-specific components
│   │   │   └── lib/           # Utilities
│   │   ├── public/            # Static assets
│   │   └── .env.local         # Environment variables
│   │
│   └── worker/                # PartyKit Real-time Server
│       └── src/index.ts       # WebSocket room logic
│
├── packages/
│   ├── ui/                    # Reusable UI Components (shadcn/ui)
│   │   └── src/components/   # Button, Card, Input, etc.
│   │
│   ├── core/                  # Game Logic & Generators
│   │   ├── generators/        # Character & adventure generators
│   │   ├── srd/              # D&D 5e SRD data
│   │   └── utils/            # Dice roller, calculations
│   │
│   ├── db/                    # Database (Drizzle ORM)
│   │   ├── src/schema.ts     # Database schema
│   │   └── drizzle/          # Migrations
│   │
│   └── adapters/              # Export Adapters
│       ├── pdf/              # PDF generation
│       └── vtt/              # VTT exports (Foundry, Roll20)
│
├── tests/
│   └── e2e/                  # End-to-end tests
│
└── .github/
    └── workflows/            # CI/CD pipelines
```

---

## Working with the Codebase

### Development Commands

```bash
# Start all development servers (Next.js + PartyKit)
pnpm dev

# Run TypeScript type checking
pnpm typecheck

# Run linter
pnpm lint

# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run end-to-end tests
pnpm e2e

# Build for production
pnpm build
```

### Database Commands

```bash
# Generate new migration after schema changes
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Open Drizzle Studio (database GUI)
pnpm db:studio
```

### Adding New Features

#### 1. Adding a New UI Component

```bash
# Components live in packages/ui/src/components/
cd packages/ui/src/components
# Create your component (e.g., dialog.tsx)
# Export it from packages/ui/src/index.ts
```

#### 2. Adding Game Logic

```typescript
// Add to packages/core/src/
// Export from packages/core/src/index.ts
// Write tests in *.test.ts files
```

#### 3. Adding a New Page

```bash
# Create in apps/web/src/app/
# Next.js automatically routes based on folder structure
mkdir apps/web/src/app/character-creator
touch apps/web/src/app/character-creator/page.tsx
```

---

## Testing

### Unit Tests (Vitest)

```bash
# Run all unit tests
pnpm test

# Watch mode (auto-rerun on changes)
pnpm test:watch

# Run tests for specific package
cd packages/core
pnpm test
```

### End-to-End Tests (Playwright)

```bash
# Run E2E tests
pnpm e2e

# Run in UI mode
pnpm exec playwright test --ui

# Generate tests interactively
pnpm exec playwright codegen http://localhost:3000
```

---

## Building for Production

```bash
# Build all packages
pnpm build

# Build output locations:
# - apps/web/.next/          (Next.js build)
# - apps/worker/dist/        (PartyKit bundle)
```

---

## Deployment Options

### Vercel Deployment (Recommended)

Vercel provides the best experience for Next.js apps with zero configuration.

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd apps/web
   vercel
   ```

3. **Set Environment Variables:**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Deploy PartyKit:**
   ```bash
   cd apps/worker
   npx partykit deploy
   ```

5. **Update Environment:**
   - Copy PartyKit URL from deployment output
   - Update `NEXT_PUBLIC_PARTYKIT_HOST` in Vercel

---

### cPanel Hosting Deployment

**Note:** cPanel hosting typically doesn't support Node.js server-side rendering well. We'll use static export.

#### Step 1: Enable Static Export

Edit `apps/web/next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Add this line
  images: {
    unoptimized: true,  // Required for static export
  },
  transpilePackages: ["@oneshotsmith/ui", "@oneshotsmith/core", "@oneshotsmith/db", "@oneshotsmith/adapters"],
};

module.exports = nextConfig;
```

#### Step 2: Build Static Site

```bash
# Build the static site
cd apps/web
pnpm build

# Output will be in apps/web/out/
```

#### Step 3: Upload to cPanel

1. **Login to cPanel**
2. **Open File Manager**
3. **Navigate to `public_html/` or your domain folder**
4. **Upload all files from `apps/web/out/`**
5. **Set up .htaccess for client-side routing:**

Create `.htaccess` in your web root:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Redirect all requests to index.html for client-side routing
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Caching for static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

#### Step 4: Deploy Real-time Features (PartyKit)

**Option A: Use PartyKit Cloud (Recommended)**

```bash
cd apps/worker
npx partykit deploy
# Copy the deployment URL
```

Update your environment variables in the static site to point to PartyKit cloud.

**Option B: Self-host WebSocket Server**

If your cPanel has Node.js support:

1. **Check Node.js availability in cPanel:**
   - Look for "Setup Node.js App" in cPanel

2. **Create Node.js app:**
   - App Root: `/home/username/partykit`
   - App URL: `wss://yourdomain.com/ws`
   - Node.js version: 20+

3. **Upload PartyKit files:**
   - Upload `apps/worker/` to `/home/username/partykit`

4. **Install dependencies:**
   ```bash
   cd /home/username/partykit
   npm install
   ```

5. **Start the app through cPanel interface**

#### Step 5: Environment Variables for Static Build

Create a `.env.production` file before building:

```bash
# Use PartyKit cloud or your self-hosted URL
NEXT_PUBLIC_PARTYKIT_HOST=https://your-app.partykit.dev

# For static export, API routes become client-side
# You may need to adjust database access
```

#### Limitations of cPanel Static Deployment

- No server-side API routes (Next.js API routes won't work)
- No database access from the frontend directly
- Real-time features require external WebSocket service
- No server-side rendering (SSR)

**Recommendation:** Use Vercel for full features, or use cPanel only for simple static demos.

---

### Docker Deployment

```dockerfile
# Dockerfile in root
FROM node:20-alpine AS base
RUN npm install -g pnpm

FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/*/package.json ./packages/
RUN pnpm install --frozen-lockfile

FROM base AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build

FROM base AS production
WORKDIR /app
COPY --from=build /app/apps/web/.next ./apps/web/.next
COPY --from=build /app/apps/web/public ./apps/web/public
COPY --from=build /app/package.json ./
EXPOSE 3000
CMD ["pnpm", "start"]
```

---

## Environment Variables

### Development (.env.local)

```bash
# PartyKit WebSocket Server
NEXT_PUBLIC_PARTYKIT_HOST=http://localhost:1999

# Database (local SQLite for dev)
DATABASE_URL=file:./dev.db

# Supabase Auth (Optional)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
```

### Production

```bash
# PartyKit Production URL
NEXT_PUBLIC_PARTYKIT_HOST=https://your-app.partykit.dev

# Turso Database (LibSQL)
DATABASE_URL=libsql://your-db.turso.io
DATABASE_AUTH_TOKEN=your_turso_token

# Supabase Auth
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
```

---

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 pnpm dev
```

### Type Errors After Installing Packages

```bash
# Rebuild TypeScript references
pnpm typecheck
```

### Database Connection Issues

```bash
# Reset database
rm -f packages/db/dev.db
pnpm db:migrate
```

### Build Fails

```bash
# Clean all build artifacts
pnpm clean
pnpm install
pnpm build
```

---

## Development Workflow

### Daily Development

1. **Pull latest changes:**
   ```bash
   git pull origin main
   pnpm install  # If package.json changed
   ```

2. **Start dev server:**
   ```bash
   pnpm dev
   ```

3. **Make changes and test:**
   ```bash
   pnpm typecheck  # Check types
   pnpm test       # Run tests
   ```

4. **Commit changes:**
   ```bash
   git add .
   git commit -m "feat: add character sheet export"
   git push
   ```

### Before Deploying

```bash
# Run full test suite
pnpm typecheck
pnpm lint
pnpm test
pnpm e2e

# Build production
pnpm build

# Test production build locally
cd apps/web
pnpm start
```

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [PartyKit Docs](https://docs.partykit.io/)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [D&D 5e SRD](https://dnd.wizards.com/resources/systems-reference-document)

---

## Support & Contributing

- **Issues:** Report bugs via GitHub Issues
- **Contributing:** See [CONTRIBUTING.md](./CONTRIBUTING.md)
- **License:** MIT (Code) / CC-BY-4.0 (SRD Content)

---

**Last Updated:** 2025-01-02
**Maintained by:** OneShotsmith Team
