import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MobileNavTriggerComponent } from '../../shared/ui/mobile-nav-trigger/mobile-nav-trigger';
import { NavigationItemComponent } from '../../shared/ui/navigation-item/navigation-item';
import { BreadcrumbComponent } from '../../shared/ui/breadcrumb/breadcrumb';
import { ThemeToggleComponent } from '../../shared/ui/theme-toggle/theme-toggle';

const ADMIN_NAVIGATION: readonly { label: string; link: string; exact?: boolean }[] = [
  { label: 'Dashboard', link: '/admin/dashboard', exact: true },
  { label: 'Profile', link: '/admin/profile' },
  { label: 'Projects', link: '/admin/projects' },
  { label: 'Certifications', link: '/admin/certifications' },
  { label: 'Blog', link: '/admin/blog' },
];

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterLink,
    RouterOutlet,
    BreadcrumbComponent,
    NavigationItemComponent,
    ThemeToggleComponent,
    MobileNavTriggerComponent,
  ],
  template: `
    <a class="skip-link" href="#admin-content">Skip to content</a>
    <div class="admin-shell">
      <aside
        id="admin-navigation"
        class="admin-sidebar"
        [class.admin-sidebar--open]="mobileNavigationOpen()"
      >
        <a class="admin-brand" routerLink="/admin/dashboard">Portfolio <span>Admin</span></a>
        <nav aria-label="Administration">
          @for (item of navigation; track item.link) {
            <ui-navigation-item
              [label]="item.label"
              [link]="item.link"
              [exact]="item.exact ?? false"
            />
          }
        </nav>
      </aside>
      @if (mobileNavigationOpen()) {
        <button
          class="admin-backdrop"
          type="button"
          aria-label="Close administration navigation"
          (click)="mobileNavigationOpen.set(false)"
        ></button>
      }
      <div class="admin-workspace">
        <header class="admin-header">
          <ui-mobile-nav-trigger
            class="admin-mobile-trigger"
            controlsId="admin-navigation"
            [expanded]="mobileNavigationOpen()"
            (toggled)="toggleMobileNavigation()"
          />
          <p>Administration</p>
          <ui-theme-toggle />
        </header>
        <main id="admin-content" class="admin-content">
          <div class="admin-content__heading">
            <ui-breadcrumb [items]="breadcrumbs" />
            <p class="admin-eyebrow">Workspace</p>
            <h1>Portfolio management</h1>
          </div>
          <div class="admin-content__body">
            <router-outlet />
          </div>
        </main>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
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

    .admin-shell {
      display: grid;
      min-height: 100vh;
      grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
    }

    .admin-sidebar {
      position: sticky;
      top: 0;
      display: flex;
      height: 100vh;
      flex-direction: column;
      gap: var(--space-8);
      padding: var(--space-6) var(--space-4);
      background: var(--color-background-secondary);
      border-right: 1px solid var(--color-border);
    }

    .admin-brand {
      display: flex;
      align-items: baseline;
      gap: var(--space-2);
      padding-inline: var(--space-3);
      color: var(--color-text-primary);
      font-weight: var(--font-weight-semibold);
      text-decoration: none;
    }

    .admin-brand span {
      color: var(--color-text-muted);
      font-size: var(--font-size-caption);
      font-weight: var(--font-weight-regular);
    }

    .admin-sidebar nav {
      display: grid;
      gap: var(--space-1);
    }

    .admin-workspace {
      min-width: 0;
    }

    .admin-header {
      position: sticky;
      z-index: 30;
      top: 0;
      display: flex;
      min-height: var(--header-height);
      align-items: center;
      justify-content: flex-end;
      gap: var(--space-4);
      padding-inline: var(--page-gutter);
      background: color-mix(in srgb, var(--color-background) 92%, transparent);
      border-bottom: 1px solid var(--color-border);
      backdrop-filter: blur(16px);
    }

    .admin-header p {
      flex: 1;
      color: var(--color-text-muted);
      font-size: var(--font-size-body-small);
    }

    .admin-mobile-trigger {
      display: none;
    }

    .admin-content {
      width: min(100%, var(--container-wide));
      padding: clamp(var(--space-5), 4vw, var(--space-10));
      margin-inline: auto;
    }

    .admin-content__heading {
      display: grid;
      gap: var(--space-2);
      padding-bottom: var(--space-6);
      border-bottom: 1px solid var(--color-border);
    }

    .admin-content__heading h1 {
      font-size: var(--font-size-h3);
    }

    .admin-eyebrow {
      color: var(--color-brand-primary);
      font-size: var(--font-size-label);
      font-weight: var(--font-weight-medium);
    }

    .admin-content__body {
      padding-top: var(--space-6);
    }

    @media (max-width: 767px) {
      .admin-shell {
        grid-template-columns: minmax(0, 1fr);
      }

      .admin-sidebar {
        position: fixed;
        z-index: 40;
        inset: var(--header-height) auto 0 0;
        width: min(var(--sidebar-width), 86vw);
        height: auto;
        box-shadow: var(--shadow-elevated);
        transform: translateX(-105%);
        transition:
          transform var(--duration-moderate) var(--ease-standard),
          visibility 0s linear var(--duration-moderate);
        visibility: hidden;
      }

      .admin-sidebar--open {
        transform: translateX(0);
        visibility: visible;
        transition:
          transform var(--duration-moderate) var(--ease-standard),
          visibility 0s;
      }

      .admin-backdrop {
        position: fixed;
        z-index: 35;
        inset: var(--header-height) 0 0;
        background: var(--color-overlay);
        border: 0;
      }

      .admin-mobile-trigger {
        display: block;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .skip-link,
      .admin-sidebar {
        transition: none;
      }

      .admin-header {
        backdrop-filter: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly navigation = ADMIN_NAVIGATION;
  protected readonly breadcrumbs = [{ label: 'Administration' }] as const;
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
