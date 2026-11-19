import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface SegmentOption {
  readonly id: string;
  readonly label: string;
  readonly disabled?: boolean;
}

@Component({
  selector: 'ui-segmented-control',
  templateUrl: './segmented-control.html',
  styleUrl: './segmented-control.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedControlComponent {
  readonly label = input.required<string>();
  readonly options = input.required<readonly SegmentOption[]>();
  readonly selectedId = input.required<string>();
  readonly selectedIdChange = output<string>();

  protected isTabStop(option: SegmentOption): boolean {
    if (option.disabled) {
      return false;
    }

    const selected = this.options().find(
      (candidate) => candidate.id === this.selectedId() && !candidate.disabled,
    );
    return (selected ?? this.options().find((candidate) => !candidate.disabled))?.id === option.id;
  }

  protected select(id: string): void {
    const option = this.options().find((candidate) => candidate.id === id);
    if (option && !option.disabled) {
      this.selectedIdChange.emit(id);
    }
  }

  protected onKeydown(event: KeyboardEvent, currentId: string): void {
    const available = this.options().filter((option) => !option.disabled);
    if (available.length === 0) {
      return;
    }

    const direction =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? -1
          : 0;
    if (direction === 0 && event.key !== 'Home' && event.key !== 'End') {
      return;
    }

    const currentIndex = available.findIndex((option) => option.id === currentId);
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? available.length - 1
          : (currentIndex + direction + available.length) % available.length;
    const next = available[nextIndex];
    if (!next) {
      return;
    }

    event.preventDefault();
    this.select(next.id);

    const currentTarget = event.currentTarget;
    if (currentTarget instanceof HTMLButtonElement) {
      const buttons =
        currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
      const optionIndex = this.options().findIndex((option) => option.id === next.id);
      buttons?.[optionIndex]?.focus();
    }
  }
}
