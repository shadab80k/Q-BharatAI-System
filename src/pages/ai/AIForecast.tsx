import { motion } from 'framer-motion';
import { TrendingUp, Pill, Users, Calendar, ArrowUpRight, Package, AlertCircle } from 'lucide-react';
import DashboardCard from '@/components/shared/DashboardCard';
import CustomAreaChart from '@/components/charts/AreaChart';
import CustomBarChart from '@/components/charts/BarChart';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockForecastData, mockMedicines } from '@/data/mockData';

const medicineForecasts = mockMedicines.slice(0, 4).map(m => ({
  ...m,
  predictedNeed: Math.max(0, m.minStock * 2 - m.stock),
  daysUntilEmpty: m.stock > 0 ? Math.floor(m.stock / Math.max(1, Math.floor(m.minStock / 10))) : 0,
}));

export default function AIForecast() {
  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">AI Forecasts</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Predictive analytics for resource planning</motion.p>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Predicted Patients (Next Mo)', value: '2,100', change: '+8%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Medicine Demand', value: '+15%', change: 'vs last month', icon: Pill, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Peak Day Forecast', value: 'Saturday', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Stockout Risk', value: '3 items', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((s, i) => (
          <motion.div key={i} variants={staggerItem} className={`p-4 rounded-xl border border-border/60 ${s.bg}`}>
            <s.icon className={`w-5 h-5 ${s.color} mb-1`} />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <DashboardCard title="Patient Volume Forecast" subtitle="Predicted monthly patient visits">
            <CustomAreaChart data={mockForecastData} dataKey="patients" xAxisKey="month" color="#2563EB" height={250} />
          </DashboardCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <DashboardCard title="Medicine Demand Forecast" subtitle="Predicted consumption trends">
            <CustomBarChart data={mockForecastData} dataKey="medicines" xAxisKey="month" color="#10B981" height={250} />
          </DashboardCard>
        </motion.div>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <DashboardCard title="Medicine Stock Forecast" subtitle="Predicted stockouts and restock needs">
          <div className="space-y-3">
            {medicineForecasts.map((med, i) => (
              <motion.div key={med.id} variants={staggerItem} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                  <Pill className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{med.name}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Current: {med.stock} {med.unit}</span>
                    <span className="flex items-center gap-1 text-red-500"><ArrowUpRight className="w-3 h-3" /> Need: {med.predictedNeed} {med.unit}</span>
                  </div>
                  <div className="mt-1.5">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <span className="text-muted-foreground">Stock depletion timeline</span>
                      <span className={med.daysUntilEmpty < 7 ? 'text-red-600 font-medium' : 'text-muted-foreground'}>
                        {med.daysUntilEmpty} days remaining
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${med.daysUntilEmpty < 7 ? 'bg-red-500' : med.daysUntilEmpty < 14 ? 'bg-amber-500' : 'bg-[#10B981]'}`}
                        style={{ width: `${Math.min((med.daysUntilEmpty / 30) * 100, 100)}%` }} />
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
