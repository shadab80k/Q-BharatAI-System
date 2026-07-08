import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Clock, User, Stethoscope, RefreshCw, AlertTriangle, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';
import { mockQueue } from '@/data/mockData';

export default function LiveQueue() {
  const [currentToken, setCurrentToken] = useState(99);
  const [myToken] = useState(101);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  const myQueueItem = mockQueue.find(q => q.tokenNumber === myToken);
  const ahead = mockQueue.filter(q => q.tokenNumber > currentToken && q.tokenNumber < myToken && q.status === 'waiting').length;

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex items-center justify-between">
        <div>
          <motion.h1 variants={staggerItem} className="text-2xl font-bold">Live Queue</motion.h1>
          <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Real-time queue status</motion.p>
        </div>
        <motion.div variants={staggerItem}>
          <Button variant="outline" size="sm" onClick={() => setElapsed(0)}>
            <RefreshCw className="w-4 h-4 mr-1" /> Refresh
          </Button>
        </motion.div>
      </motion.div>

      {/* My Token Card */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
        <DashboardCard gradient>
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-2">Your Token Number</p>
            <motion.p
              key={myToken}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl font-bold bg-gradient-to-r from-[#2563EB] to-[#10B981] bg-clip-text text-transparent"
            >
              {myToken}
            </motion.p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <StatusBadge status={myQueueItem?.status || 'waiting'} />
              {myQueueItem?.type !== 'regular' && <StatusBadge status={myQueueItem?.type || ''} />}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center p-3 rounded-xl bg-background/80 backdrop-blur">
              <p className="text-xs text-muted-foreground">Currently Serving</p>
              <p className="text-2xl font-bold">{currentToken}</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-background/80 backdrop-blur">
              <p className="text-xs text-muted-foreground">Ahead of You</p>
              <p className="text-2xl font-bold text-amber-500">{ahead}</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-background/80 backdrop-blur">
              <p className="text-xs text-muted-foreground">Est. Wait</p>
              <p className="text-2xl font-bold text-[#10B981]">{myQueueItem?.estimatedTime}m</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentToken / myToken) * 100)}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-[#2563EB] to-[#10B981] rounded-full"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-center">
              <TrendingDown className="w-3 h-3 inline mr-1" />
              Approximately {myQueueItem?.estimatedTime} minutes remaining
            </p>
          </div>
        </DashboardCard>
      </motion.div>

      {/* QR Code */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <DashboardCard title="Your QR Token" subtitle="Show this at the reception">
          <div className="flex flex-col items-center py-4">
            <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <QrCode className="w-32 h-32 text-[#2563EB]" />
            </div>
            <p className="text-sm text-muted-foreground mt-3">Token #{myToken} • {myQueueItem?.department}</p>
          </div>
        </DashboardCard>
      </motion.div>

      {/* Queue List */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <DashboardCard title="Queue Status" subtitle="All patients in queue">
          <div className="space-y-2">
            {mockQueue.filter(q => q.status !== 'completed').map((q, i) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  q.tokenNumber === myToken ? 'bg-[#2563EB]/5 border border-[#2563EB]/20' : 'bg-muted/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                  q.tokenNumber === myToken ? 'bg-[#2563EB] text-white' :
                  q.status === 'emergency' ? 'bg-red-100 text-red-600' :
                  'bg-muted'
                }`}>
                  {q.tokenNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">{q.patientName}</p>
                    {q.type !== 'regular' && <StatusBadge status={q.type} size="sm" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{q.department} • {q.doctor}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <StatusBadge status={q.status} size="sm" />
                  {q.waitTime > 0 && <p className="text-xs text-muted-foreground mt-1">{q.waitTime}m wait</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </DashboardCard>
      </motion.div>
    </div>
  );
}
