import type {
  Patient, Doctor, Department, Medicine, QueueItem,
  LabTest, Bed, Notification, PHC, AIInsight, ChatMessage,
  ForecastData, Appointment, SymptomCheck, AnalyticsData
} from '@/types';

export const mockPatients: Patient[] = [
  { id: 'P001', name: 'Ramesh Kumar', age: 45, gender: 'Male', phone: '9876543210', abhaId: 'ABHA-1234-5678', bloodGroup: 'O+', address: 'Village Rampur, Block A', status: 'waiting', tokenNumber: 101, department: 'General Medicine', doctor: 'Dr. Sharma', waitTime: 25, registrationDate: '2026-07-08' },
  { id: 'P002', name: 'Sunita Devi', age: 32, gender: 'Female', phone: '9876543211', abhaId: 'ABHA-1234-5679', bloodGroup: 'A+', address: 'Village Sitapur, Block B', status: 'in-progress', tokenNumber: 102, department: 'Gynecology', doctor: 'Dr. Patel', waitTime: 0, registrationDate: '2026-07-08' },
  { id: 'P003', name: 'Amit Singh', age: 28, gender: 'Male', phone: '9876543212', abhaId: 'ABHA-1234-5680', bloodGroup: 'B+', address: 'Town Center, Block C', status: 'emergency', tokenNumber: 1, department: 'Emergency', doctor: 'Dr. Gupta', waitTime: 0, registrationDate: '2026-07-08' },
  { id: 'P004', name: 'Priya Sharma', age: 65, gender: 'Female', phone: '9876543213', abhaId: 'ABHA-1234-5681', bloodGroup: 'AB+', address: 'Village Kalyanpur, Block A', status: 'waiting', tokenNumber: 103, department: 'Cardiology', doctor: 'Dr. Reddy', waitTime: 40, registrationDate: '2026-07-08' },
  { id: 'P005', name: 'Mohammed Ali', age: 8, gender: 'Male', phone: '9876543214', abhaId: 'ABHA-1234-5682', bloodGroup: 'O-', address: 'Town Market, Block D', status: 'waiting', tokenNumber: 104, department: 'Pediatrics', doctor: 'Dr. Khan', waitTime: 15, registrationDate: '2026-07-08' },
  { id: 'P006', name: 'Lakshmi Nair', age: 52, gender: 'Female', phone: '9876543215', abhaId: 'ABHA-1234-5683', bloodGroup: 'A-', address: 'Village Greenfield, Block B', status: 'completed', tokenNumber: 105, department: 'Dermatology', doctor: 'Dr. Iyer', waitTime: 0, registrationDate: '2026-07-08' },
  { id: 'P007', name: 'Rajesh Gupta', age: 38, gender: 'Male', phone: '9876543216', abhaId: 'ABHA-1234-5684', bloodGroup: 'B-', address: 'City Road, Block C', status: 'waiting', tokenNumber: 106, department: 'Orthopedics', doctor: 'Dr. Mehta', waitTime: 30, registrationDate: '2026-07-08' },
  { id: 'P008', name: 'Anita Roy', age: 29, gender: 'Female', phone: '9876543217', abhaId: 'ABHA-1234-5685', bloodGroup: 'O+', address: 'Village Sunpur, Block D', status: 'waiting', tokenNumber: 107, department: 'ENT', doctor: 'Dr. Bose', waitTime: 20, registrationDate: '2026-07-08' },
];

