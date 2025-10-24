import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { PatientListComponent } from './patient-list.component';
import { ProcedureListComponent } from './procedure-list.component';
import { AiAssistantComponent } from './ai-assistant.component';
import { RecommendationsComponent } from './recommendations.component';
import { DashboardStateService } from '../services/dashboard-state.service';

@Component({
  selector: 'app-dashboard-shell',
  standalone: true,
  imports: [
    CommonModule,
    DashboardComponent,
    PatientListComponent,
    ProcedureListComponent,
    AiAssistantComponent,
    RecommendationsComponent
  ],
  template: `
    <app-dashboard>
      <!-- Mobile: Stack vertically, Desktop: 3-column layout -->
      <div class="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-7 gap-4 sm:gap-6 min-w-0">
        <!-- Column 1: Patient List (wider) -->
        <div class="mb-4 lg:mb-0 overflow-x-auto min-w-0 flex flex-col lg:col-span-2 xl:col-span-3" data-section="patients">
          <app-patient-list></app-patient-list>
        </div>
        <!-- Column 2: Procedures List -->
        <div class="mb-4 lg:mb-0 overflow-x-auto min-w-0 flex flex-col lg:col-span-2 xl:col-span-2" data-section="procedures">
          <app-procedure-list></app-procedure-list>
        </div>
        <!-- Column 3: AI Assistant & Recommendations (conditional) -->
        <div class="space-y-6 overflow-x-auto min-w-0 flex flex-col lg:col-span-1 xl:col-span-2">
          <div data-section="ai-assistant">
            <app-ai-assistant></app-ai-assistant>
          </div>
          <div *ngIf="showRecommendations()" data-section="recommendations">
            <app-recommendations></app-recommendations>
          </div>
        </div>
      </div>
    </app-dashboard>
  `
})
export class DashboardShellComponent {
  private dashboardState = inject(DashboardStateService);

  // Angular 20: Using computed signal for reactive visibility
  showRecommendations = this.dashboardState.isRecommendationsVisible;
}
