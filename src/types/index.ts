export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  profilePicture?: string;
}

export interface HealthProfile {
  userId: string;
  height: number;
  weight: number;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  medications: Medication[];
  pastDiagnoses: Diagnosis[];
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
}

export interface Diagnosis {
  id: string;
  condition: string;
  diagnosedDate: string;
  diagnosedBy: string;
  treatment: string;
  notes?: string;
}

export interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  description?: string;
}

export interface Appointment {
  id: string;
  userId: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  rating: number;
  availability: {
    day: string;
    slots: string[];
  }[];
  profilePicture?: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  contact: string;
  specialties: string[];
  rating: number;
  image?: string;
}

export interface HealthRecommendation {
  id: string;
  userId: string;
  symptoms: Symptom[];
  possibleConditions: {
    condition: string;
    probability: number;
    description: string;
  }[];
  recommendedActions: {
    type: 'medication' | 'lifestyle' | 'specialist' | 'emergency';
    description: string;
    urgency: 'low' | 'medium' | 'high';
  }[];
  generatedDate: string;
}

export interface Prescription {
  id: string;
  userId: string;
  doctorId: string;
  doctorName: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes?: string;
  }[];
  diagnosis: string;
  issueDate: string;
  expiryDate: string;
  additionalNotes?: string;
}