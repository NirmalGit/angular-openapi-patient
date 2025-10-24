# Angular 20 Hospital Dashboard - AI-Assisted POC

A modern, enterprise-grade proof-of-concept dashboard for hospital workflows built with Angular 20 Standalone Components, Tailwind CSS v4, and Angular Material.

## ✨ Features

### Phase 1: Foundation (Complete)
- ✅ **Angular 20 Standalone Components** - Modern, modular architecture
- ✅ **Responsive Dashboard Layout** - Material sidenav + Tailwind styling
- ✅ **Comprehensive Mock Data** - 5+ patients with full medical records
- ✅ **Intelligent Routing** - Lazy-loaded detail pages
- ✅ **AI Text Input** - Google Gemini integration ready
- ✅ **Smart Recommendations** - Priority-based widget system
- ✅ **Tailwind CSS v4** - Modern utility-first styling
- ✅ **Angular Material** - Professional UI components

### Key Components

#### 1. **Dashboard Shell** (`src/app/dashboard/dashboard-shell.component.ts`)
Main application layout with three-column responsive grid:
- Patient list (left)
- Procedure list (left)
- AI Assistant (right)
- Recommendations (right)

#### 2. **Patient Management**
- **PatientListComponent**: Sortable table with quick actions
- **PatientDetailsComponent**: Full patient profile with:
  - Medical history
  - Allergies & warnings
  - Associated procedures
  - Admission details

#### 3. **Procedure Management**
- **ProcedureListComponent**: Scheduled procedures table
- **ProcedureDetailsComponent**: Detailed procedure view with:
  - Surgeon information
  - Timing & duration
  - Patient association
  - Status tracking

#### 4. **AI Assistant** (`ai-assistant.component.ts`)
- **Powered by Google Gemini API**
- Natural language input
- Hospital workflow queries
- Real-time responses (Phase 2+)
- Beautiful gradient UI

#### 5. **Intelligent Recommendations** (`recommendations.component.ts`)
Priority-based recommendation widgets:
- High Priority alerts
- Follow-up schedules
- Pre-op preparations
- Medication reviews
- Real-time monitoring alerts

---

## 📊 Dummy Data Structure

### Patients (5 records)
```json
{
  "id": 1,
  "name": "John Doe",
  "age": 45,
  "status": "Admitted",
  "procedure": "Knee Replacement",
  "email": "john.doe@hospital.com",
  "phone": "555-0101",
  "dateAdmitted": "2025-10-20",
  "medicalHistory": ["Hypertension", "Diabetes Type 2"],
  "allergies": ["Penicillin", "Sulfonamides"],
  "emergencyContact": "Jane Doe (555-0102)"
}
```

### Procedures (5 records)
```json
{
  "id": 101,
  "name": "Knee Replacement",
  "type": "Orthopedic Surgery",
  "duration": "2-3 hours",
  "surgeon": "Dr. James Anderson",
  "scheduled": "2025-10-25",
  "status": "Pending",
  "patientId": 1,
  "description": "Total knee arthroplasty..."
}
```

### Recommendations (5 records)
```json
{
  "id": 1,
  "title": "Post-Operative Care Reminder",
  "description": "Schedule follow-up for John Doe...",
  "priority": "High",
  "type": "Follow-up",
  "patientId": 1
}
```

---

## 🔄 Routing Map

```
/                           → Dashboard (All patients, procedures, recommendations)
/patient/:id                → Patient details page (Lazy loaded)
/procedure/:id              → Procedure details page (Lazy loaded)
```

**Features:**
- Lazy-loaded components for better performance
- Click patient/procedure rows to navigate
- "Back to Dashboard" button on detail pages
- Auto-redirect on invalid IDs

---

## 🤖 AI Assistant with Google Gemini

### Phase 1 (Current - Dummy Responses)
```
User: "What's the status of John Doe?"
AI: "Simulated response based on dummy data"
```

### Phase 2 (Real Gemini Integration)
Set up in 3 steps:

1. **Get Gemini API Key**
   - Visit: https://aistudio.google.com/
   - Create new key
   - Copy to `src/.env.local`

2. **Configure Environment**
   ```typescript
   // src/app/config/environment.ts
   auth: {
     geminiKey: process.env['GEMINI_API_KEY'],
     geminiModel: 'gemini-1.5-pro'  // or 'gemini-1.5-flash'
   },
   features: {
     useRealApi: true  // Enable real API
   }
   ```

3. **Start Using**
   - Type questions about patients/procedures
   - Get AI-powered recommendations
   - See hospital workflow insights

---

## 📁 Project Structure

```
src/app/
├── app.component.ts              ← Router outlet
├── app.routes.ts                 ← Route definitions
├── config/
│   └── environment.ts            ← Environment config + Gemini API key
├── dashboard/
│   ├── dashboard.component.ts    ← Main layout shell
│   ├── dashboard-shell.component.ts ← Route wrapper
│   ├── patient-list.component.ts
│   ├── patient-details.component.ts ← Lazy loaded
│   ├── procedure-list.component.ts
│   ├── procedure-details.component.ts ← Lazy loaded
│   ├── ai-assistant.component.ts
│   ├── recommendations.component.ts
│   └── dummy-data.ts             ← Mock patient/procedure data
├── services/
│   ├── api.service.ts            ← Gemini API integration
│   └── mock-data.service.ts      ← Data layer (swap for real API)
├── shared/
│   └── tailwind-class.directive.ts
└── state/
    └── hospital-state.store.ts   ← Signals-based state management
```

