# Center9Edu Web

Public marketing website for Center9Edu, a technology education center for children and teenagers in Vietnam. It covers course information, educational content, and student/parent sign-ups.

This repository is independent of the Center9Edu LMS.

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router), React 19
- TypeScript (strict)
- Tailwind CSS 4
- [shadcn/ui](https://ui.shadcn.com) (Base UI, `base-nova` style), Lucide icons
- pnpm

## Requirements

- Node.js `>= 20.9`
- pnpm 11 (pinned via `packageManager` in `package.json`; `corepack enable` picks it up)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build (includes type checking) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint, including import-boundary rules |

## Project Structure

```text
src/
├── app/            # Routes and layouts; public pages live in (marketing)/
├── components/
│   └── ui/         # shadcn/ui primitives
└── lib/            # Shared utilities
```

Folders such as `features/`, `components/layout/`, and `config/` are added when first needed. See [ARCHITECTURE.md](./ARCHITECTURE.md) for where new code goes and which imports are allowed.

### Adding shadcn/ui components

```bash
pnpm dlx shadcn@latest add <component>
```

Components are generated into `src/components/ui/`.

## Conventions

Coding, naming, SEO, and security conventions are in [CLAUDE.md](./CLAUDE.md). The short version:

- Server Components by default; `"use client"` only where needed.
- Use the `@/*` import alias; no parent-relative (`../`) imports.
- Public content in Vietnamese; code and technical docs in English.

## Git Workflow

- `main`, `staging`, and `dev` are protected. Never commit directly to them; open a pull request.
- Branch names: `<type>/<short-description>`, e.g. `feat/course-listing-page`, `fix/mobile-nav-overflow` (proposed convention, see [CLAUDE.md §10](./CLAUDE.md#10-git-conventions)).
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org): `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`, `style:`.

## AI Assistants

[CLAUDE.md](./CLAUDE.md) holds the rules for AI coding assistants in this repo. `next dev` also generates an `AGENTS.md` with Next.js-specific agent guidance.