export const mockDoctors: Doctor[] = [
  { id: 'D001', name: 'Dr. Rajesh Sharma', specialization: 'General Physician', department: 'General Medicine', avatar: 'RS', status: 'available', experience: 15, qualification: 'MBBS, MD', patientsToday: 24, rating: 4.8, schedule: [{ day: 'Mon-Fri', startTime: '09:00', endTime: '17:00', isAvailable: true }] },
  { id: 'D002', name: 'Dr. Priya Patel', specialization: 'Gynecologist', department: 'Gynecology', avatar: 'PP', status: 'busy', experience: 12, qualification: 'MBBS, MS', patientsToday: 18, rating: 4.9, schedule: [{ day: 'Mon-Fri', startTime: '09:00', endTime: '16:00', isAvailable: true }] },
  { id: 'D003', name: 'Dr. Sunil Gupta', specialization: 'Emergency Medicine', department: 'Emergency', avatar: 'SG', status: 'available', experience: 10, qualification: 'MBBS, MD', patientsToday: 32, rating: 4.7, schedule: [{ day: 'Daily', startTime: '00:00', endTime: '23:59', isAvailable: true }] },
  { id: 'D004', name: 'Dr. Kavita Reddy', specialization: 'Cardiologist', department: 'Cardiology', avatar: 'KR', status: 'available', experience: 18, qualification: 'MBBS, DM', patientsToday: 15, rating: 4.9, schedule: [{ day: 'Mon-Sat', startTime: '10:00', endTime: '16:00', isAvailable: true }] },
  { id: 'D005', name: 'Dr. Ayesha Khan', specialization: 'Pediatrician', department: 'Pediatrics', avatar: 'AK', status: 'busy', experience: 8, qualification: 'MBBS, DCH', patientsToday: 28, rating: 4.8, schedule: [{ day: 'Mon-Fri', startTime: '09:00', endTime: '17:00', isAvailable: true }] },
  { id: 'D006', name: 'Dr. Ramesh Iyer', specialization: 'Dermatologist', department: 'Dermatology', avatar: 'RI', status: 'offline', experience: 14, qualification: 'MBBS, MD', patientsToday: 0, rating: 4.6, schedule: [{ day: 'Mon-Wed', startTime: '10:00', endTime: '15:00', isAvailable: false }] },
  { id: 'D007', name: 'Dr. Vikram Mehta', specialization: 'Orthopedic Surgeon', department: 'Orthopedics', avatar: 'VM', status: 'available', experience: 16, qualification: 'MBBS, MS', patientsToday: 12, rating: 4.7, schedule: [{ day: 'Mon-Sat', startTime: '09:00', endTime: '17:00', isAvailable: true }] },
  { id: 'D008', name: 'Dr. Suman Bose', specialization: 'ENT Specialist', department: 'ENT', avatar: 'SB', status: 'on-leave', experience: 11, qualification: 'MBBS, MS', patientsToday: 0, rating: 4.5, schedule: [{ day: 'Mon-Fri', startTime: '09:00', endTime: '16:00', isAvailable: false }] },
];

export const mockDepartments: Department[] = [
  { id: 'DEPT001', name: 'General Medicine', icon: 'Stethoscope', doctors: 4, patientsToday: 45, avgWaitTime: 20, isActive: true },
  { id: 'DEPT002', name: 'Gynecology', icon: 'Heart', doctors: 3, patientsToday: 28, avgWaitTime: 30, isActive: true },
  { id: 'DEPT003', name: 'Emergency', icon: 'AlertTriangle', doctors: 5, patientsToday: 52, avgWaitTime: 5, isActive: true },
  { id: 'DEPT004', name: 'Cardiology', icon: 'Activity', doctors: 2, patientsToday: 18, avgWaitTime: 35, isActive: true },
  { id: 'DEPT005', name: 'Pediatrics', icon: 'Baby', doctors: 3, patientsToday: 35, avgWaitTime: 15, isActive: true },
  { id: 'DEPT006', name: 'Dermatology', icon: 'Scan', doctors: 2, patientsToday: 15, avgWaitTime: 25, isActive: true },
  { id: 'DEPT007', name: 'Orthopedics', icon: 'Bone', doctors: 2, patientsToday: 22, avgWaitTime: 30, isActive: true },
  { id: 'DEPT008', name: 'ENT', icon: 'Ear', doctors: 2, patientsToday: 12, avgWaitTime: 20, isActive: false },
];

