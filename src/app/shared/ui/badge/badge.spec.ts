import { TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge';

describe('BadgeComponent', () => {
  it('applies semantic variant and size classes', async () => {
    await TestBed.configureTestingModule({ imports: [BadgeComponent] }).compileComponents();
    const fixture = TestBed.createComponent(BadgeComponent);
    fixture.componentRef.setInput('variant', 'danger');
    fixture.componentRef.setInput('size', 'small');
    fixture.detectChanges();

    const badge: HTMLElement = fixture.nativeElement.querySelector('.badge');
    expect(badge.classList).toContain('badge--danger');
    expect(badge.classList).toContain('badge--small');
  });
});
