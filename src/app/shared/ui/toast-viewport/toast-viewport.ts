import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../../../core/notifications/toast.service';

@Component({
  selector: 'ui-toast-viewport',
  template: `
    <ol class="toast-viewport" aria-label="Notifications">
      @for (toast of toasts.messages(); track toast.id) {
        <li
          [class]="'toast toast--' + toast.variant"
          [class.toast--leaving]="toast.leaving"
          role="status"
          (animationend)="onAnimationEnd(toast.id, $event)"
        >
          <div class="toast__content">
            <p class="toast__title">{{ toast.title }}</p>
            @if (toast.description) {
              <p class="toast__description">{{ toast.description }}</p>
            }
          </div>
          <button
            type="button"
            class="toast__dismiss"
            aria-label="Dismiss notification"
            (click)="toasts.dismiss(toast.id)"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </li>
      }
    </ol>
  `,
  styles: `
    .toast-viewport {
      position: fixed;
      z-index: 1000;
      right: var(--page-gutter);
      bottom: var(--page-gutter);
      display: grid;
      width: min(24rem, calc(100vw - 2rem));
      gap: var(--space-3);
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .toast {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-3);
      padding: var(--space-4);
      background: var(--color-surface-elevated);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-elevated);
      animation: motion-slide-in var(--duration-moderate) var(--ease-enter) both;
    }

    .toast--success {
      border-inline-start: 3px solid var(--color-success);
    }

    .toast--warning {
      border-inline-start: 3px solid var(--color-warning);
    }

    .toast--error {
      border-inline-start: 3px solid var(--color-error);
    }

    .toast--leaving {
      animation: motion-slide-out var(--duration-fast) var(--ease-exit) both;
    }

    .toast__content {
      display: grid;
      gap: var(--space-1);
    }

    .toast__title {
      color: var(--color-text-primary);
      font-weight: var(--font-weight-medium);
    }

    .toast__description {
      font-size: var(--font-size-body-small);
    }

    .toast__dismiss {
      display: grid;
      width: 2rem;
      height: 2rem;
      flex: 0 0 auto;
      place-items: center;
      color: var(--color-text-secondary);
      font-size: 1.25rem;
      background: transparent;
      border: 0;
      border-radius: var(--radius-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastViewportComponent {
  protected readonly toasts = inject(ToastService);

  protected onAnimationEnd(id: number, event: AnimationEvent): void {
    if (event.animationName === 'motion-slide-out') {
      this.toasts.remove(id);
    }
  }
}
