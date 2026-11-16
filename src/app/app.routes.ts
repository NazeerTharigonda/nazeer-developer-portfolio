import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.routes').then((feature) => feature.HOME_ROUTES),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./features/about/about.routes').then((feature) => feature.ABOUT_ROUTES),
  },
  {
    path: 'experience',
    loadChildren: () =>
      import('./features/experience/experience.routes').then(
        (feature) => feature.EXPERIENCE_ROUTES,
      ),
  },
  {
    path: 'skills',
    loadChildren: () =>
      import('./features/skills/skills.routes').then((feature) => feature.SKILLS_ROUTES),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./features/projects/projects.routes').then((feature) => feature.PROJECTS_ROUTES),
  },
  {
    path: 'certifications',
    loadChildren: () =>
      import('./features/certifications/certifications.routes').then(
        (feature) => feature.CERTIFICATIONS_ROUTES,
      ),
  },
  {
    path: 'education',
    loadChildren: () =>
      import('./features/education/education.routes').then((feature) => feature.EDUCATION_ROUTES),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./features/blog/blog.routes').then((feature) => feature.BLOG_ROUTES),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./features/contact/contact.routes').then((feature) => feature.CONTACT_ROUTES),
  },
  {
    path: 'github-stats',
    loadChildren: () =>
      import('./features/github-stats/github-stats.routes').then(
        (feature) => feature.GITHUB_STATS_ROUTES,
      ),
  },
  {
    path: 'leetcode-stats',
    loadChildren: () =>
      import('./features/leetcode-stats/leetcode-stats.routes').then(
        (feature) => feature.LEETCODE_STATS_ROUTES,
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((feature) => feature.ADMIN_ROUTES),
  },
];
