# Shared UI Accessibility Guidelines

Shared UI targets WCAG 2.2 AA and supports keyboard, touch, assistive
technology, zoom, high contrast, and reduced-motion preferences. Accessibility
is part of each component API, not a feature-level afterthought.

## Semantics and names

- Use native buttons for actions and anchors for navigation. Do not add click
  handlers to generic containers.
- Give icon-only buttons and image/avatar representations accessible names.
- Give `ui-image` informative alternative text for content images; use an empty
  alternative only for decorative images, and never rely on a filename as alt
  text.
- Give tables a descriptive caption and column headers with `scope="col"`.
- Use `<fieldset>`/`<legend>` in consuming forms for related native controls.
- Do not use color alone for status, selection, errors, or required state.
- Supply visible labels; placeholders are not labels.

## Keyboard and focus

- Preserve the global `:focus-visible` indicator and do not remove outlines
  without providing an equivalent.
- Buttons, links, native form controls, and menu items remain keyboard
  operable.
- Tabs support arrows and Home/End. Segmented controls support arrows and
  Home/End with a roving tab stop. Dropdown menus support arrows, Home/End, and
  Escape.
- Keep modal behavior on native `<dialog>.showModal()`; use browser focus
  containment, Escape behavior, and focus restoration instead of a custom focus
  trap.
- Ensure data-table selection and row actions have labels that identify their
  row. The responsive table scroll region is keyboard reachable.
- Check focus order when composing multiple primitives and return focus to the
  invoking control when an interaction closes.

## Forms and validation

- Associate `ui-form-field.controlId` with the native input `id`.
- Use native `required`, `disabled`, `readonly`, `type`, and form attributes.
- Set `aria-invalid="true"` for invalid controls and connect hints/errors with
  `aria-describedby`.
- The consuming form owns validation rules and clear error messages. Do not
  encode business validation in shared controls.
- Custom controls that participate in Angular forms must implement
  `ControlValueAccessor`, report touched state, and honor disabled state.

## Status, loading, and motion

- Use text in addition to status color. Use appropriate roles for alerts,
  status, and progress.
- Expose loading state with native disabled/busy state and a screen-reader label;
  decorative skeletons remain hidden from assistive technology.
- Respect `prefers-reduced-motion` for nonessential animation and transitions.
- Keep touch targets at least 44 CSS pixels where practical; icon-only controls
  must retain a visible focus indicator.

## Contrast and themes

- Consume the same semantic tokens in dark and light themes.
- Aim for at least 4.5:1 contrast for normal text and 3:1 for large text and
  meaningful control boundaries.
- Recheck focus, muted text, badge/status text, button labels, and disabled
  states when changing a theme. Do not assume one palette's foreground works on
  another palette's surface.

## Verification

- Test keyboard paths and emitted states for components with interaction.
- Check the development showcase at 320, 390, 768, 1024, 1280, and 1440 CSS
  pixels; verify that content wraps or uses an intentional scroll region.
- Use browser accessibility inspection for complex templates and overlays.
- Run the repository's focused tests, lint, formatting check, and Angular
  development/production builds before merging.
