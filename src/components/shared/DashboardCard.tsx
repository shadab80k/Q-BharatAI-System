import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cardHover } from '@/hooks/useAnimations';

interface DashboardCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
  noPadding?: boolean;
  gradient?: boolean;
}

export default function DashboardCard({ title, subtitle, children, className, headerAction, noPadding, gradient }: DashboardCardProps) {
  const showHeader = title || subtitle || headerAction;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={cardHover}
      className={cn(
        'rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden',
        gradient && 'bg-gradient-to-br from-[#2563EB]/5 to-[#10B981]/5 border-[#2563EB]/20',
        className
      )}
    >
      {showHeader && (
        <div className={cn('flex items-start justify-between', !noPadding && 'px-5 pt-5', noPadding && 'p-0')}>
          <div className={cn(!noPadding && 'pb-3', noPadding && title && 'px-5 pt-5 pb-3')}>
            {title && <h3 className="font-semibold text-sm text-foreground">{title}</h3>}
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div className={cn('flex-shrink-0', !noPadding && 'pr-5 pt-5', noPadding && 'px-5 pt-5')}>{headerAction}</div>}
        </div>
      )}
      <div className={cn(!noPadding && 'px-5 pb-5', noPadding && 'p-0')}>
        {children}
      </div>
    </motion.div>
  );
}
