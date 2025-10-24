# API Key & Authentication Integration Guide

## Current Phase (Phase 1)
**Status**: POC with dummy JSON data - NO API keys needed yet

## Where API Keys Will Go (Phase 2+)

### 1. **Environment Configuration** (`src/app/config/environment.ts`)
```typescript
export const environment = {
  auth: {
    openaiKey: '',      // For AI Assistant (Phase 2+)
    anthropicKey: '',   // Alternative AI provider
    tokenKey: 'auth_token'  // JWT storage key
  },
  api: {
    baseUrl: 'http://localhost:3000/api',
    graphqlEndpoint: 'http://localhost:3000/graphql'
  }
};
```

### 2. **API Service** (`src/app/services/api.service.ts`)
The API service is the **single point** for all API communication:
- Injects authentication headers automatically
- Handles token refresh
- Manages API key injection

### 3. **State Management** (`src/app/state/hospital-state.store.ts`)
Centralized store for:
- Patient data
- Procedure data
- AI responses
- Authentication state

---

## Implementation Phases

### Phase 1 (CURRENT): Dummy Data POC
- ✅ Dashboard UI complete
- ✅ Material + Tailwind styling
- ✅ Dummy patient/procedure data
- ✅ Simulated AI responses
- 🚫 No API keys needed

**Action**: Just use the app as-is!

### Phase 2: Backend Integration
**When needed**: Set `environment.features.useRealApi = true`

#### API Key Sources:
1. **JWT Token** (from Login API)
   ```
   Location: localStorage under 'auth_token'
   Used by: ApiService.getHeaders()
   Injected in: Authorization: Bearer ${token}
   ```

2. **OpenAI API Key** (for AI Assistant)
   ```
   Environment Variable: OPENAI_API_KEY
   Location: environment.auth.openaiKey
   Never hardcode in code!
   ```

3. **GraphQL API Token** (if using GraphQL)
   ```
   Obtained from: /auth/login endpoint
   Stored in: localStorage
   Header: Authorization: Bearer ${token}
   ```

#### Setup Steps:
```bash
# 1. Add environment variables (NOT in code!)
export OPENAI_API_KEY="sk-your-key-here"
export AUTH_TOKEN="your-jwt-token"

# 2. Update environment.ts
# Update baseUrl, graphqlEndpoint, enable useRealApi

# 3. Configure backend service
# Ensure backend validates tokens and returns data
```

### Phase 3: Advanced Features
- Real-time WebSocket connections (with token auth)
- Role-based access control (JWT claims)
- Multi-user authentication
- Audit logging with API keys

---

## Security Best Practices

### ✅ DO THIS:
```typescript
// ✅ Correct: Load from environment variables
const apiKey = process.env['OPENAI_API_KEY'];

// ✅ Correct: Store JWT in sessionStorage (not localStorage for sensitive ops)
sessionStorage.setItem('auth_token', token);

// ✅ Correct: Send in Authorization header
headers.set('Authorization', `Bearer ${token}`);
```

### ❌ DON'T DO THIS:
```typescript
// ❌ Wrong: Hardcoded API keys
const openaiKey = 'sk-1234567890abcdef';

// ❌ Wrong: API key in URL
fetch('https://api.openai.com/v1/chat?key=sk-xxxxx');

// ❌ Wrong: API key in localStorage (too exposed)
localStorage.setItem('api_key', 'sk-xxxxx');
```

---

## Directory Structure for Phase 2+

```
src/app/
├── config/
│   └── environment.ts          ← API endpoints & feature flags
├── services/
│   └── api.service.ts          ← Centralized API calls with auth headers
├── state/
│   └── hospital-state.store.ts ← State management with API integration
├── interceptors/               ← NEW: For Phase 2+
│   └── auth.interceptor.ts     ← Auto-inject JWT tokens
├── guards/                     ← NEW: For Phase 2+
│   └── auth.guard.ts           ← Protect routes, check tokens
└── models/                     ← NEW: For Phase 2+
    ├── patient.ts
    ├── procedure.ts
    └── auth.ts
```

---

## Step-by-Step: Enabling Phase 2 (Real API)

### Step 1: Set Feature Flag
```typescript
// src/app/config/environment.ts
features: {
  useRealApi: true,  // Enable real API calls
}
```

### Step 2: Configure API Endpoints
```typescript
// src/app/config/environment.ts
api: {
  baseUrl: 'http://your-backend.com/api',
  graphqlEndpoint: 'http://your-backend.com/graphql'
}
```

### Step 3: Set API Keys
```bash
# .env.local (for development)
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=your-claude-key
AUTH_TOKEN=your-jwt-token
```

### Step 4: Provide HttpClientModule
```typescript
// src/main.ts
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(DashboardShellComponent, {
  providers: [
    provideHttpClient()
  ]
});
```

### Step 5: Update Components to Use Store
```typescript
// Example: patient-list.component.ts
export class PatientListComponent {
  patients = inject(HospitalStateStore).patients;
}
```

---

## Testing API Integration (Phase 2+)

```typescript
// Test file: api.service.spec.ts
it('should include Authorization header with token', () => {
  const token = 'test-jwt-token';
  localStorage.setItem('auth_token', token);
  
  apiService.getPatients().subscribe();
  
  expect(httpMock.expectOne(req => 
    req.headers.has('Authorization') &&
    req.headers.get('Authorization') === `Bearer ${token}`
  ));
});
```

---

## Common API Key Scenarios

### Scenario 1: OpenAI Integration
```typescript
// Phase 2+: Integrate OpenAI for AI Assistant
async askOpenAI(question: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${environment.auth.openaiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: question }]
    })
  });
  return response.json();
}
```

### Scenario 2: Backend GraphQL with JWT
```typescript
// Apollo Client configuration (Phase 2+)
const httpLink = createHttpLink({
  uri: environment.api.graphqlEndpoint,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(environment.auth.tokenKey);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});
```

### Scenario 3: AWS/Azure API Gateway
```typescript
// For AWS API Gateway with API Key
headers.set('X-API-Key', environment.auth.apiKey);

// For Azure managed identity
headers.set('Authorization', `Bearer ${environment.auth.azureToken}`);
```

---

## Summary

| Phase | API Keys | Storage | Usage |
|-------|----------|---------|-------|
| **Phase 1** (NOW) | ❌ None | N/A | Dummy data only |
| **Phase 2** | ✅ JWT Token | localStorage | Backend auth |
| **Phase 2** | ✅ OpenAI Key | env var | AI Assistant |
| **Phase 3** | ✅ Multiple | Secure vault | Role-based access |

**Next Steps**: When ready for Phase 2, update `environment.ts` and provide backend API endpoints!
