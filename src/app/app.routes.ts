import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'surprise', loadComponent: () => import('./features/surprise/surprise.components').then(m => m.SurpriseComponent) },
  { path: 'notes-ai', loadComponent: () => import('./features/home/components/notes-ai/notes-ai.component').then(m => m.NotesAiComponent) }, // ✅
  
  { path: '**', redirectTo: '' }
];
