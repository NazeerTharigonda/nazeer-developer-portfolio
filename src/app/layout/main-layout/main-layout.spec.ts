import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { MainLayoutComponent } from './main-layout';

describe('MainLayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent],
      providers: [provideRouter([{ path: 'contact', children: [] }])],
    }).compileComponents();
  });

  it('opens the mobile navigation and supports Escape from its trigger and links', () => {
    const fixture = TestBed.createComponent(MainLayoutComponent);
    fixture.detectChanges();

    const trigger: HTMLButtonElement = fixture.nativeElement.querySelector(
      '#public-mobile-navigation-trigger',
    );
    trigger.click();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#public-mobile-navigation')).toBeNull();

    trigger.click();
    fixture.detectChanges();
    const linkNavigation: HTMLElement = fixture.nativeElement.querySelector(
      '#public-mobile-navigation',
    );
    linkNavigation.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#public-mobile-navigation')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('closes the mobile navigation after route changes', async () => {
    const fixture = TestBed.createComponent(MainLayoutComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('#public-mobile-navigation-trigger').click();
    fixture.detectChanges();

    await TestBed.inject(Router).navigateByUrl('/contact');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#public-mobile-navigation')).toBeNull();
    const host = fixture.nativeElement as HTMLElement;
    const navLinks = host.querySelectorAll<HTMLAnchorElement>('ui-navigation-item a');
    const activeContactLink = Array.from(navLinks).find(
      (link) => link.getAttribute('href') === '/contact',
    );
    expect(activeContactLink?.classList.contains('is-active')).toBe(true);
  });

  it('scrolls to the top with reduced-motion-aware behavior', () => {
    const fixture = TestBed.createComponent(MainLayoutComponent);
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.footer-meta ui-button button').click();

    expect(scrollSpy).toHaveBeenCalledWith(
      expect.objectContaining({ top: 0, behavior: expect.any(String) }),
    );
    scrollSpy.mockRestore();
  });
});
