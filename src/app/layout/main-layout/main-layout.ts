import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MobileNavTriggerComponent } from '../../shared/ui/mobile-nav-trigger/mobile-nav-trigger';
import { NavigationItemComponent } from '../../shared/ui/navigation-item/navigation-item';
import { ThemeToggleComponent } from '../../shared/ui/theme-toggle/theme-toggle';

const PUBLIC_NAVIGATION: readonly { label: string; link: string; exact?: boolean }[] = [
  { label: 'Home', link: '/', exact: true },
  { label: 'About', link: '/about' },
  { label: 'Experience', link: '/experience' },
  { label: 'Skills', link: '/skills' },
  { label: 'Projects', link: '/projects' },
  { label: 'Certifications', link: '/certifications' },
  { label: 'Education', link: '/education' },
  { label: 'Blog', link: '/blog' },
  { label: 'Contact', link: '/contact' },
  { label: 'GitHub stats', link: '/github-stats' },
  { label: 'LeetCode stats', link: '/leetcode-stats' },
];

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterLink,
    RouterOutlet,
    NavigationItemComponent,
    ThemeToggleComponent,
    MobileNavTriggerComponent,
  ],
  template: `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <header class="public-header">
      <div class="public-header__inner">
        <a class="brand" routerLink="/" aria-label="Nazeer — home">
          <span class="brand__mark" aria-hidden="true">N</span>
          <span>Nazeer</span>
        </a>
        <nav class="desktop-navigation" aria-label="Main navigation">
          @for (item of navigation; track item.link) {
            <ui-navigation-item
              [label]="item.label"
              [link]="item.link"
              [exact]="item.exact ?? false"
              orientation="horizontal"
            />
          }
        </nav>
        <div class="header-actions">
          <ui-theme-toggle />
          <ui-mobile-nav-trigger
            class="mobile-navigation-trigger"
            controlsId="public-mobile-navigation"
            [expanded]="mobileNavigationOpen()"
            (toggled)="toggleMobileNavigation()"
          />
        </div>
      </div>
      @if (mobileNavigationOpen()) {
        <nav
          id="public-mobile-navigation"
          class="mobile-navigation"
          aria-label="Mobile navigation"
        >
          @for (item of navigation; track item.link) {
            <ui-navigation-item
              [label]="item.label"
              [link]="item.link"
              [exact]="item.exact ?? false"
            />
          }
        </nav>
      }
    </header>
    <main id="main-content" class="public-main">
      <router-outlet />
    </main>
    <footer class="public-footer">
      <div class="public-footer__inner">
        <a class="brand brand--footer" routerLink="/">Nazeer</a>
        <p>Designed with care.</p>
      </div>
    </footer>
  `,
  styles: `
    :host {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
    }

    .skip-link {
      position: fixed;
      z-index: 100;
      top: var(--space-2);
      left: var(--space-2);
      padding: var(--space-3) var(--space-4);
      color: var(--color-text-on-accent);
      background: var(--color-brand-primary);
      border-radius: var(--radius-md);
      transform: translateY(-160%);
    }

    .skip-link:focus {
      transform: translateY(0);
    }

    .public-header {
      position: sticky;
      z-index: 50;
      top: 0;
      background: color-mix(in srgb, var(--color-background) 92%, transparent);
      border-bottom: 1px solid var(--color-border);
      backdrop-filter: blur(16px);
    }

    .public-header__inner {
      display: flex;
      width: min(100% - var(--page-gutter) * 2, var(--container-wide));
      min-height: var(--header-height);
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
      margin-inline: auto;
    }

    .brand {
      display: inline-flex;
      flex: 0 0 auto;
      align-items: center;
      gap: var(--space-2);
      color: var(--color-text-primary);
      font-family: var(--font-family-heading);
      font-weight: var(--font-weight-semibold);
      text-decoration: none;
    }

    .brand__mark {
      display: grid;
      width: 2rem;
      height: 2rem;
      place-items: center;
      color: var(--color-text-on-accent);
      background: var(--color-brand-primary);
      border-radius: var(--radius-sm);
    }

    .desktop-navigation {
      display: flex;
      min-width: 0;
      align-items: center;
      justify-content: center;
      gap: var(--space-1);
      overflow-x: auto;
      scrollbar-width: none;
    }

    .desktop-navigation::-webkit-scrollbar {
      display: none;
    }

    .header-actions {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      gap: var(--space-2);
    }

    .mobile-navigation-trigger {
      display: none;
    }

    .public-main {
      flex: 1;
    }

    .public-footer {
      border-top: 1px solid var(--color-border);
    }

    .public-footer__inner {
      display: flex;
      width: min(100% - var(--page-gutter) * 2, var(--container-wide));
      min-height: 5rem;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
      margin-inline: auto;
    }

    .public-footer p {
      font-size: var(--font-size-body-small);
    }

    @media (max-width: 1023px) {
      .desktop-navigation {
        display: none;
      }

      .mobile-navigation-trigger {
        display: block;
      }

      .mobile-navigation {
        display: grid;
        max-height: min(70dvh, 36rem);
        gap: var(--space-1);
        padding: var(--space-3) var(--page-gutter) var(--space-5);
        overflow: auto;
        border-top: 1px solid var(--color-border);
        animation: motion-fade-down var(--duration-fast) var(--ease-enter) both;
      }
    }

    @media (max-width: 480px) {
      .brand--footer {
        display: none;
      }

      .public-footer__inner {
        justify-content: center;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .skip-link,
      .mobile-navigation {
        animation: none;
        transition: none;
      }

      .public-header {
        backdrop-filter: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly navigation = PUBLIC_NAVIGATION;
  protected readonly mobileNavigationOpen = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.mobileNavigationOpen.set(false));
  }

  protected toggleMobileNavigation(): void {
    this.mobileNavigationOpen.update((open) => !open);
  }
}
