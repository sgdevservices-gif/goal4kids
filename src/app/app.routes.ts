import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then(m => m.Home),
  },
  {
    path: 'o-nas',
    loadComponent: () => import('./o-nas/o-nas').then(m => m.ONas),
  },
  {
    path: 'projekty',
    loadComponent: () => import('./projekty/projekty').then(m => m.Projekty),
  },
  {
    path: 'kontakt',
    loadComponent: () => import('./kontakt/kontakt').then(m => m.Kontakt),
  },
  {
    path: 'posts/:slug',
    loadComponent: () => import('./post-detail/post-detail').then(m => m.PostDetail),
  },
];
