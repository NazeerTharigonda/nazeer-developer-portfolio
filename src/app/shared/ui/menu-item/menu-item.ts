import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'ui-menu-item',
  template: `
    <button
      class="menu-item"
      type="button"
      role="menuitem"
      [disabled]="disabled()"
      [class.menu-item--danger]="danger()"
      (click)="select()"
    >
      <ng-content />
    </button>
  `,
  styles: `
    .menu-item {
      display: flex;
      width: 100%;
      min-height: 2.75rem;
      align-items: center;
      padding: var(--space-2) var(--space-3);
      color: var(--color-text-secondary);
      text-align: left;
      background: transparent;
      border: 0;
      border-radius: var(--radius-sm);
    }

    .menu-item:hover:not(:disabled) {
      color: var(--color-text-primary);
      background: var(--color-interactive-hover);
    }

    .menu-item--danger {
      color: var(--color-error);
    }

    .menu-item:disabled {
      opacity: 0.5;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  private readonly element = inject(ElementRef<HTMLElement>);
  readonly disabled = input(false);
  readonly danger = input(false);
  readonly selected = output<void>();

  protected select(): void {
    this.selected.emit();

    const details = this.element.nativeElement.closest('details');
    if (details instanceof HTMLDetailsElement) {
      details.open = false;
      details.querySelector('summary')?.focus();
    }
  }
}
