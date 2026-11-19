import { TestBed } from '@angular/core/testing';
import { FilterChipComponent } from './filter-chip';

describe('FilterChipComponent', () => {
  it('emits the next pressed state from its native button', async () => {
    await TestBed.configureTestingModule({ imports: [FilterChipComponent] }).compileComponents();
    const fixture = TestBed.createComponent(FilterChipComponent);
    fixture.componentRef.setInput('label', 'Angular');
    fixture.detectChanges();

    let selected: boolean | undefined;
    fixture.componentInstance.selectedChange.subscribe((value) => (selected = value));
    fixture.nativeElement.querySelector('button').click();

    expect(selected).toBe(true);
  });
});
