import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Users, Pill, Activity, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/shared/DashboardCard';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockPHCs, weeklyReportData } from '@/data/mockData';

const reportTypes = [
  { icon: FileText, title: 'Weekly Summary', desc: 'Patient visits, admissions, and discharges', date: 'Jul 1 - Jul 7, 2026', color: 'from-blue-500 to-blue-600' },
  { icon: Activity, title: 'Outbreak Report', desc: 'Disease surveillance and outbreak alerts', date: 'June 2026', color: 'from-red-500 to-red-600' },
  { icon: Pill, title: 'Medicine Audit', desc: 'Stock levels, consumption, and procurement', date: 'Q2 2026', color: 'from-amber-500 to-amber-600' },
  { icon: Users, title: 'Staff Performance', desc: 'Doctor attendance and efficiency metrics', date: 'June 2026', color: 'from-purple-500 to-purple-600' },
  { icon: TrendingUp, title: 'Financial Report', desc: 'Budget utilization and expenses', date: 'FY 2025-26', color: 'from-green-500 to-green-600' },
  { icon: FileText, title: 'Quarterly Review', desc: 'Comprehensive quarterly assessment', date: 'Q2 2026', color: 'from-cyan-500 to-cyan-600' },
];

export default function DistrictReports() {
  const totalPatients = weeklyReportData.patients.reduce((a, b) => a + b, 0);
  const totalEmergency = weeklyReportData.emergency.reduce((a, b) => a + b, 0);
  const avgPatients = Math.round(totalPatients / 7);

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">Reports</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Generate and download district reports</motion.p>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Patients (Week)', value: totalPatients, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Emergency Cases', value: totalEmergency, icon: Activity, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Daily Average', value: avgPatients, icon: TrendingUp, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
          { label: 'PHCs Reporting', value: `${mockPHCs.length}/${mockPHCs.length}`, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((s, i) => (
          <motion.div key={i} variants={staggerItem} className={`p-4 rounded-xl border border-border/60 ${s.bg}`}>
            <s.icon className={`w-5 h-5 ${s.color} mb-1`} />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report, i) => (
          <motion.div key={i} variants={staggerItem}>
            <DashboardCard>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${report.color} flex items-center justify-center flex-shrink-0`}>
                  <report.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{report.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{report.desc}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" /> {report.date}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 gap-1">
                <Download className="w-3.5 h-3.5" /> Download PDF
              </Button>
            </DashboardCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
