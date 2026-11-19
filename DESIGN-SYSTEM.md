# Obsidian Luxe Design System

## Design philosophy

Obsidian Luxe is a premium, restrained visual language for an engineering portfolio: dark mineral surfaces, warm metallic accents, editorial typography, clear hierarchy, and deliberate whitespace. It favors readable contrast and useful interaction feedback over decoration. Use semantic tokens and shared UI rather than local visual inventions.

The design system is infrastructure. The feature route arrays remain empty; the development showcase demonstrates the system without becoming public portfolio content.

## Central tokens

`src/styles/themes/_index.scss` defines the semantic CSS custom properties consumed by global styles, layouts, and shared components. Change a semantic token there to affect all consumers.

### Color

Both themes expose the same roles: `--color-background`, `--color-background-secondary`, `--color-surface`, `--color-surface-elevated`, `--color-surface-hover`, `--color-interactive-hover`, `--color-interactive-pressed`, `--color-interactive-disabled`, `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-border`, `--color-border-strong`, `--color-focus`, brand action states, semantic status colors and their surfaces, overlay, and semantic shadows.

The dark theme is the fallback palette (`#0B0D10`, `#12161C`, `#191F27`, `#222A34`, and `#C6A46A`); at runtime, the app follows the system color preference until the user chooses a theme. The light theme uses warm off-white surfaces and a deeper accent for contrast. Its muted text and strong borders are darkened beyond the suggested starting values to improve small-text and control-boundary contrast. Status colors have separate semantic surface roles. Do not copy raw palette values into components.

### Typography

The scale runs from `--font-size-display` through H1–H5, body large/body/body small, caption, label, and button. Font family tokens are `--font-family-heading`, `--font-family-body`, and `--font-family-mono`; fallbacks prefer Manrope for headings and Inter for body copy, then system fonts. No remote font request is required. Global utility classes such as `.type-h1` and `.type-body-small` are available when semantic HTML alone is insufficient.

### Spacing, radius, elevation, and layout

- `--space-1` through `--space-32` form a 4px-base spacing scale.
- `--radius-none`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-2xl`, and `--radius-full` define corners.
- `--shadow-none`, `--shadow-subtle`, `--shadow-card`, `--shadow-elevated`, `--shadow-modal`, and `--shadow-focus` define elevation.
- Layout tokens include container widths, page gutter, section spacing, sidebar widths, header height, content width, and grid gap.
- Sass breakpoints are centralized in `src/styles/abstracts/_variables.scss`: 320px, 480px, 768px, 1024px, 1280px, and 1440px.

### Themes

`ThemeService` exposes the explicit preference (`system`, `light`, or `dark`) and resolved active theme as Angular signals. It defaults to the system preference when there is no stored choice, tracks system color-scheme changes, writes `data-theme` on the document root, and persists the chosen preference under `portfolio-theme-preference`. `ui-theme-toggle` switches between the resolved light and dark themes.

To retune a theme, edit semantic custom properties under `:root` / `:root[data-theme='dark']` and `:root[data-theme='light']` in the central theme stylesheet. Both themes must continue to define the same semantic roles. Add a new theme as another root data-theme selector and extend `ThemeService` deliberately if users need to select it.

### Motion

Duration and easing values are CSS custom properties generated from the Sass tokens in `src/styles/abstracts/_variables.scss`. Shared motion utility classes are in `src/styles/_motion.scss`. Prefer opacity and transform; avoid layout-triggering animation. The global reduced-motion rule and the component-specific overrides suppress nonessential motion under `prefers-reduced-motion: reduce`.

## Responsive rules

Use the shared `container`, `content-container`, `section-container`, `stack`, `cluster`, and `grid` utilities where they fit. Layouts use fluid gutters and typography, content wraps rather than overflowing, and controls retain touch-friendly minimum sizes. Verify the public and admin shells and the component showcase at 320, 390, 768, 1024, 1280, and 1440px; resize controls intentionally rather than shrinking desktop layouts.

## Accessibility

Use semantic elements and labels, preserve visible `:focus-visible` rings, name icon-only actions, and expose disabled/loading/selected/error status with native attributes or ARIA. The modal uses native `<dialog>.showModal()` so the browser manages top-layer presentation, initial focus, focus containment, Escape dismissal, and focus restoration. Tabs and dropdowns support keyboard navigation. The tooltip directive retains the native `title` and sets `aria-description`. Use `prefers-reduced-motion` for every nonessential animation.

Aim for WCAG 2.2 AA contrast; validate any future palette edits with an independent contrast checker, particularly muted text, focus indicators, badges, and text on accents. Do not rely on color alone to communicate status.

## Showcase

Run `npm start` and visit `/_design-system` in a development build to preview the public shell, or `/_design-system/admin` to preview the admin shell. These routes are added only when the development environment is selected; production routing does not expose them. The showcase demonstrates tokens, themes, typography, spacing, controls, feedback, dialogs, loading states, and navigation primitives. Its sample actions are local demonstrations, not feature behavior.
