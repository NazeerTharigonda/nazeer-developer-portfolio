# Nazeer Developer Portfolio

A production-oriented foundation for a personal developer portfolio built with Angular 21. The repository establishes standalone application setup, lazy feature routes, the Obsidian Luxe design system, reusable accessible UI components, public/admin layout shells, environment configuration, code-quality tools, and Netlify SPA deployment settings.

> Portfolio feature routes remain empty. This foundation includes shared visual components and layout scaffolding, but no portfolio pages, business functionality, authentication, or backend integrations.

## Technology stack

- Angular 21, standalone APIs, and TypeScript strict mode
- Angular Router with lazy-loaded feature route configurations
- SCSS and Angular Signals (available through Angular; no additional state library)
- Angular Reactive Forms and HttpClient
- Angular CLI application builder
- ESLint, Prettier, and Vitest
- Git/GitHub and Netlify

## Architecture

The application is organized by feature. Application-wide configuration lives in `src/app/core/`; reusable cross-feature code belongs in `src/app/shared/`; feature-specific code stays together under `src/app/features/<feature>/`. Add component, page, model, and service subfolders when a feature actually needs them rather than creating empty directories.

```text
src/
├── app/
│   ├── core/
│   │   ├── config/
│   │   ├── notifications/
│   │   └── theme/
│   ├── layout/
│   │   ├── admin-layout/
│   │   └── main-layout/
│   ├── shared/
│   │   ├── design-system-showcase/
│   │   └── ui/
│   ├── features/
│   │   ├── about/
│   │   ├── admin/
│   │   ├── blog/
│   │   ├── certifications/
│   │   ├── contact/
│   │   ├── education/
│   │   ├── experience/
│   │   ├── github-stats/
│   │   ├── home/
│   │   ├── leetcode-stats/
│   │   ├── projects/
│   │   └── skills/
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app.html
│   └── app.ts
├── environments/
├── styles/
│   ├── abstracts/
│   ├── base/
│   ├── components/
│   ├── themes/
│   └── utilities/
├── index.html
├── main.ts
└── styles.scss
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for folder responsibilities, routing and configuration decisions, conventions, and guidance for adding features.

Design decisions and component APIs are documented in [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md), [COMPONENT-GUIDELINES.md](./COMPONENT-GUIDELINES.md), and [THEME-GUIDELINES.md](./THEME-GUIDELINES.md). Run the development server and open `/_design-system` to inspect the design system within the public shell or `/_design-system/admin` to preview it within the admin shell; both routes are excluded from production builds.

## Development setup

Requirements: Node.js `^20.19.0`, `^22.12.0`, or `>=24.0.0`, and npm.

Install the locked dependencies:

```bash
npm ci
```

Start the local development server at `http://localhost:4200/`:

```bash
npm start
```

Other useful commands:

```bash
npm test              # Run unit tests
npm run lint          # Lint TypeScript and Angular templates
npm run format        # Format supported repository files with Prettier
npm run format:check  # Check formatting without modifying files
```

## Builds

The production configuration is the default:

```bash
npm run build
```

The optimized browser output is written to `dist/nazeer-developer-portfolio/browser`. To build with development settings:

```bash
npm run build -- --configuration development
```

## Configuration and secrets

Development builds replace `src/environments/environment.ts` with `src/environments/environment.development.ts`. Set `apiBaseUrl` in those files when an API exists. These values are bundled into browser code and are not secret storage; never put credentials or private keys in source or frontend environment files. The app-level `API_BASE_URL` injection token provides a typed configuration seam.

## Netlify deployment

The root `netlify.toml` configures `npm run build`, publishes `dist/nazeer-developer-portfolio/browser`, and rewrites client-side routes to `index.html`. Connect the GitHub repository to Netlify and use the settings in that file; no separate server-side runtime is required for this SPA foundation.

## Future development roadmap

1. Implement public portfolio pages using the shared UI system and public layout shell.
2. Add feature-local models, services, tests, and accessible UI as requirements emerge.
3. Integrate GitHub and LeetCode data through appropriately configured APIs.
4. Add a backend API (for example Node.js or Spring Boot) and connect it to PostgreSQL; the browser must not connect directly to the database.
5. Add admin workflows with authentication, route guards, and server-side authorization.
6. Explore blog content, an AI-powered chatbot, Telegram notifications, and expanded theme tokens when needed.
