# Theme Guidelines

## Theme structure

Theme colors and semantic surfaces are centralized in `src/styles/themes/_index.scss`. Reusable CSS variables are available globally to shared UI and layout styles. Keep token roles consistent between themes; a component should consume `var(--color-surface)` or `var(--color-text-secondary)`, not branch on a particular theme or embed a palette value.

`ThemeService` (`src/app/core/theme/theme.service.ts`) provides:

- `preference`: `system`, `light`, or `dark`.
- `activeTheme`: resolved `light` or `dark`.
- `setPreference(value)`: stores a user preference and applies the corresponding theme.
- `toggle()`: switches from the current resolved theme to the other explicit theme.

The service starts at app initialization. Without an explicit saved preference, it follows `prefers-color-scheme` and listens for system changes. A user-selected preference is persisted in local storage as `portfolio-theme-preference`. The document root receives `data-theme="light"` or `data-theme="dark"`, which updates CSS variables across both public and admin shells.

## Changing colors centrally

1. Edit the semantic properties in the dark and light blocks of `src/styles/themes/_index.scss`.
2. Keep the token names and meaning aligned between themes. A status role should remain status-colored, and a focus token must remain clearly visible.
3. Keep `--color-text-on-accent` and `--color-text-on-danger` readable against their corresponding fills.
4. Recheck text and control contrast, including muted text, error/success/warning states, active navigation, and focus indicators.
5. Run the design-system showcase in both themes and verify public/admin layouts.

Do not modify individual component colors to compensate for a central palette change; update or add a semantic token only when the role is truly missing.

## Adding a theme

Add a `[data-theme='<name>']` CSS custom-property block with all required semantic color, interaction-state, and shadow roles. Extend `ThemePreference`, `ResolvedTheme`, `ThemeService` resolution, persistence validation, and the theme selector intentionally. Add theme tests and showcase coverage before exposing it to users. Avoid generating an independent copy of every component stylesheet.

## Persistence and security

Theme preference is non-sensitive UI state and may live in local storage. Do not store credentials, tokens, profile data, or other sensitive values there. System preference remains the default when no valid stored light/dark preference exists.
