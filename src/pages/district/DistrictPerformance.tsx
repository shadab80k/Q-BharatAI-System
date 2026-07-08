import { motion } from 'framer-motion';
import { TrendingUp, Star, Target, Zap, Award, ChevronUp, ChevronDown } from 'lucide-react';
import DashboardCard from '@/components/shared/DashboardCard';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockPHCs } from '@/data/mockData';

const metrics = [
  { label: 'Overall District Score', value: '78/100', change: '+3', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Patient Satisfaction', value: '4.5/5', change: '+0.2', icon: Target, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
  { label: 'Staff Efficiency', value: '82%', change: '+5%', icon: Zap, color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10' },
  { label: 'Resource Utilization', value: '71%', change: '-2%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const rankings = [
  { phc: 'PHC Rampur', score: 92, prevScore: 88, patients: 85, doctors: 4 },
  { phc: 'PHC City Center', score: 85, prevScore: 87, patients: 120, doctors: 6 },
  { phc: 'PHC Greenfield', score: 88, prevScore: 82, patients: 95, doctors: 5 },
  { phc: 'PHC Sitapur', score: 78, prevScore: 76, patients: 62, doctors: 3 },
  { phc: 'PHC Kalyanpur', score: 65, prevScore: 68, patients: 45, doctors: 2 },
  { phc: 'PHC Sunpur', score: 52, prevScore: 50, patients: 38, doctors: 2 },
];

export default function DistrictPerformance() {
  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">Performance</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">District-wide performance metrics and rankings</motion.p>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m, i) => (
          <motion.div key={i} variants={staggerItem} className={`p-4 rounded-xl border border-border/60 ${m.bg}`}>
            <m.icon className={`w-5 h-5 ${m.color} mb-2`} />
            <p className="text-2xl font-bold">{m.value}</p>
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className={`text-xs font-medium mt-1 ${m.change.startsWith('+') ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              {m.change.startsWith('+') ? <ChevronUp className="w-3 h-3 inline" /> : <ChevronDown className="w-3 h-3 inline" />}
              {m.change} from last month
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <DashboardCard title="PHC Rankings" subtitle="Performance comparison across all PHCs">
          <div className="space-y-3">
            {rankings.sort((a, b) => b.score - a.score).map((r, i) => {
              const scoreChange = r.score - r.prevScore;
              return (
                <div key={r.phc} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    i === 0 ? 'bg-amber-100 text-amber-600' : i === 1 ? 'bg-gray-100 text-gray-600' : i === 2 ? 'bg-orange-100 text-orange-600' : 'bg-muted text-muted-foreground'
                  }`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{r.phc}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{r.doctors} doctors</span>
                      <span>{r.patients} patients today</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1">
                      <p className="font-bold">{r.score}</p>
                      <span className={`text-xs ${scoreChange >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                        {scoreChange >= 0 ? '+' : ''}{scoreChange}
                      </span>
                    </div>
                    <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#10B981] rounded-full" style={{ width: `${r.score}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardCard>
      </motion.div>
    </div>
  );
}
