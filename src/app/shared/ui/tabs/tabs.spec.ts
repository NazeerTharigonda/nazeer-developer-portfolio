import { TestBed } from '@angular/core/testing';
import { TabsComponent, type TabItem } from './tabs';

describe('TabsComponent', () => {
  it('selects the next enabled tab with the arrow key', async () => {
    await TestBed.configureTestingModule({ imports: [TabsComponent] }).compileComponents();
    const fixture = TestBed.createComponent(TabsComponent);
    const tabs: readonly TabItem[] = [
      { id: 'overview', label: 'Overview' },
      { id: 'details', label: 'Details' },
    ];
    fixture.componentRef.setInput('tabs', tabs);
    fixture.componentRef.setInput('activeId', 'overview');
    fixture.detectChanges();

    let selectedId = '';
    fixture.componentInstance.activeIdChange.subscribe((id) => (selectedId = id));
    const firstTab: HTMLButtonElement = fixture.nativeElement.querySelector('[role="tab"]');
    firstTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(selectedId).toBe('details');
    expect(document.activeElement?.id).toBe('details-tab');
  });

  it('does not select a disabled tab', async () => {
    await TestBed.configureTestingModule({ imports: [TabsComponent] }).compileComponents();
    const fixture = TestBed.createComponent(TabsComponent);
    fixture.componentRef.setInput('tabs', [
      { id: 'overview', label: 'Overview' },
      { id: 'locked', label: 'Locked', disabled: true },
    ]);
    fixture.componentRef.setInput('activeId', 'overview');
    fixture.detectChanges();

    let selected = false;
    fixture.componentInstance.activeIdChange.subscribe(() => (selected = true));
    const firstTab: HTMLButtonElement = fixture.nativeElement.querySelector('[role="tab"]');
    firstTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(selected).toBe(false);
  });
});
