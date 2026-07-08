import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Activity, ArrowRight, Mail, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const quickLogins = [
  { email: 'patient@qbharat.ai', role: 'Patient', color: 'from-blue-500 to-blue-600' },
  { email: 'staff@qbharat.ai', role: 'Reception', color: 'from-green-500 to-green-600' },
  { email: 'doctor@qbharat.ai', role: 'Doctor', color: 'from-purple-500 to-purple-600' },
  { email: 'pharma@qbharat.ai', role: 'Pharmacist', color: 'from-amber-500 to-amber-600' },
  { email: 'admin@qbharat.ai', role: 'District Admin', color: 'from-red-500 to-red-600' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('patient@qbharat.ai');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      const roleRedirects: Record<string, string> = {
        patient: '/patient/dashboard',
        reception: '/staff/dashboard',
        doctor: '/staff/dashboard',
        pharmacist: '/staff/dashboard',
        district_admin: '/district/dashboard',
      };
      const role = email.split('@')[0];
      const roleKey = Object.keys(roleRedirects).find(k => role.includes(k === 'district_admin' ? 'admin' : k)) || 'patient';
      navigate(roleRedirects[roleKey]);
    } else {
      setError('Invalid credentials. Try the quick login buttons below.');
    }
  };

  const handleQuickLogin = async (email: string) => {
    setEmail(email);
    setPassword('password');
    setError('');
    const success = await login(email, 'password');
    if (success) {
      const roleRedirects: Record<string, string> = {
        patient: '/patient/dashboard',
        reception: '/staff/dashboard',
        doctor: '/staff/dashboard',
        pharmacist: '/staff/dashboard',
        district_admin: '/district/dashboard',
      };
      const role = email.split('@')[0];
      const roleKey = Object.keys(roleRedirects).find(k => role.includes(k === 'district_admin' ? 'admin' : k)) || 'patient';
      navigate(roleRedirects[roleKey]);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#2563EB] via-[#1d4ed8] to-[#10B981]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-40" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">Q-BharatAI</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Smart Health<br />Operations Platform
            </h1>
            <p className="text-white/80 text-lg max-w-md">
              AI-powered healthcare management for India. Streamline operations, improve patient care, and make data-driven decisions.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: Shield, text: 'Secure & Compliant', sub: 'ABHA integration ready' },
              { icon: Activity, text: 'Real-time Analytics', sub: 'Live queue & bed tracking' },
              { icon: ArrowRight, text: 'AI-Powered Insights', sub: 'Predictive healthcare intelligence' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">{feature.text}</p>
                  <p className="text-sm text-white/60">{feature.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#2563EB] to-[#10B981] bg-clip-text text-transparent">Q-BharatAI</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-muted-foreground mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </form>

          {/* Quick Login */}
          <div className="mt-8">
            <p className="text-sm text-muted-foreground mb-3">Quick Login (Demo)</p>
            <div className="space-y-2">
              {quickLogins.map((ql, i) => (
                <motion.button
                  key={ql.email}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  onClick={() => handleQuickLogin(ql.email)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg border border-border/60 hover:border-[#2563EB]/30 hover:bg-[#2563EB]/5 transition-all text-left group'
                  )}
                >
                  <div className={cn('w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold', ql.color)}>
                    {ql.role[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{ql.role}</p>
                    <p className="text-xs text-muted-foreground">{ql.email}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#2563EB] transition-colors" />
                </motion.button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-[#2563EB] hover:underline font-medium">
              Create account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
