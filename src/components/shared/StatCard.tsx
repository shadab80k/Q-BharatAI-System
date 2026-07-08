import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
  iconColor?: string;
  iconBgColor?: string;
  suffix?: string;
  delay?: number;
}

export default function StatCard({ title, value, change, changeType = 'neutral', icon: Icon, iconColor = 'text-[#2563EB]', iconBgColor = 'bg-[#2563EB]/10', suffix, delay = 0 }: StatCardProps) {
  const ChangeIcon = change && change > 0 ? TrendingUp : change && change < 0 ? TrendingDown : Minus;
  const changeColor = changeType === 'positive' ? 'text-[#10B981]' : changeType === 'negative' ? 'text-[#EF4444]' : 'text-muted-foreground';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="rounded-xl border border-border/60 bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold tracking-tight">{value}</span>
            {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
          </div>
          {change !== undefined && (
            <div className={cn('flex items-center gap-1 text-xs font-medium', changeColor)}>
              <ChangeIcon className="w-3 h-3" />
              <span>{Math.abs(change).toFixed(1)}%</span>
              <span className="text-muted-foreground font-normal">vs last week</span>
            </div>
          )}
        </div>
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', iconBgColor)}>
          <Icon className={cn('w-5 h-5', iconColor)} />
        </div>
      </div>
    </motion.div>
  );
}
