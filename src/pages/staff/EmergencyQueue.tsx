import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Stethoscope, Phone, MapPin, HeartPulse, Activity, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockQueue, mockPatients } from '@/data/mockData';

export default function EmergencyQueue() {
  const emergencies = mockQueue.filter(q => q.status === 'emergency');

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div variants={staggerItem} className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </motion.div>
          <div>
            <motion.h1 variants={staggerItem} className="text-2xl font-bold">Emergency Queue</motion.h1>
            <motion.p variants={staggerItem} className="text-muted-foreground text-sm">Critical cases requiring immediate attention</motion.p>
          </div>
        </div>
        <motion.div variants={staggerItem}>
          <Button className="bg-red-600 hover:bg-red-700"><Zap className="w-4 h-4 mr-1" /> Call Emergency</Button>
        </motion.div>
      </motion.div>

      {emergencies.length === 0 ? (
        <DashboardCard>
          <div className="text-center py-12">
            <HeartPulse className="w-12 h-12 text-[#10B981] mx-auto mb-3" />
            <p className="font-medium text-[#10B981]">No emergency cases</p>
            <p className="text-sm text-muted-foreground mt-1">All patients are stable</p>
          </div>
        </DashboardCard>
      ) : (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
          {emergencies.map((q, i) => {
            const patient = mockPatients.find(p => p.id === q.patientId);
            return (
              <motion.div key={q.id} variants={staggerItem}>
                <DashboardCard className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl font-bold text-red-600">#{q.tokenNumber}</span>
                        <StatusBadge status="emergency" />
                        <span className="flex items-center gap-1 text-xs text-red-600 bg-red-100 dark:bg-red-950/40 px-2 py-0.5 rounded-full">
                          <Activity className="w-3 h-3 animate-pulse" /> LIVE
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold">{q.patientName}</h3>
                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Stethoscope className="w-4 h-4" /> {q.department}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {q.checkInTime}</span>
                        <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {patient?.phone}</span>
                      </div>
                      {patient?.address && (
                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-4 h-4" /> {patient.address}</p>
                      )}
                    </div>
                    <div className="flex md:flex-col gap-2">
                      <Button className="bg-red-600 hover:bg-red-700 flex-1"><HeartPulse className="w-4 h-4 mr-1" /> Attend</Button>
                      <Button variant="outline" className="flex-1">Assign Doctor</Button>
                    </div>
                  </div>
                </DashboardCard>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
