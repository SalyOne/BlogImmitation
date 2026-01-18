import { Routes } from '@angular/router';
import {MainLayout} from './core/layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      { path: 'posts', loadChildren: () =>
          import('./features/pages/post-list/post-list.routes').then(m => m.POST_ROUTES)
      },
      { path: 'about', loadChildren: () =>
          import('./features/pages/about/about.routes').then(m => m.ABOUT_ROUTES)
      },
    ]
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./features/pages/not-found/not-found').then(m => m.NotFound),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
