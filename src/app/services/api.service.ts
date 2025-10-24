import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../config/environment';

// Placeholder for HttpClientModule - will be provided in app bootstrap

/**
 * API Service - Centralized API communication
 * Phase 1: Returns dummy data
 * Phase 2+: Will connect to real backend with API key authentication
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.api.baseUrl;
  private geminiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models';

  constructor(private http: HttpClient) {}

  /**
   * Get API headers with authentication token
   * For Phase 2+: Include Bearer token or API key
   */
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Phase 2+: Add JWT token if available (placeholder for now)
    // const token = localStorage.getItem('auth_token');
    // if (token) {
    //   headers = headers.set('Authorization', `Bearer ${token}`);
    // }

    return headers;
  }

  /**
   * Get patients from API
   * Phase 1: Returns dummy data
   * Phase 2+: Calls GraphQL/REST endpoint
   */
  getPatients(): Observable<any> {
    if (!environment.features.useRealApi) {
      // Phase 1: Return dummy data
      return new Observable(observer => {
        observer.next([
          { id: 1, name: 'John Doe', age: 45, status: 'Admitted', procedure: 'Knee Replacement' },
          { id: 2, name: 'Jane Smith', age: 60, status: 'Discharged', procedure: 'Cataract Surgery' },
          { id: 3, name: 'Alice Johnson', age: 32, status: 'Admitted', procedure: 'Appendectomy' }
        ]);
        observer.complete();
      });
    }

    // Phase 2+: Real API call
    return this.http.get(`${this.apiUrl}/patients`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get procedures from API
   * Phase 1: Returns dummy data
   * Phase 2+: Calls GraphQL/REST endpoint
   */
  getProcedures(): Observable<any> {
    if (!environment.features.useRealApi) {
      // Phase 1: Return dummy data
      return new Observable(observer => {
        observer.next([
          { id: 101, name: 'Knee Replacement', scheduled: '2025-10-25', patientId: 1 },
          { id: 102, name: 'Cataract Surgery', scheduled: '2025-10-20', patientId: 2 },
          { id: 103, name: 'Appendectomy', scheduled: '2025-10-24', patientId: 3 }
        ]);
        observer.complete();
      });
    }

    // Phase 2+: Real API call
    return this.http.get(`${this.apiUrl}/procedures`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Call Google Gemini AI Assistant
   * Phase 1: Returns dummy response
   * Phase 2+: Sends question to Gemini with API key
   */
  askAiAssistant(question: string): Observable<any> {
    if (environment.ai.useMockAiResponses) {
      // Mock response mode
      return new Observable(observer => {
        observer.next({ response: `Simulated AI response to: "${question}"` });
        observer.complete();
      });
    }

    // Use local proxy for Gemini requests
    const geminiUrl = 'http://localhost:3001/api/gemini';
    const payload = {
      contents: [
        {
          parts: [
            {
              text: question
            }
          ]
        }
      ]
    };

    return this.http.post(geminiUrl, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  /**
   * Login/authenticate user and get JWT token
   * Phase 2+: Called during user login to receive API key/token
   */
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/auth/login`, body);
  }

  /**
   * Store JWT token (called after successful login)
   * Phase 2+: Used for authentication
   */
  setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  /**
   * Get stored JWT token
   */
  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Clear auth token (on logout)
   */
  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
