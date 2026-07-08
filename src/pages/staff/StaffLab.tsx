import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Search, Filter, Clock, User, Stethoscope, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockLabTests } from '@/data/mockData';

export default function StaffLab() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const filtered = mockLabTests.filter(t => {
    const matchesSearch = t.patientName.toLowerCase().includes(search.toLowerCase()) || t.testName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">Laboratory Tests</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Manage lab test requests and results</motion.p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tests..." className="pl-10" />
        </div>
        <div className="flex gap-1">
          {['all', 'pending', 'in-progress', 'completed', 'urgent'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === f ? 'bg-[#2563EB] text-white' : 'bg-muted'}`}>{f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}</button>
          ))}
        </div>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-2">
        {filtered.map((test) => (
          <motion.div key={test.id} variants={staggerItem}>
            <DashboardCard noPadding>
              <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <FlaskConical className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{test.testName}</p>
                    <StatusBadge status={test.status} size="sm" />
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {test.patientName}</span>
                    <span className="flex items-center gap-1"><Stethoscope className="w-3 h-3" /> Dr. {test.requestedBy}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.requestDate}</span>
                    <span>{test.category}</span>
                  </div>
                  {test.findings && (
                    <div className="mt-2 p-2 rounded-lg bg-muted/50 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground text-xs"><FileText className="w-3 h-3" /> Findings:</span>
                      <p className="mt-0.5">{test.findings}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  {test.status === 'pending' && <Button size="sm" className="bg-[#2563EB]">Start</Button>}
                  {test.status === 'in-progress' && <Button size="sm" className="bg-[#10B981]">Complete</Button>}
                  {test.status === 'completed' && <Button size="sm" variant="outline">View</Button>}
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
