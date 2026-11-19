import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-skeleton',
  template: `
    <span
      class="skeleton"
      [style.width]="width()"
      [style.height]="height()"
      [class.skeleton--circle]="shape() === 'circle'"
      aria-hidden="true"
    ></span>
  `,
  styles: `
    .skeleton {
      display: block;
      max-width: 100%;
      background: linear-gradient(
        90deg,
        var(--color-surface-elevated),
        var(--color-surface-hover),
        var(--color-surface-elevated)
      );
      background-size: 200% 100%;
      border-radius: var(--radius-sm);
      animation: skeleton-shimmer 1.6s ease-in-out infinite;
    }

    .skeleton--circle {
      border-radius: 50%;
    }

    @keyframes skeleton-shimmer {
      to {
        background-position-x: -200%;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .skeleton {
        animation: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  readonly width = input('100%');
  readonly height = input('1rem');
  readonly shape = input<'rectangle' | 'circle'>('rectangle');
}
