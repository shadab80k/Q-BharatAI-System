import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Activity, Pill, Bed,
  FlaskConical, Users, Settings, ChevronLeft, ChevronRight,
  Stethoscope, AlertTriangle, BarChart3, Brain, Mic,
  LogOut, X, Menu, UserCircle, QrCode, Clock,
  MapPin, FileText, TrendingUp
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles: string[];
  badge?: number;
}

const navItems: NavItem[] = [
  // Patient routes
  { label: 'Dashboard', icon: LayoutDashboard, path: '/patient/dashboard', roles: ['patient'] },
  { label: 'Book Appointment', icon: Calendar, path: '/patient/book-appointment', roles: ['patient'] },
  { label: 'My Appointments', icon: Clock, path: '/patient/appointments', roles: ['patient'] },
  { label: 'Live Queue', icon: QrCode, path: '/patient/queue', roles: ['patient'] },
  { label: 'AI Symptom Check', icon: Brain, path: '/patient/symptom-checker', roles: ['patient'] },
  { label: 'Voice Assistant', icon: Mic, path: '/patient/voice-assistant', roles: ['patient'] },
  { label: 'Medicines', icon: Pill, path: '/patient/medicines', roles: ['patient'] },
  { label: 'Doctors', icon: Stethoscope, path: '/patient/doctors', roles: ['patient'] },
  { label: 'Profile', icon: UserCircle, path: '/patient/profile', roles: ['patient'] },

  // Staff routes
  { label: 'Dashboard', icon: LayoutDashboard, path: '/staff/dashboard', roles: ['reception', 'doctor', 'pharmacist'] },
  { label: 'Today\'s Queue', icon: Users, path: '/staff/queue', roles: ['reception', 'doctor'] },
  { label: 'Emergency', icon: AlertTriangle, path: '/staff/emergency', roles: ['reception', 'doctor'] },
  { label: 'Patients', icon: UserCircle, path: '/staff/patients', roles: ['reception', 'doctor'] },
  { label: 'Appointments', icon: Calendar, path: '/staff/appointments', roles: ['reception'] },
  { label: 'Lab Tests', icon: FlaskConical, path: '/staff/lab', roles: ['doctor'] },
  { label: 'Inventory', icon: Pill, path: '/staff/inventory', roles: ['pharmacist'] },
  { label: 'Medicine Alerts', icon: AlertTriangle, path: '/staff/medicine-alerts', roles: ['pharmacist'] },
  { label: 'Bed Status', icon: Bed, path: '/staff/beds', roles: ['reception'] },
  { label: 'Doctor Attendance', icon: Stethoscope, path: '/staff/doctors', roles: ['reception'] },

  // District admin routes
  { label: 'Dashboard', icon: LayoutDashboard, path: '/district/dashboard', roles: ['district_admin'] },
  { label: 'PHC Overview', icon: MapPin, path: '/district/phcs', roles: ['district_admin'] },
  { label: 'Analytics', icon: BarChart3, path: '/district/analytics', roles: ['district_admin'] },
  { label: 'Performance', icon: TrendingUp, path: '/district/performance', roles: ['district_admin'] },
  { label: 'Reports', icon: FileText, path: '/district/reports', roles: ['district_admin'] },

  // AI routes (all roles)
  { label: 'AI Insights', icon: Brain, path: '/ai/insights', roles: ['district_admin', 'doctor'] },
  { label: 'Outbreak Detection', icon: AlertTriangle, path: '/ai/outbreak', roles: ['district_admin', 'doctor'] },
  { label: 'Forecasts', icon: TrendingUp, path: '/ai/forecast', roles: ['district_admin', 'pharmacist'] },
  { label: 'Daily Briefing', icon: FileText, path: '/ai/briefing', roles: ['district_admin', 'doctor', 'reception'] },

  // Shared
  { label: 'Settings', icon: Settings, path: '/settings', roles: ['patient', 'reception', 'doctor', 'pharmacist', 'district_admin'] },
];

export default function Sidebar({ isOpen, onToggle, isMobile }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const userRole = user?.role || 'patient';
  const filteredNav = navItems.filter(item => item.roles.includes(userRole));

  // Group by category
  const patientRoutes = filteredNav.filter(n => n.path.startsWith('/patient'));
  const staffRoutes = filteredNav.filter(n => n.path.startsWith('/staff'));
  const districtRoutes = filteredNav.filter(n => n.path.startsWith('/district'));
  const aiRoutes = filteredNav.filter(n => n.path.startsWith('/ai'));
  const otherRoutes = filteredNav.filter(n => !n.path.startsWith('/patient') && !n.path.startsWith('/staff') && !n.path.startsWith('/district') && !n.path.startsWith('/ai'));

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobile, isOpen]);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center flex-shrink-0">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {(!collapsed || isMobile) && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-semibold text-base truncate bg-gradient-to-r from-[#2563EB] to-[#10B981] bg-clip-text text-transparent"
              >
                Q-BharatAI
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-muted transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
        {isMobile && (
          <button onClick={onToggle} className="p-1 rounded-md hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1 scrollbar-thin">
        {patientRoutes.length > 0 && <NavGroup label="Patient" items={patientRoutes} collapsed={collapsed} isMobile={isMobile} location={location} />}
        {staffRoutes.length > 0 && <NavGroup label="Operations" items={staffRoutes} collapsed={collapsed} isMobile={isMobile} location={location} />}
        {districtRoutes.length > 0 && <NavGroup label="District" items={districtRoutes} collapsed={collapsed} isMobile={isMobile} location={location} />}
        {aiRoutes.length > 0 && <NavGroup label="AI & Analytics" items={aiRoutes} collapsed={collapsed} isMobile={isMobile} location={location} />}
        {otherRoutes.length > 0 && <NavGroup label="System" items={otherRoutes} collapsed={collapsed} isMobile={isMobile} location={location} />}
      </nav>

      {/* Footer */}
      <div className="border-t border-border/50 p-3">
        <button
          onClick={logout}
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full',
            collapsed && !isMobile && 'justify-center'
          )}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <AnimatePresence>
            {(!collapsed || isMobile) && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="truncate"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
              onClick={onToggle}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed left-0 top-0 h-full w-[280px] bg-background/95 backdrop-blur-xl border-r border-border/50 z-50 shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-screen sticky top-0 bg-background/80 backdrop-blur-xl border-r border-border/50 flex-shrink-0 overflow-hidden"
    >
      {sidebarContent}
    </motion.aside>
  );
}

function NavGroup({ label, items, collapsed, isMobile, location }: {
  label: string;
  items: NavItem[];
  collapsed: boolean;
  isMobile: boolean;
  location: ReturnType<typeof useLocation>;
}) {
  if (items.length === 0) return null;

  return (
    <div className="mb-2">
      <AnimatePresence>
        {(!collapsed || isMobile) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-3 py-1.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider"
          >
            {label}
          </motion.p>
        )}
      </AnimatePresence>
      {items.map(item => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group relative my-0.5',
              isActive
                ? 'bg-[#2563EB]/10 text-[#2563EB] font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/80',
              collapsed && !isMobile && 'justify-center px-2'
            )}
          >
            <item.icon className={cn('w-4 h-4 flex-shrink-0', isActive && 'text-[#2563EB]')} />
            <AnimatePresence>
              {(!collapsed || isMobile) && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="truncate"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
            {isActive && (!collapsed || isMobile) && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#2563EB] rounded-full"
                transition={{ duration: 0.2 }}
              />
            )}
            {item.badge && (
              <span className="ml-auto bg-[#EF4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-muted transition-colors lg:hidden"
      aria-label="Open menu"
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}
