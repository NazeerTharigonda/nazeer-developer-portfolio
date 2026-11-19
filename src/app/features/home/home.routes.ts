import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home-page').then((page) => page.HomePageComponent),
  },
];
