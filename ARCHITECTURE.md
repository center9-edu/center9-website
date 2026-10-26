# Architecture

How code is organized in `center9-web`. Coding conventions (naming, TypeScript, React, styling), the high-level directory map, and the full import rules live in [`CLAUDE.md`](./CLAUDE.md) — this file covers **where code goes** and **when structure grows**.

Principle: folders are created when the first real file needs them, never ahead of time.

## Current structure

```text
src/
├── app/
│   ├── (marketing)/
│   │   └── page.tsx          # home (/)
│   ├── layout.tsx            # root layout: <html lang="vi">, <body>, fonts
│   ├── globals.css           # Tailwind v4 + shadcn theme tokens
│   └── favicon.ico
├── components/
│   └── ui/
│       └── button.tsx        # shadcn primitive (added by `shadcn init`)
└── lib/
    └── utils.ts              # cn()
```

## Target structure

Created incrementally — every path below that isn't in "Current structure" is **create when needed**.

```text
src/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx              # site header + footer
│   │   ├── page.tsx
│   │   ├── _components/            # sections used only by the home page
│   │   ├── about/page.tsx
│   │   ├── courses/page.tsx
│   │   ├── courses/[slug]/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── trial-class/page.tsx
│   │   └── contact/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                         # shadcn primitives only
│   ├── layout/                     # site-header, site-footer, navigation
│   └── shared/                     # reusable, feature-agnostic components
├── features/
│   ├── courses/
│   ├── blog/
│   └── leads/                      # trial-class + contact submissions
├── lib/                            # generic utilities, integration helpers
├── config/                         # site.ts: name, contact info, nav
└── types/                          # types shared by 2+ features
public/                             # static assets (recreate with the first asset)
```

## Directory responsibilities

| Directory | Owns | Must not contain |
|---|---|---|
| `app/` | Routes, layouts, `loading`/`error`/`not-found`, metadata, route-only components in `_components/` | Data fetching logic, validation, reusable components |
| `app/layout.tsx` | `<html>`, `<body>`, fonts, global CSS | Header/footer (they belong to `(marketing)/layout.tsx`) |
| `components/ui/` | shadcn primitives, managed by the CLI | Business logic; hand-written non-shadcn components |
| `components/layout/` | Site-wide structure: header, footer, navigation | Feature data access |
| `components/shared/` | Reusable components with no feature knowledge (e.g. `section-heading`) | Imports from `features/` |
| `features/<name>/` | Everything domain-specific: components, data access, actions, schemas, types | Code another feature reaches into |
| `lib/` | Generic helpers (`cn`), thin integration clients | Feature business logic, components |
| `config/` | Site-wide constants: site name, contact details, nav links | Secrets (use env vars) |
| `types/` | Types used by 2+ features | Types used by one feature |

