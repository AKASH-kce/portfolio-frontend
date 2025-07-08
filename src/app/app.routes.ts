import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about').then(m => m.About),
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./features/skills/skills.component').then(m => m.SkillsComponent),
  },
  {
    path: 'resume',
    loadComponent: () =>
      import('./features/resume/resume').then(m => m.Resume),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(m => m.Contact),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects.component').then(m => m.ProjectsComponent),
  },
  {
    path: 'testimonials',
    loadComponent: () =>
      import('./features/testimonials/testimonials').then(m => m.Testimonials),
  },
  {
    path: 'gallery',
    loadComponent: () =>
      import('./features/gallery/gallery').then(m => m.Gallery),
  },
  {
    path: 'experience',
    loadComponent: () => import('./features/experience/experience.component').then(m => m.ExperienceComponent),
  },
  // Optional: wildcard fallback
  {
    path: '**',
    redirectTo: '',
  },
];
