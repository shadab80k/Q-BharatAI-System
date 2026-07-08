import { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Search, Star, Clock, Calendar, Briefcase } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockDoctors, mockDepartments } from '@/data/mockData';

export default function DoctorAvailability() {
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('all');

  const filtered = mockDoctors.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase());
    const matchesDept = dept === 'all' || d.department === dept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">Doctor Availability</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Find and consult with our specialists</motion.p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search doctors..." className="pl-10" />
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1">
          <button onClick={() => setDept('all')} className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${dept === 'all' ? 'bg-[#2563EB] text-white' : 'bg-muted'}`}>All</button>
          {mockDepartments.filter(d => d.isActive).map(d => (
            <button key={d.id} onClick={() => setDept(d.name)} className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${dept === d.name ? 'bg-[#2563EB] text-white' : 'bg-muted'}`}>{d.name}</button>
          ))}
        </div>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid sm:grid-cols-2 gap-4">
        {filtered.map((doc, i) => (
          <motion.div key={doc.id} variants={staggerItem}>
            <DashboardCard>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {doc.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">{doc.name}</h3>
                    <StatusBadge status={doc.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">{doc.specialization}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500" /> {doc.rating}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {doc.experience} yrs</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {doc.patientsToday} today</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{doc.qualification}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs">
                    <Clock className="w-3 h-3 text-[#10B981]" />
                    <span className="text-muted-foreground">{doc.schedule[0].day}: {doc.schedule[0].startTime} - {doc.schedule[0].endTime}</span>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
