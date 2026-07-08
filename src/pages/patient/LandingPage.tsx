import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity, ArrowRight, Brain, Shield, Clock, Users,
  Pill, Stethoscope, QrCode, Mic, BarChart3, Heart,
  ChevronRight, Sparkles, Zap, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { staggerContainer, staggerItem, fadeInUp } from '@/hooks/useAnimations';

const features = [
  { icon: Brain, title: 'AI Symptom Checker', desc: 'Get instant preliminary diagnosis using advanced AI', color: 'from-violet-500 to-purple-600' },
  { icon: Clock, title: 'Live Queue Tracking', desc: 'Real-time token and wait time updates', color: 'from-blue-500 to-cyan-500' },
  { icon: QrCode, title: 'Digital Token System', desc: 'QR-based appointment tokens', color: 'from-emerald-500 to-teal-500' },
  { icon: Pill, title: 'Medicine Availability', desc: 'Check medicine stock at your PHC', color: 'from-amber-500 to-orange-500' },
  { icon: Mic, title: 'Voice Assistant', desc: 'Hands-free health information access', color: 'from-rose-500 to-pink-500' },
  { icon: Shield, title: 'ABHA Integrated', desc: 'Secure health records with Ayushman Bharat', color: 'from-indigo-500 to-blue-600' },
];

const stats = [
  { value: '500+', label: 'PHCs Connected' },
  { value: '2M+', label: 'Patients Served' },
  { value: '50K+', label: 'Daily Consultations' },
  { value: '99.9%', label: 'Uptime' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-[#2563EB] to-[#10B981] bg-clip-text text-transparent">Q-BharatAI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Sign In</Link>
            <Button asChild size="sm" className="bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white">
              <Link to="/register">Get Started <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl" />
        <div className="absolute top-40 left-0 w-72 h-72 bg-[#2563EB]/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Healthcare for Bharat
            </motion.div>
            <motion.h1 variants={staggerItem} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Smart Health<br />
              <span className="bg-gradient-to-r from-[#2563EB] to-[#10B981] bg-clip-text text-transparent">Operations Platform</span>
            </motion.h1>
            <motion.p variants={staggerItem} className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Transforming primary healthcare delivery across India with AI-driven insights, real-time queue management, and seamless patient experience.
            </motion.p>
            <motion.div variants={staggerItem} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white px-8">
                <Link to="/register">Register as Patient <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8">
                <Link to="/login">Staff Login</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="text-center p-4 rounded-xl bg-card border border-border/60"
              >
                <p className="text-2xl font-bold bg-gradient-to-r from-[#2563EB] to-[#10B981] bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold">Platform Features</h2>
            <p className="text-muted-foreground mt-2">Comprehensive healthcare management at your fingertips</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group p-6 rounded-xl bg-card border border-border/60 hover:border-[#2563EB]/20 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-2">Simple steps to better healthcare</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: Users, title: 'Register with ABHA', desc: 'Create your account using your Ayushman Bharat Health ID for seamless integration.' },
              { step: '02', icon: Stethoscope, title: 'Book Appointment', desc: 'Choose your department and preferred doctor. Get instant token and estimated wait time.' },
              { step: '03', icon: Heart, title: 'Get Quality Care', desc: 'Receive AI-assisted diagnosis, digital prescriptions, and follow-up reminders.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-bold text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded-full">Step {item.step}</span>
                <h3 className="font-semibold text-lg mt-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full">
                    <ChevronRight className="w-6 h-6 text-muted-foreground/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold">Built for Everyone</h2>
            <p className="text-muted-foreground mt-2">Tailored experiences for every stakeholder</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Heart, title: 'Patients', desc: 'Book appointments, track queue, AI symptom checker', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/30' },
              { icon: Users, title: 'Reception Staff', desc: 'Token management, patient registration, bed allocation', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
              { icon: Stethoscope, title: 'Doctors', desc: 'Digital prescriptions, lab orders, patient history', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/30' },
              { icon: BarChart3, title: 'District Admins', desc: 'Analytics, PHC monitoring, outbreak detection', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
            ].map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border/60 text-center hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 mx-auto rounded-xl ${role.bg} flex items-center justify-center mb-3`}>
                  <role.icon className={`w-6 h-6 ${role.color}`} />
                </div>
                <h3 className="font-semibold">{role.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{role.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#10B981] p-8 md:p-12 text-center text-white"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-30" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                Launch Ready
              </div>
              <h2 className="text-3xl font-bold">Ready to Transform Healthcare?</h2>
              <p className="text-white/80 mt-3 max-w-lg mx-auto">
                Join hundreds of PHCs already using Q-BharatAI to deliver better patient care with AI-powered insights.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button asChild size="lg" className="bg-white text-[#2563EB] hover:bg-white/90 px-8">
                  <Link to="/register">Register Now <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                  <Link to="/login">Staff Access</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-[#2563EB] to-[#10B981] bg-clip-text text-transparent">Q-BharatAI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="#" className="hover:text-foreground transition-colors">Support</Link>
              <div className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                <span>Made for India</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground"> 2026 Q-BharatAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
