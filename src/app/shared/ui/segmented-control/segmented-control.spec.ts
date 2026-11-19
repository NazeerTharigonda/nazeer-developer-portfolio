import { TestBed } from '@angular/core/testing';
import { SegmentedControlComponent, type SegmentOption } from './segmented-control';

describe('SegmentedControlComponent', () => {
  const options: readonly SegmentOption[] = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'archived', label: 'Archived', disabled: true },
  ];

  it('emits selection changes and marks the active radio', async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentedControlComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(SegmentedControlComponent);
    fixture.componentRef.setInput('label', 'Project status');
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('selectedId', 'all');
    fixture.detectChanges();

    let selectedId = '';
    fixture.componentInstance.selectedIdChange.subscribe((value) => (selectedId = value));
    const activeOption: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[1];
    activeOption.click();
    fixture.componentRef.setInput('selectedId', 'active');
    fixture.detectChanges();

    expect(selectedId).toBe('active');
    expect(fixture.nativeElement.querySelector('[aria-checked="true"]').textContent.trim()).toBe(
      'Active',
    );
  });

  it('moves selection with arrow keys and skips disabled options', async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentedControlComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(SegmentedControlComponent);
    fixture.componentRef.setInput('label', 'Project status');
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('selectedId', 'active');
    fixture.detectChanges();

    let selectedId = '';
    fixture.componentInstance.selectedIdChange.subscribe((value) => (selectedId = value));
    const activeOption: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[1];
    activeOption.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(selectedId).toBe('all');
  });
});
