# Shared UI Architecture

## Purpose and boundaries

`src/app/shared/ui/` is the reusable presentation library for public and admin
features. It provides consistent visual primitives, native interactions, and
typed component APIs. It does not own application routes, business validation,
data fetching, authorization, persistence, or feature-specific decisions.

The existing standalone Angular architecture and Obsidian Luxe design tokens
remain the source of truth. Components consume the same semantic CSS variables
for both themes; no component should define a parallel palette or spacing scale.

## Organization

Each component has its own folder and is exposed through
`src/app/shared/ui/index.ts`.

```text
src/app/shared/ui/
├── alert/
├── avatar/
├── badge/
├── button/
├── card/
├── data-table/
├── dialog/
├── divider/
├── dropdown/
├── empty-state/
├── filter-chip/
├── form-controls/
├── form-field/
├── segmented-control/
├── tabs/
└── ...
```

The public barrel groups exports by responsibility while existing component
folders and direct import paths stay stable. New, interactive components use:

```text
component-name/
├── component-name.ts
├── component-name.html
├── component-name.scss
└── component-name.spec.ts
```

Small existing primitives may keep inline templates and styles when extracting
them would only create file churn. External templates/styles are preferred for
large or complex components such as the showcase and data table.

## Component conventions

- Use standalone Angular components/directives and explicit imports.
- Use strict types, signal-based `input()` / `output()` APIs, and
  `ChangeDetectionStrategy.OnPush`.
- Use native elements for buttons, links, inputs, checkboxes, radios, tables,
  and dialogs whenever they provide the required behavior. Use `ui-image` for
  responsive content imagery with explicit alternative text.
- Implement `ControlValueAccessor` for a custom control only when it needs to
  participate as a form control. The shared toggle is the current example.
- Keep APIs controlled and composable. Components emit events; consuming
  features own the resulting application state.
- Keep styles scoped to the component and use semantic design tokens for color,
  typography, spacing, shape, elevation, focus, and motion.
- Add focused tests for meaningful state, keyboard behavior, form integration,
  and emitted events. Avoid tests that only restate trivial accessors.

## Reuse and composition

- Use `ui-card` variants for generic surfaces. Project content into cards rather
  than creating project-, blog-, or certification-specific shared components.
- Use native input types with `uiInput` and `ui-form-field` rather than separate
  email/password/number wrappers.
- Use `ui-badge` variants for status rather than duplicating status components.
- Use `ui-image` for portfolio media rather than repeating crop, loading, and
  responsive-image styles in feature components.
- Use `ui-dialog` for modal presentation and compose confirmation content in the
  consuming feature; do not build a second overlay/focus-management system.
- Use `ui-data-table` for generic column presentation, local sorting, optional
  selection, and row-action events. Data access, server-side paging, and action
  policy remain outside the table.
- Compose `ui-pagination`, `ui-filter-chip`, and `ui-segmented-control` at the
  feature boundary; these controls do not fetch or filter application data.
- Prefer global layout utilities (`container`, `stack`, `cluster`, `grid`,
  `surface`) over wrappers that only reproduce a single CSS property.

## Design-system integration

`src/styles/themes/_index.scss` defines the semantic design tokens.
`src/styles/utilities/_index.scss` contains small reusable global layout and
text utilities. Component styles may define layout and interaction states, but
must use those shared tokens rather than raw brand colors, independent spacing
scales, or one-off radii.

The development-only routes `/_design-system` and `/_design-system/admin`
demonstrate the public and admin shells. They are intentionally absent from
production route configuration and public navigation.

## Adding a component

1. Confirm that existing native HTML, a token, a utility, or a component
   composition does not already solve the need.
2. Choose a generic responsibility and a typed, minimal API.
3. Add the component under `src/app/shared/ui/<component>/`; use external HTML
   and SCSS for substantial templates/styles.
4. Consume semantic tokens and follow the accessibility guidance.
5. Add a focused unit test, export the component/types from the public barrel,
   and demonstrate it in the development showcase when useful.
6. Document its API and any intentional limitations in the inventory and usage
   guide.
7. Keep feature routes empty until actual feature work is requested.

## Deliberate deferrals

Advanced pickers, OTP, drag-and-drop upload, autocomplete/command menus,
notification centers, media galleries, and chart implementations need
interaction or data requirements that are not present yet. Use native controls
where appropriate and add no charting or overlay dependency until a real
consumer justifies it.
