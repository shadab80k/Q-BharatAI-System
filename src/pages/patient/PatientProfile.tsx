import { motion } from 'framer-motion';
import { User, Mail, Phone, CreditCard, Droplets, MapPin, Calendar, Edit, Shield, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardCard from '@/components/shared/DashboardCard';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { useAuth } from '@/context/AuthContext';

export default function PatientProfile() {
  const { user } = useAuth();

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">My Profile</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Manage your personal information</motion.p>
      </motion.div>

      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <DashboardCard>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'RK'}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-bold">{user?.name || 'Ramesh Kumar'}</h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {user?.email || 'ramesh@email.com'}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {user?.phone || '9876543210'}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] font-medium">
                  <Shield className="w-3 h-3" /> ABHA Verified
                </span>
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] font-medium">
                  <Activity className="w-3 h-3" /> Active
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm"><Edit className="w-4 h-4 mr-1" /> Edit</Button>
          </div>
        </DashboardCard>
      </motion.div>

      {/* Personal Info */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <DashboardCard title="Personal Information" subtitle="Your basic details">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Full Name</Label>
              <Input value={user?.name || 'Ramesh Kumar'} readOnly />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</Label>
              <Input value={user?.email || 'ramesh@email.com'} readOnly />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone</Label>
              <Input value={user?.phone || '9876543210'} readOnly />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Date of Birth</Label>
              <Input value="1981-03-15" readOnly />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> ABHA ID</Label>
              <Input value={user?.abhaId || 'ABHA-1234-5678'} readOnly className="font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><Droplets className="w-3.5 h-3.5" /> Blood Group</Label>
              <Input value="O+" readOnly />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Address</Label>
              <Input value="Village Rampur, Block A, District X, Uttar Pradesh - 221001" readOnly />
            </div>
          </div>
        </DashboardCard>
      </motion.div>

      {/* Health Summary */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <DashboardCard title="Health Summary" subtitle="Your recent health metrics">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'BMI', value: '23.5', status: 'Normal' },
              { label: 'Blood Pressure', value: '120/80', status: 'Normal' },
              { label: 'Last Visit', value: 'Jul 1', status: '15 days ago' },
              { label: 'Total Visits', value: '12', status: 'This year' },
            ].map((metric, i) => (
              <div key={i} className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-lg font-bold">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="text-[10px] text-[#10B981] mt-0.5">{metric.status}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </motion.div>
    </div>
  );
}
