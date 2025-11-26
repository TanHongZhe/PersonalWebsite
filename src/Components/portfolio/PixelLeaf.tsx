import React from 'react';
import { motion } from 'framer-motion';

export default function PixelLeaf({ className = '', size = 'md' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div 
      className={`relative ${sizes[size]} ${className}`}
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
    >
      {/* Main leaf body */}
      <div className="absolute inset-0 bg-green-500 rounded-sm transform rotate-45" />
      {/* Highlight */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-lime-400 rounded-sm transform rotate-45" />
      {/* Stem */}
      <div className="absolute bottom-0 right-0 w-1 h-2 bg-green-700 transform translate-x-1 translate-y-1" />
    </motion.div>
  );
}