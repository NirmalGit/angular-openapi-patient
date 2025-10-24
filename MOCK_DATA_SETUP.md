# 🎭 Mock Data Setup - Phase 1 (No Backend Required)

## Overview

Your Angular 20 Hospital Dashboard is **fully functional with mock data only**. No backend server needed!

## Current Configuration

### ✅ What's Enabled (Phase 1)
- **Mock Patient Data**: 5 realistic patients with full profiles
- **Mock Procedure Data**: 5 procedures with surgeon details
- **Mock Recommendations**: 5 priority-based recommendations
- **Mock AI Responses**: AI Assistant returns simulated Gemini responses
- **No API Keys Required**: Everything works out of the box

### Environment Settings
File: `src/app/config/environment.ts`

```typescript
export const environment = {
  production: false,
  
  // Data Source Configuration
  dataSource: {
    useMockData: true,    // ✅ Using mock data
    mockDataDelay: 200    // Simulates network latency
  },
  
  // Feature Flags
  features: {
    useRealApi: false,                    // ✅ Not calling backend
    enableAiAssistant: true,
    enableRecommendations: true,
    enableRealTimeUpdates: false
  },

  // AI Configuration
  ai: {
    geminiKey: '',                        // ✅ No key needed
    geminiModel: 'gemini-1.5-pro',
    useMockAiResponses: true              // ✅ Using mock responses
  }
};
```

---

## 📂 Where Mock Data Lives

### 1. Patient & Procedure Mock Data
**File**: `src/app/dashboard/dummy-data.ts`

Contains:
- 5 patients with medical history, allergies, admission dates
- 5 procedures with surgeon, duration, status
- 5 recommendations with priority levels

```typescript
export const MOCK_PATIENTS = [
  {
    id: 1,
    name: 'John Doe',
    age: 45,
    status: 'Admitted',
    procedure: 'Knee Replacement',
    email: 'john.doe@hospital.com',
    phone: '555-0101',
    dateAdmitted: '2025-10-20',
    medicalHistory: ['Hypertension', 'Diabetes Type 2'],
    allergies: ['Penicillin', 'Sulfonamides'],
    emergencyContact: 'Jane Doe (555-0102)'
  },
  // ... 4 more patients
];
```

### 2. Mock Data Service
**File**: `src/app/services/mock-data.service.ts`

Provides 12 methods:
- `getPatients()` - All patients
- `getPatientById(id)` - Single patient
- `getProceduresByPatient(patientId)` - Filter by patient
- `getRecommendations()` - All recommendations
- `getTopRecommendations(limit)` - Sorted by priority
- `searchPatients(query)` - Search by name
- And more...

All return `Observable<any>` for Phase 2 compatibility.

### 3. AI Mock Responses
**File**: `src/app/services/api.service.ts`

The `askAiAssistant()` method returns pre-written responses based on keywords:

```typescript
// Phase 1: Mock AI responses
const mockResponses: { [key: string]: string } = {
  'john': 'John Doe is currently admitted for Knee Replacement...',
  'status': 'All patients are stable. Procedures ongoing...',
  'recommendation': 'Key recommendations: Pre-op checks, Pain management...',
  // ... more responses
};
```

---

## 🚀 Running with Mock Data

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

The app starts at **http://localhost:4200**

### Step 3: Explore Mock Data
1. **Dashboard** loads with 5 patients
2. **Click a patient** → View full profile with mock data
3. **View procedures** → See mock procedure details
4. **Ask AI Assistant** → Get mock responses

---

## 🔄 Switching from Mock to Real Data (Phase 2+)

When you're ready to connect a backend:

### Step 1: Update Environment
```typescript
// src/app/config/environment.ts
features: {
  useRealApi: true,  // Enable real API
  enableAiAssistant: true,
  enableRecommendations: true
}
```

### Step 2: Update Mock Data Service
Replace Observable methods to call real API:

```typescript
// BEFORE (Mock)
getPatients(): Observable<any[]> {
  return of(MOCK_PATIENTS);
}

// AFTER (Real API)
getPatients(): Observable<any[]> {
  return this.http.get('/api/patients');
}
```

### Step 3: Add Gemini API Key (For Real AI)
Create `.env.local`:
```
GEMINI_API_KEY=your-actual-key-here
```

Then enable in environment:
```typescript
ai: {
  geminiKey: 'your-key',              // Add key
  useMockAiResponses: false            // Use real API
}
```

---

## 📊 Mock Data Structure

### Patients
Each patient has:
- ID, name, age, status
- Current procedure
- Contact info
- Medical history (array)
- Allergies (array) - ⚠️ Highlighted in red
- Emergency contact

