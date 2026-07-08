import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, Pill, Stethoscope, Brain, Mic,
  QrCode, ChevronRight, Activity, AlertCircle, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockAppointments, mockQueue, mockNotifications } from '@/data/mockData';

const quickActions = [
  { icon: Calendar, label: 'Book Appointment', path: '/patient/book-appointment', color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/30' },
  { icon: Brain, label: 'AI Symptom Check', path: '/patient/symptom-checker', color: 'bg-violet-50 text-violet-600 dark:bg-violet-950/30' },
  { icon: QrCode, label: 'My Token', path: '/patient/queue', color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30' },
  { icon: Mic, label: 'Voice Assistant', path: '/patient/voice-assistant', color: 'bg-rose-50 text-rose-600 dark:bg-rose-950/30' },
];

export default function PatientDashboard() {
  const upcomingAppointment = mockAppointments.find(a => a.status === 'scheduled');
  const myQueueItem = mockQueue.find(q => q.patientId === 'P001');
  const unreadNotifications = mockNotifications.filter(n => !n.read);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1 variants={staggerItem} className="text-2xl font-bold">Good Morning, Ramesh</motion.h1>
          <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Here&apos;s your health overview for today</motion.p>
        </div>
        <motion.div variants={staggerItem} className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
          <Activity className="w-4 h-4 text-[#10B981]" />
          <span>ABHA ID: ABHA-1234-5678</span>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {quickActions.map((action, i) => (
          <motion.div key={i} variants={staggerItem}>
            <Link
              to={action.path}
              className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-card hover:border-[#2563EB]/30 hover:shadow-md transition-all group"
            >
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium group-hover:text-[#2563EB] transition-colors">{action.label}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Upcoming Appointment */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <DashboardCard
            title="Upcoming Appointment"
            subtitle={upcomingAppointment ? 'Your next scheduled visit' : 'No upcoming appointments'}
            headerAction={
              <Button asChild variant="ghost" size="sm" className="text-[#2563EB]">
                <Link to="/patient/appointments">View All <ChevronRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            }
          >
            {upcomingAppointment ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-[#2563EB]/5 to-[#10B981]/5 border border-[#2563EB]/10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{upcomingAppointment.doctorName}</h4>
                      <StatusBadge status={upcomingAppointment.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{upcomingAppointment.department}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-muted-foreground" /> {upcomingAppointment.time}</span>
                      <span className="flex items-center gap-1"><QrCode className="w-3.5 h-3.5 text-muted-foreground" /> Token #{upcomingAppointment.tokenNumber}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>Please arrive 15 minutes before your scheduled time</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No appointments scheduled</p>
                <Button asChild className="mt-3 bg-[#2563EB]">
                  <Link to="/patient/book-appointment">Book Now</Link>
                </Button>
              </div>
            )}
          </DashboardCard>
        </motion.div>

        {/* Live Queue Card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <DashboardCard title="Live Queue" subtitle="Real-time token status">
            {myQueueItem ? (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Your Token Number</p>
                  <motion.p
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="text-5xl font-bold bg-gradient-to-r from-[#2563EB] to-[#10B981] bg-clip-text text-transparent"
                  >
                    {myQueueItem.tokenNumber}
                  </motion.p>
                  <StatusBadge status={myQueueItem.status} className="mt-2" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Wait Time</p>
                    <p className="text-lg font-semibold">{myQueueItem.waitTime} min</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Est. Time</p>
                    <p className="text-lg font-semibold text-[#10B981]">{myQueueItem.estimatedTime} min</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/patient/queue">View Full Queue</Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground text-sm">Not in queue currently</p>
              </div>
            )}
          </DashboardCard>
        </motion.div>
      </div>

      {/* Health Insights & Notifications */}
      <div className="grid lg:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <DashboardCard title="Health Insights" subtitle="AI-powered recommendations">
            <div className="space-y-3">
              {[
                { icon: TrendingUp, text: 'Your blood pressure has been stable for 30 days', type: 'positive' },
                { icon: Pill, text: 'Medicine refill due in 5 days', type: 'warning' },
                { icon: Stethoscope, text: 'Annual health checkup recommended', type: 'info' },
              ].map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    insight.type === 'positive' ? 'bg-[#10B981]/10 text-[#10B981]' :
                    insight.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                    'bg-[#2563EB]/10 text-[#2563EB]'
                  }`}>
                    <insight.icon className="w-4 h-4" />
                  </div>
                  <p className="text-sm">{insight.text}</p>
                </motion.div>
              ))}
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <DashboardCard
            title="Notifications"
            subtitle={`${unreadNotifications.length} unread`}
            headerAction={
              <Button variant="ghost" size="sm" className="text-[#2563EB]">Mark All Read</Button>
            }
          >
            <div className="space-y-2">
              {mockNotifications.slice(0, 4).map((n, i) => (
                <div key={n.id} className={`flex items-start gap-3 p-3 rounded-lg ${!n.read ? 'bg-[#2563EB]/[0.02]' : ''}`}>
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    n.type === 'emergency' ? 'bg-red-500' :
                    n.type === 'warning' ? 'bg-amber-500' :
                    n.type === 'success' ? 'bg-[#10B981]' :
                    'bg-[#2563EB]'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!n.read ? 'font-medium' : ''}`}>{n.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  );
}
