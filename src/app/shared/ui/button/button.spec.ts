import { TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button';

describe('ButtonComponent', () => {
  it('applies the selected visual variant and size', async () => {
    await TestBed.configureTestingModule({ imports: [ButtonComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('variant', 'outline');
    fixture.componentRef.setInput('size', 'large');
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.classList).toContain('button--outline');
    expect(button.classList).toContain('button--large');
  });

  it('disables interaction and exposes busy state while loading', async () => {
    await TestBed.configureTestingModule({ imports: [ButtonComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(fixture.nativeElement.textContent).toContain('Loading');
  });
});
