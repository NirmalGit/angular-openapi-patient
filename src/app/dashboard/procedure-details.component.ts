import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-procedure-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-gray-900">Procedure Details</h1>
          <button mat-raised-button (click)="goBack()" class="flex items-center gap-2">
            <mat-icon>arrow_back</mat-icon>
            Back to Dashboard
          </button>
        </div>

        <!-- Procedure Info Card -->
        <mat-card *ngIf="procedure()">
          <mat-card-content class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Left Column -->
              <div>
                <h2 class="text-2xl font-bold mb-4">{{ procedure().name }}</h2>
                <p class="text-gray-600 mb-4">{{ procedure().description }}</p>
                <div class="space-y-3">
                  <div>
                    <span class="text-gray-600">Type:</span>
                    <span class="ml-2 font-semibold">{{ procedure().type }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Surgeon:</span>
                    <span class="ml-2 font-semibold">{{ procedure().surgeon }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Duration:</span>
                    <span class="ml-2 font-semibold">{{ procedure().duration }}</span>
                  </div>
                </div>
              </div>

              <!-- Right Column -->
              <div>
                <h3 class="text-lg font-semibold mb-3">Scheduling Info</h3>
                <div class="space-y-3">
                  <div>
                    <span class="text-gray-600">Scheduled Date:</span>
                    <span class="ml-2 font-semibold">{{ procedure().scheduled }}</span>
                  </div>
                  <div *ngIf="procedure().completedDate">
                    <span class="text-gray-600">Completed Date:</span>
                    <span class="ml-2 font-semibold">{{ procedure().completedDate }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Status:</span>
                    <mat-chip-set>
                      <mat-chip [highlighted]="isStatusActive(procedure().status)">
                        {{ procedure().status }}
                      </mat-chip>
                    </mat-chip-set>
                  </div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Patient Info -->
        <mat-card class="mt-6" *ngIf="patient()">
          <mat-card-header class="bg-blue-50 p-4">
            <mat-card-title>Patient Information</mat-card-title>
          </mat-card-header>
          <mat-card-content class="p-6">
            <button mat-stroked-button (click)="goToPatient()" class="mb-4">
              View Full Patient Details →
            </button>
            <div class="space-y-2">
              <div>
                <span class="text-gray-600">Name:</span>
                <span class="ml-2 font-semibold">{{ patient().name }}</span>
              </div>
              <div>
                <span class="text-gray-600">Age:</span>
                <span class="ml-2 font-semibold">{{ patient().age }} years</span>
              </div>
              <div>
                <span class="text-gray-600">Status:</span>
                <span class="ml-2 font-semibold">{{ patient().status }}</span>
              </div>
              <div>
                <span class="text-gray-600">Contact:</span>
                <span class="ml-2 font-semibold">{{ patient().phone }}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class ProcedureDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private mockDataService = inject(MockDataService);

  procedure = signal<any>(null);
  patient = signal<any>(null);

  constructor() {
    this.loadProcedureDetails();
  }

  loadProcedureDetails(): void {
    const procedureId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.mockDataService.getProcedureById(procedureId).subscribe({
      next: (procedure: any) => {
        this.procedure.set(procedure);
        // Load associated patient
        if (procedure && procedure.patientId) {
          this.mockDataService.getPatientById(procedure.patientId).subscribe({
            next: (patient: any) => {
              this.patient.set(patient);
            }
          });
        }
      },
      error: () => {
        console.error('Procedure not found');
        this.router.navigate(['/']);
      }
    });
  }

  isStatusActive(status: string): boolean {
    return status === 'In Progress' || status === 'Pending';
  }

  goToPatient(): void {
    if (this.patient()) {
      this.router.navigate(['/patient', this.patient().id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
