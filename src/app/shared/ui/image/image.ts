import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ImageAspectRatio = 'auto' | 'landscape' | 'portrait' | 'square';
export type ImageFit = 'cover' | 'contain';

@Component({
  selector: 'ui-image',
  template: `
    <div
      class="image-frame"
      [class.image-frame--landscape]="aspectRatio() === 'landscape'"
      [class.image-frame--portrait]="aspectRatio() === 'portrait'"
      [class.image-frame--square]="aspectRatio() === 'square'"
    >
      <img
        [src]="src()"
        [alt]="alt()"
        [attr.loading]="loading()"
        decoding="async"
        [style.object-fit]="fit()"
        [style.object-position]="objectPosition()"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
      max-width: 100%;
    }

    .image-frame {
      width: 100%;
      overflow: hidden;
      border-radius: var(--radius-lg);
    }

    .image-frame--landscape {
      aspect-ratio: 16 / 9;
    }

    .image-frame--portrait {
      aspect-ratio: 3 / 4;
    }

    .image-frame--square {
      aspect-ratio: 1;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }

    .image-frame--landscape img,
    .image-frame--portrait img,
    .image-frame--square img {
      height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  readonly src = input.required<string>();
  readonly alt = input.required<string>();
  readonly aspectRatio = input<ImageAspectRatio>('auto');
  readonly fit = input<ImageFit>('cover');
  readonly loading = input<'eager' | 'lazy'>('lazy');
  readonly objectPosition = input('center');
}
