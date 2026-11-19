import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type AlertVariant = 'default' | 'success' | 'warning' | 'error' | 'information';

@Component({
  selector: 'ui-alert',
  template: `
    <section
      [class]="'alert alert--' + variant()"
      [attr.role]="variant() === 'error' ? 'alert' : 'status'"
    >
      <div class="alert__content">
        @if (title()) {
          <h2 class="alert__title">{{ title() }}</h2>
        }
        <div class="alert__body"><ng-content /></div>
      </div>
      @if (dismissible()) {
        <button
          class="alert__dismiss"
          type="button"
          aria-label="Dismiss message"
          (click)="dismissed.emit()"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      }
    </section>
  `,
  styles: `
    .alert {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-4);
      padding: var(--space-4);
      color: var(--color-text-secondary);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }

    .alert__title {
      margin: 0 0 var(--space-1);
      color: var(--color-text-primary);
      font-size: var(--font-size-body);
    }

    .alert__body {
      font-size: var(--font-size-body-small);
    }

    .alert--success {
      background: var(--color-success-surface);
      border-color: color-mix(in srgb, var(--color-success) 35%, transparent);
    }

    .alert--warning {
      background: var(--color-warning-surface);
      border-color: color-mix(in srgb, var(--color-warning) 35%, transparent);
    }

    .alert--error {
      background: var(--color-error-surface);
      border-color: color-mix(in srgb, var(--color-error) 35%, transparent);
    }

    .alert--information {
      background: var(--color-information-surface);
      border-color: color-mix(in srgb, var(--color-information) 35%, transparent);
    }

    .alert__dismiss {
      display: grid;
      width: 2rem;
      height: 2rem;
      flex: 0 0 auto;
      place-items: center;
      color: inherit;
      font-size: 1.25rem;
      background: transparent;
      border: 0;
      border-radius: var(--radius-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  readonly variant = input<AlertVariant>('default');
  readonly title = input('');
  readonly dismissible = input(false);
  readonly dismissed = output<void>();
}
