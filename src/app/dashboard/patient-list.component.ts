import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PATIENTS } from './dummy-data';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule
  ],
  template: `
    <mat-card class="mb-4">
      <mat-card-header class="bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
        <mat-card-title>Active Patients ({{ patients.length }})</mat-card-title>
      </mat-card-header>
      <div class="overflow-x-auto">
        <table mat-table [dataSource]="patients" class="w-full">
          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef class="font-bold">Name</th>
            <td mat-cell *matCellDef="let patient" class="cursor-pointer hover:text-blue-600" 
              (click)="viewPatient(patient.id)">
              {{ patient.name }}
            </td>
          </ng-container>

          <!-- Age Column -->
          <ng-container matColumnDef="age">
            <th mat-header-cell *matHeaderCellDef class="font-bold">Age</th>
            <td mat-cell *matCellDef="let patient">{{ patient.age }}</td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef class="font-bold">Status</th>
            <td mat-cell *matCellDef="let patient">
              <mat-chip [highlighted]="patient.status === 'Admitted'">
                {{ patient.status }}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Procedure Column -->
          <ng-container matColumnDef="procedure">
            <th mat-header-cell *matHeaderCellDef class="font-bold">Procedure</th>
            <td mat-cell *matCellDef="let patient">{{ patient.procedure }}</td>
          </ng-container>

          <!-- Action Column -->
          <ng-container matColumnDef="action">
            <th mat-header-cell *matHeaderCellDef class="font-bold">Action</th>
            <td mat-cell *matCellDef="let patient">
              <button mat-mini-fab (click)="viewPatient(patient.id)" matTooltip="View Details">
                <mat-icon>arrow_forward</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </mat-card>
  `
})
export class PatientListComponent {
  private router = inject(Router);
  
  patients = PATIENTS;
  displayedColumns = ['name', 'age', 'status', 'procedure', 'action'];

  viewPatient(id: number): void {
    this.router.navigate(['/patient', id]);
  }
}
  template: `
    <mat-card class="mb-4">
      <mat-card-header class="bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
        <mat-card-title>Active Patients ({{ patients.length }})</mat-card-title>
      </mat-card-header>
      <div class="overflow-x-auto">
        <table mat-table [dataSource]="patients" class="w-full">
          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef class="font-bold">Name</th>
            <td mat-cell *matCellDef="let patient" class="cursor-pointer hover:text-blue-600" 
              (click)="viewPatient(patient.id)">
              {{ patient.name }}
            </td>
          </ng-container>

          <!-- Age Column -->
          <ng-container matColumnDef="age">
            <th mat-header-cell *matHeaderCellDef class="font-bold">Age</th>
            <td mat-cell *matCellDef="let patient">{{ patient.age }}</td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef class="font-bold">Status</th>
            <td mat-cell *matCellDef="let patient">
              <mat-chip [highlighted]="patient.status === 'Admitted'">
                {{ patient.status }}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Procedure Column -->
          <ng-container matColumnDef="procedure">
            <th mat-header-cell *matHeaderCellDef class="font-bold">Procedure</th>
            <td mat-cell *matCellDef="let patient">{{ patient.procedure }}</td>
          </ng-container>

          <!-- Action Column -->
          <ng-container matColumnDef="action">
            <th mat-header-cell *matHeaderCellDef class="font-bold">Action</th>
            <td mat-cell *matCellDef="let patient">
              <button mat-mini-fab (click)="viewPatient(patient.id)" matTooltip="View Details">
                <mat-icon>arrow_forward</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </mat-card>
  `
})
export class PatientListComponent {
  private router = inject(Router);
  
  patients = PATIENTS;
  displayedColumns = ['name', 'age', 'status', 'procedure', 'action'];

  viewPatient(id: number): void {
    this.router.navigate(['/patient', id]);
  }
}
