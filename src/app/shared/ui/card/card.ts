import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type CardVariant = 'default' | 'interactive' | 'elevated' | 'bordered' | 'feature' | 'stat';

@Component({
  selector: 'ui-card',
  template: `
    <article
      [class]="'card card--' + variant()"
      [attr.tabindex]="variant() === 'interactive' ? 0 : null"
      [attr.role]="variant() === 'interactive' ? 'button' : null"
      (click)="activate()"
      (keydown.enter)="activate()"
      (keydown.space)="activateFromKeyboard($event)"
    >
      <ng-content />
    </article>
  `,
  styles: `
    .card {
      min-width: 0;
      padding: var(--space-6);
      color: var(--color-text-primary);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
    }

    .card--elevated {
      background: var(--color-surface-elevated);
      box-shadow: var(--shadow-card);
    }

    .card--bordered {
      border-color: var(--color-border-strong);
    }

    .card--feature {
      padding: clamp(var(--space-6), 4vw, var(--space-10));
      background: var(--color-surface-elevated);
    }

    .card--stat {
      padding: var(--space-5);
      background: var(--color-background-secondary);
    }

    .card--interactive {
      cursor: pointer;
      transition:
        transform var(--duration-normal) var(--ease-standard),
        border-color var(--duration-normal) var(--ease-standard),
        box-shadow var(--duration-normal) var(--ease-standard);
    }

    .card--interactive:hover {
      transform: translateY(-2px);
      border-color: var(--color-brand-secondary);
      box-shadow: var(--shadow-card);
    }

    .card--interactive:active {
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .card--interactive {
        transition: none;
      }

      .card--interactive:hover {
        transform: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly variant = input<CardVariant>('default');
  readonly activated = output<void>();

  protected activate(): void {
    if (this.variant() === 'interactive') {
      this.activated.emit();
    }
  }

  protected activateFromKeyboard(event: Event): void {
    event.preventDefault();
    this.activate();
  }
}
