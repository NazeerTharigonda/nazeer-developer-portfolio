import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/theme/theme.service';

@Component({
  selector: 'ui-theme-toggle',
  template: `
    <button
      class="theme-toggle"
      type="button"
      [attr.aria-label]="
        theme.activeTheme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      "
      [attr.title]="
        theme.activeTheme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      "
      (click)="theme.toggle()"
    >
      @if (theme.activeTheme() === 'dark') {
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
          />
        </svg>
      } @else {
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
        </svg>
      }
    </button>
  `,
  styles: `
    .theme-toggle {
      display: inline-grid;
      width: 2.75rem;
      height: 2.75rem;
      place-items: center;
      color: var(--color-text-secondary);
      background: transparent;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-full);
      transition:
        color var(--duration-fast) var(--ease-standard),
        background-color var(--duration-fast) var(--ease-standard),
        border-color var(--duration-fast) var(--ease-standard);
    }

    .theme-toggle:hover {
      color: var(--color-text-primary);
      background: var(--color-interactive-hover);
      border-color: var(--color-border-strong);
    }

    svg {
      width: 1.125rem;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.6;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  protected readonly theme = inject(ThemeService);
}
