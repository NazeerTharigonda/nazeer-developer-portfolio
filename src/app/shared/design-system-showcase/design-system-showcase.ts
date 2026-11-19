import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AlertComponent } from '../ui/alert/alert';
import { BadgeComponent } from '../ui/badge/badge';
import { BreadcrumbComponent } from '../ui/breadcrumb/breadcrumb';
import { ButtonComponent } from '../ui/button/button';
import { CardComponent } from '../ui/card/card';
import { DialogComponent } from '../ui/dialog/dialog';
import { DropdownComponent } from '../ui/dropdown/dropdown';
import { EmptyStateComponent } from '../ui/empty-state/empty-state';
import { FormFieldComponent } from '../ui/form-field/form-field';
import {
  CheckboxDirective,
  InputDirective,
  RadioDirective,
} from '../ui/form-controls/form-controls';
import { IconButtonComponent } from '../ui/icon-button/icon-button';
import { MenuItemComponent } from '../ui/menu-item/menu-item';
import { MobileNavTriggerComponent } from '../ui/mobile-nav-trigger/mobile-nav-trigger';
import { NavigationItemComponent } from '../ui/navigation-item/navigation-item';
import { PaginationComponent } from '../ui/pagination/pagination';
import { ProgressComponent } from '../ui/progress/progress';
import { SectionHeadingComponent } from '../ui/section-heading/section-heading';
import { SkeletonComponent } from '../ui/skeleton/skeleton';
import { SpinnerComponent } from '../ui/spinner/spinner';
import { TabsComponent, type TabItem } from '../ui/tabs/tabs';
import { ThemeToggleComponent } from '../ui/theme-toggle/theme-toggle';
import { ToggleComponent } from '../ui/toggle/toggle';
import { ToastService } from '../../core/notifications/toast.service';
import { TooltipDirective } from '../ui/tooltip/tooltip';

const SHOWCASE_TABS: readonly TabItem[] = [
  { id: 'tokens', label: 'Tokens' },
  { id: 'components', label: 'Components' },
  { id: 'navigation', label: 'Navigation' },
];

