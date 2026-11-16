# Architecture

## Goals and decisions

- **Standalone Angular:** Angular 21 standalone APIs are the default. The bootstrap component is intentionally only a `RouterOutlet`; it contains no page UI or application behavior.
- **Feature-oriented organization:** Route boundaries and future domain code live together under `src/app/features/`. Shared code is extracted only when multiple features need it.
- **Client-rendered SPA:** The Angular application builder produces static browser assets. Netlify's redirect rule supports direct navigation to client-side URLs. SSR and prerendering are not enabled.
- **Lazy routing:** Public areas and the admin area are loaded through separate `loadChildren` boundaries. Their route arrays are empty by design until real pages are implemented.
- **Angular-native state:** Angular Signals are available for local or feature state when needed. No state-management package is introduced.
- **Central configuration:** `app.config.ts` composes application providers; environment-specific API URLs are bound to `API_BASE_URL`.
- **No frontend secrets:** Environment files are compiled into public JavaScript. Secret credentials belong on a trusted backend, never in the browser bundle.
- **Minimal foundations:** Add folders and abstractions when there is real code to organize. Do not create speculative services, guards, interceptors, or placeholder pages.

## Folder responsibilities

```text
src/
├── app/
│   ├── core/
│   │   └── config/              # Application-wide tokens and configuration
│   ├── features/                # Independently routed business capabilities
│   │   ├── admin/               # Future admin route group and admin-only features
│   │   ├── home/
│   │   ├── about/
│   │   ├── experience/
│   │   ├── skills/
│   │   ├── projects/
│   │   ├── certifications/
│   │   ├── education/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── github-stats/
│   │   └── leetcode-stats/
│   ├── app.config.ts            # Root providers, router, and HTTP setup
│   ├── app.routes.ts            # Top-level lazy route boundaries
│   ├── app.ts                   # Minimal standalone bootstrap component
│   └── app.html                 # Root router outlet
├── environments/                # Build-time, non-secret environment values
├── styles/
│   ├── abstracts/               # Sass variables and mixins
│   ├── base/                    # Reset and typography defaults
│   ├── themes/                  # Theme-level defaults and future tokens
│   └── utilities/               # Small global utility classes
├── index.html
├── main.ts
└── styles.scss                  # Global Sass module entry point
```

The tree shows current route foundations and the responsibilities of the established style modules. Feature subfolders such as `components/`, `pages/`, `models/`, and `services/`, plus `shared/` and `layout/`, should be added when concrete code warrants them. In Angular 21, add static files under the CLI-supported root `public/` directory when assets are introduced; do not check in empty asset folders.

### Core and shared boundaries

- **Core:** Single-instance application services, route guards, HTTP interceptors, and app-wide configuration. Keep it small; a feature-specific service stays in that feature.
- **Shared:** Reusable presentational components, directives, pipes, types, and pure utilities that have multiple consumers. Shared code should not depend on feature implementations.
- **Layout:** Public/admin shells when real navigation and layout needs exist. Keep layout components free of feature business logic.
- **Features:** Each feature owns its route config and, when needed, its pages, components, models, and data-access services. Feature code should not reach into another feature's internals.
- **Global styles:** Sass abstracts are included by modules that need them. Component styles should be colocated with their Angular component rather than collected into a global component stylesheet.

## Feature organization

When implementing a feature, add only the subfolders that have actual responsibilities:

```text
features/projects/
├── components/       # Feature-specific reusable UI
├── pages/            # Route-level screens
├── services/         # Feature data access and orchestration
├── models/           # Feature-owned domain/API types
└── projects.routes.ts
```

The current route files export empty `Routes` arrays. This preserves the route ownership and lazy-loading boundaries without introducing dummy pages or behavior.

## Routing strategy

`src/app/app.routes.ts` defines lazy public boundaries for:

| URL               | Feature             |
| ----------------- | ------------------- |
| `/`               | Home                |
| `/about`          | About               |
| `/experience`     | Experience          |
| `/skills`         | Skills              |
| `/projects`       | Projects            |
| `/certifications` | Certifications      |
| `/education`      | Education           |
| `/blog`           | Blog                |
| `/contact`        | Contact             |
| `/github-stats`   | GitHub statistics   |
| `/leetcode-stats` | LeetCode statistics |
| `/admin`          | Admin route group   |

The admin route group owns lazy child boundaries for `/admin/dashboard`, `/admin/profile`, `/admin/projects`, `/admin/certifications`, and `/admin/blog`. These are organizational boundaries only; no admin screens, authentication, or authorization are implemented.

When admin authentication is introduced, add appropriate guards at the admin route-group boundary and enforce authorization in the backend as well. A client-side guard is not a security boundary.

## Configuration strategy

- `src/app/app.config.ts` is the single root provider composition point. It registers the router, `HttpClient`, and Angular's browser error listeners.
- `src/app/core/config/api.config.ts` declares the typed `API_BASE_URL` injection token.
- `src/environments/environment.development.ts` is selected by the development build; `environment.ts` is the production/default build configuration. Both define `production` and `apiBaseUrl`.
- Leave `apiBaseUrl` empty until a real API URL is known. A backend URL is public configuration, not a credential. Do not store secrets in environment files.
- Add providers, interceptors, or additional configuration only when an integration needs them. Use Angular's `provideHttpClient` configuration rather than a custom HTTP abstraction without a demonstrated requirement.
- Reactive forms are available from `@angular/forms`; import form directives at the standalone component that uses them. Angular Signals are built in and need no provider or package.

## Styling strategy

`src/styles.scss` is the global Sass entry point and uses Sass modules (`@use`/`@forward`):

- `abstracts/`: shared variables and mixins; abstracts emit no global CSS.
- `base/`: a small reset and neutral typography defaults.
- `themes/`: system color-scheme support; add semantic light/dark tokens when a visual design is chosen.
- `utilities/`: narrowly scoped, reusable global utilities.
- Component-level styles are scoped and colocated with the component under its feature or shared component folder.

Keep design tokens semantic (for example, surface, text, and accent roles) rather than scattering literal values across components. Avoid global selectors for feature-specific presentation.

## Coding and quality conventions

- Keep strict TypeScript and Angular template checks enabled; avoid `any` and unused code.
- Follow Angular CLI's current concise filenames (`app.ts`, `projects.routes.ts`) and kebab-case folder names.
- Use standalone components/directives/pipes and explicit imports. Keep components focused on presentation and interaction; move reusable domain/data behavior to a suitable service.
- Use typed request/response models at API boundaries. Keep persistence and PostgreSQL access behind a backend API.
- Prefer Signals for local reactive state and RxJS for asynchronous streams/interoperation; add a state library only when demonstrated complexity warrants it.
- Run `npm test`, `npm run lint`, `npm run format:check`, and `npm run build` before merging.

## Adding a future feature

1. Create `src/app/features/<feature>/` and the feature-owned route file.
2. Put route-level screens in `pages/`; add `components/`, `models/`, or `services/` only as needed.
3. Export the feature's `Routes` and add a single `loadChildren` entry in `app.routes.ts`.
4. Keep feature data access and types local until another feature genuinely needs to share them.
5. Add focused tests and component-scoped SCSS alongside the code.
6. For admin routes, add authentication and authorization deliberately; do not treat a frontend guard as backend access control.
