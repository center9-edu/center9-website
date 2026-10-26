# CLAUDE.md — Center9Edu Web

## 1. Project Overview

**Project:** Center9Edu Web  
**Repository:** `center9-web`  
**Purpose:** Public-facing marketing website for Center9Edu, a technology education center for children and teenagers in Vietnam.

The website focuses on course information, educational content, and student/parent acquisition.

This repository is independent of the Center9Edu LMS.

## 2. Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict mode)
- **Package Manager:** pnpm
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React

Always follow the versions and configurations defined in the repository.

Do not introduce new frameworks, state management libraries, or major dependencies without explaining the need and obtaining approval.

## 3. Project Architecture

Follow a lightweight feature-based architecture.

```text
src/
├── app/                  # Next.js routes, layouts, loading/error boundaries
│   └── (marketing)/      # Marketing routes
├── components/
│   ├── ui/               # shadcn/ui primitives
│   ├── layout/           # Shared layout components
│   └── shared/           # Reusable application components
├── features/             # Feature-specific code
│   ├── courses/
│   ├── blog/
│   └── leads/
├── lib/                  # Shared utilities and integrations
├── config/               # Application configuration
└── types/                # Truly shared TypeScript types
```

This structure is a guideline, not a requirement to create empty directories.

### Directory Responsibilities

**`app/`**
- Contains Next.js route entry points and route-specific files.
- Keep `page.tsx` and `layout.tsx` focused on composition.
- Use route groups when they provide meaningful layout or organizational boundaries.
- Avoid placing complex business logic directly in route files.

**`features/`**
- Organize domain-specific code by feature.
- A feature may contain components, hooks, services, schemas, and types.
- Create subdirectories only when needed.
- Keep feature-specific types and utilities inside the feature.

**`components/ui/`**
- Contains shadcn/ui primitives.
- Prefer existing primitives before creating new ones.
- Preserve compatibility with the shadcn CLI where practical.

**`components/layout/`**
- Contains shared structural components such as Header, Footer, and Navigation.

**`components/shared/`**
- Contains reusable components that are not tied to a specific feature.

**`lib/`**
- Contains generic utilities and shared integration helpers.
- Do not use it as a dumping ground for feature-specific business logic.

**`config/`**
- Contains application-level constants and configuration.

## 4. Coding Conventions

### TypeScript

- Use TypeScript strict mode.
- Prefer explicit, meaningful types.
- Avoid `any`; use `unknown` when appropriate.
- Prefer type inference when the intent is clear.
- Use `type` or `interface` consistently with surrounding code.
- Avoid unnecessary type assertions.

### Naming

