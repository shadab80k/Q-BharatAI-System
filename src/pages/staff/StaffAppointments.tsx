import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, Clock, Stethoscope, QrCode, CheckCircle, XCircle, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockAppointments } from '@/data/mockData';

export default function StaffAppointments() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = mockAppointments.filter(a => {
    const matchesSearch = a.patientName.toLowerCase().includes(search.toLowerCase()) || a.doctorName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">Appointments</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Manage scheduled appointments</motion.p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-10" />
        </div>
        <div className="flex gap-1">
          {['all', 'scheduled', 'in-progress', 'completed', 'cancelled'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === f ? 'bg-[#2563EB] text-white' : 'bg-muted'}`}>
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-2">
        {filtered.map((apt) => (
          <motion.div key={apt.id} variants={staggerItem}>
            <DashboardCard noPadding>
              <div className="p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {apt.patientName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{apt.patientName}</p>
                    <StatusBadge status={apt.status} size="sm" />
                    <StatusBadge status={apt.type} size="sm" />
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Stethoscope className="w-3 h-3" /> {apt.doctorName}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {apt.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {apt.time}</span>
                    <span className="flex items-center gap-1"><QrCode className="w-3 h-3" /> #{apt.tokenNumber}</span>
                  </div>
                  {apt.symptoms && <p className="text-xs text-muted-foreground mt-1">Symptoms: {apt.symptoms}</p>}
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  {apt.status === 'scheduled' && (
                    <><Button size="sm" className="bg-[#10B981]"><CheckCircle className="w-3.5 h-3.5" /></Button>
                    <Button size="sm" variant="outline" className="text-red-500"><XCircle className="w-3.5 h-3.5" /></Button></>
                  )}
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
