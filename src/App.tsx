import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppLayout from '@/components/layout/AppLayout';

// Auth Pages
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

// Patient Pages
import LandingPage from '@/pages/patient/LandingPage';
import PatientDashboard from '@/pages/patient/PatientDashboard';
import BookAppointment from '@/pages/patient/BookAppointment';
import AppointmentSuccess from '@/pages/patient/AppointmentSuccess';
import MyAppointments from '@/pages/patient/MyAppointments';
import LiveQueue from '@/pages/patient/LiveQueue';
import MedicineAvailability from '@/pages/patient/MedicineAvailability';
import DoctorAvailability from '@/pages/patient/DoctorAvailability';
import SymptomChecker from '@/pages/patient/SymptomChecker';
import VoiceAssistant from '@/pages/patient/VoiceAssistant';
import PatientProfile from '@/pages/patient/PatientProfile';

// Staff Pages
import StaffDashboard from '@/pages/staff/StaffDashboard';
import StaffQueue from '@/pages/staff/StaffQueue';
import EmergencyQueue from '@/pages/staff/EmergencyQueue';
import StaffPatients from '@/pages/staff/StaffPatients';
import StaffAppointments from '@/pages/staff/StaffAppointments';
import StaffLab from '@/pages/staff/StaffLab';
import StaffInventory from '@/pages/staff/StaffInventory';
import MedicineAlerts from '@/pages/staff/MedicineAlerts';
import BedStatus from '@/pages/staff/BedStatus';
import StaffDoctors from '@/pages/staff/StaffDoctors';

// District Pages
import DistrictDashboard from '@/pages/district/DistrictDashboard';
import DistrictPHCs from '@/pages/district/DistrictPHCs';
import DistrictAnalytics from '@/pages/district/DistrictAnalytics';
import DistrictPerformance from '@/pages/district/DistrictPerformance';
import DistrictReports from '@/pages/district/DistrictReports';

// AI Pages
import AIInsights from '@/pages/ai/AIInsights';
import AIOutbreak from '@/pages/ai/AIOutbreak';
import AIForecast from '@/pages/ai/AIForecast';
import AIBriefing from '@/pages/ai/AIBriefing';
import AISymptomTriage from '@/pages/ai/AISymptomTriage';

// Shared Pages
import SettingsPage from '@/pages/SettingsPage';
import NotFoundPage from '@/pages/NotFoundPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <NotificationProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* App Routes */}
                <Route element={<AppLayout />}>
                  {/* Patient Routes */}
                  <Route path="/patient/dashboard" element={<PatientDashboard />} />
                  <Route path="/patient/book-appointment" element={<BookAppointment />} />
                  <Route path="/patient/appointment-success" element={<AppointmentSuccess />} />
                  <Route path="/patient/appointments" element={<MyAppointments />} />
                  <Route path="/patient/queue" element={<LiveQueue />} />
                  <Route path="/patient/medicines" element={<MedicineAvailability />} />
                  <Route path="/patient/doctors" element={<DoctorAvailability />} />
                  <Route path="/patient/symptom-checker" element={<SymptomChecker />} />
                  <Route path="/patient/voice-assistant" element={<VoiceAssistant />} />
                  <Route path="/patient/profile" element={<PatientProfile />} />

                  {/* Staff Routes */}
                  <Route path="/staff/dashboard" element={<StaffDashboard />} />
                  <Route path="/staff/queue" element={<StaffQueue />} />
                  <Route path="/staff/emergency" element={<EmergencyQueue />} />
                  <Route path="/staff/patients" element={<StaffPatients />} />
                  <Route path="/staff/appointments" element={<StaffAppointments />} />
                  <Route path="/staff/lab" element={<StaffLab />} />
                  <Route path="/staff/inventory" element={<StaffInventory />} />
                  <Route path="/staff/medicine-alerts" element={<MedicineAlerts />} />
                  <Route path="/staff/beds" element={<BedStatus />} />
                  <Route path="/staff/doctors" element={<StaffDoctors />} />

                  {/* District Routes */}
                  <Route path="/district/dashboard" element={<DistrictDashboard />} />
                  <Route path="/district/phcs" element={<DistrictPHCs />} />
                  <Route path="/district/analytics" element={<DistrictAnalytics />} />
                  <Route path="/district/performance" element={<DistrictPerformance />} />
                  <Route path="/district/reports" element={<DistrictReports />} />

                  {/* AI Routes */}
                  <Route path="/ai/insights" element={<AIInsights />} />
                  <Route path="/ai/outbreak" element={<AIOutbreak />} />
                  <Route path="/ai/forecast" element={<AIForecast />} />
                  <Route path="/ai/briefing" element={<AIBriefing />} />
                  <Route path="/ai/symptom-triage" element={<AISymptomTriage />} />

                  {/* Shared */}
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
