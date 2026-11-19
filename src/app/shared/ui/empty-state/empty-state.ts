import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-empty-state',
  template: `
    <section class="empty-state" aria-live="polite">
      <div class="empty-state__icon" aria-hidden="true"><ng-content select="[uiEmptyIcon]" /></div>
      <h2>{{ title() }}</h2>
      @if (description()) {
        <p>{{ description() }}</p>
      }
      <div class="empty-state__action"><ng-content select="[uiEmptyAction]" /></div>
    </section>
  `,
  styles: `
    .empty-state {
      display: grid;
      justify-items: center;
      gap: var(--space-3);
      padding: clamp(var(--space-8), 8vw, var(--space-16));
      text-align: center;
      background: var(--color-surface);
      border: 1px dashed var(--color-border-strong);
      border-radius: var(--radius-lg);
    }

    h2 {
      font-size: var(--font-size-h4);
    }

    p {
      max-width: 40ch;
    }

    .empty-state__icon:empty,
    .empty-state__action:empty {
      display: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  readonly title = input.required<string>();
  readonly description = input('');
}
