import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { inject } from '@angular/core';
import { ApiService } from '../services/api.service';

/**
 * Hospital State Store
 * Centralized state management for the dashboard
 * Uses Angular Signals for reactive updates
 */
@Injectable({
  providedIn: 'root'
})
export class HospitalStateStore {
  private apiService = inject(ApiService);

  // State signals
  patients = signal<any[]>([]);
  procedures = signal<any[]>([]);
  recommendations = signal<string[]>([]);
  aiResponse = signal<string>('');
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.loadInitialData();
  }

  /**
   * Load initial data from API (dummy or real)
   */
  loadInitialData(): void {
    this.isLoading.set(true);
    
    this.apiService.getPatients().subscribe({
      next: (data: any) => {
        this.patients.set(data);
      },
      error: (err: any) => {
        this.error.set('Failed to load patients');
        console.error(err);
      }
    });

    this.apiService.getProcedures().subscribe({
      next: (data: any) => {
        this.procedures.set(data);
      },
      error: (err: any) => {
        this.error.set('Failed to load procedures');
        console.error(err);
      },
      complete: () => {
        this.isLoading.set(false);
        this.generateRecommendations();
      }
    });
  }

  /**
   * Query AI Assistant
   * Phase 1: Dummy response
   * Phase 2+: Real AI with API key
   */
  /**
   * Query AI Assistant (Google Gemini)
   * Phase 1: Dummy response
   * Phase 2+: Real Gemini AI with API key
   */
  queryAiAssistant(question: string): void {
    this.isLoading.set(true);
    
    this.apiService.askAiAssistant(question).subscribe({
      next: (response: any) => {
        // Parse Gemini response
        if (response.candidates && response.candidates[0]) {
          const text = response.candidates[0].content.parts[0].text;
          this.aiResponse.set(text);
        } else {
          this.aiResponse.set(response.response || 'No response from AI');
        }
      },
      error: (err: any) => {
        this.error.set('AI query failed: ' + (err.message || 'Unknown error'));
        console.error(err);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Generate intelligent recommendations (dummy logic for Phase 1)
   * Phase 2+: Will use AI or backend algorithms
   */
  generateRecommendations(): void {
    const recs = [
      'Schedule follow-up for John Doe (Knee Replacement)',
      'Review discharge summary for Jane Smith',
      'Check pre-op labs for Alice Johnson (Appendectomy)',
      `Review ${this.patients().length} active patients`
    ];
    this.recommendations.set(recs);
  }

  /**
   * Authenticate user and store API key/token
   * Phase 2+: Called on login
   */
  login(username: string, password: string): void {
    this.apiService.login(username, password).subscribe({
      next: (response: any) => {
        this.apiService.setAuthToken(response.token);
      },
      error: (err: any) => {
        this.error.set('Login failed');
        console.error(err);
      }
    });
  }

  /**
   * Logout and clear token
   */
  logout(): void {
    this.apiService.logout();
    this.patients.set([]);
    this.procedures.set([]);
  }
}
