# Shared UI Component Inventory

This inventory describes the reusable library currently available to public and
admin features. Examples in the development showcase are local demonstrations;
they are not application feature implementations.

## Foundations and layout

| Component / utility                                      | Purpose                                                                                                  |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `ui-divider`                                             | Horizontal or vertical semantic separator.                                                               |
| `ui-avatar`                                              | Accessible image with initials fallback and size variants.                                               |
| `ui-image`                                               | Responsive image with explicit alternative text, aspect-ratio options, fit, and native loading priority. |
| `ui-card`                                                | Default, interactive, elevated, bordered, feature, and stat surfaces.                                    |
| `ui-section-heading`                                     | Eyebrow, title, and optional description hierarchy.                                                      |
| `.container`, `.content-container`, `.section-container` | Token-based page and section widths/spacing.                                                             |
| `.stack`, `.cluster`, `.grid`, `.surface`                | Small layout/surface utilities.                                                                          |

## Actions

| Component        | Purpose                                                                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ui-button`      | Native button with primary, secondary, outline, ghost, text, danger, success, and link variants; small/medium/large sizes; loading, disabled, icon slots, and full-width support. |
| `ui-icon-button` | Named icon-only native action with projected caller-owned icon content.                                                                                                           |

## Forms

| Component / directive   | Purpose                                                                  |
| ----------------------- | ------------------------------------------------------------------------ |
| `ui-form-field`         | Label association, required marker, and hint/error/success message slot. |
| `uiInput`               | Shared styling for native input, textarea, and select.                   |
| `uiCheckbox`, `uiRadio` | Shared styling for native checkbox and radio inputs.                     |
| `ui-toggle`             | Signal-driven switch implementing `ControlValueAccessor`.                |

Use native `type="email"`, `type="password"`, `type="number"`, `type="search"`,
`type="date"`, and `type="time"` with `uiInput` as needed. No independent
wrappers are required for each native input type.

## Selection and navigation

| Component                     | Purpose                                                                     |
| ----------------------------- | --------------------------------------------------------------------------- |
| `ui-filter-chip`              | Controlled pressed/unpressed filter button.                                 |
| `ui-segmented-control`        | Single-selection radio group with keyboard navigation.                      |
| `ui-dropdown`, `ui-menu-item` | Native disclosure menu with keyboard support.                               |
| `ui-tabs`                     | Tablist and selection output; the consuming feature owns the panel content. |
| `ui-pagination`               | Previous/next/page controls.                                                |
| `ui-navigation-item`          | Active-aware router link with default, primary, or secondary appearance.    |
| `ui-mobile-nav-trigger`       | Responsive menu trigger with expanded state and Escape support.             |
| `ui-breadcrumb`               | Ordered breadcrumb navigation.                                              |

## Data display

| Component       | Purpose                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `ui-data-table` | Typed columns/rows, local sorting, optional selection/actions, loading and empty states, and a keyboard-scrollable responsive region. |
| `ui-badge`      | Default, primary, secondary, success, warning, error/danger, information, and outline status treatments.                              |
| `ui-progress`   | Labeled determinate progress bar.                                                                                                     |

Use `ui-data-table` with `ui-pagination` when paging is needed. The table does
not perform API calls, server-side sorting, authorization, or feature actions.

## Feedback, overlays, and utilities

| Component / service                  | Purpose                                                    |
| ------------------------------------ | ---------------------------------------------------------- |
| `ui-alert`                           | Semantic information/success/warning/error messages.       |
| `ui-toast-viewport` / `ToastService` | Global transient feedback presentation.                    |
| `ui-empty-state`                     | Neutral empty content with optional icon and action slots. |
| `ui-spinner`, `ui-skeleton`          | Accessible loading indicator and decorative placeholder.   |
| `ui-dialog`                          | Native modal dialog foundation with controlled open state. |
| `uiTooltip`                          | Native title tooltip with accessible description.          |
| `ui-theme-toggle`                    | Theme preference control backed by `ThemeService`.         |

## Deferred until needed

The following inventory ideas are intentionally not implemented as placeholder
features:

- Date/time range pickers, OTP, multi-select, drag-and-drop upload, and file
  preview flows; use native controls until a consuming form requires more.
- Autocomplete/combobox, command palette, context menu, popover, lightbox, and
  notification center; these require richer interaction and focus contracts.
- Project/blog/certification/user/testimonial cards; compose `ui-card` with
  feature-owned content instead.
- Chart types and charting libraries; wait for real metric sources and accessible
  visualization requirements.
- Connection indicators, language selectors, and speculative utilities without
  current consumers.
