import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center mb-6"
        >
          <Activity className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-7xl font-bold bg-gradient-to-r from-[#2563EB] to-[#10B981] bg-clip-text text-transparent"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-semibold mt-2"
        >
          Page Not Found
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground mt-2"
        >
          The page you are looking for doesn&apos;t exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
        >
          <Button asChild variant="outline">
            <Link to="/" className="gap-2"><ArrowLeft className="w-4 h-4" /> Go Back</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white gap-2">
            <Link to="/patient/dashboard"><Home className="w-4 h-4" /> Dashboard</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
