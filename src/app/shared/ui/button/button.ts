import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'ui-button',
  template: `
    <button
      [class]="'button button--' + variant() + ' button--' + size()"
      [type]="type()"
      [disabled]="disabled() || loading()"
      [attr.aria-busy]="loading()"
    >
      @if (loading()) {
        <span class="button__spinner" aria-hidden="true"></span>
        <span class="visually-hidden">{{ loadingLabel() }}</span>
      } @else {
        <span class="button__icon"><ng-content select="[uiButtonLeading]" /></span>
      }
      <span class="button__label"><ng-content /></span>
      <span class="button__icon"><ng-content select="[uiButtonTrailing]" /></span>
    </button>
  `,
  styles: `
    .button {
      display: inline-flex;
      min-height: 2.75rem;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      padding: 0.625rem 1rem;
      color: var(--color-text-primary);
      font-size: var(--font-size-button);
      font-weight: var(--font-weight-medium);
      text-decoration: none;
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius-md);
      transition:
        color var(--duration-fast) var(--ease-standard),
        background-color var(--duration-fast) var(--ease-standard),
        border-color var(--duration-fast) var(--ease-standard),
        transform var(--duration-instant) var(--ease-standard);
    }

    .button:active:not(:disabled) {
      transform: translateY(1px);
    }

    .button:disabled {
      color: var(--color-interactive-disabled);
      background: var(--color-surface-hover);
      border-color: var(--color-interactive-disabled);
      cursor: not-allowed;
    }

    .button--link:disabled {
      background: transparent;
      border-color: transparent;
    }

    .button--primary {
      color: var(--color-text-on-accent);
      background: var(--color-brand-primary);
    }

    .button--primary:hover:not(:disabled) {
      background: var(--color-brand-primary-hover);
    }

    .button--primary:active:not(:disabled) {
      background: var(--color-brand-primary-pressed);
    }

    .button--secondary {
      background: var(--color-surface-elevated);
      border-color: var(--color-border);
    }

    .button--secondary:hover:not(:disabled),
    .button--ghost:hover:not(:disabled) {
      background: var(--color-interactive-hover);
    }

    .button--outline {
      border-color: var(--color-border-strong);
    }

    .button--outline:hover:not(:disabled) {
      background: var(--color-interactive-hover);
    }

    .button--ghost {
      color: var(--color-text-secondary);
    }

    .button--danger {
      color: var(--color-text-on-danger);
      background: var(--color-error);
    }

    .button--danger:hover:not(:disabled) {
      background: var(--color-danger-hover);
    }

    .button--link {
      min-height: auto;
      padding: 0;
      color: var(--color-brand-primary);
      text-decoration: underline;
      text-underline-offset: 0.2em;
    }

    .button--small {
      min-height: 2.25rem;
      padding: 0.375rem 0.75rem;
    }

    .button--large {
      min-height: 3.25rem;
      padding: 0.875rem 1.25rem;
    }

    .button__icon:empty {
      display: none;
    }

    .button__spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: button-spin 700ms linear infinite;
    }

    @keyframes button-spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .button,
      .button__spinner {
        animation: none;
        transition: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('medium');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly loadingLabel = input('Loading');
}
