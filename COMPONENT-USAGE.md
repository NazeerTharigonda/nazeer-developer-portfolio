# Shared UI Usage Guide

Import standalone components directly where used, or use the grouped public
exports from `src/app/shared/ui/index.ts`. Keep data, form state, and
feature-specific decisions in the consuming feature.

## Actions and surfaces

```html
<ui-button variant="success" [loading]="saving()" [fullWidth]="true"> Save changes </ui-button>

<ui-button variant="secondary">
  <svg uiButtonLeading aria-hidden="true" viewBox="0 0 16 16">
    <!-- Supply a small decorative icon from the consuming feature. -->
  </svg>
  Continue
</ui-button>

<ui-card variant="elevated">
  <h2>Feature-owned heading</h2>
  <p>Feature-owned content.</p>
</ui-card>
```

Use the native `<a>` element for navigation and `ui-button` for actions. Do not
make a card interactive if it contains nested buttons or links.

For feature-owned images, use `ui-image` with informative alternative text and
select an aspect ratio only when the design requires a fixed crop:

```html
<ui-image
  src="/assets/images/project-cover.webp"
  alt="Interface preview for the project"
  aspectRatio="landscape"
  loading="lazy"
/>
```

Use an empty `alt` only when the image is purely decorative. Do not add a sample
image to a portfolio section when no real asset has been supplied.

## Reactive forms

```html
<form [formGroup]="form">
  <ui-form-field
    controlId="email"
    label="Email"
    [required]="true"
    hint="Use an address you can access."
    [error]="emailError()"
  >
    <input
      id="email"
      uiInput
      type="email"
      formControlName="email"
      required
      aria-describedby="email-message"
      [attr.aria-invalid]="emailError() ? 'true' : null"
    />
  </ui-form-field>
</form>
```

The consuming form owns validators and error text. Match `controlId` to the
native control `id`, use native attributes, and point `aria-describedby` to the
field message when one is present.

## Filtering and navigation

```html
<ui-segmented-control
  label="Project status"
  [options]="statusOptions"
  [selectedId]="activeStatus()"
  (selectedIdChange)="activeStatus.set($event)"
/>

<ui-filter-chip
  label="Featured"
  [selected]="featuredOnly()"
  (selectedChange)="featuredOnly.set($event)"
/>

<ui-pagination
  [currentPage]="currentPage()"
  [totalPages]="totalPages()"
  (pageChange)="currentPage.set($event)"
/>
```

The controls emit user intent; the feature decides how those values affect its
data.

## Data table

```ts
interface RecordRow {
  readonly id: string;
  readonly name: string;
  readonly status: string;
}

readonly columns: readonly DataTableColumn<RecordRow>[] = [
  { key: 'name', label: 'Name', value: (row) => row.name, sortable: true },
  { key: 'status', label: 'Status', value: (row) => row.status },
];

readonly rowKey = (row: RecordRow) => row.id;
readonly actions: readonly DataTableAction[] = [{ id: 'inspect', label: 'Inspect' }];
```

```html
<ui-data-table
  caption="Records"
  [columns]="columns"
  [rows]="rows()"
  [rowKey]="rowKey"
  [actions]="actions"
  [selectionEnabled]="true"
  [selectedKeys]="selectedKeys()"
  (selectedKeysChange)="selectedKeys.set($event)"
  (sortChange)="sort.set($event)"
  (actionSelected)="handleRowAction($event)"
/>
```

Column `value` callbacks return primitive text/number/boolean display values.
Sorting is local to the rows supplied to the table. Use output events and the
separate `ui-pagination` when the feature owns server-side paging.

## Dialogs and feedback

```html
<ui-dialog
  id="edit-record"
  title="Edit record"
  [open]="dialogOpen()"
  (openChange)="dialogOpen.set($event)"
>
  <p>Dialog content is supplied by the consuming feature.</p>
  <div uiDialogActions>
    <ui-button variant="ghost" (click)="dialogOpen.set(false)">Cancel</ui-button>
    <ui-button type="submit">Save</ui-button>
  </div>
</ui-dialog>
```

Give each dialog a unique `id`. The consuming feature owns confirmation
semantics, submit behavior, and application state.

## Import convention

Prefer the public barrel for shared API discovery:

```ts
import { ButtonComponent, DataTableComponent } from '../shared/ui';
```

Direct component imports remain valid and are useful when consistent with
nearby code. Do not create feature-local copies of shared components.
