// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'stats', loadComponent: () => import('./features/stats/stats.component').then(m => m.statsComponent) },
  { path: 'surprise', loadComponent: () => import('./features/surprise/surprise.components').then(m => m.SurpriseComponent) },

  { path: '**', redirectTo: 'home' } // Catch-all route for 404
];