/**
 * Environment Configuration - Angular 20 Features
 * Phase 1: Uses MOCK DATA ONLY - No Backend Required
 * Showcasing modern Angular patterns and features
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
    timeout: 30000,
    // Angular 20: Enhanced HTTP features
    useFetchApi: true,  // Use modern fetch API instead of XMLHttpRequest
    retryAttempts: 3    // Automatic retry configuration
  },

  // Google Gemini AI Configuration - Angular 20 Feature Showcase
  ai: {
    // Angular 20: Runtime environment variable loading with modern patterns
    geminiKey: (globalThis as any)["GEMINI_API_KEY"] || '',
    geminiModel: 'gemini-2.0-flash',  // Latest model
    useMockAiResponses: false,
    // Angular 20: Enhanced AI configuration
    maxTokens: 1000,
    temperature: 0.7,
    enableStreaming: true  // Real-time response streaming
  },

  // Feature Flags - Angular 20: Signal-based feature toggling
  features: {
    useRealApi: false,         // Phase 1: false (mock data only)
    enableAiAssistant: true,
    enableRecommendations: true,
    enableRealTimeUpdates: false,  // Phase 3+
    // Angular 20: New feature flags
    enableAdvancedSearch: true,
    enableOfflineMode: false,
    enableAnalytics: false
  },

  // Angular 20: Enhanced logging and debugging
  logging: {
    level: 'debug' as const,
    enableConsoleLogging: true,
    enableRemoteLogging: false,
    logPerformanceMetrics: true
  },

  // Angular 20: Modern build and deployment configuration
  build: {
    enableSourceMaps: true,
    enableBuildOptimizer: true,
    enableIvy: true,  // Always true in Angular 20
    enableAot: true   // Always true in modern Angular
  }
};