- Directories: `kebab-case`
- Component files: `kebab-case.tsx`
- Utility files: `kebab-case.ts`
- React components: `PascalCase`
- Variables and functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE` for true constants
- Types and interfaces: `PascalCase`

### React and Next.js

- Use React Server Components by default.
- Add `"use client"` only when client-side functionality is required.
- Keep client boundaries as small as practical.
- Prefer composition over deeply configurable components.
- Avoid unnecessary `useEffect`, `useMemo`, and `useCallback`.
- Do not introduce global state management for local component state.
- Follow current Next.js App Router conventions.
- Use `next/link` for internal navigation.
- Use `next/image` for appropriate image assets.
- Prefer semantic HTML and accessible components.

### Styling

- Use Tailwind CSS for styling.
- Reuse existing design tokens and CSS variables.
- Use shadcn/ui components where appropriate.
- Avoid unnecessary custom CSS and inline styles.
- Keep responsive behavior in mind.
- Do not introduce another styling system without approval.

## 5. Import Boundaries

Follow these rules:

- `app/` can import from features and shared modules.
- Features can import shared UI components, utilities, and configuration.
- Shared components must not depend on feature-specific implementation.
- Avoid direct imports into another feature's internal files.
- Avoid circular dependencies.
- Use the configured `@/*` path alias.
- Keep server-only modules out of client-side import graphs.
- Do not use barrel exports when they obscure dependencies or mix server and client code.

## 6. SEO and Performance

SEO is a primary project requirement.

When implementing public-facing pages:

- Prefer static rendering when content permits.
- Use server rendering when required by dynamic data.
- Provide meaningful metadata for indexable pages.
- Use semantic heading structure.
- Maintain descriptive and stable URLs.
- Use canonical URLs where appropriate.
- Avoid unnecessary client-side JavaScript.
- Optimize images and fonts.
- Preserve accessibility and responsive layouts.
- Avoid introducing performance-heavy dependencies without justification.

Do not invent SEO claims, business achievements, testimonials, or statistics.

## 7. Content and Language

- Public-facing content should primarily be in Vietnamese.
- Code, identifiers, comments, and technical documentation should be in English.
- Keep content understandable for parents and students.
- Avoid hardcoding repeated business information across multiple components.
- Do not invent tuition fees, addresses, schedules, certifications, or course outcomes.

## 8. Dependency Management

- Always use `pnpm`.
- Check existing dependencies before installing new ones.
- Prefer built-in Next.js and React capabilities.
- Do not introduce a library for trivial functionality.
- Do not upgrade major dependency versions unless requested.
- Keep `pnpm-lock.yaml` synchronized with `package.json`.

## 9. Development Workflow

Before implementing a task:

1. Understand the requirement and expected behavior.
2. Inspect the relevant existing files.
3. Follow established patterns and conventions.
4. Identify the smallest reasonable change.
5. Ask for clarification when requirements are materially ambiguous.

During implementation:

1. Keep changes focused on the requested task.
2. Reuse existing utilities and components.
3. Avoid unrelated refactoring.
4. Maintain type safety and accessibility.
5. Do not create unnecessary abstractions.
6. Update related tests and documentation when appropriate.

After implementation:

1. Review the changes.
2. Run relevant checks using scripts defined in `package.json`.
3. Fix errors introduced by the change.
4. Report what was changed.
5. Mention any tests that could not be run.
6. Identify remaining risks or follow-up work.

Never claim that tests passed unless they were actually executed.

## 10. Git Conventions

Use Conventional Commits:

- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code restructuring without behavior changes
- `chore:` Maintenance
- `docs:` Documentation
- `test:` Tests
- `style:` Formatting or non-functional styling changes

Examples:

- `feat: add course listing page`
- `fix: resolve mobile navigation overflow`
- `refactor: extract shared course card`
- `chore: configure project structure`

Keep commits focused and descriptive.

Do not commit, push, force-push, create pull requests, or modify remote branches unless explicitly requested.

### Protected Branches

`main`, `staging`, and `dev` are protected. Changes reach them only through pull requests.

When asked to commit or push, an AI assistant must first check the current branch (`git branch --show-current`). If it is a protected branch:

1. Stop. Do not commit or push.
2. Warn the user that direct commits to `main`, `staging`, and `dev` are not allowed.
3. Propose a branch name (see Branch Naming) and create it with `git switch -c <branch>` only after the user confirms. Uncommitted changes carry over to the new branch.
4. Commit on the new branch, then open a pull request when requested.

Never force-push, rebase, or reset a protected branch.

Exception: the initial commit of an empty repository, only with explicit user confirmation.

### Branch Naming

> Proposed convention — not yet finalized by the team. Follow it until it is replaced.

Format: `<type>/<short-description>`

- `<type>` matches the Conventional Commit types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`. Use `hotfix` for urgent production fixes.
- `<short-description>`: lowercase `kebab-case`, ASCII only (no Vietnamese diacritics), 2–5 words.
- Optional ticket ID first: `<type>/<ticket-id>-<short-description>`.

Examples:

- `feat/course-listing-page`
- `fix/mobile-nav-overflow`
- `chore/project-structure`
- `feat/c9-42-trial-class-form`
- `hotfix/contact-form-submit`

Pull request target branch: to be decided (e.g. `dev`, promoted to `staging` and then `main`). Ask the user when unclear.

## 11. Security

- Never expose secrets or private credentials.
- Do not commit `.env` files containing real credentials.
- Validate untrusted input at server boundaries.
- Do not trust client-side validation alone.
- Avoid logging personal information submitted through forms.
- Do not expose server-only environment variables to client components.
- Do not bypass security checks to make a feature work.

## 12. AI Assistant Rules

When working in this repository:

- Inspect existing code before proposing changes.
- Follow project conventions over generic preferences.
- Prefer simple, readable, maintainable solutions.
- Explain significant architectural decisions.
- Do not overengineer.
- Do not create speculative features.
- Do not modify unrelated files.
- Do not silently change public APIs or established behavior.
- Do not remove existing functionality without explicit approval.
- Do not create empty directories or placeholder files without a clear purpose.
- Do not add dependencies without justification.
- Do not assume requirements that have not been confirmed.

For complex tasks, provide a short implementation plan before editing code.

For small, well-defined tasks, implement directly.

## 13. Definition of Done

A task is considered complete when:

- The requested behavior is implemented.
- Code follows repository conventions.
- TypeScript errors introduced by the change are resolved.
- Relevant lint and build checks pass, when runnable.
- Relevant tests pass, when available.
- Accessibility and responsive behavior are considered where applicable.
- No unrelated changes are included.
- The implementation is understandable and maintainable.

## 14. Guiding Principles

1. Simplicity over unnecessary complexity.
2. Maintainability over cleverness.
3. Server Components by default.
4. Feature ownership over scattered business logic.
5. Reusability without premature abstraction.
6. SEO, accessibility, and performance by design.
7. Consistency with existing code over personal preference.
8. Human review remains the final authority for architectural and security decisions.
