import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-gray-900">Patient Details</h1>
          <button mat-raised-button (click)="goBack()" class="flex items-center gap-2">
            <mat-icon>arrow_back</mat-icon>
            Back to Dashboard
          </button>
        </div>

        <!-- Patient Info Card -->
        <mat-card class="mb-6" *ngIf="patient()">
          <mat-card-content class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Left Column -->
              <div>
                <h2 class="text-2xl font-bold mb-4">{{ patient().name }}</h2>
                <div class="space-y-3">
                  <div>
                    <span class="text-gray-600">Age:</span>
                    <span class="ml-2 font-semibold">{{ patient().age }} years</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Email:</span>
                    <span class="ml-2 font-semibold">{{ patient().email }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Phone:</span>
                    <span class="ml-2 font-semibold">{{ patient().phone }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Status:</span>
                    <mat-chip-set>
                      <mat-chip [highlighted]="isStatusHighlight(patient().status)">
                        {{ patient().status }}
                      </mat-chip>
                    </mat-chip-set>
                  </div>
                </div>
              </div>

              <!-- Right Column -->
              <div>
                <h3 class="text-lg font-semibold mb-3">Admission Info</h3>
                <div class="space-y-3">
                  <div>
                    <span class="text-gray-600">Date Admitted:</span>
                    <span class="ml-2 font-semibold">{{ patient().dateAdmitted }}</span>
                  </div>
                  <div *ngIf="patient().dateDischarge">
                    <span class="text-gray-600">Date Discharged:</span>
                    <span class="ml-2 font-semibold">{{ patient().dateDischarge }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Emergency Contact:</span>
                    <span class="ml-2 font-semibold">{{ patient().emergencyContact }}</span>
                  </div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Medical History -->
        <mat-card class="mb-6" *ngIf="patient()">
          <mat-card-header class="bg-blue-50 p-4">
            <mat-card-title>Medical History</mat-card-title>
          </mat-card-header>
          <mat-card-content class="p-6">
            <div *ngIf="patient().medicalHistory && patient().medicalHistory.length > 0">
              <div class="flex flex-wrap gap-2">
                <mat-chip *ngFor="let condition of patient().medicalHistory" color="primary">
                  {{ condition }}
                </mat-chip>
              </div>
            </div>
            <div *ngIf="!patient().medicalHistory || patient().medicalHistory.length === 0" class="text-gray-500">
              No medical history on file
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Allergies -->
        <mat-card class="mb-6" *ngIf="patient()">
          <mat-card-header class="bg-red-50 p-4">
            <mat-card-title>Allergies & Warnings</mat-card-title>
          </mat-card-header>
          <mat-card-content class="p-6">
            <div *ngIf="patient().allergies && patient().allergies.length > 0">
              <div class="flex flex-wrap gap-2">
                <mat-chip *ngFor="let allergy of patient().allergies" color="warn">
                  {{ allergy }}
                </mat-chip>
              </div>
            </div>
            <div *ngIf="!patient().allergies || patient().allergies.length === 0" class="text-gray-500">
              No known allergies
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Procedures -->
        <mat-card *ngIf="procedures()">
          <mat-card-header class="bg-green-50 p-4">
            <mat-card-title>Associated Procedures</mat-card-title>
          </mat-card-header>
          <mat-card-content class="p-6">
            <div *ngIf="procedures()!.length > 0" class="space-y-4">
              <mat-card *ngFor="let proc of procedures()" class="bg-gray-50">
                <mat-card-content class="p-4">
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="font-semibold text-lg">{{ proc.name }}</h4>
                      <p class="text-sm text-gray-600 mt-1">{{ proc.description }}</p>
                      <div class="mt-3 space-y-2 text-sm">
                        <div><span class="text-gray-600">Type:</span> <span class="font-semibold">{{ proc.type }}</span></div>
                        <div><span class="text-gray-600">Surgeon:</span> <span class="font-semibold">{{ proc.surgeon }}</span></div>
                        <div><span class="text-gray-600">Duration:</span> <span class="font-semibold">{{ proc.duration }}</span></div>
                        <div><span class="text-gray-600">Scheduled:</span> <span class="font-semibold">{{ proc.scheduled }}</span></div>
                      </div>
                    </div>
                    <mat-chip [highlighted]="proc.status === 'Completed'">
                      {{ proc.status }}
                    </mat-chip>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
            <div *ngIf="!procedures() || procedures()!.length === 0" class="text-gray-500">
              No procedures on file
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class PatientDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private mockDataService = inject(MockDataService);

  patient = signal<any>(null);
  procedures = signal<any[]>([]);

  constructor() {
    this.loadPatientDetails();
  }

  loadPatientDetails(): void {
    const patientId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.mockDataService.getPatientById(patientId).subscribe({
      next: (patient: any) => {
        this.patient.set(patient);
      },
      error: () => {
        console.error('Patient not found');
        this.router.navigate(['/']);
      }
    });

    this.mockDataService.getProceduresByPatient(patientId).subscribe({
      next: (procedures: any[]) => {
        this.procedures.set(procedures);
      }
    });
  }

  isStatusHighlight(status: string): boolean {
    return status === 'Admitted' || status === 'In Progress';
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
