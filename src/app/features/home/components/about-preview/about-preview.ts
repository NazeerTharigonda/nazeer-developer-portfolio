import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ImageComponent } from '../../../../shared/ui/image/image';
import { NavigationItemComponent } from '../../../../shared/ui/navigation-item/navigation-item';
import { SectionHeadingComponent } from '../../../../shared/ui/section-heading/section-heading';
import type { HomeAboutContent } from '../../models/home-content';

@Component({
  selector: 'app-about-preview',
  imports: [ImageComponent, NavigationItemComponent, SectionHeadingComponent],
  templateUrl: './about-preview.html',
  styleUrl: './about-preview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPreviewComponent {
  readonly content = input.required<HomeAboutContent>();
}
