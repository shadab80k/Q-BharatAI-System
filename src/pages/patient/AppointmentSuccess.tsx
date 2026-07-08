import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, QrCode, Calendar, Clock, Stethoscope, Home, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/shared/DashboardCard';

export default function AppointmentSuccess() {
  const location = useLocation();
  const { department, doctor, date, time, token } = location.state || {};

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#10B981] to-emerald-600 flex items-center justify-center mb-4"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold">Appointment Booked!</h1>
        <p className="text-muted-foreground mt-1">Your appointment has been confirmed</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <DashboardCard title="Appointment Details" subtitle="Save or share these details">
          <div className="space-y-4">
            {/* QR Token */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-[#2563EB]/5 to-[#10B981]/5 border border-[#2563EB]/10">
              <div className="w-32 h-32 mx-auto bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm">
                <QrCode className="w-24 h-24 text-[#2563EB]" />
              </div>
              <p className="text-sm text-muted-foreground">Scan at the reception</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#2563EB] to-[#10B981] bg-clip-text text-transparent mt-1">
                Token #{token || 108}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Stethoscope className="w-5 h-5 text-[#2563EB]" />
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{department || 'General Medicine'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Calendar className="w-5 h-5 text-[#2563EB]" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{date || '2026-07-08'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Clock className="w-5 h-5 text-[#2563EB]" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{time || '10:30 AM'}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-2">
                <Share2 className="w-4 h-4" /> Share
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Download className="w-4 h-4" /> Download
              </Button>
            </div>
          </div>
        </DashboardCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center">
        <Button asChild className="bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white px-8">
          <Link to="/patient/dashboard"><Home className="w-4 h-4 mr-2" /> Go to Dashboard</Link>
        </Button>
      </motion.div>
    </div>
  );
}
