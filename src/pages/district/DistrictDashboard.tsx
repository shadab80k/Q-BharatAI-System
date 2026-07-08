import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2, Users, Stethoscope, Pill, Bed, TrendingUp,
  MapPin, AlertTriangle, Star, ChevronRight, Activity,
  BarChart3, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/shared/StatCard';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import CustomAreaChart from '@/components/charts/AreaChart';
import CustomPieChart from '@/components/charts/PieChart';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockPHCs, mockForecastData, weeklyReportData } from '@/data/mockData';

export default function DistrictDashboard() {
  const topPHCs = [...mockPHCs].sort((a, b) => b.score - a.score).slice(0, 3);
  const bottomPHCs = [...mockPHCs].sort((a, b) => a.score - b.score).slice(0, 3);
  const avgScore = Math.round(mockPHCs.reduce((sum, p) => sum + p.score, 0) / mockPHCs.length);

  const phcStatusData = [
    { name: 'Excellent', value: mockPHCs.filter(p => p.status === 'excellent').length },
    { name: 'Good', value: mockPHCs.filter(p => p.status === 'good').length },
    { name: 'Average', value: mockPHCs.filter(p => p.status === 'average').length },
    { name: 'Poor', value: mockPHCs.filter(p => p.status === 'poor').length },
  ];

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1 variants={staggerItem} className="text-2xl font-bold">District Overview</motion.h1>
          <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">District X Performance Dashboard</motion.p>
        </div>
        <motion.div variants={staggerItem} className="flex gap-2">
          <Button variant="outline" size="sm" asChild><Link to="/district/reports"><FileText className="w-4 h-4 mr-1" /> Reports</Link></Button>
          <Button size="sm" className="bg-[#2563EB]" asChild><Link to="/district/phcs"><MapPin className="w-4 h-4 mr-1" /> View PHCs</Link></Button>
        </motion.div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total PHCs" value={mockPHCs.length} change={0} changeType="neutral" icon={Building2} iconColor="text-blue-600" iconBgColor="bg-blue-50" delay={0} />
        <StatCard title="Total Doctors" value={mockPHCs.reduce((s, p) => s + p.doctors, 0)} change={5.2} changeType="positive" icon={Stethoscope} iconColor="text-[#10B981]" iconBgColor="bg-[#10B981]/10" delay={1} />
        <StatCard title="Patients Today" value={mockPHCs.reduce((s, p) => s + p.patientsToday, 0)} change={12.8} changeType="positive" icon={Users} iconColor="text-purple-600" iconBgColor="bg-purple-50" delay={2} />
        <StatCard title="District Score" value={`${avgScore}/100`} change={3.5} changeType="positive" icon={Star} iconColor="text-amber-600" iconBgColor="bg-amber-50" delay={3} />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <DashboardCard title="Patient Trends" subtitle="Monthly patient visits across district" headerAction={<TrendingUp className="w-4 h-4 text-[#10B981]" />}>
            <CustomAreaChart data={mockForecastData.slice(0, 7)} dataKey="patients" xAxisKey="month" color="#2563EB" height={240} />
          </DashboardCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <DashboardCard title="PHC Status Distribution" subtitle="Performance categories">
            <CustomPieChart data={phcStatusData} height={200} innerRadius={50} />
            <div className="grid grid-cols-2 gap-2 mt-3">
              {phcStatusData.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#2563EB', '#10B981', '#F59E0B', '#EF4444'][i] }} />
                  <span className="text-muted-foreground">{d.name}: {d.value}</span>
                </div>
              ))}
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* PHC Rankings */}
      <div className="grid lg:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <DashboardCard title="Top Performing PHCs" subtitle="Highest performance scores" headerAction={<Star className="w-4 h-4 text-amber-500" />}>
            <div className="space-y-3">
              {topPHCs.map((phc, i) => (
                <div key={phc.id} className="flex items-center gap-4 p-3 rounded-lg bg-[#10B981]/5 border border-[#10B981]/10">
                  <div className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{phc.name}</p>
                    <p className="text-xs text-muted-foreground">{phc.location}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-[#10B981]">{phc.score}</p>
                    <StatusBadge status={phc.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <DashboardCard title="PHCs Needing Attention" subtitle="Lower performance scores" headerAction={<AlertTriangle className="w-4 h-4 text-red-500" />}>
            <div className="space-y-3">
              {bottomPHCs.map((phc, i) => (
                <div key={phc.id} className="flex items-center gap-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900">
                  <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{mockPHCs.length - 2 + i}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{phc.name}</p>
                    <p className="text-xs text-muted-foreground">{phc.location}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-red-600">{phc.score}</p>
                    <StatusBadge status={phc.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Quick Links */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <DashboardCard title="Quick Actions" subtitle="Frequently accessed tools">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Building2, label: 'PHC Overview', path: '/district/phcs', color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: BarChart3, label: 'Analytics', path: '/district/analytics', color: 'text-purple-600', bg: 'bg-purple-50' },
              { icon: TrendingUp, label: 'Performance', path: '/district/performance', color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
              { icon: FileText, label: 'Reports', path: '/district/reports', color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((item, i) => (
              <Link key={i} to={item.path} className={`flex flex-col items-center gap-2 p-4 rounded-xl ${item.bg} border border-border/60 hover:shadow-md transition-all group`}>
                <item.icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </DashboardCard>
      </motion.div>
    </div>
  );
}
