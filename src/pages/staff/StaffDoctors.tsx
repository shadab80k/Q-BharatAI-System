import { motion } from 'framer-motion';
import { Stethoscope, Clock, Calendar, Star, Users, CheckCircle2, XCircle, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockDoctors } from '@/data/mockData';

export default function StaffDoctors() {
  const summary = {
    total: mockDoctors.length,
    available: mockDoctors.filter(d => d.status === 'available').length,
    busy: mockDoctors.filter(d => d.status === 'busy').length,
    offline: mockDoctors.filter(d => d.status === 'offline' || d.status === 'on-leave').length,
  };

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">Doctor Attendance</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Monitor doctor availability and status</motion.p>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: summary.total, icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Available', value: summary.available, icon: CheckCircle2, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
          { label: 'Busy', value: summary.busy, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Offline/Leave', value: summary.offline, icon: XCircle, color: 'text-muted-foreground', bg: 'bg-muted' },
        ].map((s, i) => (
          <motion.div key={i} variants={staggerItem} className={`p-4 rounded-xl border border-border/60 ${s.bg}`}>
            <s.icon className={`w-5 h-5 ${s.color} mb-1`} />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid sm:grid-cols-2 gap-4">
        {mockDoctors.map((doc) => (
          <motion.div key={doc.id} variants={staggerItem}>
            <DashboardCard>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {doc.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{doc.name}</h3>
                    <StatusBadge status={doc.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">{doc.specialization}</p>
                  <p className="text-xs text-muted-foreground">{doc.qualification} • <Briefcase className="w-3 h-3 inline" /> {doc.experience} yrs</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500" /> {doc.rating}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {doc.patientsToday} today</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {doc.schedule[0].day}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs">
                    <Clock className="w-3 h-3 text-[#10B981]" />
                    <span className="text-muted-foreground">{doc.schedule[0].startTime} - {doc.schedule[0].endTime}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">View Profile</Button>
                    {doc.status === 'available' ? <Button size="sm" className="flex-1 bg-[#10B981]">Assign</Button> : <Button size="sm" variant="outline" className="flex-1" disabled>Unavailable</Button>}
                  </div>
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
