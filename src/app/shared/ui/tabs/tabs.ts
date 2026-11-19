import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface TabItem {
  readonly id: string;
  readonly label: string;
  readonly disabled?: boolean;
}

@Component({
  selector: 'ui-tabs',
  template: `
    <div class="tabs" role="tablist" [attr.aria-label]="label()">
      @for (tab of tabs(); track tab.id; let index = $index) {
        <button
          class="tabs__tab"
          type="button"
          role="tab"
          [id]="tab.id + '-tab'"
          [attr.aria-controls]="tab.id + '-panel'"
          [attr.aria-selected]="activeId() === tab.id"
          [attr.tabindex]="activeId() === tab.id ? 0 : -1"
          [disabled]="tab.disabled ?? false"
          [class.is-active]="activeId() === tab.id"
          (click)="select(tab.id)"
          (keydown)="onKeydown($event, index)"
        >
          {{ tab.label }}
        </button>
      }
    </div>
  `,
  styles: `
    .tabs {
      display: flex;
      gap: var(--space-2);
      overflow-x: auto;
      border-bottom: 1px solid var(--color-border);
    }

    .tabs__tab {
      min-height: 2.75rem;
      padding: var(--space-2) var(--space-3);
      color: var(--color-text-secondary);
      white-space: nowrap;
      background: transparent;
      border: 0;
      border-bottom: 2px solid transparent;
    }

    .tabs__tab:hover:not(:disabled),
    .tabs__tab.is-active {
      color: var(--color-text-primary);
    }

    .tabs__tab.is-active {
      border-bottom-color: var(--color-brand-primary);
    }

    .tabs__tab:disabled {
      opacity: 0.5;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  readonly tabs = input.required<readonly TabItem[]>();
  readonly activeId = input.required<string>();
  readonly label = input('Sections');
  readonly activeIdChange = output<string>();

  protected select(id: string): void {
    const tab = this.tabs().find((item) => item.id === id);
    if (tab && !tab.disabled) {
      this.activeIdChange.emit(id);
    }
  }

  protected onKeydown(event: KeyboardEvent, currentIndex: number): void {
    const tabs = this.tabs();
    const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (direction === 0 && event.key !== 'Home' && event.key !== 'End') {
      return;
    }

    event.preventDefault();
    const step = event.key === 'Home' ? 1 : event.key === 'End' ? -1 : direction;
    let targetIndex =
      event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : currentIndex;

    for (let attempts = 0; attempts < tabs.length; attempts += 1) {
      if (event.key !== 'Home' && event.key !== 'End') {
        targetIndex = (targetIndex + step + tabs.length) % tabs.length;
      } else if (attempts > 0) {
        targetIndex += step;
      }

      const nextTab = tabs[targetIndex];
      if (
        nextTab &&
        !nextTab.disabled &&
        (event.key === 'Home' || event.key === 'End' || targetIndex !== currentIndex)
      ) {
        this.activeIdChange.emit(nextTab.id);
        document.getElementById(`${nextTab.id}-tab`)?.focus();
        return;
      }
    }
  }
}
