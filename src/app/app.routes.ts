import { Routes } from '@angular/router';
import { DashboardShellComponent } from './dashboard/dashboard-shell.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardShellComponent,
    canActivate: [authGuard] // Using functional guard - Angular 20 feature
  },
  {
    path: 'patient/:id',
    loadComponent: () => import('./dashboard/patient-details.component').then(m => m.PatientDetailsComponent),
    canActivate: [authGuard],
    data: { preload: true } // New router data feature
  },
  {
    path: 'procedure/:id',
    loadComponent: () => import('./dashboard/procedure-details.component').then(m => m.ProcedureDetailsComponent),
    canActivate: [authGuard],
    data: { preload: true }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full' // Explicit pathMatch for clarity
  }
];
