import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { HospitalStateStore } from '../state/hospital-state.store';

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
    MatIconModule
  ],
  template: `
    <mat-card class="h-full">
      <mat-card-header class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
        <mat-card-title class="flex items-center gap-2">
          <mat-icon class="text-blue-600">smart_toy</mat-icon>
          AI Assistant (Powered by Google Gemini)
        </mat-card-title>
      </mat-card-header>
      <mat-card-content class="p-6">
        <form (ngSubmit)="onAsk()" class="flex flex-col gap-3">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Ask a question about hospital workflow...</mat-label>
            <textarea matInput 
              [(ngModel)]="question" 
              name="question"
              rows="3"
              placeholder="E.g., What's the status of John Doe? What post-op care should Alice Johnson receive?"
              [disabled]="store.isLoading()">
            </textarea>
          </mat-form-field>
          
          <div class="flex gap-2">
            <button 
              mat-raised-button 
              color="primary" 
              type="submit"
              [disabled]="!question.trim() || store.isLoading()"
              class="flex-1 flex items-center justify-center gap-2">
              <mat-icon *ngIf="!store.isLoading()">send</mat-icon>
              <mat-progress-spinner *ngIf="store.isLoading()" diameter="20"></mat-progress-spinner>
              {{ store.isLoading() ? 'Thinking...' : 'Ask Gemini' }}
            </button>
            <button 
              mat-stroked-button 
              type="button"
              (click)="clearChat()"
              [disabled]="store.isLoading()">
              Clear
            </button>
          </div>
        </form>

        <!-- Error message -->
        <div *ngIf="store.error()" class="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          <strong>Error:</strong> {{ store.error() }}
        </div>

        <!-- AI Response -->
        <div *ngIf="store.aiResponse()" class="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
          <div class="flex items-start gap-3">
            <mat-icon class="text-blue-600 mt-1">info</mat-icon>
            <div class="flex-1">
              <p class="text-sm font-semibold text-gray-700 mb-2">Gemini Response:</p>
              <p class="text-gray-800 whitespace-pre-wrap">{{ store.aiResponse() }}</p>
            </div>
          </div>
        </div>

        <!-- Initial hint -->
        <div *ngIf="!store.aiResponse() && !store.isLoading()" class="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
          💡 <strong>Tip:</strong> Ask about patient status, procedures, recommendations, or hospital workflows. 
          Responses will be powered by Google Gemini AI.
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class AiAssistantComponent {
  store = inject(HospitalStateStore);
  
  question = '';

  onAsk(): void {
    if (this.question.trim()) {
      this.store.queryAiAssistant(this.question);
    }
  }

  clearChat(): void {
    this.question = '';
    this.store.aiResponse.set('');
    this.store.error.set(null);
  }
}
