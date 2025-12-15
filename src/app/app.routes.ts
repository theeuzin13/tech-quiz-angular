import { Routes } from '@angular/router';

export const routes: Routes = [
  // HOME
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },

  // LOGIN DO ADMIN (SEM SIDEBAR)
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },

  // ÁREA ADMIN PROTEGIDA PELO LAYOUT
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
      },
    ],
  },

  {
    path: 'quiz/:categoryId',
    loadComponent: () =>
      import('./pages/quiz/quiz.component').then(m => m.QuizComponent)
  },
  {
    path: 'quiz/:categoryId/result',
    loadComponent: () =>
      import('./pages/result/result.component').then(m => m.ResultComponent)
  },
  {
    path: 'quiz-empty',
    loadComponent: () =>
      import('./pages/quiz-empty/quiz-empty.component').then(
        m => m.QuizEmptyComponent
      )
  },
  {
    path: '**',
    redirectTo: '',
  }
];
