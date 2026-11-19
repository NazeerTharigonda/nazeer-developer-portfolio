import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-divider',
  templateUrl: './divider.html',
  styleUrl: './divider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
}
