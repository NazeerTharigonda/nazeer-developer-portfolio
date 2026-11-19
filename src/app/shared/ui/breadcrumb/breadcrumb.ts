import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  readonly label: string;
  readonly link?: string;
}

@Component({
  selector: 'ui-breadcrumb',
  imports: [RouterLink],
  template: `
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb">
        @for (item of items(); track item.label; let last = $last) {
          <li>
            @if (item.link && !last) {
              <a [routerLink]="item.link">{{ item.label }}</a>
            } @else {
              <span [attr.aria-current]="last ? 'page' : null">{{ item.label }}</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: `
    .breadcrumb {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-2);
      padding: 0;
      margin: 0;
      color: var(--color-text-muted);
      font-size: var(--font-size-body-small);
      list-style: none;
    }

    li {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
    }

    li + li::before {
      color: var(--color-border-strong);
      content: '/';
    }

    a {
      color: var(--color-text-secondary);
      text-decoration: none;
    }

    a:hover {
      color: var(--color-text-primary);
      text-decoration: underline;
      text-underline-offset: 0.2em;
    }

    [aria-current='page'] {
      color: var(--color-text-primary);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  readonly items = input.required<readonly BreadcrumbItem[]>();
}
