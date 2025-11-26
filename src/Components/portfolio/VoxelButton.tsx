import React from 'react';
import { motion } from 'framer-motion';

export default function VoxelButton({
  children,
  variant = 'primary',
  onClick,
  className = '',
}) {
  const variants = {
    primary: {
      top: 'bg-emerald-400',
      front: 'bg-emerald-500',
      shadow: 'bg-emerald-700',
      text: 'text-emerald-950',
      hover: 'hover:translate-y-1',
    },
    secondary: {
      top: 'bg-amber-400',
      front: 'bg-amber-500',
      shadow: 'bg-amber-700',
      text: 'text-amber-950',
      hover: 'hover:translate-y-1',
    },
    outline: {
      top: 'bg-transparent border-2 border-emerald-500',
      front: 'bg-emerald-950/50 border-2 border-emerald-500',
      shadow: 'bg-emerald-800',
      text: 'text-emerald-300',
      hover: 'hover:translate-y-1',
    },
  };

  const style = variants[variant];

  return (
    <motion.button
      onClick={onClick}
      className={`relative group ${className}`}
      whileHover={{ y: 4 }}
      whileTap={{ y: 6 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Shadow/Bottom */}
      <div
        className={`absolute inset-0 ${style.shadow} rounded-sm translate-y-2`}
      />

      {/* Main Button Face */}
      <div
        className={`relative ${
          style.front
        } px-8 py-4 rounded-sm border-b-4 ${style.shadow.replace(
          'bg-',
          'border-'
        )} ${
          style.text
        } font-bold tracking-wide flex items-center gap-2 transition-all`}
      >
        {/* Pixel corners decoration */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-white/20" />
        <div className="absolute top-0 right-0 w-2 h-2 bg-black/20" />
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-black/20" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-black/30" />

        {children}
      </div>
    </motion.button>
  );
}
