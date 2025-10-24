import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PATIENTS, PROCEDURES, RECOMMENDATIONS } from '../dashboard/dummy-data';

/**
 * Mock Data Service
 * Phase 1: Returns mock data
 * Phase 2+: Replace with real API calls
 */
@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  
  /**
   * Get all patients
   */
  getPatients(): Observable<any[]> {
    return of([...PATIENTS]);
  }

  /**
   * Get single patient by ID
   */
  getPatientById(id: number): Observable<any> {
    const patient = PATIENTS.find((p: any) => p.id === id);
    return of(patient || null);
  }

  /**
   * Get all procedures
   */
  getProcedures(): Observable<any[]> {
    return of([...PROCEDURES]);
  }

  /**
   * Get procedures by patient ID
   */
  getProceduresByPatient(patientId: number): Observable<any[]> {
    const procedures = PROCEDURES.filter((p: any) => p.patientId === patientId);
    return of(procedures);
  }

  /**
   * Get single procedure by ID
   */
  getProcedureById(id: number): Observable<any> {
    const procedure = PROCEDURES.find((p: any) => p.id === id);
    return of(procedure || null);
  }

  /**
   * Get all recommendations
   */
  getRecommendations(): Observable<any[]> {
    return of([...RECOMMENDATIONS]);
  }

  /**
   * Get recommendations by patient ID
   */
  getRecommendationsByPatient(patientId: number): Observable<any[]> {
    const recs = RECOMMENDATIONS.filter((r: any) => r.patientId === patientId);
    return of(recs);
  }

  /**
   * Get top priority recommendations
   */
  getTopRecommendations(limit: number = 5): Observable<any[]> {
    const sorted = [...RECOMMENDATIONS].sort((a: any, b: any) => {
      const priorityOrder: any = { 'High': 1, 'Medium': 2, 'Low': 3 };
      return (priorityOrder[a.priority] || 999) - 
             (priorityOrder[b.priority] || 999);
    });
    return of(sorted.slice(0, limit));
  }

  /**
   * Search patients by name
   */
  searchPatients(query: string): Observable<any[]> {
    const results = PATIENTS.filter((p: any) => 
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    return of(results);
  }

  /**
   * Get statistics
   */
  getStatistics(): Observable<any> {
    return of({
      totalPatients: PATIENTS.length,
      admittedPatients: PATIENTS.filter((p: any) => p.status === 'Admitted').length,
      dischargedPatients: PATIENTS.filter((p: any) => p.status === 'Discharged').length,
      totalProcedures: PROCEDURES.length,
      completedProcedures: PROCEDURES.filter((p: any) => p.status === 'Completed').length
    });
  }
}
