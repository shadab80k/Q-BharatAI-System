import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pill, Search, AlertTriangle, Package, Calendar, Factory } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockMedicines } from '@/data/mockData';

export default function MedicineAvailability() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = ['all', ...new Set(mockMedicines.map(m => m.category))];
  const filtered = mockMedicines.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || m.category === category;
    return matchesSearch && matchesCategory;
  });

  const criticalCount = mockMedicines.filter(m => m.status === 'critical' || m.status === 'out-of-stock').length;

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">Medicine Availability</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Check medicine stock at your PHC</motion.p>
      </motion.div>

      {/* Alert */}
      {criticalCount > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">{criticalCount} medicines are critically low or out of stock</p>
        </motion.div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search medicines..." className="pl-10" />
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                category === c ? 'bg-[#2563EB] text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Medicines Grid */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((med, i) => (
          <motion.div key={med.id} variants={staggerItem}>
            <DashboardCard>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                  <Pill className="w-5 h-5 text-[#2563EB]" />
                </div>
                <StatusBadge status={med.status} />
              </div>
              <h3 className="font-semibold text-sm">{med.name}</h3>
              <p className="text-xs text-muted-foreground">{med.category}</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground"><Package className="w-3.5 h-3.5" /> Stock</span>
                  <span className="font-medium">{med.stock} {med.unit}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      med.status === 'adequate' ? 'bg-[#10B981]' :
                      med.status === 'low' ? 'bg-amber-500' :
                      'bg-[#EF4444]'
                    }`}
                    style={{ width: `${Math.min((med.stock / (med.minStock * 3)) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Factory className="w-3 h-3" /> {med.manufacturer}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Exp: {med.expiryDate}</span>
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
