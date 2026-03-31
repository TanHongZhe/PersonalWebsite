import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Mail } from 'lucide-react';
import { Component as InfiniteGrid } from '../Components/ui/the-infinite-grid';
import MorphPanel from './ui/ai-input';

export default function HeroSection() {
  return (
    <InfiniteGrid className="px-4 md:px-8 pt-16 md:pt-20">
      <div className="z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-secondary-foreground/60 font-body text-xl md:text-2xl mb-4 tracking-widest uppercase">
            Electrical & Electronic Engineering
          </h2>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-br from-white via-primary to-blue-500 bg-clip-text text-transparent pb-2 pr-2">TAN HONG ZHE</span>
          </h1>
          <p className="text-muted-foreground font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
            Undergraduate at Imperial College London <span className="text-primary font-medium opacity-80">(QS World Ranking 2)</span>. Passionate about hardware engineering, AI automations, and electronics.
          </p>

          <div className="flex flex-col xl:flex-row items-start justify-center gap-6 min-h-[60px]">
            <a href="https://drive.google.com/file/d/15zrSnfFRTYcdSqVI_Bkti_bSnqH7a8Lp/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="gradient-button px-8 py-4 rounded-full font-display font-semibold text-lg flex items-center gap-2 group text-white shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-shadow cursor-pointer z-40">
              View My Resume
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="relative z-50">
              <MorphPanel />
            </div>
            
            <div className="flex items-center gap-4 border border-border/50 glass-card px-6 py-4 rounded-full">
              <a href="https://www.linkedin.com/in/hong-zhe-tan/" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:hongzhetan7@gmail.com" className="text-foreground/70 hover:text-primary transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </InfiniteGrid>
  );
}
