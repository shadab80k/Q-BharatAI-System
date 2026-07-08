import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Activity, ArrowRight, User, Mail, Phone, Lock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    abhaId: '',
    agreeTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }
    const success = await register(form);
    if (success) {
      navigate('/patient/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#10B981] via-[#059669] to-[#2563EB]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-40" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">Q-BharatAI</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">Join the Future<br />of Healthcare</h1>
            <p className="text-white/80 text-lg max-w-md">
              Create your account to access AI-powered health services, book appointments, and manage your health records securely.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md py-8">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#2563EB] to-[#10B981] bg-clip-text text-transparent">Q-BharatAI</span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-muted-foreground mt-1">Register for Q-BharatAI Patient Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="pl-10" placeholder="Enter your full name" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="reg-email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="pl-10" placeholder="Enter your email" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="phone" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="pl-10" placeholder="+91 9876543210" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="abha">ABHA ID (Optional)</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="abha" value={form.abhaId} onChange={e => setForm({ ...form, abhaId: e.target.value })} className="pl-10" placeholder="ABHA-XXXX-XXXX" />
              </div>
              <p className="text-xs text-muted-foreground">Link your Ayushman Bharat Health Account for seamless integration</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="reg-password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="pl-10 pr-10" placeholder="Min 8 characters" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="terms" checked={form.agreeTerms} onCheckedChange={checked => setForm({ ...form, agreeTerms: checked === true })} />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                I agree to the <Link to="#" className="text-[#2563EB] hover:underline">Terms of Service</Link> and <Link to="#" className="text-[#2563EB] hover:underline">Privacy Policy</Link>
              </label>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg">
                {error}
              </motion.p>
            )}

            <Button type="submit" className="w-full bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white" disabled={isLoading}>
              {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <>Create Account <ArrowRight className="w-4 h-4 ml-2" /></>}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2563EB] hover:underline font-medium">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
