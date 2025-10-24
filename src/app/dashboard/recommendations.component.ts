import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  template: `
    <mat-card>
      <mat-card-header class="bg-gradient-to-r from-amber-50 to-orange-50 p-4">
        <mat-card-title class="flex items-center gap-2">
          <mat-icon class="text-amber-600">lightbulb</mat-icon>
          Intelligent Recommendations
        </mat-card-title>
      </mat-card-header>
      <mat-card-content class="p-6">
        <div *ngIf="recommendations()!.length > 0" class="space-y-3">
          <div *ngFor="let rec of recommendations()" class="p-4 border-l-4 border-amber-400 bg-amber-50 rounded">
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900">{{ rec.title }}</h4>
                <p class="text-sm text-gray-700 mt-1">{{ rec.description }}</p>
                <div class="flex gap-2 mt-3">
                  <mat-chip size="small" [highlighted]="rec.priority === 'High'">
                    {{ rec.priority }}
                  </mat-chip>
                  <mat-chip size="small" disabled>{{ rec.type }}</mat-chip>
                </div>
              </div>
              <button mat-icon-button matTooltip="View patient">
                <mat-icon class="text-amber-600">arrow_forward</mat-icon>
              </button>
            </div>
          </div>
        </div>
        <div *ngIf="recommendations()!.length === 0" class="text-center py-6 text-gray-500">
          No recommendations at this time
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class RecommendationsComponent {
  private mockDataService = inject(MockDataService);
  
  recommendations = signal<any[]>([]);

  constructor() {
    this.loadRecommendations();
  }

  loadRecommendations(): void {
    this.mockDataService.getTopRecommendations(5).subscribe({
      next: (recs: any[]) => {
        this.recommendations.set(recs);
      }
    });
  }
}

