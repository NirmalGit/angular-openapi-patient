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
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div class="col-span-2 space-y-6">
          <app-patient-list></app-patient-list>
          <app-procedure-list></app-procedure-list>
        </div>
        <div class="space-y-6">
          <app-ai-assistant></app-ai-assistant>
          <app-recommendations></app-recommendations>
        </div>
      </div>
    </app-dashboard>
  `
})
export class DashboardShellComponent {}
