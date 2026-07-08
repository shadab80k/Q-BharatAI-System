import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Moon, Sun, Monitor, ChevronDown, UserCircle,
  Check, CheckCheck, AlertTriangle, Info, CheckCircle2,
  XCircle
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { MobileMenuButton } from './Sidebar';
import { cn } from '@/lib/utils';
import { dropdownMenu, notificationSlide } from '@/hooks/useAnimations';

interface NavbarProps {
  onMenuToggle: () => void;
}

const notificationIcons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  emergency: AlertTriangle,
};

const notificationColors = {
  info: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30',
  success: 'text-green-500 bg-green-50 dark:bg-green-950/30',
  warning: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30',
  error: 'text-red-500 bg-red-50 dark:bg-red-950/30',
  emergency: 'text-red-600 bg-red-50 dark:bg-red-950/40',
};

export default function Navbar({ onMenuToggle }: NavbarProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { user } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showTheme, setShowTheme] = useState(false);

  const displayNotifications = notifications.slice(0, 6);

  return (
    <header className="sticky top-0 z-30 h-16 bg-background/70 backdrop-blur-xl border-b border-border/50">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <MobileMenuButton onClick={onMenuToggle} />
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="capitalize">{user?.role?.replace('_', ' ')}</span>
            <span>/</span>
            <span className="text-foreground font-medium">Dashboard</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5">
          {/* Theme Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowTheme(!showTheme)}
              className="p-2 rounded-lg hover:bg-muted transition-colors relative"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <AnimatePresence>
              {showTheme && (
                <motion.div
                  variants={dropdownMenu}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 top-full mt-2 w-44 bg-popover border border-border rounded-xl shadow-lg overflow-hidden py-1"
                >
                  {([
                    { value: 'light' as const, label: 'Light', icon: Sun },
                    { value: 'dark' as const, label: 'Dark', icon: Moon },
                    { value: 'system' as const, label: 'System', icon: Monitor },
                  ]).map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => { setTheme(value); setShowTheme(false); }}
                      className={cn(
                        'flex items-center gap-2.5 w-full px-3 py-2 text-sm transition-colors',
                        theme === value ? 'text-foreground bg-muted' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                      {theme === value && <Check className="w-3.5 h-3.5 ml-auto text-[#10B981]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-muted transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {unreadCount}
                </motion.span>
              )}
            </button>
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  variants={dropdownMenu}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 top-full mt-2 w-[360px] max-w-[calc(100vw-1rem)] bg-popover border border-border rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => { markAllAsRead(); }}
                        className="text-xs text-[#2563EB] hover:underline flex items-center gap-1"
                      >
                        <CheckCheck className="w-3 h-3" />
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-[360px] overflow-y-auto">
                    {displayNotifications.length === 0 ? (
                      <div className="py-8 text-center text-muted-foreground text-sm">
                        No notifications
                      </div>
                    ) : (
                      displayNotifications.map((n) => {
                        const Icon = notificationIcons[n.type];
                        return (
                          <motion.button
                            key={n.id}
                            variants={notificationSlide}
                            initial="hidden"
                            animate="visible"
                            onClick={() => { markAsRead(n.id); setShowNotifications(false); }}
                            className={cn(
                              'flex items-start gap-3 w-full px-4 py-3 text-left transition-colors hover:bg-muted/50 border-b border-border/30 last:border-0',
                              !n.read && 'bg-[#2563EB]/[0.02]'
                            )}
                          >
                            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5', notificationColors[n.type])}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={cn('text-sm truncate', !n.read && 'font-medium')}>{n.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{n.message}</p>
                              <p className="text-[11px] text-muted-foreground mt-1">
                                {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            {!n.read && <div className="w-2 h-2 bg-[#2563EB] rounded-full flex-shrink-0 mt-2" />}
                          </motion.button>
                        );
                      })
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U'}
                </span>
              </div>
              <span className="hidden sm:block text-sm font-medium truncate max-w-[100px]">{user?.name || 'User'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
            </button>
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  variants={dropdownMenu}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-xl shadow-lg overflow-hidden py-1"
                >
                  <div className="px-4 py-3 border-b border-border/50">
                    <p className="font-medium text-sm">{user?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{user?.email || 'user@qbharat.ai'}</p>
                    <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] font-medium uppercase tracking-wide">
                      {user?.role?.replace('_', ' ') || 'Patient'}
                    </span>
                  </div>
                  <Link
                    to={user?.role === 'patient' ? '/patient/profile' : '/settings'}
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <UserCircle className="w-4 h-4" />
                    Profile
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Click outside handler */}
      {(showNotifications || showProfile || showTheme) && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => { setShowNotifications(false); setShowProfile(false); setShowTheme(false); }}
        />
      )}
    </header>
  );
}