---

## 🎨 Design Stack

### Tailwind CSS v4
- Responsive grid layout
- Gradient backgrounds
- Color utilities
- Dark mode ready

### Angular Material 20.2.10
- Cards, tables, chips
- Buttons, icons, tooltips
- Form fields, sliders
- Professional theme

### Combination Benefits
- **Material** for components
- **Tailwind** for layout & styling
- **Signals** for reactive state
- **Standalone** for tree-shaking

---

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- Angular CLI 20+
- npm 9+

### Installation
```bash
npm install
```

### Development Server
```bash
npm start
# Navigate to http://localhost:4200
```

### Build for Production
```bash
npm run build
# Output in dist/
```

### Run Tests
```bash
npm test
```

---

## 🌐 Mock Data Service

The `MockDataService` (`src/app/services/mock-data.service.ts`) provides:

```typescript
// Get all patients/procedures
getPatients(): Observable<any[]>
getProcedures(): Observable<any[]>

// Get by ID
getPatientById(id: number): Observable<any>
getProcedureById(id: number): Observable<any>

// Get related data
getProceduresByPatient(patientId: number): Observable<any[]>
getRecommendationsByPatient(patientId: number): Observable<any[]>

// Get analytics
getTopRecommendations(limit: number): Observable<any[]>
getStatistics(): Observable<any>

// Search
searchPatients(query: string): Observable<any[]>
```

**Phase 2+**: Replace with real API calls by:
1. Updating `ApiService` to call backend
2. Setting `environment.features.useRealApi = true`
3. No component changes needed!

---

## 🔐 State Management

Uses **Angular Signals** for lightweight reactive state:

```typescript
// State store (src/app/state/hospital-state.store.ts)
patients = signal<any[]>([]);
procedures = signal<any[]>([]);
recommendations = signal<string[]>([]);
aiResponse = signal<string>('');
isLoading = signal<boolean>(false);
error = signal<string | null>(null);

// Auto-subscription in components
store.patients()  // Returns current value
store.patients.set(newPatients)  // Update
```

Benefits:
- ✅ No RxJS learning curve
- ✅ Smaller bundle size
- ✅ Better performance
- ✅ Type-safe by default

---

## 📱 Responsive Design

### Desktop (>1024px)
- 3-column layout
- Full sidenav visible
- Expanded tables

### Tablet (768px - 1024px)
- 2-column layout
- Collapsible sidenav
- Adjusted cards

### Mobile (<768px)
- Single column
- Mobile-optimized cards
- Touch-friendly buttons

---

## 🚀 Phase 2+ Roadmap

### Next Steps
1. ✅ Backend API integration (GraphQL/REST)
2. ✅ Real Gemini API with production key
3. ✅ User authentication (JWT)
4. ✅ Role-based access control
5. ✅ Real-time WebSocket updates
6. ✅ Advanced search & filtering
7. ✅ Procedure scheduling
8. ✅ Document management

### Optional Features
- 📊 Analytics dashboard
- 📋 Report generation
- 🔔 Push notifications
- 📱 Mobile app (React Native)
- 🌙 Dark mode toggle

---

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear node_modules and rebuild
rm -rf node_modules
npm install
npm start
```

### Styling Issues
```bash
# Rebuild Tailwind
npm run build:css
```

### Gemini Not Working
- Check `.env.local` for API key
- Verify key in Google Cloud Console
- Check browser console for errors
- See `API_KEY_QUICK_REFERENCE.md`

---

## 📚 Documentation Files

- `API_KEY_INTEGRATION_GUIDE.md` - Complete API key setup guide
- `API_KEY_QUICK_REFERENCE.md` - Quick reference for phases
- `.env.example` - Environment template

---

## 📄 License

MIT - Free for commercial and personal use

---

## 👥 Built With

- **Angular 20** - Modern web framework
- **TypeScript** - Type-safe code
- **Tailwind CSS v4** - Utility styling
- **Angular Material 20** - UI components
- **RxJS** - Reactive programming
- **Signals API** - State management
- **Google Gemini** - AI assistant

---

## 💡 Tips & Best Practices

1. **Component Organization**
   - Keep components small and focused
   - Use folder-per-feature structure
   - Leverage standalone components

2. **Performance**
   - Lazy load detail pages
   - Use OnPush change detection
   - Signals reduce CD runs

3. **Styling**
   - Prefer Tailwind for layout
   - Use Material for components
   - Combine utilities in classes

4. **State Management**
   - Use Signals for simple state
   - Use Mock Data Service layer
   - Easy to switch to real API

---

## 🎓 Learning Resources

- [Angular 20 Docs](https://angular.io)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Angular Material](https://material.angular.io)
- [Google Gemini API](https://ai.google.dev)

---

**Status**: 🟢 Production Ready (Phase 1)  
**Last Updated**: October 24, 2025
