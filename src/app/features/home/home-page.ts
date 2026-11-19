import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AboutPreviewComponent } from './components/about-preview/about-preview';
import { ContactCtaComponent } from './components/contact-cta/contact-cta';
import { HOME_PAGE_CONTENT } from './models/home-content';
import { BadgeComponent } from '../../shared/ui/badge/badge';
import { CardComponent } from '../../shared/ui/card/card';
import { ImageComponent } from '../../shared/ui/image/image';
import { NavigationItemComponent } from '../../shared/ui/navigation-item/navigation-item';
import { SectionHeadingComponent } from '../../shared/ui/section-heading/section-heading';

@Component({
  selector: 'app-home-page',
  imports: [
    AboutPreviewComponent,
    BadgeComponent,
    CardComponent,
    ContactCtaComponent,
    ImageComponent,
    NavigationItemComponent,
    SectionHeadingComponent,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  protected readonly content = inject(HOME_PAGE_CONTENT);
  protected readonly skillCategories = computed(() => this.content()?.skillCategories ?? []);
  protected readonly experience = computed(() => this.content()?.experience ?? []);
  protected readonly featuredProjects = computed(() => this.content()?.featuredProjects ?? []);
  protected readonly certifications = computed(() => this.content()?.certifications ?? []);
  protected readonly githubStatistics = computed(() => this.content()?.githubStatistics ?? null);
  protected readonly leetcodeStatistics = computed(
    () => this.content()?.leetcodeStatistics ?? null,
  );
}
