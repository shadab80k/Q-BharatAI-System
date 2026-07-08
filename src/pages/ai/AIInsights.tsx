import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Sparkles, Target, Zap, Shield } from 'lucide-react';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockAIInsights } from '@/data/mockData';

const aiMetrics = [
  { label: 'AI Predictions', value: '156', change: '+12', icon: Brain, color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Accuracy Rate', value: '94%', change: '+3%', icon: Target, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
  { label: 'Active Alerts', value: '8', change: '-2', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Time Saved', value: '48h', change: '+8h', icon: Zap, color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10' },
];

export default function AIInsights() {
  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex items-center gap-3">
        <motion.div variants={staggerItem} className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <motion.h1 variants={staggerItem} className="text-2xl font-bold">AI Operational Insights</motion.h1>
          <motion.p variants={staggerItem} className="text-muted-foreground text-sm">AI-powered analytics and recommendations</motion.p>
        </div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {aiMetrics.map((m, i) => (
          <motion.div key={i} variants={staggerItem} className={`p-4 rounded-xl border border-border/60 ${m.bg}`}>
            <m.icon className={`w-5 h-5 ${m.color} mb-1`} />
            <p className="text-2xl font-bold">{m.value}</p>
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="text-xs text-[#10B981] font-medium mt-0.5">{m.change} this week</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <DashboardCard title="AI Recommendations" subtitle="Personalized insights for your district">
          <div className="space-y-4">
            {mockAIInsights.map((insight, i) => (
              <motion.div key={insight.id} variants={staggerItem} className={`p-4 rounded-xl border ${
                insight.severity === 'high' ? 'border-red-200 bg-red-50 dark:bg-red-950/20' :
                insight.severity === 'medium' ? 'border-amber-200 bg-amber-50 dark:bg-amber-950/20' :
                'border-[#2563EB]/20 bg-[#2563EB]/5'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    insight.severity === 'high' ? 'bg-red-100' :
                    insight.severity === 'medium' ? 'bg-amber-100' :
                    'bg-[#2563EB]/10'
                  }`}>
                    {insight.severity === 'high' ? <AlertTriangle className="w-5 h-5 text-red-600" /> :
                     insight.severity === 'medium' ? <Lightbulb className="w-5 h-5 text-amber-600" /> :
                     <Sparkles className="w-5 h-5 text-[#2563EB]" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{insight.title}</h3>
                      <StatusBadge status={insight.severity} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Brain className="w-3 h-3" /> {insight.category}</span>
                      <span className="flex items-center gap-1"><Target className="w-3 h-3" /> {insight.confidence}% confidence</span>
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
