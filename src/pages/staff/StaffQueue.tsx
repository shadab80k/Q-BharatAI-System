import { motion } from 'framer-motion';
import { Users, ArrowUpDown, QrCode, Clock, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockQueue } from '@/data/mockData';

export default function StaffQueue() {
  const waiting = mockQueue.filter(q => q.status === 'waiting');
  const inProgress = mockQueue.filter(q => q.status === 'in-progress');
  const emergency = mockQueue.filter(q => q.status === 'emergency');

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">Today&apos;s Queue</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Manage patient queue in real-time</motion.p>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: mockQueue.length, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Waiting', value: waiting.length, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'In Progress', value: inProgress.length, color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10' },
          { label: 'Emergency', value: emergency.length, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, i) => (
          <motion.div key={i} variants={staggerItem} className={`p-4 rounded-xl border border-border/60 ${stat.bg}`}>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <DashboardCard title="Queue Management" subtitle="Current queue status">
          <div className="space-y-2">
            {mockQueue.map((q, i) => (
              <motion.div key={q.id} variants={staggerItem} className={`flex items-center gap-4 p-4 rounded-xl border ${q.status === 'emergency' ? 'border-red-200 bg-red-50 dark:bg-red-950/20' : 'border-border/60 bg-muted/20'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 ${q.status === 'emergency' ? 'bg-red-500 text-white' : q.status === 'in-progress' ? 'bg-[#2563EB] text-white' : 'bg-muted'}`}>
                  {q.tokenNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{q.patientName}</p>
                    <StatusBadge status={q.status} size="sm" />
                    {q.type !== 'regular' && <StatusBadge status={q.type} size="sm" />}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Stethoscope className="w-3 h-3" /> {q.department}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {q.checkInTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {q.waitTime > 0 && <span className="text-sm text-muted-foreground">{q.waitTime}m</span>}
                  <Button size="sm" variant={q.status === 'waiting' ? 'default' : 'outline'} className={q.status === 'waiting' ? 'bg-[#10B981]' : ''}>
                    {q.status === 'waiting' ? 'Call' : q.status === 'in-progress' ? 'Complete' : 'Done'}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </DashboardCard>
      </motion.div>
    </div>
  );
}
