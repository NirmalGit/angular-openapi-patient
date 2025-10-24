/**
 * Environment Configuration
 * Phase 1: Uses MOCK DATA ONLY - No Backend Required
 */

export const environment = {
  production: false,
  
  // Data Source Configuration
  dataSource: {
    useMockData: true,  // Phase 1: Use mock data service
    mockDataDelay: 200   // Simulate network latency (ms)
  },
  
  // API Configuration (for Phase 2+ Backend Integration)
  api: {
    baseUrl: 'http://localhost:3000/api',  // Not used in Phase 1
    graphqlEndpoint: 'http://localhost:3000/graphql',
    timeout: 30000
  },

  // Google Gemini AI Configuration
  ai: {
    // Gemini API Key is loaded at runtime from window["GEMINI_API_KEY"] for local/dev, or injected at build for prod
    geminiKey: (window as any)["GEMINI_API_KEY"] || '',
    geminiModel: 'gemini-2.0-flash',  // Latest model
    useMockAiResponses: false
  },

  // Feature Flags
  features: {
    useRealApi: false,         // Phase 1: false (mock data only)
    enableAiAssistant: true,
    enableRecommendations: true,
    enableRealTimeUpdates: false  // Phase 3+
  }
};
