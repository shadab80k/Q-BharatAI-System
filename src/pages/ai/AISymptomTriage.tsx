import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, User, Activity, Stethoscope, AlertTriangle, Sparkles, Loader2, ChevronRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';

interface Msg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  triage?: { conditions: { name: string; probability: number; urgency: string }[]; department: string };
}

const suggestedSymptoms = ['Fever with cough', 'Chest pain', 'Severe headache', 'Stomach pain', 'Skin rash'];

export default function AISymptomTriage() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: 'w', role: 'assistant', content: 'Welcome to AI Symptom Triage. Please describe the patient\'s symptoms in detail, and I will provide a preliminary assessment with recommended department and urgency level.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Msg = { id: `u${Date.now()}`, role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    const assistantMsg: Msg = {
      id: `a${Date.now()}`,
      role: 'assistant',
      content: `Triage analysis complete for: "${input}"`,
      triage: {
        conditions: [
          { name: 'Acute Bronchitis', probability: 55, urgency: 'medium' },
          { name: 'Viral URI', probability: 30, urgency: 'low' },
          { name: 'Pneumonia', probability: 15, urgency: 'high' },
        ],
        department: 'General Medicine',
      }
    };
    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">AI Symptom Triage</h1>
          <p className="text-muted-foreground text-sm">Advanced patient triage for medical staff</p>
        </div>
      </div>

      <DashboardCard className="flex-1 flex flex-col overflow-hidden" noPadding>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-[#2563EB] text-white' : 'bg-muted'} rounded-xl px-4 py-3`}>
                  <p className="text-sm">{msg.content}</p>
                  {msg.triage && (
                    <div className="mt-3 space-y-3">
                      <div className="p-3 rounded-lg bg-background/80 border border-border/50">
                        <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1"><FileText className="w-3 h-3" /> DIFFERENTIAL DIAGNOSIS</p>
                        {msg.triage.conditions.map((c, i) => (
                          <div key={i} className="flex items-center gap-3 py-1.5">
                            <span className="text-xs font-mono w-6">{i + 1}.</span>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{c.name}</span>
                                <StatusBadge status={c.urgency} size="sm" />
                              </div>
                              <div className="h-1 bg-muted rounded-full mt-1 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full" style={{ width: `${c.probability}%` }} />
                              </div>
                            </div>
                            <span className="text-xs font-bold w-8 text-right">{c.probability}%</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20">
                        <Stethoscope className="w-4 h-4 text-[#2563EB]" />
                        <p className="text-sm">Recommended: <span className="font-semibold text-[#2563EB]">{msg.triage.department}</span></p>
                        <ChevronRight className="w-4 h-4 text-[#2563EB] ml-auto" />
                      </div>
                    </div>
                  )}
                </div>
                {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0"><User className="w-4 h-4" /></div>}
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              </div>
              <div className="bg-muted rounded-xl px-4 py-3">
                <div className="flex gap-1">
                  {[0, 0.2, 0.4].map(d => <motion.div key={d} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: d }} className="w-2 h-2 bg-muted-foreground rounded-full" />)}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2">Common presentations:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedSymptoms.map(s => <button key={s} onClick={() => setInput(s)} className="px-3 py-1 rounded-full bg-muted text-sm hover:bg-violet-100 hover:text-violet-600 transition-colors">{s}</button>)}
            </div>
          </div>
        )}

        <div className="p-4 border-t border-border/50">
          <div className="flex gap-2">
            <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Describe patient symptoms..." className="flex-1" />
            <Button onClick={handleSend} disabled={!input.trim() || isLoading} className="bg-gradient-to-r from-violet-500 to-purple-600"><Send className="w-4 h-4" /></Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Clinical decision support only. Final diagnosis by qualified physician required.
          </p>
        </div>
      </DashboardCard>
    </div>
  );
}
