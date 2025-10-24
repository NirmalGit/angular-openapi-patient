import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { Observable, map } from 'rxjs';

/**
 * Agentic Query Engine Service
 * Interprets natural language queries and executes intelligent searches
 * against mock data
 * 
 * Supports queries like:
 * - "Show all surgeries for Dr. Mehta this week"
 * - "List procedures for John Doe"
 * - "What post-operative care is recommended for patient X?"
 * - "Show all procedures scheduled for tomorrow"
 */
@Injectable({
  providedIn: 'root'
})
export class QueryEngineService {
  private mockDataService = inject(MockDataService);

  /**
   * Parse a natural language query and execute intelligent search
   */
  executeQuery(query: string): Observable<any> {
    // Normalize the query
    const normalizedQuery = query.toLowerCase().trim();

    // Extract intent and parameters
    const parsed = this.parseQuery(normalizedQuery);

    // Debug logging
    console.log('[QueryEngine] Query:', query);
    console.log('[QueryEngine] Normalized:', normalizedQuery);
    console.log('[QueryEngine] Parsed:', parsed);

    // Execute based on intent
    switch (parsed.intent) {
      case 'search_procedures_by_surgeon':
        console.log('[QueryEngine] Executing search_procedures_by_surgeon');
        return this.findProceduresBySurgeon(parsed.surgeon, parsed.dateRange);

      case 'search_procedures_by_patient':
        console.log('[QueryEngine] Executing search_procedures_by_patient');
        return this.findProceduresByPatient(parsed.patientName);

      case 'search_procedures_by_type':
        console.log('[QueryEngine] Executing search_procedures_by_type');
        return this.findProceduresByType(parsed.procedureType);

      case 'get_patient_info':
        console.log('[QueryEngine] Executing get_patient_info');
        return this.getPatientInfo(parsed.patientName);

      case 'search_patients_by_status':
        console.log('[QueryEngine] Executing search_patients_by_status with context:', parsed.context);
        return this.searchPatientsByStatus(parsed.context);

      case 'get_recommendations':
        console.log('[QueryEngine] Executing get_recommendations');
        return this.getRecommendations(parsed.context);

      case 'search_by_date':
        console.log('[QueryEngine] Executing search_by_date');
        return this.searchByDateRange(parsed.dateRange);

      case 'general_query':
      default:
        console.log('[QueryEngine] Executing general_query fallback');
        return this.handleGeneralQuery(normalizedQuery);
    }
  }

