import React, { useRef } from "react";
import { cn } from "../../lib/utils";
import { 
  motion, 
  useMotionValue, 
  useMotionTemplate, 
  useAnimationFrame 
} from "framer-motion";

export const Component = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.5; 
  const speedY = 0.5;

  useAnimationFrame(() => {
    // The grid animation itself is extremely cheap.
    // We only needed to kill the massive 130px blur overlaps in the JSX.
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background",
        className
      )}
    >
      {/* Lightweight mobile fallback gradient to replace heavy orbs (Placed first so it sits BEHIND the grid) */}
      <div className="md:hidden absolute inset-0 pointer-events-none z-0 bg-gradient-to-br from-primary/10 via-background to-blue-500/10 opacity-60" />

      {/* Huge Blur Orbs (desktop only, as mobile GPUs freeze attempting to composite 130px overlapping blurs) */}
      <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-[-20%] top-[-20%] w-[40%] h-[40%] rounded-full bg-primary/30 blur-[130px]" />
        <div className="absolute right-[10%] top-[-10%] w-[20%] h-[20%] rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-secondary/40 blur-[120px]" />
      </div>

      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      
      {/* Permanent center grid fade (shows on both mobile and desktop) */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{ 
          maskImage: 'radial-gradient(400px circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)', 
          WebkitMaskImage: 'radial-gradient(400px circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)' 
        }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>

      {/* Mouse hover grid fade (desktop only) */}
      <motion.div 
        className="hidden md:block absolute inset-0 z-0 opacity-50 pointer-events-none"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      <div className="relative z-10 w-full h-full flex flex-col justify-center">
        {children}
      </div>
    </section>
  );
};

const GridPattern = ({ offsetX, offsetY }: { offsetX: any, offsetY: any }) => {
  return (
    <svg className="w-full h-full text-primary">
      <defs>
        <motion.pattern
          id="grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/60" 
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
};
