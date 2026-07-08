import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, TrendingUp, Shield, Activity, Flame, Droplets, Wind } from 'lucide-react';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import CustomAreaChart from '@/components/charts/AreaChart';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockForecastData } from '@/data/mockData';

const outbreaks = [
  { disease: 'Dengue', risk: 'High', trend: 'increasing', cases: 45, locations: ['Block A', 'Block B'], icon: Droplets, color: 'text-red-600', bg: 'bg-red-50' },
  { disease: 'Malaria', risk: 'Medium', trend: 'stable', cases: 23, locations: ['Block C'], icon: Droplets, color: 'text-amber-600', bg: 'bg-amber-50' },
  { disease: 'Respiratory Infections', risk: 'Medium', trend: 'increasing', cases: 78, locations: ['Block D', 'Block E'], icon: Wind, color: 'text-amber-600', bg: 'bg-amber-50' },
  { disease: 'Diarrhea', risk: 'Low', trend: 'decreasing', cases: 12, locations: ['Block A'], icon: Droplets, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
];

export default function AIOutbreak() {
  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex items-center gap-3">
        <motion.div variants={staggerItem} className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </motion.div>
        <div>
          <motion.h1 variants={staggerItem} className="text-2xl font-bold">Outbreak Detection</motion.h1>
          <motion.p variants={staggerItem} className="text-muted-foreground text-sm">AI-powered disease surveillance</motion.p>
        </div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Active Alerts', value: '3', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Cases This Week', value: '158', icon: Activity, color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10' },
          { label: 'Blocks Affected', value: '4', icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Containment Score', value: '82%', icon: Shield, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
        ].map((s, i) => (
          <motion.div key={i} variants={staggerItem} className={`p-4 rounded-xl border border-border/60 ${s.bg}`}>
            <s.icon className={`w-5 h-5 ${s.color} mb-1`} />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <DashboardCard title="Disease Trend Forecast" subtitle="Predicted cases for next 3 months">
          <CustomAreaChart data={mockForecastData} dataKey="outbreaks" xAxisKey="month" color="#EF4444" height={250} />
        </DashboardCard>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <DashboardCard title="Active Outbreak Alerts" subtitle="Current disease surveillance status">
          <div className="space-y-3">
            {outbreaks.map((o, i) => (
              <motion.div key={i} variants={staggerItem} className={`p-4 rounded-xl border ${o.risk === 'High' ? 'border-red-200 bg-red-50 dark:bg-red-950/20' : o.risk === 'Medium' ? 'border-amber-200 bg-amber-50 dark:bg-amber-950/20' : 'border-[#10B981]/20 bg-[#10B981]/5'}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg ${o.bg} flex items-center justify-center flex-shrink-0`}>
                    <o.icon className={`w-5 h-5 ${o.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{o.disease}</h3>
                      <StatusBadge status={o.risk === 'High' ? 'critical' : o.risk === 'Medium' ? 'medium' : 'low'} />
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5" /> {o.cases} cases</span>
                      <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> Trend: {o.trend}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {o.locations.map(l => (
                        <span key={l} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-background border">
                          <MapPin className="w-3 h-3" /> {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </DashboardCard>
      </motion.div>
    </div>
  );
}
