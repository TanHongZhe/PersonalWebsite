import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const VoxelBlock = ({ style, type, delay, duration }) => {
  const blockStyles = {
    grass: {
      top: 'bg-gradient-to-b from-emerald-400 to-emerald-500',
      front: 'bg-emerald-600',
      side: 'bg-emerald-700',
      dirt: 'bg-gradient-to-b from-amber-700 to-amber-800',
    },
    stone: {
      top: 'bg-slate-400',
      front: 'bg-slate-500',
      side: 'bg-slate-600',
    },
    leaf: {
      top: 'bg-green-400',
      front: 'bg-green-500',
      side: 'bg-green-600',
    },
    glow: {
      top: 'bg-lime-300',
      front: 'bg-lime-400',
      side: 'bg-lime-500',
    },
  };

  const colors = blockStyles[type] || blockStyles.grass;
  const size = style.size || 40;

  return (
    <motion.div
      className="absolute preserve-3d cursor-pointer"
      style={{
        left: style.left,
        top: style.top,
        width: size,
        height: size,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: [0.4, 0.8, 0.4],
        y: [0, -20, 0],
        rotateY: [0, 10, 0],
        rotateX: [0, -5, 0],
      }}
      transition={{
        duration: duration || 8,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.2, opacity: 1 }}
    >
      {/* Top face */}
      <div
        className={`absolute w-full h-full ${colors.top} border border-black/20`}
        style={{
          transform: `rotateX(90deg) translateZ(${size / 2}px)`,
        }}
      />
      {/* Front face */}
      <div
        className={`absolute w-full ${type === 'grass' ? 'h-full' : 'h-full'} ${
          type === 'grass' ? colors.dirt : colors.front
        } border border-black/20`}
        style={{
          transform: `translateZ(${size / 2}px)`,
          height: size,
        }}
      >
        {type === 'grass' && (
          <div
            className={`absolute top-0 left-0 right-0 h-1/4 ${colors.front}`}
          />
        )}
      </div>
      {/* Right face */}
      <div
        className={`absolute w-full h-full ${
          type === 'grass' ? colors.dirt : colors.side
        } border border-black/20`}
        style={{
          transform: `rotateY(90deg) translateZ(${size / 2}px)`,
        }}
      >
        {type === 'grass' && (
          <div
            className={`absolute top-0 left-0 right-0 h-1/4 ${colors.side}`}
          />
        )}
      </div>
    </motion.div>
  );
};

export default function VoxelBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const generatedBlocks = [];
    const types = ['grass', 'grass', 'grass', 'stone', 'leaf', 'leaf', 'glow'];

    for (let i = 0; i < 25; i++) {
      generatedBlocks.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 20 + Math.random() * 40,
        type: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 6,
      });
    }
    setBlocks(generatedBlocks);

    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Background - Forest Canopy */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-green-950 to-emerald-900" />

      {/* Pixelated Stars/Particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-lime-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating Voxel Blocks with Mouse Parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-auto"
        style={{
          transform: `perspective(1000px) rotateX(${
            mousePos.y * 0.5
          }deg) rotateY(${mousePos.x * 0.5}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {blocks.map((block) => (
          <VoxelBlock
            key={block.id}
            style={{ left: block.left, top: block.top, size: block.size }}
            type={block.type}
            delay={block.delay}
            duration={block.duration}
          />
        ))}
      </motion.div>

      {/* Ground Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-amber-900/50 via-transparent to-transparent" />
    </div>
  );
}
