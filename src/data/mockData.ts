import { User, HealthProfile, Doctor, Hospital, Appointment, HealthRecommendation, Prescription } from '../types';
import { addDays, format } from 'date-fns';

// Mock User Data
export const currentUser: User = {
  id: 'user1',
  name: 'Vishnu makkena',
  email: 'vishnumakkena3@gmail.com',
  age: 21,
  gender: 'Male',
  profilePicture: 'src/assets/images/profile1.jpg'
  
};

// Mock Health Profile
export const healthProfile: HealthProfile = {
  userId: 'user1',
  height: 175,
  weight: 70,
  bloodType: 'O+',
  allergies: ['Penicillin', 'Peanuts'],
  chronicConditions: ['Asthma'],
  medications: [
    {
      id: 'med1',
      name: 'Ventolin',
      dosage: '100mcg',
      frequency: 'As needed',
      startDate: '2023-01-15',
      prescribedBy: 'Dr. Smith'
    }
  ],
  pastDiagnoses: [
    {
      id: 'diag1',
      condition: 'Bronchitis',
      diagnosedDate: '2022-11-10',
      diagnosedBy: 'Dr.K.S.Jeyarani Kamraj',
      treatment: 'Antibiotics and rest',
      notes: 'Follow-up in 2 weeks'
    }
  ]
};

// Mock Doctors
export const doctors: Doctor[] = [
  {
    id: 'doc1',
    name: 'Dr.K.S.Jeyarani Kamraj',
    specialization: 'Obestrician,Cardiologist',
    hospital: 'Akash Hospital',
    rating: 4.8,
    availability: [
      {
        day: 'Monday',
        slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM']
      },
      {
        day: 'Wednesday',
        slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM']
      },
      {
        day: 'Friday',
        slots: ['09:00 AM', '10:00 AM', '11:00 AM']
      }
    ],
    profilePicture: 'src/assets/images/profile4.jpeg'
  },
  {
    id: 'doc2',
    name: 'Dr.Balmurali',
    specialization: 'Neurologist',
    hospital: 'kauvery Hospitals',
    rating: 4.7,
    availability: [
      {
        day: 'Tuesday',
        slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM']
      },
      {
        day: 'Thursday',
        slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM']
      }
    ],
    profilePicture: 'src/assets/images/profile2.jpeg'
  },
  {
    id: 'doc3',
    name: 'Dr.Vinod Prem Anand',
    specialization: 'Dermatologist,General Physician',
    hospital: 'MGM Health Care',
    rating: 4.9,
    availability: [
      {
        day: 'Monday',
        slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
      },
      {
        day: 'Wednesday',
        slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
      },
      {
        day: 'Friday',
        slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
      }
    ],
    profilePicture: 'src/assets/images/profile3.jpeg'
  },
  {
    id: 'doc4',
    name: 'Dr.Devi Prasad Shetty',
    specialization: 'Cardiologist',
    hospital: 'Narayana Health',
    rating: 4.9,
    availability: [
      {
        day: 'Monday',
        slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
      },
      {
        day: 'Wednesday',
        slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
      },
      {
        day: 'Friday',
        slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
      }
    ],
    profilePicture: 'src/assets/images/deviprasad.jpg'
  },
  {
    id: 'doc4',
    name: 'Dr.Naresh Treham',
    specialization: 'Cardiovascular,Cardiothoracic Surgeon',
    hospital: 'Medanta - The Medicity',
    rating: 4.9,
    availability: [
      {
        day: 'Monday',
        slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
      },
      {
        day: 'Wednesday',
        slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
      },
      {
        day: 'Friday',
        slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
      }
    ],
    profilePicture: 'src/assets/images/naresh treham.jpg'
  },
  {
    id: 'doc4',
    name: 'Dr.Ashok Seth',
    specialization: 'Cardiology',
    hospital: 'Fortis Escorts Heart Institute',
    rating: 4.9,
    availability: [
      {
        day: 'Monday',
        slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
      },
      {
        day: 'Wednesday',
        slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
      },
      {
        day: 'Friday',
        slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
      }
    ],
    profilePicture: 'src/assets/images/Dr.-Ashok-Seth.jpg'
  },
  {
    id: 'doc4',
    name: 'Dr.suresh Advani',
    specialization: 'Onocolgy',
    hospital: 'Jaslok Hospital',
    rating: 4.9,
    availability: [
      {
        day: 'Monday',
        slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
      },
      {
        day: 'Wednesday',
        slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
      },
      {
        day: 'Friday',
        slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
      }
    ],
    profilePicture: 'src/assets/images/Dr-Suresh-Advani.png'
  }
];


