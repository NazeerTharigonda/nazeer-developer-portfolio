import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'ui-navigation-item',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a
      [class]="'navigation-item navigation-item--' + orientation()"
      [routerLink]="link()"
      routerLinkActive="is-active"
      [routerLinkActiveOptions]="{ exact: exact() }"
      ariaCurrentWhenActive="page"
    >
      <span class="navigation-item__icon"><ng-content select="[uiNavigationIcon]" /></span>
      <span>{{ label() }}</span>
    </a>
  `,
  styles: `
    .navigation-item {
      display: flex;
      min-height: 2.75rem;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-2) var(--space-3);
      color: var(--color-text-secondary);
      font-size: var(--font-size-body-small);
      text-decoration: none;
      border-radius: var(--radius-md);
      transition:
        color var(--duration-fast) var(--ease-standard),
        background-color var(--duration-fast) var(--ease-standard);
    }

    .navigation-item:hover,
    .navigation-item.is-active {
      color: var(--color-text-primary);
      background: var(--color-interactive-hover);
    }

    .navigation-item.is-active {
      box-shadow: inset 2px 0 var(--color-brand-primary);
    }

    .navigation-item--horizontal {
      min-height: 2.5rem;
      padding-inline: var(--space-2);
      font-size: var(--font-size-caption);
      white-space: nowrap;
    }

    .navigation-item--horizontal.is-active {
      box-shadow: inset 0 -2px var(--color-brand-primary);
    }

    .navigation-item__icon:empty {
      display: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationItemComponent {
  readonly label = input.required<string>();
  readonly link = input.required<string>();
  readonly exact = input(false);
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
}
