import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { PROCEDURES, PATIENTS } from './dummy-data';

@Component({
  selector: 'app-procedure-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  template: `
    <mat-card class="mb-4">
      <h2 class="text-lg font-semibold mb-2">Procedures</h2>
      <table mat-table [dataSource]="procedures" class="min-w-full">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let procedure">{{procedure.name}}</td>
        </ng-container>
        <ng-container matColumnDef="scheduled">
          <th mat-header-cell *matHeaderCellDef>Scheduled</th>
          <td mat-cell *matCellDef="let procedure">{{procedure.scheduled}}</td>
        </ng-container>
        <ng-container matColumnDef="patient">
          <th mat-header-cell *matHeaderCellDef>Patient</th>
          <td mat-cell *matCellDef="let procedure">{{getPatientName(procedure.patientId)}}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </mat-card>
  `
})
export class ProcedureListComponent {
  procedures = PROCEDURES;
  displayedColumns = ['name', 'scheduled', 'patient'];
  getPatientName(id: number) {
    return PATIENTS.find(p => p.id === id)?.name || '';
  }
}
