import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Stethoscope, ChevronRight, User, Check, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockDepartments, mockDoctors } from '@/data/mockData';

const timeSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'];

export default function BookAppointment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredDoctors = mockDoctors.filter(d => d.department === selectedDept);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    navigate('/patient/appointment-success', {
      state: { department: selectedDept, doctor: selectedDoctor, date: selectedDate, time: selectedTime, token: 108 }
    });
  };

  const canProceed = step === 1 ? selectedDept : step === 2 ? selectedDoctor : step === 3 ? (selectedDate && selectedTime) : true;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">Book Appointment</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Schedule your visit in a few simple steps</motion.p>
      </motion.div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              s === step ? 'bg-[#2563EB] text-white' :
              s < step ? 'bg-[#10B981] text-white' :
              'bg-muted text-muted-foreground'
            }`}>
              {s < step ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 4 && <div className={`flex-1 h-0.5 ${s < step ? 'bg-[#10B981]' : 'bg-muted'}`} />}
          </div>
        ))}
      </div>

      {/* Emergency Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsEmergency(!isEmergency)}
        className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
          isEmergency ? 'border-red-300 bg-red-50 dark:bg-red-950/30' : 'border-border/60 bg-card hover:border-red-200'
        }`}
      >
        <AlertTriangle className={`w-5 h-5 ${isEmergency ? 'text-red-500' : 'text-muted-foreground'}`} />
        <div className="text-left">
          <p className={`font-medium ${isEmergency ? 'text-red-600' : ''}`}>Emergency Appointment</p>
          <p className="text-xs text-muted-foreground">Toggle for urgent medical attention</p>
        </div>
        <div className={`ml-auto w-10 h-6 rounded-full transition-colors ${isEmergency ? 'bg-red-500' : 'bg-muted'}`}>
          <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${isEmergency ? 'translate-x-5' : 'translate-x-1'}`} />
        </div>
      </motion.button>

      {/* Step 1: Department */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <DashboardCard title="Select Department" subtitle="Choose the department for your visit">
            <div className="grid sm:grid-cols-2 gap-3">
              {mockDepartments.filter(d => d.isActive).map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDept(dept.name)}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                    selectedDept === dept.name
                      ? 'border-[#2563EB] bg-[#2563EB]/5 shadow-sm'
                      : 'border-border/60 hover:border-[#2563EB]/30'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedDept === dept.name ? 'bg-[#2563EB] text-white' : 'bg-muted'
                  }`}>
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{dept.name}</p>
                    <p className="text-xs text-muted-foreground">{dept.doctors} doctors</p>
                  </div>
                  {selectedDept === dept.name && <Check className="w-5 h-5 text-[#2563EB]" />}
                </button>
              ))}
            </div>
          </DashboardCard>
        </motion.div>
      )}

      {/* Step 2: Doctor */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <DashboardCard title="Select Doctor" subtitle={`Available doctors in ${selectedDept}`}>
            <div className="space-y-3">
              {filteredDoctors.map((doctor) => (
                <button
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                    selectedDoctor === doctor.id
                      ? 'border-[#2563EB] bg-[#2563EB]/5 shadow-sm'
                      : 'border-border/60 hover:border-[#2563EB]/30'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium ${
                    selectedDoctor === doctor.id ? 'bg-[#2563EB]' : 'bg-gradient-to-br from-gray-400 to-gray-500'
                  }`}>
                    {doctor.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{doctor.name}</p>
                      <StatusBadge status={doctor.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{doctor.qualification} • {doctor.experience} years exp.</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs text-muted-foreground">Patients today: {doctor.patientsToday}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-amber-500">★ {doctor.rating}</span>
                    </div>
                  </div>
                  {selectedDoctor === doctor.id && <Check className="w-5 h-5 text-[#2563EB]" />}
                </button>
              ))}
            </div>
          </DashboardCard>
        </motion.div>
      )}

      {/* Step 3: Date & Time */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <DashboardCard title="Select Date" subtitle="Pick your preferred date">
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 14 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const dateStr = date.toISOString().split('T')[0];
                const isSelected = selectedDate === dateStr;
                const isToday = i === 0;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-2 rounded-lg text-center transition-all ${
                      isSelected ? 'bg-[#2563EB] text-white' : 'bg-muted/50 hover:bg-muted'
                    }`}
                  >
                    <p className="text-[10px] uppercase">{date.toLocaleDateString('en', { weekday: 'short' })}</p>
                    <p className={`text-lg font-bold ${isSelected ? 'text-white' : ''}`}>{date.getDate()}</p>
                    {isToday && <p className="text-[9px]">Today</p>}
                  </button>
                );
              })}
            </div>
          </DashboardCard>

          <DashboardCard title="Select Time" subtitle="Available time slots">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedTime === time
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-muted/50 hover:bg-muted'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </DashboardCard>
        </motion.div>
      )}

      {/* Step 4: Symptoms */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <DashboardCard title="Additional Information" subtitle="Help us prepare for your visit">
            <div className="space-y-4">
              <div>
                <Label htmlFor="symptoms">Symptoms / Reason for Visit</Label>
                <Textarea
                  id="symptoms"
                  value={symptoms}
                  onChange={e => setSymptoms(e.target.value)}
                  placeholder="Describe your symptoms or reason for the appointment..."
                  className="mt-1.5 min-h-[100px]"
                />
              </div>
              <div className="p-4 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <User className="w-4 h-4 text-[#2563EB]" />
                  Appointment Summary
                </h4>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Department:</span> {selectedDept}</p>
                  <p><span className="text-muted-foreground">Doctor:</span> {mockDoctors.find(d => d.id === selectedDoctor)?.name}</p>
                  <p><span className="text-muted-foreground">Date:</span> {selectedDate}</p>
                  <p><span className="text-muted-foreground">Time:</span> {selectedTime}</p>
                  {isEmergency && <StatusBadge status="emergency" />}
                </div>
              </div>
            </div>
          </DashboardCard>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        ) : <div />}
        {step < 4 ? (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed}
            className="bg-[#2563EB]"
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white"
          >
            {isSubmitting ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>Confirm Booking <Check className="w-4 h-4 ml-1" /></>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