export const mockMedicines: Medicine[] = [
  { id: 'M001', name: 'Paracetamol 500mg', category: 'Analgesics', stock: 850, minStock: 200, unit: 'Tablets', expiryDate: '2027-03-15', manufacturer: 'Cipla', price: 2.5, status: 'adequate' },
  { id: 'M002', name: 'Amoxicillin 250mg', category: 'Antibiotics', stock: 120, minStock: 150, unit: 'Capsules', expiryDate: '2026-12-20', manufacturer: 'Sun Pharma', price: 5.0, status: 'low' },
  { id: 'M003', name: 'Metformin 500mg', category: 'Diabetes', stock: 45, minStock: 100, unit: 'Tablets', expiryDate: '2026-09-10', manufacturer: 'Dr Reddy', price: 3.5, status: 'critical' },
  { id: 'M004', name: 'Amlodipine 5mg', category: 'Cardiac', stock: 0, minStock: 80, unit: 'Tablets', expiryDate: '2027-01-25', manufacturer: 'Lupin', price: 4.2, status: 'out-of-stock' },
  { id: 'M005', name: 'Cetirizine 10mg', category: 'Antihistamine', stock: 340, minStock: 100, unit: 'Tablets', expiryDate: '2027-05-18', manufacturer: 'Zydus', price: 2.0, status: 'adequate' },
  { id: 'M006', name: 'ORS Sachets', category: 'Electrolytes', stock: 600, minStock: 300, unit: 'Sachets', expiryDate: '2027-08-30', manufacturer: 'FDC', price: 1.5, status: 'adequate' },
  { id: 'M007', name: 'Insulin Regular', category: 'Diabetes', stock: 15, minStock: 50, unit: 'Vials', expiryDate: '2026-08-15', manufacturer: 'Novo Nordisk', price: 150.0, status: 'critical' },
  { id: 'M008', name: 'Salbutamol Inhaler', category: 'Respiratory', stock: 80, minStock: 60, unit: 'Inhalers', expiryDate: '2027-02-28', manufacturer: 'Cipla', price: 45.0, status: 'low' },
];

export const mockQueue: QueueItem[] = [
  { id: 'Q001', tokenNumber: 101, patientName: 'Ramesh Kumar', patientId: 'P001', department: 'General Medicine', doctor: 'Dr. Sharma', status: 'waiting', waitTime: 25, estimatedTime: 18, type: 'regular', checkInTime: '09:15 AM' },
  { id: 'Q002', tokenNumber: 102, patientName: 'Sunita Devi', patientId: 'P002', department: 'Gynecology', doctor: 'Dr. Patel', status: 'in-progress', waitTime: 0, estimatedTime: 0, type: 'regular', checkInTime: '09:30 AM' },
  { id: 'Q003', tokenNumber: 1, patientName: 'Amit Singh', patientId: 'P003', department: 'Emergency', doctor: 'Dr. Gupta', status: 'emergency', waitTime: 0, estimatedTime: 0, type: 'emergency', checkInTime: '09:45 AM' },
  { id: 'Q004', tokenNumber: 103, patientName: 'Priya Sharma', patientId: 'P004', department: 'Cardiology', doctor: 'Dr. Reddy', status: 'waiting', waitTime: 40, estimatedTime: 32, type: 'senior', checkInTime: '09:20 AM' },
  { id: 'Q005', tokenNumber: 104, patientName: 'Mohammed Ali', patientId: 'P005', department: 'Pediatrics', doctor: 'Dr. Khan', status: 'waiting', waitTime: 15, estimatedTime: 12, type: 'child', checkInTime: '09:50 AM' },
  { id: 'Q006', tokenNumber: 105, patientName: 'Lakshmi Nair', patientId: 'P006', department: 'Dermatology', doctor: 'Dr. Iyer', status: 'completed', waitTime: 0, estimatedTime: 0, type: 'regular', checkInTime: '08:45 AM' },
  { id: 'Q007', tokenNumber: 106, patientName: 'Rajesh Gupta', patientId: 'P007', department: 'Orthopedics', doctor: 'Dr. Mehta', status: 'waiting', waitTime: 30, estimatedTime: 25, type: 'regular', checkInTime: '09:40 AM' },
  { id: 'Q008', tokenNumber: 107, patientName: 'Anita Roy', patientId: 'P008', department: 'ENT', doctor: 'Dr. Bose', status: 'waiting', waitTime: 20, estimatedTime: 15, type: 'regular', checkInTime: '10:00 AM' },
];

