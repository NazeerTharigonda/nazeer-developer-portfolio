import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layout/admin-layout/admin-layout';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.routes').then((feature) => feature.ADMIN_DASHBOARD_ROUTES),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.routes').then((feature) => feature.ADMIN_PROFILE_ROUTES),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./projects/projects.routes').then((feature) => feature.ADMIN_PROJECTS_ROUTES),
      },
      {
        path: 'certifications',
        loadChildren: () =>
          import('./certifications/certifications.routes').then(
            (feature) => feature.ADMIN_CERTIFICATIONS_ROUTES,
          ),
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('./blog/blog.routes').then((feature) => feature.ADMIN_BLOG_ROUTES),
      },
    ],
  },
];