There is no global `hooks/` or `styles/`. Hooks live in the feature that uses them (the shadcn CLI may create `src/hooks/` for its own hooks — that's fine). Styles live in `app/globals.css`.

## Component placement

Ask in order; first "yes" wins:

1. Is it a shadcn primitive? → `components/ui/` via `pnpm dlx shadcn@latest add <name>`
2. Is it site-wide structure (header, footer, nav)? → `components/layout/`
3. Does it know about a domain (courses, posts, leads)? → `features/<name>/components/`
4. Is it used by only one route? → that route's `_components/`
5. Is it used by 2+ routes or features and domain-agnostic? → `components/shared/`

Start in the narrowest place (4 or 3). Promote to `components/shared/` when a second consumer appears, not before.

## Feature layout

Start flat. Add subfolders only when a feature has several files of one kind.

```text
features/courses/              # small feature
├── course-card.tsx
├── services.ts                # data access — starts with `import "server-only"`
└── types.ts

features/leads/                # grown feature
├── components/
│   ├── trial-class-form.tsx   # "use client"
│   └── contact-form.tsx       # "use client"
├── actions.ts                 # "use server" — Server Actions
└── schema.ts                  # input validation, shared by form + action
```

Rules:

- **No barrel `index.ts`.** A barrel re-exporting both a `server-only` service and a client component pulls server code into the client graph (or fails the build), and makes circular imports easy. Import the file you need: `@/features/courses/services`.
- **Cross-feature imports** go only to a feature's top-level files (`types.ts`, `services.ts`), never into its `components/` or internals. If two features need the same thing, move it to `components/shared/`, `lib/`, or `types/`.
- **Server/client split:** Server Components by default. `"use client"` goes on the smallest leaf that needs state or events (a form, not the page). Data access files start with `import "server-only"` (install the `server-only` package with the first such file). Mutations are Server Actions in `actions.ts` and re-validate input on the server.

## Import boundaries

Allowed direction: `app → features → shared (components, lib, config, types)`. Shared code never imports features; `lib/` never imports components.

| From \ To | `features/*` | `components/*` | `lib/`, `config/`, `types/` |
|---|---|---|---|
| `app/` | ✅ | ✅ | ✅ |
| `features/x` | ⚠️ top-level files of other features only | ✅ | ✅ |
| `components/*` | ❌ | ✅ | ✅ |
| `lib/` | ❌ | ❌ | ✅ |
| `config/`, `types/` | ❌ | ❌ | ✅ |

Enforced by `no-restricted-imports` in `eslint.config.mjs`:

- `components/`, `config/`, `types/`, `lib/` importing `@/features/*` → error
- `lib/` importing `@/components/*` → error
- Parent-relative imports (`../`) anywhere in `src/` → error (use `@/`; same-folder `./` is fine)

Cross-feature internals (⚠️) are review-only, not linted.

## When to create a new folder

| Create | When |
|---|---|
| A route folder in `(marketing)/` | The page is being built — never an empty `page.tsx` |
| `(marketing)/layout.tsx`, `components/layout/` | Header/footer are implemented |
| `features/<name>/` | The first domain-specific file exists |
| `features/<name>/components/` (etc.) | The feature has ~3+ files of that kind |
| `components/shared/` | A domain-agnostic component gets a second consumer |
| `config/site.ts` | Real business info is provided (never invented) |
| `types/` | A type is needed by 2+ features |
| A new route group, e.g. `(legal)` | Pages need a different layout than `(marketing)` |
| `content/` (repo root) | Courses/blog are authored as MDX in the repo |

## Where does new code go?

| New code | Location |
|---|---|
| Header, footer | `src/components/layout/site-header.tsx`, `site-footer.tsx`; mounted in `src/app/(marketing)/layout.tsx` |
| Hero section of the home page | `src/app/(marketing)/_components/hero-section.tsx` |
| Course list page | `src/app/(marketing)/courses/page.tsx` composing `@/features/courses/...` |
| Course card | `src/features/courses/course-card.tsx` |
| Fetch courses | `src/features/courses/services.ts` (`server-only`) |
| Trial class form | `src/features/leads/components/trial-class-form.tsx` (`"use client"`) |
| Submit lead | `src/features/leads/actions.ts` (`"use server"`) + `schema.ts` |
| Blog post page | `src/app/(marketing)/blog/[slug]/page.tsx` + `src/features/blog/...` |
| Dialog, input, card primitives | `pnpm dlx shadcn@latest add dialog input card` → `src/components/ui/` |
| Section heading used on many pages | `src/components/shared/section-heading.tsx` |
| Site name, hotline, address | `src/config/site.ts` |
| Date formatting helper | `src/lib/format-date.ts` (only if `Intl` isn't enough inline) |
| `useMediaQuery` used by one feature | Inside that feature; move to `src/hooks/` only when 2+ features need it |

## Decisions to revisit

- **Content source** (MDX in repo vs. headless CMS vs. LMS API) — decides `features/courses|blog/services.ts` and whether `content/` exists.
- **Lead destination** (email, sheet, CRM, LMS) — decides `features/leads/actions.ts` and which env vars are needed.
- **i18n** — currently Vietnamese only. Adding a second language means moving routes under `app/[locale]/`; do it before many pages exist.
- **Font** — Geist (create-next-app default) supports Vietnamese but only the `latin` subset is preloaded. When the design picks the final font, include `"vietnamese"` in `subsets`.
- **Cross-feature lint rule** — if features start reaching into each other's internals, add per-feature `no-restricted-imports` overrides or a boundaries plugin.
- **`AGENTS.md`** — `next dev` generates it (Next.js agent rules). Keep it or set `agentRules: false` in `next.config.ts`.