export const mockLabTests: LabTest[] = [
  { id: 'L001', patientName: 'Ramesh Kumar', patientId: 'P001', testName: 'Complete Blood Count', category: 'Hematology', status: 'completed', requestedBy: 'Dr. Sharma', requestDate: '2026-07-08', resultDate: '2026-07-08', findings: 'Normal hemoglobin, slight elevation in WBC' },
  { id: 'L002', patientName: 'Sunita Devi', patientId: 'P002', testName: 'Blood Sugar Fasting', category: 'Biochemistry', status: 'in-progress', requestedBy: 'Dr. Patel', requestDate: '2026-07-08' },
  { id: 'L003', patientName: 'Amit Singh', patientId: 'P003', testName: 'X-Ray Chest', category: 'Radiology', status: 'urgent', requestedBy: 'Dr. Gupta', requestDate: '2026-07-08' },
  { id: 'L004', patientName: 'Priya Sharma', patientId: 'P004', testName: 'ECG', category: 'Cardiology', status: 'pending', requestedBy: 'Dr. Reddy', requestDate: '2026-07-08' },
  { id: 'L005', patientName: 'Mohammed Ali', patientId: 'P005', testName: 'Typhoid Test', category: 'Serology', status: 'in-progress', requestedBy: 'Dr. Khan', requestDate: '2026-07-08' },
];

export const mockBeds: Bed[] = [
  { id: 'B001', ward: 'General Ward A', bedNumber: 'A-01', type: 'general', status: 'occupied', patientName: 'Ramesh Kumar', patientId: 'P001', admissionDate: '2026-07-07' },
  { id: 'B002', ward: 'General Ward A', bedNumber: 'A-02', type: 'general', status: 'available' },
  { id: 'B003', ward: 'General Ward A', bedNumber: 'A-03', type: 'general', status: 'occupied', patientName: 'Sunita Devi', patientId: 'P002', admissionDate: '2026-07-08' },
  { id: 'B004', ward: 'ICU', bedNumber: 'ICU-01', type: 'icu', status: 'occupied', patientName: 'Amit Singh', patientId: 'P003', admissionDate: '2026-07-08' },
  { id: 'B005', ward: 'ICU', bedNumber: 'ICU-02', type: 'icu', status: 'available' },
  { id: 'B006', ward: 'Private Room', bedNumber: 'P-01', type: 'private', status: 'reserved' },
  { id: 'B007', ward: 'Emergency', bedNumber: 'E-01', type: 'emergency', status: 'occupied', patientName: 'Rajesh Gupta', patientId: 'P007', admissionDate: '2026-07-08' },
  { id: 'B008', ward: 'Emergency', bedNumber: 'E-02', type: 'emergency', status: 'available' },
];

export const mockNotifications: Notification[] = [
  { id: 'N001', title: 'Emergency Patient', message: 'Critical case admitted in Emergency - Amit Singh', type: 'emergency', read: false, timestamp: '2026-07-08T09:45:00', link: '/staff/queue' },
  { id: 'N002', title: 'Medicine Stock Low', message: 'Amoxicillin 250mg stock below minimum level', type: 'warning', read: false, timestamp: '2026-07-08T09:30:00', link: '/staff/inventory' },
  { id: 'N003', title: 'Appointment Confirmed', message: 'Your appointment with Dr. Sharma is confirmed for 10:30 AM', type: 'success', read: true, timestamp: '2026-07-08T09:00:00', link: '/patient/appointments' },
  { id: 'N004', title: 'Lab Results Ready', message: 'Blood test results for Ramesh Kumar are ready', type: 'info', read: false, timestamp: '2026-07-08T08:45:00', link: '/staff/lab' },
  { id: 'N005', title: 'Doctor On Leave', message: 'Dr. Bose is on leave today - ENT appointments rescheduled', type: 'warning', read: true, timestamp: '2026-07-08T08:00:00', link: '/staff/doctors' },
];

