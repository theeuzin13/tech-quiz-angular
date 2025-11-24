import { Routes } from '@angular/router';

export const routes: Routes = [
  // HOME
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },

  // ADMIN
  {
    path: 'admin',
    loadComponent: () =>
      import('./shared/layout/main-layout/main-layout.component').then(
        m => m.MainLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'categories',
        pathMatch: 'full'
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/pages/list/list.component').then(
            m => m.ListComponent
          ),
      },
      {
        path: 'questions',
        loadComponent: () =>
          import('./features/questions/pages/list/list.component').then(
            m => m.ListComponent
          ),
      },
      {
        path: 'alternatives',
        loadComponent: () =>
          import('./features/alternatives/pages/list/list.component').then(
            m => m.ListComponent
          ),
      }
    ],
  }
];