@Component({
  selector: 'app-design-system-showcase',
  imports: [
    AlertComponent,
    BadgeComponent,
    BreadcrumbComponent,
    ButtonComponent,
    CardComponent,
    CheckboxDirective,
    DialogComponent,
    DropdownComponent,
    EmptyStateComponent,
    FormFieldComponent,
    IconButtonComponent,
    InputDirective,
    MenuItemComponent,
    MobileNavTriggerComponent,
    NavigationItemComponent,
    PaginationComponent,
    ProgressComponent,
    RadioDirective,
    SectionHeadingComponent,
    SkeletonComponent,
    SpinnerComponent,
    TabsComponent,
    ThemeToggleComponent,
    ToggleComponent,
    TooltipDirective,
  ],
  template: `
    <main class="showcase container">
      <header class="showcase__header">
        <div>
          <p class="showcase__eyebrow">Development preview</p>
          <h1 class="type-h1">Obsidian Luxe</h1>
          <p>Centralized visual language and reusable interface foundations.</p>
        </div>
        <ui-theme-toggle />
      </header>

      <ui-tabs
        [tabs]="tabs"
        [activeId]="activeTab()"
        label="Design system sections"
        (activeIdChange)="activeTab.set($event)"
      />

      <div
        id="tokens-panel"
        class="showcase-panel"
        role="tabpanel"
        tabindex="0"
        aria-labelledby="tokens-tab"
        [hidden]="activeTab() !== 'tokens'"
      >
        <section class="showcase-section" aria-labelledby="color-heading">
          <ui-section-heading id="color-heading" eyebrow="Foundation" title="Color system" />
          <div class="swatch-grid">
            @for (token of colorTokens; track token.name) {
              <div class="swatch">
                <span
                  class="swatch__sample"
                  [style.background]="'var(' + token.variable + ')'"
                  aria-hidden="true"
                ></span>
                <span>{{ token.name }}</span>
              </div>
            }
          </div>
        </section>

        <section class="showcase-section" aria-labelledby="type-heading">
          <ui-section-heading id="type-heading" eyebrow="Type scale" title="Editorial typography" />
          <div class="type-list">
            <p class="type-display">Display — considered by design.</p>
            <p class="type-h1">Heading one</p>
            <p class="type-h2">Heading two</p>
            <p class="type-h3">Heading three</p>
            <p class="type-h4">Heading four</p>
            <p class="type-h5">Heading five</p>
            <p class="type-body-large">Large body text for introductions and emphasis.</p>
            <p>Regular body text balances readability and restraint.</p>
            <p class="type-body-small">Small body text for supporting details.</p>
            <p class="type-caption">Caption and supporting labels</p>
          </div>
        </section>

        <section class="showcase-section" aria-labelledby="spacing-heading">
          <ui-section-heading id="spacing-heading" eyebrow="Rhythm" title="Spacing and motion" />
          <div class="spacing-list">
            @for (space of spacingTokens; track space) {
              <div class="spacing-item">
                <code>--space-{{ space }}</code>
                <span [style.width]="'var(--space-' + space + ')'" aria-hidden="true"></span>
              </div>
            }
          </div>
          <div class="motion-examples">
            <span class="motion-fade-in">Fade</span>
            <span class="motion-fade-up">Fade up</span>
            <span class="motion-fade-down">Fade down</span>
            <span class="motion-scale-in">Scale in</span>
            <span class="motion-slide-in">Slide in</span>
            <span class="motion-slide-out">Slide out</span>
            <span class="motion-hover-elevation">Hover elevation</span>
          </div>
        </section>

        <section class="showcase-section" aria-labelledby="shape-heading">
          <ui-section-heading id="shape-heading" eyebrow="Finishing" title="Radius and elevation" />
          <div class="token-examples">
            @for (token of radiusTokens; track token) {
              <div class="token-example">
                <span
                  [style.border-radius]="'var(--radius-' + token + ')'"
                  aria-hidden="true"
                ></span>
                <code>--radius-{{ token }}</code>
              </div>
            }
          </div>
          <div class="token-examples">
            @for (token of shadowTokens; track token) {
              <div class="token-example">
                <span [style.box-shadow]="'var(--shadow-' + token + ')'" aria-hidden="true"></span>
                <code>--shadow-{{ token }}</code>
              </div>
            }
          </div>
        </section>
      </div>

      <div
        id="components-panel"
        class="showcase-panel"
        role="tabpanel"
        tabindex="0"
        aria-labelledby="components-tab"
        [hidden]="activeTab() !== 'components'"
      >
        <section class="showcase-section" aria-labelledby="buttons-heading">
          <ui-section-heading
            id="buttons-heading"
            eyebrow="Actions"
            title="Buttons and icon buttons"
          />
          <div class="component-row">
            <ui-button>Primary</ui-button>
            <ui-button variant="secondary">Secondary</ui-button>
            <ui-button variant="outline">Outline</ui-button>
            <ui-button variant="ghost">Ghost</ui-button>
            <ui-button variant="danger">Danger</ui-button>
            <ui-button variant="link">Link style</ui-button>
            <ui-button size="small">Small</ui-button>
            <ui-button size="large">Large</ui-button>
            <ui-button [loading]="true">Saving</ui-button>
            <ui-button [disabled]="true">Disabled</ui-button>
            <ui-icon-button label="Search">
              <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none">
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 5 5" />
              </svg>
            </ui-icon-button>
          </div>
        </section>

        <section class="showcase-section" aria-labelledby="surface-heading">
          <ui-section-heading id="surface-heading" eyebrow="Surfaces" title="Cards and badges" />
          <div class="card-grid">
            <ui-card
              ><h3>Default card</h3>
              <p>Neutral content surface.</p></ui-card
            >
            <ui-card variant="elevated"
              ><h3>Elevated card</h3>
              <p>Subtle elevation for hierarchy.</p></ui-card
            >
            <ui-card variant="bordered"
              ><h3>Bordered card</h3>
              <p>Clear separation through structure.</p></ui-card
            >
            <ui-card variant="feature"
              ><h3>Feature card</h3>
              <p>Expanded padding for a focal content block.</p></ui-card
            >
            <ui-card variant="stat"
              ><h3>Statistics card</h3>
              <p>Compact surface for a future metric.</p></ui-card
            >
            <ui-card variant="interactive" (activated)="notify('Interactive card selected')">
              <h3>Interactive card</h3>
              <p>Keyboard and pointer activation enabled.</p>
            </ui-card>
          </div>
          <div class="component-row">
            <ui-badge>Default</ui-badge>
            <ui-badge variant="primary">Primary</ui-badge>
            <ui-badge variant="success">Success</ui-badge>
            <ui-badge variant="warning">Warning</ui-badge>
            <ui-badge variant="error">Error</ui-badge>
            <ui-badge variant="information">Information</ui-badge>
            <ui-badge size="small">Small</ui-badge>
          </div>
        </section>

        <section class="showcase-section" aria-labelledby="form-heading">
          <ui-section-heading
            id="form-heading"
            eyebrow="Form primitives"
            title="Controls and field states"
          />
          <div class="form-grid">
            <ui-form-field
              controlId="sample-text"
              label="Text input"
              hint="A short supporting hint."
            >
              <input
                id="sample-text"
                uiInput
                placeholder="Enter text"
                aria-describedby="sample-text-message"
              />
            </ui-form-field>
            <ui-form-field controlId="sample-email" label="Email">
              <input id="sample-email" uiInput type="email" placeholder="name@example.com" />
            </ui-form-field>
            <ui-form-field controlId="sample-password" label="Password">
              <input id="sample-password" uiInput type="password" value="demonstration" />
            </ui-form-field>
            <ui-form-field controlId="sample-select" label="Select">
              <select id="sample-select" uiInput>
                <option>Choose an option</option>
                <option>Option one</option>
                <option>Option two</option>
              </select>
            </ui-form-field>
            <ui-form-field controlId="sample-textarea" label="Textarea">
              <textarea id="sample-textarea" uiInput placeholder="Write a note"></textarea>
            </ui-form-field>
            <ui-form-field
              controlId="sample-invalid"
              label="Invalid state"
              error="Please review this value."
            >
              <input
                id="sample-invalid"
                uiInput
                aria-invalid="true"
                aria-describedby="sample-invalid-message"
                value="Invalid value"
              />
            </ui-form-field>
            <ui-form-field
              controlId="sample-valid"
              label="Valid state"
              success="This value is available."
            >
              <input
                id="sample-valid"
                uiInput
                aria-invalid="false"
                aria-describedby="sample-valid-message"
                value="Valid value"
              />
            </ui-form-field>
            <label class="choice"><input uiCheckbox type="checkbox" checked /> Checkbox</label>
            <label class="choice"
              ><input uiRadio type="radio" name="showcase-radio" checked /> Radio</label
            >
            <div class="choice">
              <ui-toggle label="Enable preview option" />
              <span>Toggle</span>
            </div>
          </div>
        </section>

        <section class="showcase-section" aria-labelledby="feedback-heading">
          <ui-section-heading id="feedback-heading" eyebrow="Feedback" title="Status and loading" />
          <div class="feedback-grid">
            <ui-alert title="Information" variant="information"
              >A neutral informational message.</ui-alert
            >
            <ui-alert title="Success" variant="success"
              >The action completed successfully.</ui-alert
            >
            <ui-alert title="Warning" variant="warning"
              >Review this message before proceeding.</ui-alert
            >
            <ui-alert title="Error" variant="error" [dismissible]="true"
              >An accessible error notification.</ui-alert
            >
          </div>
          <div class="component-row">
            <ui-spinner label="Loading preview" />
            <ui-spinner size="large" label="Loading content" />
            <ui-progress [value]="64" label="Example progress" />
            <ui-skeleton width="12rem" height="1rem" />
            <ui-skeleton width="3rem" height="3rem" shape="circle" />
            <ui-button (click)="showToast()">Show toast</ui-button>
            <ui-button variant="outline" (click)="dialogOpen.set(true)">Open modal</ui-button>
            <ui-button variant="ghost" [uiTooltip]="'Native title and accessible description'"
              >Tooltip example</ui-button
            >
          </div>
          <ui-empty-state
            title="Empty state"
            description="A reusable neutral empty state for future feature screens."
          >
            <span uiEmptyIcon class="empty-mark">—</span>
            <ui-button uiEmptyAction variant="outline">Optional action</ui-button>
          </ui-empty-state>
        </section>

        <ui-dialog
          id="showcase-dialog"
          title="Dialog foundation"
          [open]="dialogOpen()"
          (openChange)="dialogOpen.set($event)"
        >
          <p>This native modal dialog provides browser-managed focus and Escape dismissal.</p>
          <div uiDialogActions class="component-row">
            <ui-button variant="ghost" (click)="dialogOpen.set(false)">Cancel</ui-button>
            <ui-button (click)="dialogOpen.set(false)">Confirm</ui-button>
          </div>
        </ui-dialog>
      </div>

      <div
        id="navigation-panel"
        class="showcase-panel"
        role="tabpanel"
        tabindex="0"
        aria-labelledby="navigation-tab"
        [hidden]="activeTab() !== 'navigation'"
      >
        <section class="showcase-section" aria-labelledby="navigation-heading">
          <ui-section-heading
            id="navigation-heading"
            eyebrow="Navigation"
            title="Reusable navigation primitives"
          />
          <div class="navigation-grid">
            <ui-navigation-item label="Home" link="/" [exact]="true" />
            <ui-navigation-item label="Projects" link="/projects" />
            <ui-breadcrumb
              [items]="[
                { label: 'Workspace', link: '/' },
                { label: 'Design system', link: '/_design-system' },
                { label: 'Components' },
              ]"
            />
            <ui-dropdown label="Example menu">
              <span uiDropdownTrigger class="dropdown-trigger">Actions</span>
              <ui-menu-item uiMenuItem (selected)="notify('Menu action selected')"
                >View details</ui-menu-item
              >
              <ui-menu-item
                uiMenuItem
                [danger]="true"
                (selected)="notify('Destructive action selected')"
                >Remove item</ui-menu-item
              >
            </ui-dropdown>
            <ui-mobile-nav-trigger
              controlsId="showcase-mobile-nav"
              [expanded]="mobileNavOpen()"
              (toggled)="toggleMobileNav()"
            />
            <ui-pagination
              [currentPage]="currentPage()"
              [totalPages]="12"
              (pageChange)="currentPage.set($event)"
            />
          </div>
          @if (mobileNavOpen()) {
            <nav id="showcase-mobile-nav" aria-label="Example mobile navigation">
              Navigation trigger expanded
            </nav>
          }
        </section>
      </div>
    </main>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
      background: var(--color-background);
    }

    .showcase {
      display: grid;
      gap: var(--space-10);
      padding-block: var(--space-10) var(--space-20);
    }

    .showcase__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-6);
      padding-bottom: var(--space-8);
      border-bottom: 1px solid var(--color-border);
    }

    .showcase__header > div {
      display: grid;
      gap: var(--space-3);
    }

    .showcase__header > div > p:last-child {
      max-width: 60ch;
    }

    .showcase__eyebrow {
      color: var(--color-brand-primary);
      font-size: var(--font-size-label);
      font-weight: var(--font-weight-semibold);
      letter-spacing: var(--letter-spacing-label);
      text-transform: uppercase;
    }

    .showcase-section {
      display: grid;
      gap: var(--space-6);
      padding-top: var(--space-6);
      scroll-margin-top: calc(var(--header-height) + var(--space-4));
    }

    .showcase-panel {
      display: grid;
      gap: var(--space-10);
      min-width: 0;
      outline: none;
    }

    .showcase-panel[hidden] {
      display: none;
    }

    .swatch-grid,
    .card-grid,
    .form-grid,
    .feedback-grid,
    .navigation-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
      gap: var(--grid-gap);
    }

    .swatch {
      display: grid;
      gap: var(--space-2);
      color: var(--color-text-secondary);
      font-size: var(--font-size-body-small);
    }

    .swatch__sample {
      height: 3rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }

    .type-list {
      display: grid;
      gap: var(--space-4);
    }

    .spacing-list {
      display: grid;
      gap: var(--space-2);
    }

    .spacing-item {
      display: flex;
      min-height: 1.5rem;
      align-items: center;
      gap: var(--space-4);
      color: var(--color-text-muted);
      font-size: var(--font-size-caption);
    }

    .spacing-item span {
      height: 0.75rem;
      background: var(--color-brand-primary);
      border-radius: var(--radius-sm);
    }

    .token-examples {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 8rem), 1fr));
      gap: var(--space-4);
    }

    .token-example {
      display: grid;
      justify-items: center;
      gap: var(--space-3);
      color: var(--color-text-muted);
      font-size: var(--font-size-caption);
    }

    .token-example span {
      width: 4rem;
      height: 4rem;
      background: var(--color-surface-elevated);
      border: 1px solid var(--color-border);
    }

    .motion-examples,
    .component-row,
    .choice {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-4);
    }

    .motion-examples > span {
      padding: var(--space-3);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }

    .card-grid h3 {
      margin-bottom: var(--space-2);
      font-size: var(--font-size-h5);
    }

    .card-grid p {
      font-size: var(--font-size-body-small);
    }

    .form-grid {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
    }

    .choice {
      min-height: 2.75rem;
      color: var(--color-text-secondary);
    }

    .feedback-grid {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
    }

    .component-row ui-progress {
      width: min(100%, 18rem);
    }

    .empty-mark {
      color: var(--color-brand-primary);
      font-size: var(--font-size-h2);
    }

    .dropdown-trigger {
      display: inline-flex;
      align-items: center;
      min-height: 2.75rem;
      padding-inline: var(--space-3);
      color: var(--color-text-primary);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }

    @media (max-width: 480px) {
      .showcase {
        gap: var(--space-8);
        padding-block: var(--space-6) var(--space-12);
      }

      .showcase__header {
        align-items: center;
      }

      .component-row {
        gap: var(--space-2);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystemShowcaseComponent {
  private readonly toastService = inject(ToastService);
  protected readonly activeTab = signal('tokens');
  protected readonly dialogOpen = signal(false);
  protected readonly mobileNavOpen = signal(false);
  protected readonly currentPage = signal(3);
  protected readonly tabs = SHOWCASE_TABS;
  protected readonly colorTokens = [
    { name: 'Background', variable: '--color-background' },
    { name: 'Secondary background', variable: '--color-background-secondary' },
    { name: 'Surface', variable: '--color-surface' },
    { name: 'Elevated surface', variable: '--color-surface-elevated' },
    { name: 'Primary text', variable: '--color-text-primary' },
    { name: 'Secondary text', variable: '--color-text-secondary' },
    { name: 'Muted text', variable: '--color-text-muted' },
    { name: 'Primary accent', variable: '--color-brand-primary' },
    { name: 'Secondary accent', variable: '--color-brand-secondary' },
    { name: 'Success', variable: '--color-success' },
    { name: 'Success surface', variable: '--color-success-surface' },
    { name: 'Warning', variable: '--color-warning' },
    { name: 'Warning surface', variable: '--color-warning-surface' },
    { name: 'Error', variable: '--color-error' },
    { name: 'Error surface', variable: '--color-error-surface' },
    { name: 'Information', variable: '--color-information' },
    { name: 'Information surface', variable: '--color-information-surface' },
    { name: 'Focus', variable: '--color-focus' },
    { name: 'Border', variable: '--color-border' },
  ] as const;
  protected readonly spacingTokens = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32] as const;
  protected readonly radiusTokens = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
  protected readonly shadowTokens = [
    'none',
    'subtle',
    'card',
    'elevated',
    'modal',
    'focus',
  ] as const;

  protected showToast(): void {
    this.toastService.show({
      title: 'Preview notification',
      description: 'This toast demonstrates the shared feedback foundation.',
      variant: 'success',
    });
  }

  protected notify(message: string): void {
    this.toastService.show({ title: message });
  }

  protected toggleMobileNav(): void {
    this.mobileNavOpen.update((open) => !open);
  }
}
