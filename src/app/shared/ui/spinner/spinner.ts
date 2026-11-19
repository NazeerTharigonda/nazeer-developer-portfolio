import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-spinner',
  template: `
    <span [class]="'spinner spinner--' + size()" role="status">
      <span class="visually-hidden">{{ label() }}</span>
    </span>
  `,
  styles: `
    .spinner {
      display: inline-block;
      flex: 0 0 auto;
      border: 2px solid color-mix(in srgb, currentColor 28%, transparent);
      border-right-color: currentColor;
      border-radius: 50%;
      animation: spinner-rotate 700ms linear infinite;
    }

    .spinner--small {
      width: 1rem;
      height: 1rem;
    }

    .spinner--medium {
      width: 1.5rem;
      height: 1.5rem;
    }

    .spinner--large {
      width: 2rem;
      height: 2rem;
    }

    @keyframes spinner-rotate {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .spinner {
        animation: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  readonly size = input<'small' | 'medium' | 'large'>('medium');
  readonly label = input('Loading');
}
