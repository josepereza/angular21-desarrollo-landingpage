import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page.component').then((m) => m.HomePageComponent),
    title: 'Goldwert Landingpages'
  },
  {
    path: 'impressum',
    loadComponent: () =>
      import('./pages/impressum-page.component').then((m) => m.ImpressumPageComponent),
    title: 'Impressum | Goldwert Landingpages'
  },
  {
    path: 'cookies',
    loadComponent: () =>
      import('./pages/cookies-page.component').then((m) => m.CookiesPageComponent),
    title: 'Cookies | Goldwert Landingpages'
  },
  {
    path: 'agb',
    loadComponent: () => import('./pages/agb-page.component').then((m) => m.AgbPageComponent),
    title: 'AGB | Goldwert Landingpages'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
