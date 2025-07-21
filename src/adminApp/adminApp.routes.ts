import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './adminApp';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivateChild: [() => inject(AuthGuard).canActivate()],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/user-management/user-management.component').then(m => m.UserManagementComponent),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/analytics/analytics.component').then(m => m.AnalyticsComponent),
      },
      // Add more admin routes here as needed
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