export const mockAppointments: Appointment[] = [
  { id: 'A001', patientId: 'P001', patientName: 'Ramesh Kumar', doctorId: 'D001', doctorName: 'Dr. Rajesh Sharma', department: 'General Medicine', date: '2026-07-08', time: '10:30 AM', status: 'scheduled', type: 'scheduled', tokenNumber: 101, symptoms: 'Fever, headache, body ache' },
  { id: 'A002', patientId: 'P002', patientName: 'Sunita Devi', doctorId: 'D002', doctorName: 'Dr. Priya Patel', department: 'Gynecology', date: '2026-07-08', time: '11:00 AM', status: 'in-progress', type: 'scheduled', tokenNumber: 102, symptoms: 'Regular checkup' },
  { id: 'A003', patientId: 'P003', patientName: 'Amit Singh', doctorId: 'D003', doctorName: 'Dr. Sunil Gupta', department: 'Emergency', date: '2026-07-08', time: '09:45 AM', status: 'in-progress', type: 'emergency', tokenNumber: 1, symptoms: 'Chest pain, breathing difficulty' },
  { id: 'A004', patientId: 'P004', patientName: 'Priya Sharma', doctorId: 'D004', doctorName: 'Dr. Kavita Reddy', department: 'Cardiology', date: '2026-07-08', time: '11:30 AM', status: 'scheduled', type: 'scheduled', tokenNumber: 103, symptoms: 'Chest discomfort, palpitations' },
  { id: 'A005', patientId: 'P005', patientName: 'Mohammed Ali', doctorId: 'D005', doctorName: 'Dr. Ayesha Khan', department: 'Pediatrics', date: '2026-07-08', time: '12:00 PM', status: 'scheduled', type: 'walk-in', tokenNumber: 104, symptoms: 'Fever, cough' },
];

export const mockPHCs: PHC[] = [
  { id: 'PHC001', name: 'PHC Rampur', location: 'Block A, District X', doctors: 4, beds: { total: 20, occupied: 14 }, patientsToday: 85, medicines: { adequate: 45, low: 8, critical: 2 }, score: 92, status: 'excellent' },
  { id: 'PHC002', name: 'PHC Sitapur', location: 'Block B, District X', doctors: 3, beds: { total: 15, occupied: 12 }, patientsToday: 62, medicines: { adequate: 32, low: 12, critical: 5 }, score: 78, status: 'good' },
  { id: 'PHC003', name: 'PHC Kalyanpur', location: 'Block C, District X', doctors: 2, beds: { total: 12, occupied: 10 }, patientsToday: 45, medicines: { adequate: 25, low: 15, critical: 8 }, score: 65, status: 'average' },
  { id: 'PHC004', name: 'PHC Greenfield', location: 'Block D, District X', doctors: 5, beds: { total: 25, occupied: 18 }, patientsToday: 95, medicines: { adequate: 50, low: 5, critical: 1 }, score: 88, status: 'good' },
  { id: 'PHC005', name: 'PHC Sunpur', location: 'Block E, District X', doctors: 2, beds: { total: 10, occupied: 9 }, patientsToday: 38, medicines: { adequate: 18, low: 18, critical: 12 }, score: 52, status: 'poor' },
  { id: 'PHC006', name: 'PHC City Center', location: 'Block F, District X', doctors: 6, beds: { total: 30, occupied: 22 }, patientsToday: 120, medicines: { adequate: 55, low: 10, critical: 3 }, score: 85, status: 'good' },
];

export const mockAIInsights: AIInsight[] = [
  { id: 'AI001', title: 'Dengue Outbreak Risk', description: 'Rising fever cases in Block A and B indicate potential dengue outbreak. Recommend immediate vector control measures.', confidence: 87, category: 'Outbreak Detection', timestamp: '2026-07-08T10:00:00', severity: 'high' },
  { id: 'AI002', title: 'Medicine Shortage Predicted', description: 'Paracetamol and ORS sachets will likely run low in next 7 days based on consumption patterns. Recommend restocking.', confidence: 92, category: 'Inventory Forecast', timestamp: '2026-07-08T09:30:00', severity: 'medium' },
  { id: 'AI003', title: 'Staff Optimization', description: 'Pediatrics department showing 40% higher patient load on weekends. Recommend additional staff on Saturdays.', confidence: 78, category: 'Operational', timestamp: '2026-07-08T09:00:00', severity: 'low' },
  { id: 'AI004', title: 'Diabetes Trend Alert', description: '15 new diabetes cases detected this month in age group 30-45. Lifestyle intervention programs recommended.', confidence: 85, category: 'Health Trends', timestamp: '2026-07-08T08:30:00', severity: 'medium' },
];

