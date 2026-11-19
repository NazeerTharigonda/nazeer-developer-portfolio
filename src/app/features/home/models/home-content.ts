import { InjectionToken, signal, type Signal } from '@angular/core';

export interface HomeImage {
  readonly src: string;
  readonly alt: string;
  readonly aspectRatio?: 'auto' | 'landscape' | 'portrait' | 'square';
}

export interface HomeRouteAction {
  readonly label: string;
  readonly route: string;
}

export interface HomeHeroContent {
  readonly heading?: string;
  readonly role?: string;
  readonly introduction?: string;
  readonly description?: string;
  readonly profileImage?: HomeImage;
  readonly primaryAction?: HomeRouteAction;
  readonly secondaryAction?: HomeRouteAction;
}

export interface HomeAboutContent {
  readonly heading?: string;
  readonly summary: string;
  readonly image?: HomeImage;
}

export interface HomeSkillCategory {
  readonly id: string;
  readonly name: string;
  readonly skills: readonly string[];
}

export interface HomeExperience {
  readonly id: string;
  readonly role: string;
  readonly organization: string;
  readonly startDate: string;
  readonly endDate?: string;
  readonly summary?: string;
}

export interface HomeFeaturedProject {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly image?: HomeImage;
  readonly technologies: readonly string[];
  readonly detailsRoute?: string;
  readonly externalUrl?: string;
}

export interface HomeCertification {
  readonly id: string;
  readonly title: string;
  readonly issuer: string;
  readonly issuedAt: string;
  readonly credentialUrl?: string;
}

export interface HomeStatistic {
  readonly id: string;
  readonly label: string;
  readonly value: string | number;
}

export interface HomeStatistics {
  readonly metrics: readonly HomeStatistic[];
}

export interface HomePageContent {
  readonly hero?: HomeHeroContent;
  readonly about?: HomeAboutContent;
  readonly skillCategories?: readonly HomeSkillCategory[];
  readonly experience?: readonly HomeExperience[];
  readonly featuredProjects?: readonly HomeFeaturedProject[];
  readonly certifications?: readonly HomeCertification[];
  readonly githubStatistics?: HomeStatistics;
  readonly leetcodeStatistics?: HomeStatistics;
}

export const HOME_PAGE_CONTENT = new InjectionToken<Signal<HomePageContent | null>>(
  'HOME_PAGE_CONTENT',
  {
    providedIn: 'root',
    factory: () => signal<HomePageContent | null>(null),
  },
);
