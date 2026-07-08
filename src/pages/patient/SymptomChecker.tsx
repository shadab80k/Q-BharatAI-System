import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, User, Activity, AlertTriangle, Stethoscope, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardCard from '@/components/shared/DashboardCard';
import StatusBadge from '@/components/shared/StatusBadge';

interface ChatMsg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  conditions?: { name: string; probability: number; urgency: string }[];
  department?: string;
}

const suggestedSymptoms = ['Fever', 'Headache', 'Cough', 'Chest Pain', 'Stomach Ache', 'Body Pain', 'Sore Throat'];

export default function SymptomChecker() {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m your AI health assistant. Please describe your symptoms, and I\'ll help you understand possible causes and recommend the right department for consultation.',
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMsg = { id: `u${Date.now()}`, role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 1500));

    const assistantMsg: ChatMsg = {
      id: `a${Date.now()}`,
      role: 'assistant',
      content: `Based on your symptoms "${input}", I've analyzed potential conditions. Here are my findings:`,
      conditions: [
        { name: 'Viral Fever', probability: 65, urgency: 'medium' },
        { name: 'Common Cold', probability: 25, urgency: 'low' },
        { name: 'Influenza', probability: 10, urgency: 'medium' },
      ],
      department: 'General Medicine',
    };
    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  const handleSymptomClick = (symptom: string) => {
    setInput(symptom);
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <motion.h1 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="w-6 h-6 text-[#2563EB]" />
          AI Symptom Checker
        </motion.h1>
        <p className="text-muted-foreground text-sm mt-0.5">Describe your symptoms for AI-powered preliminary analysis</p>
      </div>

      {/* Chat Area */}
      <DashboardCard className="flex-1 flex flex-col overflow-hidden" noPadding>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-[#2563EB] text-white' : 'bg-muted'} rounded-xl px-4 py-3`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.conditions && (
                    <div className="mt-3 space-y-2">
                      {msg.conditions.map((c, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-background/80">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{c.name}</p>
                            <div className="h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#10B981] rounded-full" style={{ width: `${c.probability}%` }} />
                            </div>
                          </div>
                          <span className="text-sm font-bold">{c.probability}%</span>
                          <StatusBadge status={c.urgency} size="sm" />
                        </div>
                      ))}
                      {msg.department && (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20">
                          <Stethoscope className="w-4 h-4 text-[#2563EB]" />
                          <p className="text-sm">Recommended: <span className="font-semibold text-[#2563EB]">{msg.department}</span></p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              </div>
              <div className="bg-muted rounded-xl px-4 py-3">
                <div className="flex gap-1">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-muted-foreground rounded-full" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-muted-foreground rounded-full" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-muted-foreground rounded-full" />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Quick Symptoms */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2">Common symptoms:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedSymptoms.map(s => (
                <button key={s} onClick={() => handleSymptomClick(s)} className="px-3 py-1 rounded-full bg-muted text-sm hover:bg-[#2563EB]/10 hover:text-[#2563EB] transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border/50">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Describe your symptoms..."
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!input.trim() || isLoading} className="bg-[#2563EB]">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            This is not a medical diagnosis. Please consult a doctor for proper evaluation.
          </p>
        </div>
      </DashboardCard>
    </div>
  );
}
