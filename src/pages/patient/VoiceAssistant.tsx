import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, Volume2, User, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardCard from '@/components/shared/DashboardCard';

interface VoiceMsg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function VoiceAssistant() {
  const [messages, setMessages] = useState<VoiceMsg[]>([
    { id: 'w', role: 'assistant', content: 'Namaste! I am your Q-BharatAI voice assistant. You can ask me about medicine availability, doctor timings, queue status, or general health information. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: VoiceMsg = { id: `u${Date.now()}`, role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const responses = [
      'The General Medicine department is currently serving token 99. Your token 101 should be called in approximately 20 minutes.',
      'Paracetamol 500mg is available in stock with 850 tablets. You can collect it from the pharmacy counter.',
      'Dr. Rajesh Sharma is available today from 9:00 AM to 5:00 PM. He has currently seen 24 patients.',
      'The emergency ward is operational 24/7. For emergencies, please visit the ER directly or call 108.',
    ];
    const assistantMsg: VoiceMsg = { id: `a${Date.now()}`, role: 'assistant', content: responses[Math.floor(Math.random() * responses.length)] };
    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInput('What is my queue status?');
      }, 3000);
    }
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <motion.h1 className="text-2xl font-bold flex items-center gap-2">
          <Volume2 className="w-6 h-6 text-[#2563EB]" />
          Voice Assistant
        </motion.h1>
        <p className="text-muted-foreground text-sm mt-0.5">Ask questions about your health, queue, medicines, and more</p>
      </div>

      <DashboardCard className="flex-1 flex flex-col overflow-hidden" noPadding>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-[#2563EB] text-white' : 'bg-muted'} rounded-xl px-4 py-3`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
                {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0"><User className="w-4 h-4" /></div>}
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
                  {[0, 0.2, 0.4].map(d => (
                    <motion.div key={d} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: d }} className="w-2 h-2 bg-muted-foreground rounded-full" />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Voice Button */}
        <div className="flex justify-center py-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleListening}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isListening ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-br from-[#2563EB] to-[#10B981]'
            }`}
          >
            {isListening ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
          </motion.button>
        </div>
        {isListening && <p className="text-center text-xs text-red-500 -mt-2 mb-2">Listening...</p>}

        <div className="p-4 border-t border-border/50">
          <div className="flex gap-2">
            <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Type your question..." className="flex-1" />
            <Button onClick={handleSend} disabled={!input.trim() || isLoading} className="bg-[#2563EB]"><Send className="w-4 h-4" /></Button>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
