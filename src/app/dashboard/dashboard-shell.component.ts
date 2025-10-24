import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { PatientListComponent } from './patient-list.component';
import { ProcedureListComponent } from './procedure-list.component';
import { AiAssistantComponent } from './ai-assistant.component';
import { RecommendationsComponent } from './recommendations.component';

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
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-2 sm:px-4 md:px-8 py-2 md:py-4" style="min-height: 0;">
        <!-- Column 1: Patient List -->
        <div class="mb-4 lg:mb-0 overflow-x-auto">
          <app-patient-list></app-patient-list>
        </div>
        <!-- Column 2: Procedures List -->
        <div class="mb-4 lg:mb-0 overflow-x-auto">
          <app-procedure-list></app-procedure-list>
        </div>
        <!-- Column 3: AI Assistant & Recommendations -->
        <div class="space-y-6 overflow-x-auto">
          <app-ai-assistant></app-ai-assistant>
          <app-recommendations></app-recommendations>
        </div>
      </div>
    </app-dashboard>
  `
})
export class DashboardShellComponent {}
