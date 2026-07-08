import { motion } from 'framer-motion';
import { AlertTriangle, Pill, Calendar, Factory, Package, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockMedicines } from '@/data/mockData';

export default function MedicineAlerts() {
  const alerts = mockMedicines.filter(m => m.status === 'low' || m.status === 'critical' || m.status === 'out-of-stock');
  const critical = alerts.filter(m => m.status === 'critical' || m.status === 'out-of-stock');
  const low = alerts.filter(m => m.status === 'low');

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex items-center gap-3">
        <motion.div variants={staggerItem} className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </motion.div>
        <div>
          <motion.h1 variants={staggerItem} className="text-2xl font-bold">Medicine Alerts</motion.h1>
          <motion.p variants={staggerItem} className="text-muted-foreground text-sm">{alerts.length} items need attention</motion.p>
        </div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid sm:grid-cols-3 gap-3">
        {[
          { label: 'Critical / Out of Stock', value: critical.length, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
          { label: 'Low Stock', value: low.length, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
          { label: 'Total Alerts', value: alerts.length, color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10', border: 'border-[#2563EB]/20' },
        ].map((s, i) => (
          <motion.div key={i} variants={staggerItem} className={`p-4 rounded-xl border ${s.border} ${s.bg}`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <DashboardCard title="Alert Details" subtitle="Medicines requiring immediate action">
          <div className="space-y-3">
            {alerts.map((med) => (
              <motion.div key={med.id} variants={staggerItem} className={`p-4 rounded-xl border ${med.status === 'critical' || med.status === 'out-of-stock' ? 'border-red-200 bg-red-50 dark:bg-red-950/20' : 'border-amber-200 bg-amber-50 dark:bg-amber-950/20'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${med.status === 'critical' || med.status === 'out-of-stock' ? 'bg-red-100' : 'bg-amber-100'}`}>
                      <Pill className={`w-5 h-5 ${med.status === 'critical' || med.status === 'out-of-stock' ? 'text-red-600' : 'text-amber-600'}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{med.name}</p>
                        <StatusBadge status={med.status} />
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Factory className="w-3 h-3" /> {med.manufacturer}</span>
                        <span className="flex items-center gap-1"><Package className="w-3 h-3" /> Stock: {med.stock} {med.unit}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Exp: {med.expiryDate}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <TrendingDown className="w-4 h-4 text-red-500" />
                        <span className="text-xs text-red-600">Minimum stock: {med.minStock} {med.unit}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className={med.status === 'critical' || med.status === 'out-of-stock' ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'}>
                    Restock
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </DashboardCard>
      </motion.div>
    </div>
  );
}