  /**
   * Parse natural language query to extract intent and parameters
   */
  private parseQuery(query: string): any {
    const result = {
      intent: 'general_query',
      surgeon: '',
      patientName: '',
      procedureType: '',
      dateRange: '',
      context: ''
    };

    console.log('[QueryEngine] Parsing query:', query);

    // Detect patients by status search (HIGHEST PRIORITY)
    if (this.matchesPattern(query, ['patients', 'patient', 'admitted', 'discharged', 'recovery'])) {
      console.log('[QueryEngine] Detected patient-related query');
      
      // Check if it's a status-specific search
      if (this.matchesPattern(query, ['discharge', 'discharged', 'admitted', 'pending', 'recovery', 'recovering'])) {
        result.intent = 'search_patients_by_status';
        result.context = this.extractPatientStatus(query);
        console.log('[QueryEngine] Status-specific patient search, context:', result.context);
      } else if (this.matchesPattern(query, ['all', 'show', 'list'])) {
        // General patient search - show all patients
        result.intent = 'search_patients_by_status';
        result.context = 'all';
        console.log('[QueryEngine] General patient search - showing all');
      } else {
        result.intent = 'search_patients_by_status';
        result.context = 'all';
        console.log('[QueryEngine] Default patient search - showing all');
      }
      return result; // Early return to prevent other matches
    }
    
    // Detect recommendations ONLY if no patient keywords found
    if (this.matchesPattern(query, ['recommend', 'recommendation', 'advice', 'suggest', 'preparation', 'pre-op', 'pre op']) && 
        !this.matchesPattern(query, ['patients', 'patient', 'admitted', 'discharged'])) {
      result.intent = 'get_recommendations';
      result.context = query;
      console.log('[QueryEngine] Detected recommendations query');
      return result;
    }
    
    // Detect surgeon search
    if (this.matchesPattern(query, ['surgeon', 'dr.', 'doctor', 'dr ', 'for dr'])) {
      result.intent = 'search_procedures_by_surgeon';
      result.surgeon = this.extractSurgeon(query);
      result.dateRange = this.extractDateRange(query);
      console.log('[QueryEngine] Detected surgeon search');
      return result;
    }
    
    // Detect specific patient search by name
    if (this.matchesPattern(query, ['john', 'jane', 'alice', 'robert', 'carol', 'maria']) && 
        this.matchesPattern(query, ['patient', 'for', 'procedures', 'info'])) {
      result.intent = 'search_procedures_by_patient';
      result.patientName = this.extractName(query);
      console.log('[QueryEngine] Detected patient-specific search');
      return result;
    }
    
    // Detect procedure type search
    if (this.matchesPattern(query, ['surgery', 'surgeries', 'procedure', 'procedures', 'operation'])) {
      if (this.matchesPattern(query, ['all', 'show', 'list'])) {
        result.intent = 'search_procedures_by_type';
        result.procedureType = this.extractProcedureType(query);
        console.log('[QueryEngine] Detected procedure type search');
        return result;
      }
    }
    
    // Detect date-based search
    if (this.matchesPattern(query, ['today', 'tomorrow', 'week', 'month', 'date', 'scheduled'])) {
      result.intent = 'search_by_date';
      result.dateRange = this.extractDateRange(query);
      console.log('[QueryEngine] Detected date-based search');
      return result;
    }
    
    // Detect patient info request
    if (this.matchesPattern(query, ['info', 'profile', 'details', 'history', 'medical'])) {
      result.intent = 'get_patient_info';
      result.patientName = this.extractName(query);
      console.log('[QueryEngine] Detected patient info request');
      return result;
    }

    console.log('[QueryEngine] No specific intent detected, using general query');
    return result;

    return result;
  }

  /**
   * Check if query matches any of the keywords
   */
  private matchesPattern(query: string, keywords: string[]): boolean {
    return keywords.some(keyword => query.includes(keyword));
  }

  /**
   * Extract surgeon name from query
   */
  private extractSurgeon(query: string): string {
    // Extract names like "Dr. Mehta", "Dr. Anderson", etc.
    const surgeonPattern = /(?:dr\.?\s+)?([a-z]+)/gi;
    const matches = query.match(surgeonPattern);
    
    if (matches && matches.length > 0) {
      // Get the last captured name (likely the surgeon)
      const lastName = matches[matches.length - 1]
        .replace(/^dr\.?\s*/i, '')
        .trim();
      return this.capitalizeFirstLetter(lastName);
    }
    return '';
  }

  /**
   * Extract patient name from query
   */
  private extractName(query: string): string {
    // Common patient names in mock data
    const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Robert Brown', 'Carol Davis'];
    
    for (const name of names) {
      if (query.toLowerCase().includes(name.toLowerCase())) {
        return name;
      }
    }

    // Try generic name extraction
    const namePattern = /(?:patient\s+)?([a-z]+(?:\s+[a-z]+)?)/i;
    const match = query.match(namePattern);
    
    if (match && match[1]) {
      return this.capitalizeFirstLetter(match[1]);
    }
    
    return '';
  }

  /**
   * Extract procedure type from query
   */
  private extractProcedureType(query: string): string {
    const procedures = [
      'Knee Replacement',
      'Cataract Surgery',
      'Appendectomy',
      'Hip Replacement',
      'Bypass Surgery'
    ];

    for (const proc of procedures) {
      if (query.toLowerCase().includes(proc.toLowerCase())) {
        return proc;
      }
    }

    return '';
  }

  /**
   * Extract date range from query (today, tomorrow, this week, etc.)
   */
  private extractDateRange(query: string): string {
    if (query.includes('today')) return 'today';
    if (query.includes('tomorrow')) return 'tomorrow';
    if (query.includes('this week')) return 'this_week';
    if (query.includes('next week')) return 'next_week';
    if (query.includes('this month')) return 'this_month';
    return '';
  }

