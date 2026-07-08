import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, QrCode, Stethoscope, Filter, Search, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockAppointments } from '@/data/mockData';

type FilterStatus = 'all' | 'scheduled' | 'completed' | 'cancelled';

export default function MyAppointments() {
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [search, setSearch] = useState('');

  const filtered = mockAppointments.filter(a => {
    const matchesFilter = filter === 'all' || a.status === filter;
    const matchesSearch = a.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      a.department.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filters: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'scheduled', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">My Appointments</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">View and manage your appointments</motion.p>
      </motion.div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search doctor or department..." className="pl-10" />
        </div>
        <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === f.value ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-3">
        {filtered.length === 0 ? (
          <DashboardCard>
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No appointments found</p>
            </div>
          </DashboardCard>
        ) : (
          filtered.map((apt, i) => (
            <motion.div key={apt.id} variants={staggerItem}>
              <DashboardCard noPadding>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center flex-shrink-0">
                        <Stethoscope className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{apt.doctorName}</h3>
                          <StatusBadge status={apt.status} />
                        </div>
                        <p className="text-sm text-muted-foreground">{apt.department}</p>
                        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {apt.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {apt.time}</span>
                          <span className="flex items-center gap-1"><QrCode className="w-3.5 h-3.5" /> #{apt.tokenNumber}</span>
                        </div>
                        {apt.symptoms && (
                          <p className="text-sm mt-2"><span className="text-muted-foreground">Symptoms:</span> {apt.symptoms}</p>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm"><ChevronRight className="w-4 h-4" /></Button>
                  </div>
                </div>
              </DashboardCard>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
