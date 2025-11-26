import React from 'react';
import { motion } from 'framer-motion';

export default function BlockText({ children, className = '', delay = 0 }) {
  const text = children.toString();

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.3,
            delay: delay + index * 0.03,
            ease: 'easeOut',
          }}
          style={{
            textShadow: '2px 2px 0 rgba(0,0,0,0.3), 4px 4px 0 rgba(0,0,0,0.1)',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
