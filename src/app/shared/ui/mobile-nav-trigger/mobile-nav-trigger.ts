import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'ui-mobile-nav-trigger',
  template: `
    <button
      class="mobile-nav-trigger"
      type="button"
      [attr.aria-expanded]="expanded()"
      [attr.aria-controls]="controlsId()"
      [attr.aria-label]="expanded() ? 'Close navigation menu' : 'Open navigation menu'"
      (click)="toggled.emit()"
    >
      @if (expanded()) {
        <span aria-hidden="true">&times;</span>
      } @else {
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      }
    </button>
  `,
  styles: `
    .mobile-nav-trigger {
      display: grid;
      width: 2.75rem;
      height: 2.75rem;
      place-items: center;
      color: var(--color-text-primary);
      font-size: 1.5rem;
      background: transparent;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }

    svg {
      width: 1.25rem;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-width: 1.7;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavTriggerComponent {
  readonly controlsId = input.required<string>();
  readonly expanded = input(false);
  readonly toggled = output<void>();
}
