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
    // Gemini API Key - Get from: https://aistudio.google.com/app/apikey
    // Phase 1: Leave empty (using mock responses)
    // Phase 2: Add your actual API key here or via environment variable
    geminiKey: '',
    geminiModel: 'gemini-1.5-pro',  // or 'gemini-1.5-flash'
    
    // Phase 1: Use mock AI responses (no API key needed)
    useMockAiResponses: true
  },

  // Feature Flags
  features: {
    useRealApi: false,         // Phase 1: false (mock data only)
    enableAiAssistant: true,
    enableRecommendations: true,
    enableRealTimeUpdates: false  // Phase 3+
  }
};
