import React from 'react';
import { motion } from 'framer-motion';

export default function VoxelCard({
  children,
  className = '',
  variant = 'stone',
  hover = true,
}) {
  const variants = {
    stone: {
      bg: 'bg-slate-800/80',
      border: 'border-slate-600',
      shadow: 'shadow-slate-900/50',
      accent: 'bg-slate-500',
    },
    glass: {
      bg: 'bg-emerald-950/60 backdrop-blur-sm',
      border: 'border-emerald-700/50',
      shadow: 'shadow-emerald-900/30',
      accent: 'bg-emerald-600',
    },
    wood: {
      bg: 'bg-gradient-to-b from-amber-800/80 to-amber-900/80',
      border: 'border-amber-600/50',
      shadow: 'shadow-amber-950/50',
      accent: 'bg-amber-500',
    },
    leaf: {
      bg: 'bg-gradient-to-b from-green-800/70 to-green-900/70 backdrop-blur-sm',
      border: 'border-green-600/40',
      shadow: 'shadow-green-950/40',
      accent: 'bg-green-500',
    },
  };

  const style = variants[variant];

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Bottom shadow layer */}
      <div
        className={`absolute inset-0 ${style.bg} rounded-sm translate-y-2 translate-x-1 opacity-50`}
      />

      {/* Main card */}
      <div
        className={`relative ${style.bg} border-4 ${style.border} rounded-sm shadow-xl ${style.shadow} overflow-hidden`}
      >
        {/* Top edge highlight */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 ${style.accent} opacity-60`}
        />

        {/* Pixel corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 bg-white/10" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-black/20" />
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-black/10" />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-black/30" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '8px 8px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-6">{children}</div>
      </div>
    </motion.div>
  );
}
