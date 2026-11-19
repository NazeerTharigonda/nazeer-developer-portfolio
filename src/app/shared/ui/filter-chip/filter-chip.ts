import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'ui-filter-chip',
  templateUrl: './filter-chip.html',
  styleUrl: './filter-chip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterChipComponent {
  readonly label = input.required<string>();
  readonly selected = input(false);
  readonly disabled = input(false);
  readonly selectedChange = output<boolean>();

  protected toggle(): void {
    if (!this.disabled()) {
      this.selectedChange.emit(!this.selected());
    }
  }
}
