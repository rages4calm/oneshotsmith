# Contributing to OneShotsmith

Thank you for your interest in contributing to OneShotsmith! We appreciate your help in making this tool better for the D&D community.

## Getting Started

1. Fork and branch from `main`
2. Install dependencies: `pnpm install`
3. Start development servers: `pnpm dev`
4. Make your changes
5. Add tests for new functionality
6. Submit a pull request

## Development Setup

### Prerequisites
- Node.js 20+
- pnpm 9+
- Git

### Installation
```bash
# Clone your fork
git clone https://github.com/rages4calm/oneshotsmith.git
cd oneshotsmith

# Install dependencies
pnpm install

# Set up database
pnpm db:generate
pnpm db:migrate

# Start development servers
pnpm dev
```

## Project Structure

```
apps/
  web/            # Next.js frontend
  worker/         # PartyKit real-time server
packages/
  ui/             # Shared UI components (shadcn/ui)
  core/           # Game logic and generators
  db/             # Database schema and migrations
  adapters/       # Export adapters (PDF, VTT)
```

## Coding Standards

- **TypeScript**: All code must be properly typed
- **Linting**: Run `pnpm lint` before committing
- **Formatting**: We use Prettier for consistent code formatting
- **Testing**: Add tests for new features using Vitest
- **Commits**: Follow Conventional Commits format
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation
  - `refactor:` for code refactoring
  - `test:` for test additions/changes

## Testing

```bash
# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run e2e tests
pnpm e2e
```

## Pull Request Process

1. Update README.md or documentation if needed
2. Include screenshots for UI changes
3. Reference any related issues
4. Ensure all tests pass
5. Request review from maintainers

## SRD Compliance

**IMPORTANT**: All game content must comply with the D&D 5e SRD 5.1 license (CC-BY-4.0). Do not include:
- Non-SRD content from PHB, DMG, or other sourcebooks
- Copyrighted monster names not in the SRD
- Proprietary spells, subclasses, or features

When in doubt, check the official SRD document.

## Questions?

Open an issue for discussion or reach out to the maintainers.

Thank you for contributing!