### Procedures
Each procedure has:
- ID, name, type
- Surgeon name
- Duration estimate
- Scheduled date
- Patient ID link
- Current status
- Description

### Recommendations
Each recommendation has:
- ID, title, description
- Priority: `High` | `Medium` | `Low`
- Type: `Follow-up`, `Medication`, `Monitoring`, `Pre-op`, `Post-op`
- Patient ID link

---

## 🧪 Testing Mock Data

### Component Integration Points

1. **PatientListComponent**
   - Uses `MockDataService.getPatients()`
   - Displays in table
   - Click → navigate to patient details

2. **PatientDetailsComponent**
   - Uses `MockDataService.getPatientById(id)`
   - Shows full profile
   - Loads procedures for that patient

3. **ProcedureListComponent**
   - Uses `MockDataService.getProcedures()`
   - Shows all procedures

4. **ProcedureDetailsComponent**
   - Uses `MockDataService.getProcedureById(id)`
   - Loads associated patient

5. **RecommendationsComponent**
   - Uses `MockDataService.getTopRecommendations(5)`
   - Sorts by priority
   - Shows top 5

6. **AiAssistantComponent**
   - Uses `ApiService.askAiAssistant()`
   - Returns mock responses based on keywords
   - No network calls

---

## 🔧 Customizing Mock Data

### Add New Patient
Edit `src/app/dashboard/dummy-data.ts`:

```typescript
export const MOCK_PATIENTS = [
  // ... existing patients
  {
    id: 6,  // New ID
    name: 'Your Name',
    age: 50,
    status: 'Admitted',
    procedure: 'Your Procedure',
    email: 'email@hospital.com',
    phone: '555-0106',
    dateAdmitted: '2025-10-25',
    medicalHistory: ['Your History'],
    allergies: ['Your Allergies'],
    emergencyContact: 'Contact Info'
  }
];
```

Then restart Angular:
```bash
npm start
```

### Add New Mock AI Response
Edit `src/app/services/api.service.ts`:

```typescript
const mockResponses: { [key: string]: string } = {
  'your-keyword': 'Your response here...',
  // ... existing responses
};
```

---

## ⚙️ Performance Notes

### Network Simulation
By default, mock responses have a **200ms delay** to simulate network latency.

Change in `environment.ts`:
```typescript
dataSource: {
  useMockData: true,
  mockDataDelay: 500  // Increase to 500ms
}
```

### Why Mock Data?
- ✅ No backend setup needed
- ✅ Instant feedback during development
- ✅ Easy to customize test scenarios
- ✅ Works offline
- ✅ Fast feedback loops

---

## 🎯 Phase 1 vs Phase 2 Comparison

### Phase 1 (Current)
- ✅ All features work with mock data
- ✅ No backend server
- ✅ No API key setup
- ✅ Instant development
- ✅ No deployment needed
- ❌ Data doesn't persist
- ❌ No real-time updates

### Phase 2 (Ready to add)
- ✅ Real backend API
- ✅ Real database
- ✅ Real Gemini AI with API key
- ✅ Data persistence
- ✅ Real-time updates (WebSocket)
- ❌ Requires backend setup
- ❌ Requires API keys

---

## 📝 Quick Checklist

- [x] Mock data service created
- [x] 5 patients with full profiles
- [x] 5 procedures with details
- [x] 5 recommendations
- [x] Mock AI responses implemented
- [x] Routing works with mock data
- [x] No API keys needed
- [x] No backend required
- [x] Ready to present/demo

---

## 🆘 Troubleshooting

**Q: Patient list is empty**
A: Check `src/app/dashboard/dummy-data.ts` has data exported

**Q: AI responses not showing**
A: Check `src/app/services/api.service.ts` has mock responses defined

**Q: Routes not working**
A: Verify `src/app/app.routes.ts` is loaded in `app.component.ts`

**Q: Need to modify patient list**
A: Edit `MOCK_PATIENTS` in `src/app/dashboard/dummy-data.ts`

**Q: App compiles but won't load**
A: Run `npm start` in terminal, check http://localhost:4200

---

## 📚 Next Steps

1. **Run the app**: `npm start`
2. **Explore mock data**: Click through patients and procedures
3. **Test AI Assistant**: Type questions, see mock responses
4. **Customize mock data**: Add your own patients/procedures
5. **When ready for Phase 2**: Connect real backend (see Phase 2 Guide)

---

**Phase 1 Status**: ✅ Complete and Ready to Demo

No backend. No API keys. Just mock data and a beautiful Angular dashboard!
