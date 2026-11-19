# Shared Component Guidelines

## Location and conventions

Shared standalone UI components live in `src/app/shared/ui/` and are re-exported from `src/app/shared/ui/index.ts`. Keep a component in its own folder with a concise Angular CLI-style filename. Use standalone imports, strict types, signal-based `input()` / `output()` APIs, and `OnPush` change detection. Shared UI components must remain presentation-focused and independent of portfolio data or backend services.

Use semantic tokens for colors, spacing, radius, typography, elevation, and motion. Component SCSS may define structure and component-specific state styling, but must not introduce alternate brand palettes or duplicate global rules.

## Available components

| Component / directive                      | Responsibility and API                                                                                                                                                                                                                                                               |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ui-button`                                | Native button with `variant`, `size`, `type`, `disabled`, `loading`, and `loadingLabel` inputs. Variants: primary, secondary, outline, ghost, danger, link; sizes: small, medium, large. Project optional `[uiButtonLeading]` / `[uiButtonTrailing]` icons with explicit dimensions. |
| `ui-icon-button`                           | Icon-only native button. Requires an accessible `label`; accepts `tooltip`, `size`, `disabled`, and projected caller-provided SVG/content with explicit dimensions.                                                                                                                  |
| `ui-card`                                  | Surface variants: default, interactive, elevated, bordered, feature, stat. Interactive cards are keyboard focusable and emit `activated` on pointer, Enter, or Space. Avoid nesting interactive controls inside the interactive variant.                                             |
| `ui-badge`                                 | Default, primary, success, warning, error, and information semantic treatments; small or medium size.                                                                                                                                                                                |
| `ui-form-field`                            | Label, control association, hint/error/success text, and required marker. Set the child control's matching `id`; connect its `aria-describedby` to `<controlId>-message` when a hint/error is shown.                                                                                 |
| `uiInput`                                  | Styling directive for native input, textarea, and select. Use native `type`, `disabled`, `required`, `aria-invalid`, and form APIs.                                                                                                                                                  |
| `uiCheckbox`, `uiRadio`                    | Styling directives for native checkbox and radio inputs; use native `label`/`fieldset` semantics and form controls.                                                                                                                                                                  |
| `ui-toggle`                                | Accessible `role="switch"` control implementing `ControlValueAccessor`; requires a meaningful `label` and works with Angular forms.                                                                                                                                                  |
| `ui-alert`                                 | Default/success/warning/error/information semantic feedback. `title`, `variant`, and `dismissible` inputs; emits `dismissed`.                                                                                                                                                        |
| `ui-spinner`, `ui-skeleton`, `ui-progress` | Accessible loading indicator, decorative skeleton placeholder, and labeled determinate progress bar.                                                                                                                                                                                 |
| `ui-empty-state`                           | Neutral title/description with optional decorative projected icon and action slots.                                                                                                                                                                                                  |
| `ui-dialog`                                | Native modal foundation with required unique `id` and `title`, `open` input and `openChange` output. Project body content and optional `[uiDialogActions]`.                                                                                                                          |
| `uiTooltip`                                | Lightweight directive exposing native tooltip text and accessible description; no floating overlay dependency.                                                                                                                                                                       |
| `ui-navigation-item`                       | Router-linked navigation item with required `label` and absolute `link`; supports exact matching and horizontal/vertical orientation.                                                                                                                                                |
| `ui-breadcrumb`                            | Ordered breadcrumb navigation from typed `items` (`label`, optional `link`).                                                                                                                                                                                                         |
| `ui-tabs`                                  | Accessible tablist with typed `tabs`, `activeId`, optional label, and `activeIdChange`; supports arrow/Home/End navigation. The feature owns the associated panel content.                                                                                                           |
| `ui-pagination`                            | Labeled previous/next/page controls; requires `currentPage` and `totalPages`, emits `pageChange`.                                                                                                                                                                                    |
| `ui-dropdown` / `ui-menu-item`             | Native disclosure menu; project its trigger with `[uiDropdownTrigger]` and actions with `[uiMenuItem]`. Keyboard arrows, Home/End, Escape, and selection dismissal are supported.                                                                                                    |
| `ui-mobile-nav-trigger`                    | Accessible responsive navigation trigger; requires `controlsId`, accepts `expanded`, emits `toggled`.                                                                                                                                                                                |
| `ui-theme-toggle`                          | Shared light/dark theme control backed by the application theme service.                                                                                                                                                                                                             |
| `ui-section-heading`                       | Reusable eyebrow, title, and description hierarchy for layout/feature screens.                                                                                                                                                                                                       |
| `ui-toast-viewport` / `ToastService`       | Global accessible notification viewport and `show`/`dismiss` service; toast content is presentation feedback, not business state.                                                                                                                                                    |

## Composition examples

```html
<ui-form-field controlId="email" label="Email" hint="Use your work address.">
  <input id="email" uiInput type="email" aria-describedby="email-message" />
</ui-form-field>

<ui-button variant="primary" size="medium">Save changes</ui-button>

<ui-dialog
  id="confirm-delete"
  title="Confirm removal"
  [open]="dialogOpen()"
  (openChange)="dialogOpen.set($event)"
>
  <p>Dialog content is supplied by the consuming feature.</p>
  <div uiDialogActions>
    <ui-button variant="ghost" (click)="dialogOpen.set(false)">Cancel</ui-button>
  </div>
</ui-dialog>
```

## Responsibility boundaries

- A component owns visual states and small interaction behavior required for its primitive. It does not own feature data, route policy, persistence, API calls, analytics, or business decisions.
- Keep form controls native where possible; use Angular reactive forms at the feature boundary. Do not make a text field component for every native input type when a directive and field wrapper suffice.
- Icon buttons receive caller-owned SVG/content. Do not add emoji icons or a full icon dependency for this foundation.
- Keep a shared component generic. Feature-specific combinations belong in a feature or layout component.
- Name icon-only controls, expose errors in text, preserve focus, and avoid using color as the only state cue.
- Use the native dialog for modal behavior. Do not implement custom focus traps or nested overlays without a requirement that native dialog cannot satisfy.
- Add tests for changed states and keyboard interactions; avoid snapshot-only tests.
