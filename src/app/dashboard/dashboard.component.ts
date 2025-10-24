import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { DashboardStateService } from '../services/dashboard-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  sidenavOpen = signal(true);
  sidenavMode = signal<'side' | 'over'>('side');

  private breakpointObserver = inject(BreakpointObserver);
  private dashboardState = inject(DashboardStateService);

  constructor() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        this.sidenavMode.set('over');
        this.sidenavOpen.set(false);
      } else {
        this.sidenavMode.set('side');
        this.sidenavOpen.set(true);
      }
    });
  }

  scrollToSection(sectionId: string): void {
    // Close sidenav on mobile after selection
    if (this.sidenavMode() === 'over') {
      this.sidenavOpen.set(false);
    }

    // Update active section in state service
    this.dashboardState.setActiveSection(sectionId);

    // Special handling for recommendations section
    if (sectionId === 'recommendations') {
      this.dashboardState.setRecommendationsVisibility(true);
      // Scroll to AI assistant section since recommendations will appear below it
      const element = document.querySelector(`[data-section="ai-assistant"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Hide recommendations when navigating to other sections
    if (sectionId !== 'recommendations') {
      this.dashboardState.setRecommendationsVisibility(false);
    }

    // Find and scroll to the section
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
