import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'ui-dropdown',
  template: `
    <details
      class="dropdown"
      tabindex="-1"
      (toggle)="onToggle($event)"
      (keydown)="onKeydown($event)"
    >
      <summary aria-haspopup="menu" [attr.aria-expanded]="expanded()">
        <ng-content select="[uiDropdownTrigger]" />
        <span class="dropdown__chevron" aria-hidden="true"></span>
      </summary>
      <div class="dropdown__menu" role="menu" [attr.aria-label]="label()" tabindex="-1">
        <ng-content select="[uiMenuItem]" />
      </div>
    </details>
  `,
  styles: `
    .dropdown {
      position: relative;
      width: fit-content;
    }

    summary {
      display: flex;
      min-height: 2.75rem;
      align-items: center;
      gap: var(--space-2);
      cursor: pointer;
      list-style: none;
    }

    summary::-webkit-details-marker {
      display: none;
    }

    .dropdown__chevron {
      width: 0.5rem;
      height: 0.5rem;
      border-right: 1.5px solid currentColor;
      border-bottom: 1.5px solid currentColor;
      transform: rotate(45deg) translateY(-2px);
      transition: transform var(--duration-fast) var(--ease-standard);
    }

    details[open] .dropdown__chevron {
      transform: rotate(225deg) translate(-2px, -1px);
    }

    .dropdown__menu {
      position: absolute;
      z-index: 20;
      top: calc(100% + var(--space-2));
      right: 0;
      min-width: 12rem;
      padding: var(--space-2);
      background: var(--color-surface-elevated);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-elevated);
      animation: motion-fade-down var(--duration-fast) var(--ease-enter) both;
    }

    @media (prefers-reduced-motion: reduce) {
      .dropdown__chevron,
      .dropdown__menu {
        animation: none;
        transition: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  readonly label = input('Menu');
  protected readonly expanded = signal(false);

  protected onToggle(event: Event): void {
    const details = event.currentTarget;
    if (details instanceof HTMLDetailsElement) {
      this.expanded.set(details.open);
      if (details.open) {
        details.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
      }
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    const details = event.currentTarget;
    if (!(details instanceof HTMLDetailsElement)) {
      return;
    }

    if (event.key === 'Escape' && details.open) {
      event.preventDefault();
      details.open = false;
      details.querySelector('summary')?.focus();
      return;
    }

    if (!details.open) {
      return;
    }

    const items = Array.from(
      details.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)'),
    );
    const activeElement = document.activeElement;
    const currentIndex =
      activeElement instanceof HTMLButtonElement ? items.indexOf(activeElement) : -1;
    const direction = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? items.length - 1
          : (currentIndex + direction + items.length) % items.length;

    if (items.length === 0 || (direction === 0 && event.key !== 'Home' && event.key !== 'End')) {
      return;
    }

    event.preventDefault();
    items[nextIndex]?.focus();
  }
}
