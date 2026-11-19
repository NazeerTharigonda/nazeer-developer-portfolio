import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'ui-dialog',
  template: `
    <dialog
      #dialog
      class="dialog"
      tabindex="-1"
      [attr.aria-labelledby]="id() + '-title'"
      (close)="openChange.emit(false)"
      (click)="closeOnBackdrop($event)"
      (keydown)="onKeydown($event)"
    >
      <header class="dialog__header">
        <h2 [id]="id() + '-title'">{{ title() }}</h2>
        <button class="dialog__close" type="button" aria-label="Close dialog" (click)="close()">
          <span aria-hidden="true">&times;</span>
        </button>
      </header>
      <div class="dialog__body"><ng-content /></div>
      <footer class="dialog__footer"><ng-content select="[uiDialogActions]" /></footer>
    </dialog>
  `,
  styles: `
    .dialog {
      width: min(100% - 2rem, 34rem);
      max-height: min(85dvh, 48rem);
      padding: 0;
      overflow: auto;
      color: var(--color-text-primary);
      background: var(--color-surface-elevated);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-modal);
    }

    .dialog[open] {
      animation: motion-scale-in var(--duration-fast) var(--ease-emphasized) both;
    }

    .dialog::backdrop {
      background: var(--color-overlay);
      animation: motion-fade-in var(--duration-fast) var(--ease-enter) both;
    }

    .dialog__header,
    .dialog__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
      padding: var(--space-5) var(--space-6);
    }

    .dialog__header {
      border-bottom: 1px solid var(--color-border);
    }

    .dialog__header h2 {
      font-size: var(--font-size-h4);
    }

    .dialog__body {
      padding: var(--space-6);
    }

    .dialog__footer {
      justify-content: flex-end;
      border-top: 1px solid var(--color-border);
    }

    .dialog__footer:empty {
      display: none;
    }

    .dialog__close {
      display: grid;
      width: 2.5rem;
      height: 2.5rem;
      flex: 0 0 auto;
      place-items: center;
      color: var(--color-text-secondary);
      font-size: 1.5rem;
      background: transparent;
      border: 0;
      border-radius: var(--radius-md);
    }

    .dialog__close:hover {
      background: var(--color-surface-hover);
    }

    @media (prefers-reduced-motion: reduce) {
      .dialog[open],
      .dialog::backdrop {
        animation: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  readonly id = input.required<string>();
  readonly title = input.required<string>();
  readonly open = input(false);
  readonly openChange = output<boolean>();

  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const element = this.dialog()?.nativeElement;
      if (!element) {
        return;
      }

      if (this.open() && !element.open) {
        element.showModal();
      } else if (!this.open() && element.open) {
        element.close();
      }
    });
  }

  protected close(): void {
    this.dialog()?.nativeElement.close();
  }

  protected closeOnBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }
}
