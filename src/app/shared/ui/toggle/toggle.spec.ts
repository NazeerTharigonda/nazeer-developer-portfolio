import { TestBed } from '@angular/core/testing';
import { ToggleComponent } from './toggle';

describe('ToggleComponent', () => {
  it('exposes switch semantics and reports value changes', async () => {
    await TestBed.configureTestingModule({ imports: [ToggleComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ToggleComponent);
    fixture.componentRef.setInput('label', 'Enable setting');
    let value = false;
    fixture.componentInstance.registerOnChange((nextValue) => (value = nextValue));
    fixture.detectChanges();

    const toggle: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(toggle.getAttribute('role')).toBe('switch');
    expect(toggle.getAttribute('aria-label')).toBe('Enable setting');

    toggle.click();
    fixture.detectChanges();

    expect(value).toBe(true);
    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });

  it('honors disabled state', async () => {
    await TestBed.configureTestingModule({ imports: [ToggleComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ToggleComponent);
    fixture.componentRef.setInput('label', 'Disabled setting');
    fixture.componentInstance.setDisabledState(true);
    fixture.detectChanges();

    const toggle: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(toggle.disabled).toBe(true);
  });
});
