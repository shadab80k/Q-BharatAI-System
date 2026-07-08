import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users, UserPlus, Activity, Pill, Bed, FlaskConical,
  Stethoscope, AlertTriangle, TrendingUp, Clock, ChevronRight,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/shared/StatCard';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import CustomAreaChart from '@/components/charts/AreaChart';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockPatients, mockQueue, mockMedicines, mockAppointments, weeklyReportData } from '@/data/mockData';

const quickActions = [
  { icon: UserPlus, label: 'New Patient', path: '/staff/patients', color: 'bg-blue-50 text-blue-600' },
  { icon: Users, label: 'Queue', path: '/staff/queue', color: 'bg-green-50 text-green-600' },
  { icon: Pill, label: 'Inventory', path: '/staff/inventory', color: 'bg-amber-50 text-amber-600' },
  { icon: Bed, label: 'Beds', path: '/staff/beds', color: 'bg-purple-50 text-purple-600' },
];

export default function StaffDashboard() {
  const waitingCount = mockQueue.filter(q => q.status === 'waiting').length;
  const emergencyCount = mockQueue.filter(q => q.status === 'emergency').length;
  const lowStockCount = mockMedicines.filter(m => m.status === 'low' || m.status === 'critical').length;
  const todayAppointments = mockAppointments.length;

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1 variants={staggerItem} className="text-2xl font-bold">Staff Dashboard</motion.h1>
          <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Operations overview for today</motion.p>
        </div>
        <motion.div variants={staggerItem} className="flex gap-2">
          <Button variant="outline" size="sm"><Clock className="w-4 h-4 mr-1" /> {new Date().toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })}</Button>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions.map((action, i) => (
          <motion.div key={i} variants={staggerItem}>
            <Link to={action.path} className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-card hover:border-[#2563EB]/30 hover:shadow-md transition-all group">
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium group-hover:text-[#2563EB] transition-colors">{action.label}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Patients Today" value={mockPatients.length} change={12.5} changeType="positive" icon={Users} iconColor="text-blue-600" iconBgColor="bg-blue-50" delay={0} />
        <StatCard title="Waiting in Queue" value={waitingCount} change={-5.2} changeType="positive" icon={Clock} iconColor="text-amber-600" iconBgColor="bg-amber-50" delay={1} />
        <StatCard title="Emergencies" value={emergencyCount} change={0} changeType="neutral" icon={AlertTriangle} iconColor="text-red-600" iconBgColor="bg-red-50" delay={2} />
        <StatCard title="Low Stock Items" value={lowStockCount} change={8.1} changeType="negative" icon={Pill} iconColor="text-purple-600" iconBgColor="bg-purple-50" delay={3} />
      </div>

      {/* Charts & Lists */}
      <div className="grid lg:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <DashboardCard title="Weekly Patient Trends" subtitle="Patient visits over the week" headerAction={<TrendingUp className="w-4 h-4 text-[#10B981]" />}>
            <CustomAreaChart data={weeklyReportData.labels.map((l, i) => ({ day: l, patients: weeklyReportData.patients[i], emergency: weeklyReportData.emergency[i] }))} dataKey="patients" xAxisKey="day" color="#2563EB" height={220} />
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <DashboardCard title="Recent Patients" subtitle="Latest registrations" headerAction={<Button variant="ghost" size="sm" className="text-[#2563EB]" asChild><Link to="/staff/patients">View All <ChevronRight className="w-4 h-4 ml-1" /></Link></Button>}>
            <div className="space-y-3">
              {mockPatients.slice(0, 5).map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {p.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.department}</p>
                  </div>
                  <StatusBadge status={p.status} size="sm" />
                </div>
              ))}
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <DashboardCard title="Medicine Alerts" subtitle="Items requiring attention" headerAction={<Button variant="ghost" size="sm" className="text-[#2563EB]" asChild><Link to="/staff/medicine-alerts">View All</Link></Button>}>
            <div className="space-y-2">
              {mockMedicines.filter(m => m.status !== 'adequate').map((med, i) => (
                <div key={med.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Pill className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{med.name}</p>
                      <p className="text-xs text-muted-foreground">Stock: {med.stock} {med.unit}</p>
                    </div>
                  </div>
                  <StatusBadge status={med.status} size="sm" />
                </div>
              ))}
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <DashboardCard title="Department Performance" subtitle="Today&apos;s overview">
            <div className="space-y-3">
              {['General Medicine', 'Emergency', 'Pediatrics', 'Gynecology'].map((dept, i) => {
                const patients = mockPatients.filter(p => p.department === dept).length;
                const maxPatients = 6;
                return (
                  <div key={dept}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{dept}</span>
                      <span className="text-sm font-medium">{patients} patients</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(patients / maxPatients) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#2563EB] to-[#10B981] rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  );
}