export const mockChatMessages: ChatMessage[] = [
  { id: 'CM001', role: 'user', content: 'I have been having fever and headache for 2 days', timestamp: '2026-07-08T09:00:00' },
  { id: 'CM002', role: 'assistant', content: 'Based on your symptoms of fever and headache lasting 2 days, I recommend visiting the General Medicine department. This could be a viral infection or other condition requiring evaluation.\n\n**Recommended Actions:**\n- Visit General Medicine department\n- Stay hydrated\n- Monitor temperature\n- Rest adequately', timestamp: '2026-07-08T09:01:00', confidence: 85, recommendations: ['Visit General Medicine', 'Stay hydrated', 'Monitor temperature'], sources: ['WHO Guidelines', 'MOHFW Protocol'] },
  { id: 'CM003', role: 'user', content: 'Should I be worried?', timestamp: '2026-07-08T09:02:00' },
  { id: 'CM004', role: 'assistant', content: 'While fever and headache are common symptoms, the 2-day duration warrants medical attention. Please visit the nearest PHC for proper evaluation. Your estimated wait time is approximately 20 minutes.', timestamp: '2026-07-08T09:03:00', confidence: 90, recommendations: ['Visit PHC within 24 hours', 'Bring previous medical records'], sources: ['Clinical Guidelines'] },
];

export const mockForecastData: ForecastData[] = [
  { month: 'Jan', patients: 1200, medicines: 850, outbreaks: 2 },
  { month: 'Feb', patients: 1100, medicines: 780, outbreaks: 1 },
  { month: 'Mar', patients: 1350, medicines: 920, outbreaks: 3 },
  { month: 'Apr', patients: 1500, medicines: 1050, outbreaks: 4 },
  { month: 'May', patients: 1800, medicines: 1200, outbreaks: 6 },
  { month: 'Jun', patients: 2100, medicines: 1400, outbreaks: 8 },
  { month: 'Jul', patients: 1950, medicines: 1300, outbreaks: 5 },
  { month: 'Aug', patients: 1700, medicines: 1100, outbreaks: 4 },
  { month: 'Sep', patients: 1450, medicines: 950, outbreaks: 3 },
  { month: 'Oct', patients: 1300, medicines: 880, outbreaks: 2 },
  { month: 'Nov', patients: 1150, medicines: 800, outbreaks: 1 },
  { month: 'Dec', patients: 1050, medicines: 750, outbreaks: 1 },
];

export const mockSymptomChecks: SymptomCheck[] = [
  {
    id: 'SC001',
    symptoms: ['Fever', 'Headache', 'Body ache'],
    predictedConditions: [
      { name: 'Viral Fever', probability: 75, urgency: 'medium' },
      { name: 'Malaria', probability: 15, urgency: 'high' },
      { name: 'Dengue', probability: 10, urgency: 'high' },
    ],
    recommendedDepartment: 'General Medicine',
    timestamp: '2026-07-08T09:00:00',
  },
];

export const mockAnalytics: AnalyticsData[] = [
  { label: 'Total Patients', value: 2850, change: 12.5, changeType: 'positive' },
  { label: 'Avg Wait Time', value: 22, change: -8.3, changeType: 'positive' },
  { label: 'Bed Occupancy', value: 78, change: 5.2, changeType: 'negative' },
  { label: 'Doctor Availability', value: 85, change: 2.1, changeType: 'positive' },
  { label: 'Medicine Stock', value: 72, change: -15.4, changeType: 'negative' },
  { label: 'Patient Satisfaction', value: 4.6, change: 0.3, changeType: 'positive' },
];

export const weeklyReportData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  patients: [145, 162, 158, 170, 155, 98, 65],
  emergency: [12, 15, 10, 18, 14, 8, 6],
  admissions: [18, 22, 20, 25, 19, 12, 8],
};

export const departmentPerformance = [
  { name: 'General Medicine', patients: 450, avgTime: 18, satisfaction: 4.5 },
  { name: 'Emergency', patients: 320, avgTime: 5, satisfaction: 4.7 },
  { name: 'Pediatrics', patients: 280, avgTime: 15, satisfaction: 4.8 },
  { name: 'Gynecology', patients: 220, avgTime: 25, satisfaction: 4.4 },
  { name: 'Cardiology', patients: 150, avgTime: 30, satisfaction: 4.6 },
  { name: 'Orthopedics', patients: 180, avgTime: 22, satisfaction: 4.3 },
];
