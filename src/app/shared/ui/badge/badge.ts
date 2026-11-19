import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'danger'
  | 'information'
  | 'outline';

@Component({
  selector: 'ui-badge',
  template: `
    <span [class]="'badge badge--' + variant() + ' badge--' + size()">
      <ng-content />
    </span>
  `,
  styles: `
    .badge {
      display: inline-flex;
      align-items: center;
      width: fit-content;
      gap: var(--space-1);
      font-weight: var(--font-weight-medium);
      white-space: nowrap;
      border: 1px solid transparent;
      border-radius: var(--radius-full);
    }

    .badge--small {
      padding: 0.125rem 0.5rem;
      font-size: var(--font-size-caption);
    }

    .badge--medium {
      padding: 0.25rem 0.625rem;
      font-size: var(--font-size-body-small);
    }

    .badge--default {
      color: var(--color-text-secondary);
      background: var(--color-surface-elevated);
      border-color: var(--color-border);
    }

    .badge--secondary {
      color: var(--color-text-secondary);
      background: var(--color-background-secondary);
    }

    .badge--outline {
      color: var(--color-text-secondary);
      background: transparent;
      border-color: var(--color-border-strong);
    }

    .badge--primary {
      color: var(--color-brand-primary);
      background: color-mix(in srgb, var(--color-brand-primary) 12%, transparent);
    }

    .badge--success {
      color: var(--color-success);
      background: var(--color-success-surface);
    }

    .badge--warning {
      color: var(--color-warning);
      background: var(--color-warning-surface);
    }

    .badge--error,
    .badge--danger {
      color: var(--color-error);
      background: var(--color-error-surface);
    }

    .badge--information {
      color: var(--color-information);
      background: var(--color-information-surface);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  readonly variant = input<BadgeVariant>('default');
  readonly size = input<'small' | 'medium'>('medium');
}
