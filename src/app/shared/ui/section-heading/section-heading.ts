import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-section-heading',
  template: `
    <header class="section-heading">
      @if (eyebrow()) {
        <p class="section-heading__eyebrow">{{ eyebrow() }}</p>
      }
      <h2>{{ title() }}</h2>
      @if (description()) {
        <p class="section-heading__description">{{ description() }}</p>
      }
    </header>
  `,
  styles: `
    .section-heading {
      display: grid;
      max-width: 46rem;
      gap: var(--space-3);
    }

    .section-heading__eyebrow {
      color: var(--color-brand-primary);
      font-size: var(--font-size-label);
      font-weight: var(--font-weight-semibold);
      letter-spacing: var(--letter-spacing-label);
      text-transform: uppercase;
    }

    h2 {
      font-size: var(--font-size-h2);
    }

    .section-heading__description {
      max-width: 60ch;
      font-size: var(--font-size-body-large);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeadingComponent {
  readonly title = input.required<string>();
  readonly eyebrow = input('');
  readonly description = input('');
}
