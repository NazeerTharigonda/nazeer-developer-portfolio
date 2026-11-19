import { TestBed } from '@angular/core/testing';
import { DataTableComponent, type DataTableAction, type DataTableColumn } from './data-table';

interface TableRow {
  readonly id: string;
  readonly name: string;
  readonly score: number;
}

describe('DataTableComponent', () => {
  const rows: readonly TableRow[] = [
    { id: 'b', name: 'Beta', score: 2 },
    { id: 'a', name: 'Alpha', score: 1 },
  ];
  const columns: readonly DataTableColumn<TableRow>[] = [
    { key: 'name', label: 'Name', value: (row) => row.name, sortable: true },
    { key: 'score', label: 'Score', value: (row) => row.score },
  ];
  const actions: readonly DataTableAction[] = [{ id: 'inspect', label: 'Inspect' }];

  function createFixture() {
    const fixture = TestBed.createComponent(DataTableComponent<TableRow>);
    fixture.componentRef.setInput('caption', 'Records');
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('rows', rows);
    fixture.componentRef.setInput('rowKey', (row: TableRow) => row.id);
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DataTableComponent] }).compileComponents();
  });

  it('sorts rows and emits the sort state', () => {
    const fixture = createFixture();
    let sortKey = '';
    fixture.componentInstance.sortChange.subscribe((sort) => (sortKey = sort.key));

    fixture.nativeElement.querySelector('[aria-label="Sort by Name"]').click();
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const cells = host.querySelectorAll<HTMLTableCellElement>('tbody tr td:first-child');
    const names = Array.from(cells).map((cell) => cell.textContent?.trim() ?? '');
    expect(sortKey).toBe('name');
    expect(names).toEqual(['Alpha', 'Beta']);
  });

  it('emits selected row keys', () => {
    const fixture = createFixture();
    fixture.componentRef.setInput('selectionEnabled', true);
    fixture.detectChanges();

    let selectedKeys: readonly (string | number)[] = [];
    fixture.componentInstance.selectedKeysChange.subscribe((keys) => (selectedKeys = keys));
    fixture.nativeElement.querySelectorAll('tbody input[type="checkbox"]')[0].click();

    expect(selectedKeys).toEqual(['b']);
  });

  it('renders loading and empty feedback without fabricating rows', () => {
    const fixture = createFixture();
    fixture.componentRef.setInput('rows', []);
    fixture.componentRef.setInput('emptyMessage', 'Nothing here yet.');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Nothing here yet.');

    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Loading rows');
  });

  it('emits a configured row action with its row data', () => {
    const fixture = createFixture();
    fixture.componentRef.setInput('actions', actions);
    fixture.detectChanges();

    let selectedRowId = '';
    fixture.componentInstance.actionSelected.subscribe(({ row }) => (selectedRowId = row.id));
    fixture.nativeElement.querySelector('[aria-label="Inspect for row b"]').click();

    expect(selectedRowId).toBe('b');
  });
});
