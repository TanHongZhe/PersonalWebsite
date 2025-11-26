import React from 'react';
import { motion } from 'framer-motion';

export default function GrowingVine({ progress = 100, className = '' }) {
  return (
    <div
      className={`relative h-2 bg-amber-900/50 rounded-sm overflow-hidden border-2 border-amber-800/50 ${className}`}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.2) 4px, rgba(0,0,0,0.2) 8px)',
        }}
      />

      {/* Growing vine progress */}
      <motion.div
        className="h-full bg-gradient-to-r from-green-600 via-emerald-500 to-lime-400 relative"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {/* Vine segments */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.2) 8px, rgba(255,255,255,0.2) 10px)',
          }}
        />

        {/* Leaf at the end */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          <div className="w-3 h-3 bg-lime-400 rotate-45 rounded-sm" />
        </motion.div>
      </motion.div>
    </div>
  );
}
