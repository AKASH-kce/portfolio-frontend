import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

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
    path: 'dashboard',
    loadComponent: () =>
      import('./features/user-management/user-management.component').then(m => m.UserManagementComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./features/analytics/analytics.component').then(m => m.AnalyticsComponent),
    canActivate: [AuthGuard]
  },
  // Add more admin routes here as needed
  {
    path: '**',
    redirectTo: 'login',
  },
];
