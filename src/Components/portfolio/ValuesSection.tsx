import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Leaf, TreePine } from 'lucide-react';
import VoxelCard from './VoxelCard';
import GrowingVine from './GrowingVine';

export default function ValuesSection() {
  return (
    <section id="values" className="py-24 md:py-32 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <TreePine className="w-5 h-5 text-green-400" />
            <span className="text-green-400 text-sm font-bold tracking-widest uppercase">Philosophy</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-emerald-100 mb-12" style={{ fontFamily: "'VT323', monospace" }}>
            Values & Beliefs
          </h2>
          
          <VoxelCard variant="glass" hover={false} className="mb-12">
            <div className="py-8">
              {/* Quote Icon Block */}
              <div className="w-16 h-16 mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-emerald-800 rounded-sm translate-x-1 translate-y-1" />
                <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-green-600 rounded-sm flex items-center justify-center border-2 border-emerald-400/30">
                  <Quote className="w-8 h-8 text-emerald-950" />
                </div>
              </div>
              
              <blockquote className="text-2xl md:text-3xl font-bold text-emerald-100 leading-relaxed mb-4" style={{ fontFamily: "'VT323', monospace" }}>
                "I believe in a{' '}
                <span className="text-lime-300">collaborative environment</span>{' '}
                where there is room for all of us to win.{' '}
                <span className="text-green-300">Diverse minds drive innovation.</span>"
              </blockquote>
              
              <GrowingVine progress={100} className="max-w-md mx-auto mt-8" />
            </div>
          </VoxelCard>
          
          {/* Net Zero Commitment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <VoxelCard variant="leaf">
              <div className="flex flex-col sm:flex-row items-center gap-6 text-left">
                <div className="w-16 h-16 shrink-0 relative">
                  <div className="absolute inset-0 bg-green-800 rounded-sm translate-x-1 translate-y-1" />
                  <div className="relative w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-sm flex items-center justify-center border-2 border-green-300/30">
                    <Leaf className="w-8 h-8 text-green-950" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-black text-emerald-100 mb-2" style={{ fontFamily: "'VT323', monospace" }}>
                    Committed to Net Zero
                  </h4>
                  <p className="text-emerald-200/80">
                    My work in Carbon Capture reflects a deep commitment to sustainable engineering solutions and building a greener future.
                  </p>
                </div>
                
                {/* Animated growing leaves */}
                <motion.div 
                  className="absolute -top-2 -right-2 flex gap-1"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: 'spring' }}
                >
                  <div className="w-3 h-3 bg-lime-400 rounded-sm rotate-45" />
                  <div className="w-2 h-2 bg-green-400 rounded-sm rotate-45 mt-1" />
                  <div className="w-2 h-2 bg-emerald-400 rounded-sm rotate-45" />
                </motion.div>
              </div>
            </VoxelCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}