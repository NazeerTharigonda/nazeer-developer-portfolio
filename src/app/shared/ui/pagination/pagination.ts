import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'ui-pagination',
  template: `
    <nav class="pagination" [attr.aria-label]="label()">
      <button
        type="button"
        class="pagination__button"
        [disabled]="currentPage() <= 1"
        aria-label="Previous page"
        (click)="pageChange.emit(currentPage() - 1)"
      >
        Previous
      </button>
      @for (page of pages(); track page) {
        <button
          type="button"
          class="pagination__button pagination__number"
          [class.is-current]="page === currentPage()"
          [attr.aria-current]="page === currentPage() ? 'page' : null"
          [attr.aria-label]="'Page ' + page"
          (click)="pageChange.emit(page)"
        >
          {{ page }}
        </button>
      }
      <button
        type="button"
        class="pagination__button"
        [disabled]="currentPage() >= totalPages()"
        aria-label="Next page"
        (click)="pageChange.emit(currentPage() + 1)"
      >
        Next
      </button>
    </nav>
  `,
  styles: `
    .pagination {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-2);
    }

    .pagination__button {
      min-width: 2.75rem;
      min-height: 2.75rem;
      padding: var(--space-2) var(--space-3);
      color: var(--color-text-secondary);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }

    .pagination__button:hover:not(:disabled),
    .pagination__button.is-current {
      color: var(--color-text-primary);
      border-color: var(--color-brand-primary);
    }

    .pagination__button.is-current {
      background: var(--color-surface-elevated);
    }

    .pagination__button:disabled {
      opacity: 0.5;
    }

    @media (max-width: 480px) {
      .pagination__number {
        display: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  readonly currentPage = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly label = input('Pagination');
  readonly pageChange = output<number>();
  protected readonly pages = computed(() => {
    const count = Math.max(0, Math.floor(this.totalPages()));
    return Array.from({ length: Math.min(count, 7) }, (_, index) => {
      const firstVisible = Math.max(1, Math.min(this.currentPage() - 3, count - 6));
      return firstVisible + index;
    }).filter((page) => page <= count);
  });
}
