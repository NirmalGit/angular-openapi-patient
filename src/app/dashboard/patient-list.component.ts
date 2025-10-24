import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-card>
      <mat-card-header class="bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
        <mat-card-title class="flex items-center gap-2">
          <mat-icon class="text-blue-600">people</mat-icon>
          Patients
        </mat-card-title>
      </mat-card-header>
      
      <mat-card-content class="p-0">
        <div class="overflow-x-auto">
          <table mat-table [dataSource]="patients" class="w-full">
            <!-- Name Column -->
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let patient" class="cursor-pointer hover:bg-blue-50 py-2 px-4">
                <span class="text-blue-600 hover:underline" (click)="viewPatient(patient.id)">
                  {{ patient.name }}
                </span>
              </td>
            </ng-container>

            <!-- Age Column -->
            <ng-container matColumnDef="age">
              <th mat-header-cell *matHeaderCellDef>Age</th>
              <td mat-cell *matCellDef="let patient" class="py-2 px-4">{{ patient.age }}</td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let patient" class="py-2 px-4">
                <mat-chip-set aria-label="Status">
                  <mat-chip [ngClass]="getStatusClass(patient.status)">
                    {{ patient.status }}
                  </mat-chip>
                </mat-chip-set>
              </td>
            </ng-container>

            <!-- Procedure Column -->
            <ng-container matColumnDef="procedure">
              <th mat-header-cell *matHeaderCellDef>Current Procedure</th>
              <td mat-cell *matCellDef="let patient" class="py-2 px-4">{{ patient.procedure }}</td>
            </ng-container>

            <!-- Action Column -->
            <ng-container matColumnDef="action">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let patient" class="text-right py-2 px-4">
                <button mat-icon-button (click)="viewPatient(patient.id)">
                  <mat-icon class="text-blue-600">arrow_forward</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns" class="bg-gray-100"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="border-b"></tr>
          </table>
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class PatientListComponent {
  private router = inject(Router);
  private mockDataService = inject(MockDataService);

  patients: any[] = [];
  displayedColumns = ['name', 'age', 'status', 'procedure', 'action'];

  constructor() {
    this.mockDataService.getPatients().subscribe(data => {
      this.patients = data;
    });
  }

  viewPatient(id: number): void {
    this.router.navigate(['/patient', id]);
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'admitted':
        return 'bg-blue-100 text-blue-700';
      case 'discharged':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
