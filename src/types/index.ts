// ===== AUTH TYPES =====
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'patient' | 'reception' | 'doctor' | 'pharmacist' | 'district_admin';
  avatar?: string;
  abhaId?: string;
  department?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ===== PATIENT TYPES =====
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  abhaId: string;
  bloodGroup: string;
  address: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'emergency';
  tokenNumber: number;
  department: string;
  doctor?: string;
  waitTime?: number;
  registrationDate: string;
}

// ===== APPOINTMENT TYPES =====
export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  type: 'walk-in' | 'scheduled' | 'emergency';
  tokenNumber: number;
  symptoms?: string;
  notes?: string;
}

// ===== DOCTOR TYPES =====
export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  avatar: string;
  status: 'available' | 'busy' | 'offline' | 'on-leave';
  experience: number;
  qualification: string;
  patientsToday: number;
  rating: number;
  schedule: ScheduleSlot[];
}

export interface ScheduleSlot {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// ===== DEPARTMENT TYPES =====
export interface Department {
  id: string;
  name: string;
  icon: string;
  doctors: number;
  patientsToday: number;
  avgWaitTime: number;
  isActive: boolean;
}

// ===== MEDICINE TYPES =====
export interface Medicine {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  unit: string;
  expiryDate: string;
  manufacturer: string;
  price: number;
  status: 'adequate' | 'low' | 'critical' | 'out-of-stock';
}

// ===== QUEUE TYPES =====
export interface QueueItem {
  id: string;
  tokenNumber: number;
  patientName: string;
  patientId: string;
  department: string;
  doctor: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'emergency';
  waitTime: number;
  estimatedTime: number;
  type: 'regular' | 'emergency' | 'senior' | 'child';
  checkInTime: string;
}

// ===== LAB TEST TYPES =====
export interface LabTest {
  id: string;
  patientName: string;
  patientId: string;
  testName: string;
  category: string;
  status: 'pending' | 'in-progress' | 'completed' | 'urgent';
  requestedBy: string;
  requestDate: string;
  resultDate?: string;
  findings?: string;
}

// ===== BED TYPES =====
export interface Bed {
  id: string;
  ward: string;
  bedNumber: string;
  type: 'general' | 'icu' | 'private' | 'emergency';
  status: 'occupied' | 'available' | 'reserved' | 'maintenance';
  patientName?: string;
  patientId?: string;
  admissionDate?: string;
}

// ===== NOTIFICATION TYPES =====
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'emergency';
  read: boolean;
  timestamp: string;
  link?: string;
}

// ===== DISTRICT TYPES =====
export interface PHC {
  id: string;
  name: string;
  location: string;
  doctors: number;
  beds: { total: number; occupied: number };
  patientsToday: number;
  medicines: { adequate: number; low: number; critical: number };
  score: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
}

export interface DistrictMetrics {
  totalPHCs: number;
  totalDoctors: number;
  totalPatients: number;
  bedOccupancy: number;
  medicineStock: number;
  attendanceRate: number;
  satisfactionScore: number;
}

// ===== AI TYPES =====
export interface AIInsight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  category: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  confidence?: number;
  recommendations?: string[];
  sources?: string[];
}

export interface SymptomCheck {
  id: string;
  symptoms: string[];
  predictedConditions: {
    name: string;
    probability: number;
    urgency: 'low' | 'medium' | 'high' | 'emergency';
  }[];
  recommendedDepartment: string;
  timestamp: string;
}

// ===== FORECAST TYPES =====
export interface ForecastData {
  [key: string]: string | number;
  month: string;
  patients: number;
  medicines: number;
  outbreaks: number;
}

// ===== ANALYTICS TYPES =====
export interface AnalyticsData {
  label: string;
  value: number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
}
