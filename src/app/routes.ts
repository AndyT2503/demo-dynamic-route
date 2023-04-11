import { Routes } from '@angular/router';
import { RedirectGuard } from './guard/redirect.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: '**',
    canActivate: [RedirectGuard],
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  }
];
