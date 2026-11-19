import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-icon-button',
  template: `
    <button
      [class]="'icon-button icon-button--' + size()"
      [disabled]="disabled()"
      [attr.aria-label]="label()"
      [attr.title]="tooltip() || label()"
      type="button"
    >
      <ng-content />
    </button>
  `,
  styles: `
    .icon-button {
      display: inline-grid;
      flex: 0 0 auto;
      place-items: center;
      color: var(--color-text-secondary);
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius-md);
      transition:
        color var(--duration-fast) var(--ease-standard),
        background-color var(--duration-fast) var(--ease-standard);
    }

    .icon-button:hover:not(:disabled) {
      color: var(--color-text-primary);
      background: var(--color-interactive-hover);
    }

    .icon-button:disabled {
      opacity: 0.5;
    }

    .icon-button--small {
      width: 2rem;
      height: 2rem;
    }

    .icon-button--medium {
      width: 2.75rem;
      height: 2.75rem;
    }

    .icon-button--large {
      width: 3.25rem;
      height: 3.25rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
  readonly label = input.required<string>();
  readonly tooltip = input('');
  readonly size = input<'small' | 'medium' | 'large'>('medium');
  readonly disabled = input(false);
}
