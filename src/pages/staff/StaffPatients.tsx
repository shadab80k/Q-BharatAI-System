import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Users, Filter, Stethoscope, Phone, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockPatients } from '@/data/mockData';

export default function StaffPatients() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockPatients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.abhaId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1 variants={staggerItem} className="text-2xl font-bold">Patients</motion.h1>
          <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">{mockPatients.length} registered patients today</motion.p>
        </div>
        <motion.div variants={staggerItem}>
          <Button className="bg-[#2563EB]"><UserPlus className="w-4 h-4 mr-1" /> Register Patient</Button>
        </motion.div>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or ABHA ID..." className="pl-10" />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {['all', 'waiting', 'in-progress', 'completed', 'emergency'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${statusFilter === s ? 'bg-[#2563EB] text-white' : 'bg-muted'}`}>
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-2">
        {filtered.map((p, i) => (
          <motion.div key={p.id} variants={staggerItem}>
            <DashboardCard noPadding>
              <div className="p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {p.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{p.name}</p>
                    <StatusBadge status={p.status} size="sm" />
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> {p.abhaId}</span>
                    <span>{p.age} yrs • {p.gender}</span>
                    <span className="flex items-center gap-1"><Stethoscope className="w-3 h-3" /> {p.department}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {p.phone}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium">Token #{p.tokenNumber}</p>
                  {p.waitTime && p.waitTime > 0 && <p className="text-xs text-muted-foreground">{p.waitTime}m wait</p>}
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
