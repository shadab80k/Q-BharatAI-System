import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pill, Search, Package, Plus, Minus, Factory, Calendar, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockMedicines } from '@/data/mockData';

export default function StaffInventory() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const categories = ['all', ...new Set(mockMedicines.map(m => m.category))];

  const filtered = mockMedicines.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || m.category === category;
    return matchesSearch && matchesCategory;
  });

  const stockSummary = {
    total: mockMedicines.length,
    adequate: mockMedicines.filter(m => m.status === 'adequate').length,
    low: mockMedicines.filter(m => m.status === 'low').length,
    critical: mockMedicines.filter(m => m.status === 'critical' || m.status === 'out-of-stock').length,
  };

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1 variants={staggerItem} className="text-2xl font-bold">Medicine Inventory</motion.h1>
          <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Track and manage medicine stock</motion.p>
        </div>
        <motion.div variants={staggerItem}><Button className="bg-[#2563EB]"><Plus className="w-4 h-4 mr-1" /> Add Medicine</Button></motion.div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Items', value: stockSummary.total, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Adequate', value: stockSummary.adequate, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
          { label: 'Low Stock', value: stockSummary.low, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Critical', value: stockSummary.critical, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((s, i) => (
          <motion.div key={i} variants={staggerItem} className={`p-4 rounded-xl border border-border/60 ${s.bg}`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search medicines..." className="pl-10" />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${category === c ? 'bg-[#2563EB] text-white' : 'bg-muted'}`}>{c === 'all' ? 'All' : c}</button>
          ))}
        </div>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-2">
        {filtered.map((med) => (
          <motion.div key={med.id} variants={staggerItem}>
            <DashboardCard noPadding>
              <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                  <Pill className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{med.name}</p>
                    <StatusBadge status={med.status} size="sm" />
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground mt-0.5">
                    <span>{med.category}</span>
                    <span className="flex items-center gap-1"><Factory className="w-3 h-3" /> {med.manufacturer}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Exp: {med.expiryDate}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${med.status === 'adequate' ? 'bg-[#10B981]' : med.status === 'low' ? 'bg-amber-500' : 'bg-[#EF4444]'}`} style={{ width: `${Math.min((med.stock / (med.minStock * 3)) * 100, 100)}%` }} />
                    </div>
                    <span className="text-xs font-medium w-16 text-right">{med.stock}/{med.minStock * 3}</span>
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button size="sm" variant="outline"><Minus className="w-3.5 h-3.5" /></Button>
                  <Button size="sm" variant="outline"><Plus className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
