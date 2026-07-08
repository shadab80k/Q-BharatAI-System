import { motion } from 'framer-motion';
import { Bed, Building2, CheckCircle2, XCircle, Wrench, Bookmark } from 'lucide-react';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockBeds } from '@/data/mockData';

export default function BedStatus() {
  const wards = [...new Set(mockBeds.map(b => b.ward))];
  const summary = {
    total: mockBeds.length,
    occupied: mockBeds.filter(b => b.status === 'occupied').length,
    available: mockBeds.filter(b => b.status === 'available').length,
    reserved: mockBeds.filter(b => b.status === 'reserved').length,
    maintenance: mockBeds.filter(b => b.status === 'maintenance').length,
  };

  const wardColors: Record<string, string> = {
    'General Ward A': 'from-blue-500 to-blue-600',
    'ICU': 'from-red-500 to-red-600',
    'Private Room': 'from-purple-500 to-purple-600',
    'Emergency': 'from-amber-500 to-amber-600',
  };

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">Bed Status</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Real-time bed availability across wards</motion.p>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: 'Total', value: summary.total, icon: Bed, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Occupied', value: summary.occupied, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Available', value: summary.available, icon: CheckCircle2, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
          { label: 'Reserved', value: summary.reserved, icon: Bookmark, color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10' },
          { label: 'Maintenance', value: summary.maintenance, icon: Wrench, color: 'text-muted-foreground', bg: 'bg-muted' },
        ].map((s, i) => (
          <motion.div key={i} variants={staggerItem} className={`p-4 rounded-xl border border-border/60 ${s.bg}`}>
            <s.icon className={`w-5 h-5 ${s.color} mb-1`} />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {wards.map(ward => {
        const wardBeds = mockBeds.filter(b => b.ward === ward);
        return (
          <motion.div key={ward} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <DashboardCard title={ward} subtitle={`${wardBeds.length} beds`}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {wardBeds.map(bed => (
                  <div key={bed.id} className={`p-3 rounded-xl border text-center ${
                    bed.status === 'occupied' ? 'border-red-200 bg-red-50 dark:bg-red-950/20' :
                    bed.status === 'available' ? 'border-[#10B981]/30 bg-[#10B981]/5' :
                    bed.status === 'reserved' ? 'border-[#2563EB]/30 bg-[#2563EB]/5' :
                    'border-border bg-muted'
                  }`}>
                    <Bed className={`w-5 h-5 mx-auto mb-1 ${
                      bed.status === 'occupied' ? 'text-red-500' :
                      bed.status === 'available' ? 'text-[#10B981]' :
                      bed.status === 'reserved' ? 'text-[#2563EB]' :
                      'text-muted-foreground'
                    }`} />
                    <p className="text-sm font-medium">{bed.bedNumber}</p>
                    <p className="text-xs text-muted-foreground capitalize">{bed.type}</p>
                    <StatusBadge status={bed.status} size="sm" className="mt-1" />
                    {bed.patientName && <p className="text-[10px] text-muted-foreground mt-1 truncate">{bed.patientName}</p>}
                  </div>
                ))}
              </div>
            </DashboardCard>
          </motion.div>
        );
      })}
    </div>
  );
}
