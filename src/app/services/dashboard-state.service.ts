import { Injectable, signal, computed, inject } from '@angular/core';

/**
 * Dashboard State Service - Angular 20 Modern Features
 * Uses signals and computed values for reactive state management
 */
@Injectable({
  providedIn: 'root'
})
export class DashboardStateService {
  // Angular 20: Signal-based state management
  showRecommendations = signal(false);
  activeSection = signal<string>('patients');

  // Angular 20: Computed signals for derived state
  isRecommendationsVisible = computed(() => this.showRecommendations());
  currentSection = computed(() => this.activeSection());

  // Angular 20: Methods to update state
  setRecommendationsVisibility(visible: boolean): void {
    this.showRecommendations.set(visible);
  }

  setActiveSection(section: string): void {
    this.activeSection.set(section);
  }

  toggleRecommendations(): void {
    this.showRecommendations.update(current => !current);
  }
}