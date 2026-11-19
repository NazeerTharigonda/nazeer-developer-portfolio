import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'ui-avatar',
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  readonly label = input.required<string>();
  readonly src = input('');
  readonly initials = input('');
  readonly size = input<'small' | 'medium' | 'large'>('medium');
  readonly loading = input<'eager' | 'lazy'>('lazy');

  protected readonly failedSource = signal('');
  protected readonly fallbackText = computed(() => {
    const initials = this.initials().trim();
    if (initials) {
      return initials;
    }

    return (
      this.label()
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join('')
        .toLocaleUpperCase() || '?'
    );
  });

  protected onImageError(): void {
    this.failedSource.set(this.src());
  }
}
