// Dummy JSON data for patients and procedures
export const PATIENTS = [
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
  { 
    id: 2, 
    name: 'Jane Smith', 
    age: 60, 
    status: 'Discharged', 
    procedure: 'Cataract Surgery',
    email: 'jane.smith@hospital.com',
    phone: '555-0103',
    dateAdmitted: '2025-10-10',
    dateDischarge: '2025-10-18',
    medicalHistory: ['Hypertension'],
    allergies: ['Aspirin'],
    emergencyContact: 'Robert Smith (555-0104)'
  },
  { 
    id: 3, 
    name: 'Alice Johnson', 
    age: 32, 
    status: 'Admitted', 
    procedure: 'Appendectomy',
    email: 'alice.j@hospital.com',
    phone: '555-0105',
    dateAdmitted: '2025-10-24',
    medicalHistory: [],
    allergies: ['Iodine'],
    emergencyContact: 'Michael Johnson (555-0106)'
  },
  {
    id: 4,
    name: 'Robert Wilson',
    age: 72,
    status: 'In Recovery',
    procedure: 'Hip Replacement',
    email: 'robert.w@hospital.com',
    phone: '555-0107',
    dateAdmitted: '2025-10-22',
    medicalHistory: ['Arthritis', 'Hypertension', 'Hypothyroidism'],
    allergies: [],
    emergencyContact: 'Linda Wilson (555-0108)'
  },
  {
    id: 5,
    name: 'Maria Garcia',
    age: 48,
    status: 'Admitted',
    procedure: 'Cardiac Catheterization',
    email: 'maria.g@hospital.com',
    phone: '555-0109',
    dateAdmitted: '2025-10-23',
    medicalHistory: ['Coronary Artery Disease', 'High Cholesterol'],
    allergies: ['Metformin'],
    emergencyContact: 'Carlos Garcia (555-0110)'
  }
];

export const PROCEDURES = [
  { 
    id: 101, 
    name: 'Knee Replacement', 
    scheduled: '2025-10-25', 
    patientId: 1,
    type: 'Orthopedic Surgery',
    duration: '2-3 hours',
    surgeon: 'Dr. James Anderson',
    description: 'Total knee arthroplasty to replace damaged knee joint',
    status: 'Pending'
  },
  { 
    id: 102, 
    name: 'Cataract Surgery', 
    scheduled: '2025-10-20', 
    patientId: 2,
    type: 'Ophthalmology',
    duration: '15-20 minutes',
    surgeon: 'Dr. Sarah Williams',
    description: 'Removal of cataracts from left eye',
    status: 'Completed',
    completedDate: '2025-10-18'
  },
  { 
    id: 103, 
    name: 'Appendectomy', 
    scheduled: '2025-10-24', 
    patientId: 3,
    type: 'General Surgery',
    duration: '30-60 minutes',
    surgeon: 'Dr. Michael Chen',
    description: 'Emergency appendix removal',
    status: 'In Progress'
  },
  {
    id: 104,
    name: 'Hip Replacement',
    scheduled: '2025-10-22',
    patientId: 4,
    type: 'Orthopedic Surgery',
    duration: '1-2 hours',
    surgeon: 'Dr. James Anderson',
    description: 'Total hip arthroplasty',
    status: 'In Recovery'
  },
  {
    id: 105,
    name: 'Cardiac Catheterization',
    scheduled: '2025-10-23',
    patientId: 5,
    type: 'Cardiology',
    duration: '30-60 minutes',
    surgeon: 'Dr. David Martinez',
    description: 'Diagnostic catheterization and possible intervention',
    status: 'In Progress'
  }
];

export const RECOMMENDATIONS = [
  {
    id: 1,
    title: 'Post-Operative Care Reminder',
    description: 'Schedule follow-up appointment for John Doe (Knee Replacement) - 2 weeks post-op',
    priority: 'High',
    type: 'Follow-up',
    patientId: 1
  },
  {
    id: 2,
    title: 'Discharge Documentation',
    description: 'Review and complete discharge summary for Jane Smith - Ready for outpatient care',
    priority: 'Medium',
    type: 'Documentation',
    patientId: 2
  },
  {
    id: 3,
    title: 'Pre-Op Preparation',
    description: 'Check pre-op labs and vitals for Alice Johnson (Appendectomy) - NPO confirmed',
    priority: 'High',
    type: 'Pre-Operation',
    patientId: 3
  },
  {
    id: 4,
    title: 'Medication Review',
    description: 'Review pain management medication for Robert Wilson - Monitor for interactions',
    priority: 'Medium',
    type: 'Medication',
    patientId: 4
  },
  {
    id: 5,
    title: 'Cardiac Monitoring',
    description: 'Continuous monitoring for Maria Garcia - Check troponin levels at 6 hours',
    priority: 'High',
    type: 'Monitoring',
    patientId: 5
  }
];
