import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, Moon, Globe, Smartphone, ChevronRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import DashboardCard from '@/components/shared/DashboardCard';
import { useTheme } from '@/context/ThemeContext';
import { staggerContainer, staggerItem } from '@/hooks/useAnimations';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false, emergency: true });
  const [privacy, setPrivacy] = useState({ shareData: false, anonymousAnalytics: true });

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 variants={staggerItem} className="text-2xl font-bold">Settings</motion.h1>
        <motion.p variants={staggerItem} className="text-muted-foreground text-sm mt-0.5">Manage your account preferences</motion.p>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
        {/* Appearance */}
        <motion.div variants={staggerItem}>
          <DashboardCard title="Appearance" subtitle="Customize your interface">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Moon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Theme</p>
                    <p className="text-xs text-muted-foreground">Select your preferred theme</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {(['light', 'dark', 'system'] as const).map(t => (
                    <button key={t} onClick={() => setTheme(t)} className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${theme === t ? 'bg-[#2563EB] text-white' : 'bg-muted text-muted-foreground'}`}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </DashboardCard>
        </motion.div>

        {/* Notifications */}
        <motion.div variants={staggerItem}>
          <DashboardCard title="Notifications" subtitle="Manage your notification preferences">
            <div className="space-y-3">
              {[
                { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email', icon: Globe },
                { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications', icon: Smartphone },
                { key: 'emergency', label: 'Emergency Alerts', desc: 'Critical emergency notifications', icon: Bell },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, [item.key]: checked }))}
                  />
                </div>
              ))}
            </div>
          </DashboardCard>
        </motion.div>

        {/* Privacy */}
        <motion.div variants={staggerItem}>
          <DashboardCard title="Privacy & Security" subtitle="Manage your data and security settings">
            <div className="space-y-3">
              {[
                { key: 'shareData', label: 'Share Anonymous Data', desc: 'Help improve Q-BharatAI', icon: Shield },
                { key: 'anonymousAnalytics', label: 'Analytics Participation', desc: 'Contribute to usage analytics', icon: User },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <Switch
                    checked={privacy[item.key as keyof typeof privacy]}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, [item.key]: checked }))}
                  />
                </div>
              ))}
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div variants={staggerItem} className="flex justify-end">
          <Button className="bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white">
            <Save className="w-4 h-4 mr-1" /> Save Changes
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
