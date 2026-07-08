import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Pill, Activity, Stethoscope } from 'lucide-react';
import DashboardCard from '@/components/shared/DashboardCard';
import CustomAreaChart from '@/components/charts/AreaChart';
import CustomBarChart from '@/components/charts/BarChart';
import CustomPieChart from '@/components/charts/PieChart';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockForecastData, departmentPerformance, mockPHCs } from '@/data/mockData';

export default function DistrictAnalytics() {
  const bedData = mockPHCs.map(p => ({ name: p.name.replace('PHC ', ''), occupied: p.beds.occupied, total: p.beds.total }));
  const medicineData = mockPHCs.map(p => ({ name: p.name.replace('PHC ', ''), adequate: p.medicines.adequate, low: p.medicines.low }));

  return (
    <div className="space-y-5">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">Analytics</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Comprehensive district health analytics</motion.p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <DashboardCard title="Patient Forecast" subtitle="AI-predicted patient volume" headerAction={<TrendingUp className="w-4 h-4 text-[#10B981]" />}>
            <CustomAreaChart data={mockForecastData} dataKey="patients" xAxisKey="month" color="#2563EB" height={250} />
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <DashboardCard title="Outbreak Detection" subtitle="Predicted disease outbreaks">
            <CustomBarChart data={mockForecastData} dataKey="outbreaks" xAxisKey="month" color="#EF4444" height={250} />
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <DashboardCard title="Department Performance" subtitle="Patient load by department">
            <CustomBarChart data={departmentPerformance} dataKey="patients" xAxisKey="name" color="#10B981" height={250} />
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <DashboardCard title="Department Satisfaction" subtitle="Patient satisfaction scores">
            <CustomBarChart data={departmentPerformance} dataKey="satisfaction" xAxisKey="name" color="#F59E0B" height={250} />
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <DashboardCard title="Bed Occupancy by PHC" subtitle="Current bed utilization">
            <CustomBarChart data={bedData} dataKey="occupied" xAxisKey="name" color="#8B5CF6" height={250} />
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <DashboardCard title="PHC Status Distribution" subtitle="Overall performance breakdown">
            <CustomPieChart data={[
              { name: 'Excellent', value: mockPHCs.filter(p => p.status === 'excellent').length },
              { name: 'Good', value: mockPHCs.filter(p => p.status === 'good').length },
              { name: 'Average', value: mockPHCs.filter(p => p.status === 'average').length },
              { name: 'Poor', value: mockPHCs.filter(p => p.status === 'poor').length },
            ]} height={200} innerRadius={60} />
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  );
}
