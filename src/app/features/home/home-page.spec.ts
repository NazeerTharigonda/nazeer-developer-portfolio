import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { HomePageComponent } from './home-page';

@Component({
  standalone: true,
  template: '<h1>Contact route</h1>',
})
class ContactRouteComponent {}

describe('HomePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [provideRouter([{ path: 'contact', component: ContactRouteComponent }])],
    }).compileComponents();
  });

  it('renders the neutral hero and contact navigation without portfolio records', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1')?.textContent.trim()).toBe(
      'Developer portfolio',
    );
    expect(fixture.nativeElement.querySelector('ui-card')).toBeNull();
    expect(fixture.nativeElement.querySelector('ui-badge')).toBeNull();
    expect(fixture.nativeElement.querySelector('app-about-preview')).toBeNull();
    expect(fixture.nativeElement.querySelector('ui-image')).toBeNull();
    expect(
      fixture.nativeElement
        .querySelector('a[href="/projects"]')
        .classList.contains('navigation-item--primary'),
    ).toBe(true);
    expect(fixture.nativeElement.querySelector('a[href="/contact"]')).not.toBeNull();
  });

  it('navigates through the contact CTA', async () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();

    const contactLink: HTMLAnchorElement = fixture.nativeElement.querySelector(
      'app-contact-cta a[href="/contact"]',
    );
    contactLink.click();
    await fixture.whenStable();

    expect(TestBed.inject(Router).url).toBe('/contact');
  });
});