// Mock Hospitals
export const hospitals: Hospital[] = [
  {
    id: 'hosp1',
    name: 'Akash Hospital',
    address: 'southegowdanahalli,Karnataka',
    contact: '+91 1800 425 1111',
    specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'],
    rating: 4.5,
    image: 'src/assets/images/akash.jpeg'
  },
  {
    id: 'hosp2',
    name: 'kauvery Hospitals',
    address: 'Tirunenveli, Tamilnadu',
    contact: '+91 0462-4006000',
    specialties: ['Oncology', 'Gastroenterology', 'Urology', 'Dermatology'],
    rating: 4.7,
    image: 'src/assets/images/kauvery.jpeg'
  },
  {
    id: 'hosp3',
    name: 'MGM Health Care',
    address: 'Collectrate colony,Chennai',
    contact: '+91 044-4524 2407',
    specialties: ['Family Medicine', 'Dermatology', 'Psychiatry', 'Physical Therapy'],
    rating: 4.3,
    image: 'src/assets/images/mgm.jpeg'
  }
];

// Mock Appointments
export const appointments: Appointment[] = [
  {
    id: 'app1',
    userId: 'user1',
    doctorId: 'doc1',
    doctorName: 'Dr.K.S.Jeyarani Kamraj',
    specialization: 'Obestrician,Cardiologist',
    date: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
    time: '10:00 AM',
    status: 'scheduled',
    notes: 'Annual heart checkup'
  },
  {
    id: 'app2',
    userId: 'user1',
    doctorId: 'doc3',
    doctorName: 'Dr.Vinod Prem Anand',
    specialization: 'Dermatologist,General Physician',
    date: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    time: '02:00 PM',
    status: 'scheduled',
    notes: 'Skin rash consultation'
  },
  {
    id: 'app3',
    userId: 'user1',
    doctorId: 'doc2',
    doctorName: 'Dr.Balmurali',
    specialization: 'Neurologist',
    date: format(addDays(new Date(), -14), 'yyyy-MM-dd'),
    time: '09:00 AM',
    status: 'scheduled',
    notes: 'Headache follow-up'
  },
  {
    id: 'app4',
    userId: 'user1',
    doctorId: 'doc4',
    doctorName: 'Dr.Devi prasad shetty',
    specialization: 'Cardiologist',
    date: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
    time: '1:00 PM',
    status: 'scheduled',
    notes: 'Heart pain'
  },
  {
    id: 'app5',
    userId: 'user1',
    doctorId: 'doc5',
    doctorName: 'Dr.Naresh Trehan',
    specialization: 'Cardiovascular,Cardiothoracic Surgeon',
    date: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
    time: '11:00 AM',
    status: 'scheduled',
    notes: 'Heart pain'
  }
];

// Mock Health Recommendations
export const healthRecommendations: HealthRecommendation[] = [
  {
    id: 'rec1',
    userId: 'user1',
    symptoms: [
      {
        id: 'sym1',
        name: 'Headache',
        severity: 'moderate',
        duration: '3 days',
        description: 'Throbbing pain in the forehead'
      },
      {
        id: 'sym2',
        name: 'Fatigue',
        severity: 'mild',
        duration: '1 week',
        description: 'General tiredness'
      }
    ],
    possibleConditions: [
      {
        condition: 'Migraine',
        probability: 0.65,
        description: 'A neurological condition characterized by recurrent headaches that can cause throbbing pain.'
      },
      {
        condition: 'Stress',
        probability: 0.45,
        description: 'Physical or emotional tension that can cause headaches and fatigue.'
      },
      {
        condition: 'Dehydration',
        probability: 0.30,
        description: 'Lack of sufficient water in the body that can lead to headaches and tiredness.'
      }
    ],
    recommendedActions: [
      {
        type: 'medication',
        description: 'Over-the-counter pain relievers like ibuprofen or acetaminophen',
        urgency: 'low'
      },
      {
        type: 'lifestyle',
        description: 'Ensure adequate hydration and rest',
        urgency: 'medium'
      },
      {
        type: 'specialist',
        description: 'Consult with a neurologist if symptoms persist for more than a week',
        urgency: 'low'
      }
    ],
    generatedDate: format(addDays(new Date(), -2), 'yyyy-MM-dd')
  },
  {
    id: 'rec2',
    userId: 'user1',
    symptoms: [
      {
        id: 'sym3',
        name: 'Chest Pain',
        severity: 'moderate',
        duration: '1 day',
        description: 'Sharp pain when breathing deeply'
      },
      {
        id: 'sym4',
        name: 'Shortness of Breath',
        severity: 'moderate',
        duration: '1 day',
        description: 'Difficulty breathing during physical activity'
      }
    ],
    possibleConditions: [
      {
        condition: 'Costochondritis',
        probability: 0.55,
        description: 'Inflammation of the cartilage that connects ribs to the breastbone.'
      },
      {
        condition: 'Anxiety',
        probability: 0.40,
        description: 'Mental health condition that can cause physical symptoms like chest pain.'
      },
      {
        condition: 'Asthma Exacerbation',
        probability: 0.35,
        description: 'Worsening of asthma symptoms due to triggers.'
      }
    ],
    recommendedActions: [
      {
        type: 'specialist',
        description: 'Schedule an appointment with a cardiologist for evaluation',
        urgency: 'high'
      },
      {
        type: 'emergency',
        description: 'If pain is severe or accompanied by other symptoms like sweating or nausea, seek emergency care',
        urgency: 'high'
      },
      {
        type: 'lifestyle',
        description: 'Rest and avoid strenuous activities until evaluated by a doctor',
        urgency: 'medium'
      }
    ],
    generatedDate: format(addDays(new Date(), -1), 'yyyy-MM-dd')
  }
];

