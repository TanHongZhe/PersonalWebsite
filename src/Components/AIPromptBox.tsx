import { useState } from 'react';
import { Bot, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIPromptBox() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setResponse(""); // Clear previous response

    try {
      // In production/locally, this will hit your Cloudflare function or backend
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!res.ok) {
        throw new Error('Failed to get a response');
      }

      const data = await res.json();
      setResponse(data.reply);
    } catch (error) {
      setResponse("Oops! The AI is currently taking a coffee break. Please try again later or contact me directly.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-12 relative group z-10">
      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative border border-border/50 glass-card p-6 md:p-8 rounded-[2rem] shadow-xl overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none">
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-primary/20 text-primary">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-foreground">Ask AI Resident</h3>
            <p className="font-body text-muted-foreground text-sm">Trained directly on my resume & professional experience.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
            placeholder="e.g., What previous experience does Hong Zhe have in embedded design?"
            className="w-full bg-background/50 border border-border/50 rounded-full px-6 py-4 pr-16 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:pointer-events-none transition-all shadow-[0_0_15px_rgba(var(--primary),0.4)]"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-[2px]" />}
          </button>
        </form>

        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-6"
            >
              <div className="p-5 rounded-2xl bg-secondary/30 border border-border/50 backdrop-blur-md">
                <p className="font-body text-foreground/90 leading-relaxed text-sm md:text-base">
                  {response}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
