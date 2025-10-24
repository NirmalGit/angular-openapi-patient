# Quick Reference: API Keys & Authentication with Google Gemini

## 🟢 PHASE 1 (CURRENT - YOU ARE HERE)
**Status**: ✅ Ready to use  
**API Keys Needed**: ❌ None  
**What to do**: Just run `npm start` and view the dashboard!

---

## 🟡 PHASE 2 (When You Add Real Backend)

### Files to Update:
1. **`src/app/config/environment.ts`**
   - Set `useRealApi: true`
   - Add API endpoints
   - Add Gemini API key from environment variables

2. **`src/.env.local`** (Create this file)
   ```
   GEMINI_API_KEY=your-google-gemini-api-key
   API_BASE_URL=http://localhost:3000
   ```

3. **Components** (Optional - already works with dummy data)
   - PatientListComponent - will auto-fetch from real API
   - ProcedureListComponent - will auto-fetch from real API
   - AiAssistantComponent - will call Gemini API

### Key Files Already Set Up:
✅ `src/app/services/api.service.ts` - Handles all API calls with Gemini integration  
✅ `src/app/state/hospital-state.store.ts` - Manages app state and Gemini responses  
✅ `src/app/config/environment.ts` - Configuration for different phases  

---

## 🔴 API KEY LOCATIONS IN CODE

### 1. **Environment Configuration**
```
📁 src/app/config/environment.ts
   └─ auth.geminiKey        ← Google Gemini API Key
   └─ auth.geminiModel      ← 'gemini-1.5-pro' (default)
   └─ auth.tokenKey         ← JWT storage
   └─ api.baseUrl           ← Backend endpoint
   └─ api.graphqlEndpoint   ← GraphQL endpoint
```

### 2. **API Service (Main Hub for Gemini)**
```
📁 src/app/services/api.service.ts
   └─ geminiEndpoint        ← https://generativelanguage.googleapis.com/v1beta/models
   └─ getHeaders()          ← Auto-adds JWT token
   └─ getPatients()         ← Fetches patient data
   └─ getProcedures()       ← Fetches procedure data
   └─ askAiAssistant()      ← Calls Gemini with API key ⭐
   └─ login()               ← Gets JWT token
```

### 3. **State Management**
```
📁 src/app/state/hospital-state.store.ts
   └─ loadInitialData()     ← Loads from API
   └─ queryAiAssistant()    ← Sends to Gemini, parses response ⭐
   └─ login()               ← Auth & token storage
```

---

## 🔑 WHERE TO GET GEMINI API KEY

| Service | URL | Free? |
|---------|-----|-------|
| **Google Gemini** | https://aistudio.google.com/ | ✅ Yes (with quotas) |
| **Your Backend** | POST /auth/login | Depends |
| **AWS/Azure** | AWS/Azure Portal | Paid |

---

## 🚀 QUICK START: Phase 2 Setup with Gemini

### Step 1: Get Gemini API Key
1. Visit: https://aistudio.google.com/
2. Click "Get API key"
3. Create new API key in Google Cloud Console
4. Copy the key

### Step 2: Create Environment File
```bash
# In project root: src/.env.local
GEMINI_API_KEY=AIzaSy...your-key-here
API_BASE_URL=http://localhost:3000/api
```

### Step 3: Enable Real API
```typescript
// src/app/config/environment.ts
export const environment = {
  // ...
  features: {
    useRealApi: true,  // ← Change this
  },
  auth: {
    geminiKey: process.env['GEMINI_API_KEY'] || '',  // ← Loads from env
    geminiModel: 'gemini-1.5-pro'  // or 'gemini-1.5-flash' for faster
  }
};
```

### Step 4: Done! 🎉
The app will now:
- Use real patient/procedure data from your backend
- Send natural language questions to Google Gemini
- Display Gemini's AI responses in the dashboard
- Store user tokens automatically
- Everything already wired up!

---

## ⚠️ SECURITY RULES

### ✅ DO:
- Store Gemini keys in environment variables
- Use `.gitignore` to exclude `.env.local`
- Use `process.env['GEMINI_API_KEY']` to load keys
- Rotate keys periodically (on Google Cloud Console)
- Use HTTPS for all API calls

### ❌ DON'T:
- Hardcode API keys in code
- Put keys in localStorage (for API keys)
- Commit `.env` files to Git
- Use production keys in development
- Expose keys in client-side code (use backend proxy in prod)

---

## 📁 Directory Structure Ready for Phase 2

```
src/app/
├── config/
│   └── environment.ts              ← Update with real endpoints & Gemini key
├── services/
│   └── api.service.ts              ← ✅ Gemini integration ready!
├── state/
│   └── hospital-state.store.ts     ← ✅ Parses Gemini responses!
├── dashboard/
│   ├── patient-list.component.ts
│   ├── procedure-list.component.ts
│   ├── ai-assistant.component.ts   ← ✅ Sends to Gemini!
│   └── recommendations.component.ts
└── shared/
    └── tailwind-class.directive.ts
```

---

## 🧪 TESTING PHASE 2 WITH GEMINI

Once you set up Phase 2:

```bash
# 1. Start your backend (if you have one)
npm run backend

# 2. Verify backend API is accessible
curl http://localhost:3000/api/patients

# 3. Start Angular app
npm start

# 4. Test AI Assistant with Gemini
# → Open http://localhost:4200
# → Type a question in "AI Assistant" panel
# → Should get Gemini response (if key valid & quota available)

# 5. Check browser console for logs
# → Should see API calls in Network tab
# → Check Response for Gemini's structured output
```

---

## 🔄 Gemini API Response Format

The app automatically parses Gemini responses:

```typescript
// Gemini returns this structure:
{
  candidates: [
    {
      content: {
        parts: [
          {
            text: "Your AI response here..."
          }
        ]
      }
    }
  ]
}

// The app extracts: response.candidates[0].content.parts[0].text
```

---

## 💡 Gemini Model Options

| Model | Speed | Cost | Use Case |
|-------|-------|------|----------|
| `gemini-1.5-pro` | Slower | Higher | Complex reasoning |
| `gemini-1.5-flash` | Faster | Lower | Quick responses |
| `gemini-2.0-flash` | Very Fast | Lowest | Real-time chat |

Change in `environment.ts`:
```typescript
auth: {
  geminiModel: 'gemini-1.5-flash'  // Switch here
}
```

---

## 📞 NEED HELP?

- **Phase 1 issues?** Check dashboard renders at localhost:4200
- **Phase 2 setup?** Read `API_KEY_INTEGRATION_GUIDE.md`
- **Gemini not working?** 
  - Check API key in browser DevTools → Application → LocalStorage
  - Verify quota on https://console.cloud.google.com/
  - Check Network tab for API call failures
- **Tokens not saving?** Check localStorage in DevTools
- **AI responses not showing?** Check browser Console for errors

---

**Current Status**: 🟢 Phase 1 Complete - Ready to view!  
**Next Step**: When ready, setup Gemini API key (Phase 2 - 5 minute setup)