  /**
   * Extract patient status from query
   */
  private extractPatientStatus(query: string): string {
    const lowerQuery = query.toLowerCase();
    
    console.log('[QueryEngine] Extracting status from query:', query);
    
    // Handle various forms of status queries - return capitalized versions to match data
    if (lowerQuery.includes('discharge') || lowerQuery.includes('discharged')) {
      console.log('[QueryEngine] Found discharged status');
      return 'Discharged';
    }
    if (lowerQuery.includes('admit') || lowerQuery.includes('admitted')) {
      console.log('[QueryEngine] Found admitted status');
      return 'Admitted';
    }
    if (lowerQuery.includes('recovery') || lowerQuery.includes('recovering') || lowerQuery.includes('in recovery')) {
      console.log('[QueryEngine] Found recovery status');
      return 'In Recovery';
    }
    if (lowerQuery.includes('pending')) {
      console.log('[QueryEngine] Found pending status');
      return 'Pending';
    }
    
    // Default to looking for any status if no specific one found
    console.log('[QueryEngine] No specific status found, defaulting to all');
    return 'all';
  }

  /**
   * Capitalize first letter of a string
   */
  private capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  /**
   * Find procedures by surgeon name
   */
  private findProceduresBySurgeon(
    surgeon: string,
    dateRange: string
  ): Observable<any> {
    return this.mockDataService.getProcedures().pipe(
      map(procedures => {
        let filtered = procedures.filter((p: any) =>
          p.surgeon.toLowerCase().includes(surgeon.toLowerCase())
        );

        // Filter by date range if specified
        if (dateRange) {
          filtered = this.filterByDateRange(filtered, dateRange);
        }

        return {
          type: 'procedures',
          count: filtered.length,
          data: filtered,
          summary: `Found ${filtered.length} procedure(s) by Dr. ${surgeon}${
            dateRange ? ` ${dateRange}` : ''
          }`
        };
      })
    );
  }

  /**
   * Find procedures by patient name
   */
  private findProceduresByPatient(patientName: string): Observable<any> {
    return this.mockDataService.getPatients().pipe(
      map(patients => {
        const patient = patients.find((p: any) =>
          p.name.toLowerCase().includes(patientName.toLowerCase())
        );

        if (!patient) {
          return {
            type: 'not_found',
            data: [],
            summary: `Patient "${patientName}" not found`
          };
        }

        return this.mockDataService.getProceduresByPatient(patient.id).pipe(
          map(procedures => ({
            type: 'procedures',
            patientId: patient.id,
            patientName: patient.name,
            count: procedures.length,
            data: procedures,
            summary: `Found ${procedures.length} procedure(s) for ${patient.name}`
          }))
        );
      })
    );
  }

  /**
   * Find procedures by type
   */
  private findProceduresByType(procedureType: string): Observable<any> {
    return this.mockDataService.getProcedures().pipe(
      map(procedures => {
        const filtered = procedures.filter((p: any) =>
          p.name.toLowerCase().includes(procedureType.toLowerCase())
        );

        return {
          type: 'procedures',
          procedureType: procedureType,
          count: filtered.length,
          data: filtered,
          summary: `Found ${filtered.length} ${procedureType} procedure(s)`
        };
      })
    );
  }

  /**
   * Get patient information
   */
  private getPatientInfo(patientName: string): Observable<any> {
    return this.mockDataService.getPatients().pipe(
      map(patients => {
        const patient = patients.find((p: any) =>
          p.name.toLowerCase().includes(patientName.toLowerCase())
        );

        if (!patient) {
          return {
            type: 'not_found',
            data: null,
            summary: `Patient "${patientName}" not found`
          };
        }

        return {
          type: 'patient_info',
          data: patient,
          summary: `Patient: ${patient.name}, Age: ${patient.age}, Status: ${patient.status}`
        };
      })
    );
  }

