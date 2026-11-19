import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

export type DataTableCellValue = string | number | boolean | null | undefined;
export type DataTableRowKey = string | number;
export type DataTableSortDirection = 'ascending' | 'descending';

export interface DataTableColumn<T extends object> {
  readonly key: string;
  readonly label: string;
  readonly value: (row: T) => DataTableCellValue;
  readonly sortable?: boolean;
}

export interface DataTableAction {
  readonly id: string;
  readonly label: string;
  readonly variant?: 'default' | 'danger';
}

export interface DataTableSort {
  readonly key: string;
  readonly direction: DataTableSortDirection;
}

@Component({
  selector: 'ui-data-table',
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<T extends object> {
  readonly caption = input.required<string>();
  readonly columns = input.required<readonly DataTableColumn<T>[]>();
  readonly rows = input.required<readonly T[]>();
  readonly rowKey = input.required<(row: T) => DataTableRowKey>();
  readonly loading = input(false);
  readonly loadingLabel = input('Loading rows');
  readonly emptyMessage = input('No results found.');
  readonly selectionEnabled = input(false);
  readonly selectedKeys = input<readonly DataTableRowKey[]>([]);
  readonly actions = input<readonly DataTableAction[]>([]);

  readonly selectedKeysChange = output<readonly DataTableRowKey[]>();
  readonly sortChange = output<DataTableSort>();
  readonly actionSelected = output<{ actionId: string; row: T }>();

  private readonly sortState = signal<DataTableSort | null>(null);

  protected readonly sortedRows = computed(() => {
    const sort = this.sortState();
    if (!sort) {
      return this.rows();
    }

    const column = this.columns().find((candidate) => candidate.key === sort.key);
    if (!column) {
      return this.rows();
    }

    return [...this.rows()].sort((left, right) => {
      const leftValue = column.value(left);
      const rightValue = column.value(right);
      const comparison =
        typeof leftValue === 'number' && typeof rightValue === 'number'
          ? leftValue - rightValue
          : String(leftValue ?? '').localeCompare(String(rightValue ?? ''), undefined, {
              numeric: true,
              sensitivity: 'base',
            });

      return sort.direction === 'ascending' ? comparison : -comparison;
    });
  });

  protected readonly allRowsSelected = computed(() => {
    const rows = this.rows();
    return rows.length > 0 && rows.every((row) => this.selectedKeys().includes(this.keyFor(row)));
  });

  protected readonly someRowsSelected = computed(() =>
    this.rows().some((row) => this.selectedKeys().includes(this.keyFor(row))),
  );

  protected keyFor(row: T): DataTableRowKey {
    return this.rowKey()(row);
  }

  protected displayValue(row: T, column: DataTableColumn<T>): string {
    const value = column.value(row);
    return value === null || value === undefined ? '—' : String(value);
  }

  protected ariaSort(key: string): DataTableSortDirection | null {
    return this.sortState()?.key === key ? (this.sortState()?.direction ?? null) : null;
  }

  protected toggleSort(key: string): void {
    const current = this.sortState();
    const direction =
      current?.key === key && current.direction === 'ascending' ? 'descending' : 'ascending';
    const nextSort = { key, direction } satisfies DataTableSort;
    this.sortState.set(nextSort);
    this.sortChange.emit(nextSort);
  }

  protected columnSpan(): number {
    return (
      this.columns().length + Number(this.selectionEnabled()) + Number(this.actions().length > 0)
    );
  }

  protected isSelected(row: T): boolean {
    return this.selectedKeys().includes(this.keyFor(row));
  }

  protected toggleRow(row: T): void {
    const selected = new Set(this.selectedKeys());
    const key = this.keyFor(row);
    if (selected.has(key)) {
      selected.delete(key);
    } else {
      selected.add(key);
    }
    this.selectedKeysChange.emit([...selected]);
  }

  protected toggleAllRows(): void {
    const selected = new Set(this.selectedKeys());
    const visibleKeys = this.rows().map((row) => this.keyFor(row));
    if (this.allRowsSelected()) {
      visibleKeys.forEach((key) => selected.delete(key));
    } else {
      visibleKeys.forEach((key) => selected.add(key));
    }
    this.selectedKeysChange.emit([...selected]);
  }

  protected selectAction(actionId: string, row: T): void {
    this.actionSelected.emit({ actionId, row });
  }
}
