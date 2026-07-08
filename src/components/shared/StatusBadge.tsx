import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  className?: string;
}

const statusStyles: Record<string, string> = {
  // General statuses
  active: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
  inactive: 'bg-muted text-muted-foreground border-border',
  pending: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400',
  completed: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
  scheduled: 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20',
  cancelled: 'bg-red-50 text-red-500 border-red-200 dark:bg-red-950/30',
  'in-progress': 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20',

  // Patient statuses
  waiting: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30',
  emergency: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40',

  // Doctor statuses
  available: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
  busy: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30',
  offline: 'bg-muted text-muted-foreground border-border',
  'on-leave': 'bg-purple-50 text-purple-500 border-purple-200 dark:bg-purple-950/30',

  // Medicine statuses
  adequate: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
  low: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30',
  critical: 'bg-red-50 text-red-500 border-red-200 dark:bg-red-950/30',
  'out-of-stock': 'bg-red-100 text-red-600 border-red-300 dark:bg-red-950/50',

  // Bed statuses
  occupied: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
  reserved: 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20',
  maintenance: 'bg-muted text-muted-foreground border-border',

  // PHC statuses
  excellent: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
  good: 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20',
  average: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30',
  poor: 'bg-red-50 text-red-500 border-red-200 dark:bg-red-950/30',

  // Lab statuses
  urgent: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40',

  // Queue types
  regular: 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20',
  senior: 'bg-purple-50 text-purple-500 border-purple-200 dark:bg-purple-950/30',
  child: 'bg-pink-50 text-pink-500 border-pink-200 dark:bg-pink-950/30',

  // Severity
  high: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40',
  medium: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30',
  'severity-low': 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
};

export default function StatusBadge({ status, size = 'sm', className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  const style = statusStyles[normalizedStatus] || statusStyles.inactive;

  return (
    <span
      className={cn(
        'inline-flex items-center border rounded-full font-medium capitalize',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        style,
        className
      )}
    >
      {status}
    </span>
  );
}
