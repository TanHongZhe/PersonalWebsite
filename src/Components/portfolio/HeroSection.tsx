import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, Leaf } from 'lucide-react';
import VoxelButton from './VoxelButton';
import BlockText from './BlockText';
import PixelLeaf from './PixelLeaf';

export default function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openCV = () => {
    window.open("https://hongzhecv-nov2025-v3.tiiny.site/", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Status Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-emerald-900/60 border-2 border-emerald-600/50 mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="w-3 h-3 bg-lime-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-lime-300 text-sm font-bold tracking-wider uppercase">Available for Opportunities</span>
            <PixelLeaf size="sm" />
          </motion.div>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="block text-emerald-100 drop-shadow-lg" style={{ fontFamily: "'VT323', monospace" }}>
              <BlockText>Engineering</BlockText>
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-300 to-green-300 drop-shadow-lg" style={{ fontFamily: "'VT323', monospace" }}>
              <BlockText delay={0.3}>Reliability</BlockText>
            </span>
            <span className="block text-emerald-100 drop-shadow-lg" style={{ fontFamily: "'VT323', monospace" }}>
              <BlockText delay={0.6}>in a Complex World</BlockText>
            </span>
          </h1>
          
          {/* Sub-headline */}
          <motion.p 
            className="text-lg md:text-xl text-emerald-200/80 max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            MEng Electrical & Electronic Engineering Student at{' '}
            <span className="text-lime-300 font-bold">Imperial College London</span>. 
            Specializing in Critical Systems, Data Centers, and Embedded Electronics.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <VoxelButton onClick={scrollToProjects} variant="primary">
              <Leaf className="w-5 h-5" />
              View Projects
              <ArrowDown className="w-4 h-4" />
            </VoxelButton>
            
            {/* UPDATED BUTTON HERE */}
            <VoxelButton onClick={openCV} variant="outline">
              <FileText className="w-5 h-5" />
              Download CV
            </VoxelButton>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-emerald-400/60 text-xs tracking-widest uppercase font-bold">Scroll</span>
            <motion.div 
              className="w-1 h-12 bg-gradient-to-b from-lime-400 to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}