import { Routes } from '@angular/router';
import { DashboardShellComponent } from './dashboard/dashboard-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardShellComponent
  },
  {
    path: 'patient/:id',
    loadComponent: () => import('./dashboard/patient-details.component').then(m => m.PatientDetailsComponent)
  },
  {
    path: 'procedure/:id',
    loadComponent: () => import('./dashboard/procedure-details.component').then(m => m.ProcedureDetailsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