  /**
   * Search patients by status (admitted, discharged, etc.)
   */
  private searchPatientsByStatus(status: string): Observable<any> {
    return this.mockDataService.getPatients().pipe(
      map(patients => {
        let filtered;
        let summaryText;

        console.log('[QueryEngine] Searching patients by status:', status);
        console.log('[QueryEngine] Available patients:', patients.map(p => ({ name: p.name, status: p.status })));

        if (status === 'all') {
          // Show all patients if no specific status detected
          filtered = patients;
          summaryText = `Found all ${filtered.length} patient(s)`;
        } else {
          // Filter by specific status - exact match or partial match
          filtered = patients.filter((p: any) => {
            const patientStatus = p.status.toLowerCase();
            const searchStatus = status.toLowerCase();
            
            // Check for exact match or partial match
            return patientStatus === searchStatus || 
                   patientStatus.includes(searchStatus) ||
                   searchStatus.includes(patientStatus);
          });
          
          console.log('[QueryEngine] Filtered patients:', filtered.map(p => ({ name: p.name, status: p.status })));
          
          if (filtered.length === 0) {
            // If no patients found, provide helpful information
            const availableStatuses = [...new Set(patients.map((p: any) => p.status))];
            summaryText = `No patients found with status "${status}". Available statuses: ${availableStatuses.join(', ')}`;
          } else {
            summaryText = `Found ${filtered.length} patient(s) with status "${status}"`;
          }
        }

        return {
          type: 'patients',
          count: filtered.length,
          data: filtered,
          summary: summaryText
        };
      })
    );
  }

  /**
   * Get recommendations (context-aware)
   */
  private getRecommendations(context: string): Observable<any> {
    return this.mockDataService.getTopRecommendations(5).pipe(
      map(recommendations => ({
        type: 'recommendations',
        count: recommendations.length,
        data: recommendations,
        summary: `Top 5 recommendations based on current context`
      }))
    );
  }

  /**
   * Search by date range
   */
  private searchByDateRange(dateRange: string): Observable<any> {
    return this.mockDataService.getProcedures().pipe(
      map(procedures => {
        const filtered = this.filterByDateRange(procedures, dateRange);

        return {
          type: 'procedures',
          dateRange: dateRange,
          count: filtered.length,
          data: filtered,
          summary: `Found ${filtered.length} procedure(s) ${dateRange}`
        };
      })
    );
  }

  /**
   * Filter procedures by date range
   */
  private filterByDateRange(procedures: any[], dateRange: string): any[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return procedures.filter((p: any) => {
      const procDate = new Date(p.scheduled);
      procDate.setHours(0, 0, 0, 0);

      switch (dateRange) {
        case 'today':
          return procDate.getTime() === today.getTime();
        case 'tomorrow':
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          return procDate.getTime() === tomorrow.getTime();
        case 'this_week':
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(endOfWeek.getDate() + 6);
          return procDate >= startOfWeek && procDate <= endOfWeek;
        case 'next_week':
          const nextWeekStart = new Date(today);
          nextWeekStart.setDate(today.getDate() + (7 - today.getDay()));
          const nextWeekEnd = new Date(nextWeekStart);
          nextWeekEnd.setDate(nextWeekEnd.getDate() + 6);
          return procDate >= nextWeekStart && procDate <= nextWeekEnd;
        case 'this_month':
          return (
            procDate.getMonth() === today.getMonth() &&
            procDate.getFullYear() === today.getFullYear()
          );
        default:
          return true;
      }
    });
  }

  /**
   * Handle general queries with keyword matching
   */
  private handleGeneralQuery(query: string): Observable<any> {
    // If query mentions allergies, show a summary of patient allergies
    if (query.toLowerCase().includes('allergies')) {
      return this.mockDataService.getPatients().pipe(
        map(patients => {
          const allergySummary = patients
            .filter(p => p.allergies && p.allergies.length > 0)
            .map(p => `${p.name}: ${p.allergies.join(', ')}`)
            .join('\n');
          return {
            type: 'general_response',
            data: allergySummary,
            summary: allergySummary ? `Patient Allergies:\n${allergySummary}` : 'No patient allergies found.'
          };
        })
      );
    }
    // For unrecognized queries, return general insights
    return this.mockDataService.getStatistics().pipe(
      map(stats => ({
        type: 'general_response',
        data: stats,
        summary: `Hospital Status: ${stats.totalPatients} patients, ${stats.totalProcedures} procedures, undefined recommendations`
      }))
    );
  }
}
