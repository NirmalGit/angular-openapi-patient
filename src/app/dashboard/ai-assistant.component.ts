import { Component, inject, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { QueryEngineService } from '../services/query-engine.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SmartDatePipe } from '../shared/smart-date.pipe';

/**
 * Intelligent Query Assistant Component
 * 
 * Features:
 * - Natural language query input
 * - Agentic intent parsing
 * - Contextual results rendering
 * - Multiple result types (procedures, patients, recommendations, etc.)
 * 
 * Example queries:
 * - "Show all surgeries for Dr. Mehta this week"
 * - "List procedures for John Doe"
 * - "Get recommendations for patient X"
 * - "Show all procedures scheduled for tomorrow"
 */
@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatChipsModule,
    MatTableModule,
    SmartDatePipe // Angular 20: Modern standalone pipe
  ],
  template: `
  <mat-card class="flex flex-col h-full w-full min-w-0 p-2 sm:p-4" style="box-sizing: border-box;">
  <mat-card-header class="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 sm:p-4">
        <mat-card-title class="flex items-center gap-2">
          <mat-icon class="text-blue-600">smart_toy</mat-icon>
          Intelligent Query Assistant
        </mat-card-title>
      </mat-card-header>

  <mat-card-content class="flex flex-col flex-1 p-2 sm:p-4 md:p-6 overflow-x-auto">
        <!-- Query Input -->
  <form (ngSubmit)="onAsk()" class="flex flex-col gap-3 mb-4 w-full">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Ask about patients, procedures, doctors...</mat-label>
            <textarea 
              matInput 
              [(ngModel)]="question" 
              name="question"
              rows="3"
              placeholder="E.g.:
 Show all surgeries for Dr. Mehta this week
 List procedures for John Doe
 What recommendations for patient X?
 Show all procedures scheduled for tomorrow"
              [disabled]="isLoading()"
              class="resize-y min-h-[60px] max-h-[180px]">
            </textarea>
          </mat-form-field>
          
          <div class="flex gap-2">
            <button 
              mat-raised-button 
              color="primary" 
              type="submit"
              [disabled]="!question.trim() || isLoading()"
              class="flex-1 flex items-center justify-center gap-2">
              <mat-icon *ngIf="!isLoading()">search</mat-icon>
              <mat-progress-spinner *ngIf="isLoading()" diameter="20"></mat-progress-spinner>
              {{ isLoading() ? 'Searching...' : 'Search' }}
            </button>
            <button 
              mat-stroked-button 
              type="button"
              (click)="clearChat()"
              [disabled]="isLoading()">
              Clear
            </button>
          </div>
        </form>

        <!-- Query Examples -->
        <div class="mb-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded text-sm text-gray-700">
          <p class="font-semibold mb-2">💡 Try asking:</p>
          <div class="space-y-1 text-xs">
            <p>• "Show all surgeries for Dr. Mehta"</p>
            <p>• "List procedures for John Doe"</p>
            <p>• "Show all procedures this week"</p>
            <p>• "Get recommendations"</p>
          </div>
        </div>

        <!-- Error Display -->
        <div *ngIf="error()" class="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          <strong>Error:</strong> {{ error() }}
        </div>

        <!-- Results Display -->
        <div *ngIf="results()" class="mt-4 space-y-3 max-h-96 overflow-y-auto">
          <!-- Result Summary -->
          <div class="p-3 bg-blue-50 border-l-4 border-blue-500 rounded text-sm">
            <p class="font-semibold text-gray-900">{{ results().summary }}</p>
          </div>

        @switch (results().type) {
          @case ('procedures') {
            @let procedureData = results().data;
            <!-- Procedure Results -->
            <div *ngIf="procedureData && procedureData.length > 0" class="space-y-2">
              <h3 class="font-semibold text-gray-900 text-sm mb-2">Procedures Found ({{ procedureData.length }})</h3>
              <div class="space-y-2 max-h-48 overflow-y-auto">
                <div *ngFor="let proc of procedureData" class="p-2 bg-gray-50 border border-gray-200 rounded text-xs">
                  <div class="font-semibold text-gray-900">{{ proc.name }}</div>
                  <div class="text-gray-600 mt-1 space-y-1">
                    <p><strong>Surgeon:</strong> {{ proc.surgeon }}</p>
                    <p><strong>Duration:</strong> {{ proc.duration }}</p>
                      <p><strong>Scheduled:</strong> {{ proc.scheduled | smartDate }}</p>
                    <p><strong>Status:</strong> <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{{ proc.status }}</span></p>
                  </div>
                </div>
              </div>
            </div>
          }
            @case ('patients') {
              <!-- Patients List Results -->
              <div *ngIf="results().data && results().data.length > 0" class="space-y-2">
                <h3 class="font-semibold text-gray-900 text-sm mb-2">Patients Found ({{ results().data.length }})</h3>
                <div class="space-y-2 max-h-48 overflow-y-auto">
                  <div *ngFor="let patient of results().data" class="p-2 bg-green-50 border border-green-200 rounded text-xs">
                    <div class="font-semibold text-gray-900">{{ patient.name }}</div>
                    <div class="text-gray-600 mt-1 space-y-1">
                      <p><strong>Age:</strong> {{ patient.age }}</p>
                      <p><strong>Status:</strong> <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">{{ patient.status }}</span></p>
                      <p><strong>Current Procedure:</strong> {{ patient.procedure }}</p>
                      <p *ngIf="patient.medicalHistory && patient.medicalHistory.length > 0">
                        <strong>Medical History:</strong> {{ patient.medicalHistory.join(', ') }}
                      </p>
                      <p *ngIf="patient.allergies && patient.allergies.length > 0" class="text-red-600">
                        <strong>⚠️ Allergies:</strong> {{ patient.allergies.join(', ') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            }
            @case ('patient_info') {
              <!-- Patient Info Results -->
              <div *ngIf="results().data" class="space-y-2">
                <h3 class="font-semibold text-gray-900 text-sm mb-2">Patient Information</h3>
                <div class="p-3 bg-blue-50 border border-blue-200 rounded text-xs space-y-1">
                  <p><strong>Name:</strong> {{ results().data.name }}</p>
                  <p><strong>Age:</strong> {{ results().data.age }}</p>
                  <p><strong>Status:</strong> {{ results().data.status }}</p>
                  <p><strong>Email:</strong> {{ results().data.email }}</p>
                  <p><strong>Phone:</strong> {{ results().data.phone }}</p>
                  <p *ngIf="results().data.medicalHistory && results().data.medicalHistory.length > 0">
                    <strong>Medical History:</strong> {{ results().data.medicalHistory.join(', ') }}
                  </p>
                  <p *ngIf="results().data.allergies && results().data.allergies.length > 0">
                    <strong>Allergies:</strong> {{ results().data.allergies.join(', ') }}
                  </p>
                </div>
              </div>
            }
            @case ('recommendations') {
              <!-- Recommendations Results -->
              <div *ngIf="results().data && results().data.length > 0" class="space-y-2">
                <h3 class="font-semibold text-gray-900 text-sm mb-2">Query Results ({{ results().data.length }})</h3>
                <div class="space-y-2 max-h-48 overflow-y-auto">
                  <div *ngFor="let rec of results().data" class="p-2 bg-amber-50 border-l-4 border-amber-400 rounded text-xs">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="font-semibold text-gray-900">{{ rec.title }}</div>
                        <p class="text-gray-700 mt-1">{{ rec.description }}</p>
                      </div>
                      <mat-chip-set aria-label="Priority" class="ml-2">
                        <mat-chip [ngClass]="getPriorityClass(rec.priority)" class="text-xs">
                          {{ rec.priority }}
                        </mat-chip>
                      </mat-chip-set>
                    </div>
                  </div>
                </div>
                <div class="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                  💡 <strong>Note:</strong> For full recommendations, click the "Recommendations" menu item.
                </div>
              </div>
            }
            @case ('not_found') {
              <!-- Not Found -->
              <div class="p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 text-sm">
                <p>{{ results().summary }}</p>
                <p class="mt-2 text-xs">Try a different search query</p>
              </div>
            }
            @case ('general_response') {
              <!-- General Response -->
              <div class="p-4 bg-green-50 border border-green-200 rounded">
                <div class="text-sm text-gray-800 whitespace-pre-wrap">
                  {{ results().summary }}
                </div>
              </div>
            }
            @default {
              <!-- Default case for any other result types -->
              <div class="p-4 bg-gray-50 border border-gray-200 rounded">
                <div class="text-sm text-gray-800">
                  {{ results().summary }}
                </div>
              </div>
            }
          }
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class AiAssistantComponent {
  private queryEngine = inject(QueryEngineService);
  private destroyRef = inject(DestroyRef); // Angular 20 feature for automatic cleanup

  question = '';
  isLoading = signal(false);
  error = signal<string | null>(null);
  results = signal<any>(null);

  onAsk(): void {
    if (!this.question.trim()) return;

    this.isLoading.set(true);
    this.error.set(null);
    this.results.set(null);

    // Execute query through agentic engine with automatic cleanup
    this.queryEngine.executeQuery(this.question)
      .pipe(takeUntilDestroyed(this.destroyRef)) // Angular 20: Automatic subscription cleanup
      .subscribe({
        next: (result) => {
          console.log('[AI Assistant] Received result:', result);
          console.log('[AI Assistant] Result type:', result.type);
          console.log('[AI Assistant] Result data length:', result.data?.length);
          this.results.set(result);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Query execution error:', err);
          this.error.set('Failed to execute query. Please try again.');
          this.isLoading.set(false);
        }
      });
  }

  clearChat(): void {
    this.question = '';
    this.results.set(null);
    this.error.set(null);
  }

  getPriorityClass(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
