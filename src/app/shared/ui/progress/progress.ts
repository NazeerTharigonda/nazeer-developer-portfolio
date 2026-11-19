import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'ui-progress',
  template: `
    <div
      class="progress"
      role="progressbar"
      [attr.aria-label]="label()"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="100"
      [attr.aria-valuenow]="boundedValue()"
    >
      <span class="progress__value" [style.width.%]="boundedValue()"></span>
    </div>
  `,
  styles: `
    .progress {
      height: 0.5rem;
      overflow: hidden;
      background: var(--color-surface-elevated);
      border-radius: var(--radius-full);
    }

    .progress__value {
      display: block;
      height: 100%;
      background: var(--color-brand-primary);
      border-radius: inherit;
      transition: width var(--duration-moderate) var(--ease-standard);
    }

    @media (prefers-reduced-motion: reduce) {
      .progress__value {
        transition: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent {
  readonly value = input(0);
  readonly label = input('Progress');
  protected readonly boundedValue = computed(() => {
    const value = this.value();
    return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  });
}
