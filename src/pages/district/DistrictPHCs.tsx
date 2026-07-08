import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, MapPin, Stethoscope, Bed, Users, Pill, Star, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockPHCs } from '@/data/mockData';

export default function DistrictPHCs() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockPHCs.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">PHC Overview</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">All Primary Health Centers in District X</motion.p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search PHCs..." className="pl-10" />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {['all', 'excellent', 'good', 'average', 'poor'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${statusFilter === s ? 'bg-[#2563EB] text-white' : 'bg-muted'}`}>
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((phc) => (
          <motion.div key={phc.id} variants={staggerItem}>
            <DashboardCard>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-sm">{phc.score}</span>
                </div>
              </div>
              <h3 className="font-semibold">{phc.name}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {phc.location}</p>
              <StatusBadge status={phc.status} className="mt-2" />

              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="p-2 rounded-lg bg-muted/50 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs"><Stethoscope className="w-3 h-3" /> Doctors</div>
                  <p className="font-semibold">{phc.doctors}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs"><Bed className="w-3 h-3" /> Beds</div>
                  <p className="font-semibold">{phc.beds.occupied}/{phc.beds.total}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs"><Users className="w-3 h-3" /> Patients</div>
                  <p className="font-semibold">{phc.patientsToday}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs"><Pill className="w-3 h-3" /> Medicines</div>
                  <p className="font-semibold">{phc.medicines.adequate} ok</p>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Bed Occupancy</span>
                  <span className="font-medium">{Math.round((phc.beds.occupied / phc.beds.total) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#10B981] rounded-full" style={{ width: `${(phc.beds.occupied / phc.beds.total) * 100}%` }} />
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">View Details</Button>
            </DashboardCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