// Mock Prescriptions
export const prescriptions: Prescription[] = [
  {
    id: 'pres1',
    userId: 'user1',
    doctorId: 'doc2',
    doctorName: 'Dr.Balmurali',
    medications: [
      {
        name: 'Sumatriptan',
        dosage: '50mg',
        frequency: 'As needed for migraine, not to exceed 200mg in 24 hours',
        duration: '3 months',
        notes: 'Take at first sign of migraine'
      },
      {
        name: 'Propranolol',
        dosage: '40mg',
        frequency: 'Once daily',
        duration: '3 months',
        notes: 'Take with food'
      }
    ],
    diagnosis: 'Migraine with aura',
    issueDate: format(addDays(new Date(), -14), 'yyyy-MM-dd'),
    expiryDate: format(addDays(new Date(), 76), 'yyyy-MM-dd'),
    additionalNotes: 'Follow up in 3 months to assess effectiveness of preventive medication'
  },
  {
    id: 'pres2',
    userId: 'user1',
    doctorId: 'doc3',
    doctorName: 'Dr.Vinod Prem Anand',
    medications: [
      {
        name: 'Hydrocortisone Cream',
        dosage: '1%',
        frequency: 'Apply to affected area twice daily',
        duration: '2 weeks',
        notes: 'Avoid contact with eyes'
      }
    ],
    diagnosis: 'Contact dermatitis',
    issueDate: format(addDays(new Date(), -30), 'yyyy-MM-dd'),
    expiryDate: format(addDays(new Date(), -16), 'yyyy-MM-dd'),
    additionalNotes: 'Discontinue use if irritation worsens'
  }
];

// Health Statistics for Dashboard
export const healthStats = {
  weeklyStepCount: [6500, 7200, 5800, 9000, 8200, 7500, 8800],
  monthlyBloodPressure: [
    { systolic: 120, diastolic: 80, date: '2023-05-01' },
    { systolic: 118, diastolic: 78, date: '2023-05-08' },
    { systolic: 122, diastolic: 82, date: '2023-05-15' },
    { systolic: 119, diastolic: 79, date: '2023-05-22' },
    { systolic: 121, diastolic: 81, date: '2023-05-29' }
  ],
  sleepData: [7.5, 6.8, 7.2, 8.1, 6.5, 7.0, 7.8],
  weightHistory: [70.5, 70.2, 70.0, 69.8, 69.5, 69.3, 69.0]
};

// Common symptoms for symptom checker
export const commonSymptoms = [
  { id: 's1', name: 'Headache' },
  { id: 's2', name: 'Fever' },
  { id: 's3', name: 'Cough' },
  { id: 's4', name: 'Fatigue' },
  { id: 's5', name: 'Shortness of breath' },
  { id: 's6', name: 'Nausea' },
  { id: 's7', name: 'Dizziness' },
  { id: 's8', name: 'Chest pain' },
  { id: 's9', name: 'Abdominal pain' },
  { id: 's10', name: 'Joint pain' },
  { id: 's11', name: 'Rash' },
  { id: 's12', name: 'Sore throat' },
  { id: 's13', name: 'Runny nose' },
  { id: 's14', name: 'Muscle aches' },
  { id: 's15', name: 'Back pain' }
];