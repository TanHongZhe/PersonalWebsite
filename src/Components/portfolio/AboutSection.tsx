import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Shield, BookOpen, Sprout } from 'lucide-react';
import VoxelCard from './VoxelCard';
import PixelLeaf from './PixelLeaf';

const attributes = [
  {
    icon: Cpu,
    title: 'Systems Thinking',
    description: 'Viewing every component as part of a reliable architecture.',
    variant: 'stone',
  },
  {
    icon: Shield,
    title: 'Accountability',
    description:
      'Pre-emptively over-engineering risk areas to ensure zero-harm.',
    variant: 'glass',
  },
  {
    icon: BookOpen,
    title: 'Active Learner',
    description:
      'Constantly researching and bridging the gap between theory and industry.',
    variant: 'leaf',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sprout className="w-5 h-5 text-lime-400" />
            <span className="text-lime-400 text-sm font-bold tracking-widest uppercase">
              About
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-black text-emerald-100 mb-8"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            Driven by Precision
          </h2>

          <VoxelCard variant="glass" hover={false}>
            <p className="text-emerald-200/90 text-lg leading-relaxed">
              I am driven by the fact that electronics in aviation, defense, and
              critical infrastructure demand the utmost reliability. As a
              student at Imperial, I have cultivated a disciplined
              approach—standing by the philosophy of{' '}
              <span className="text-lime-300 font-bold px-2 py-1 bg-lime-900/30 rounded-sm">
                'eating the frog early'
              </span>{' '}
              to manage heavy workloads and ensure precision. I view myself not
              just as an engineer, but as a{' '}
              <span className="text-emerald-300 font-bold">
                system architect
              </span>{' '}
              who takes technical ownership from concept to validation.
            </p>
            <PixelLeaf className="absolute -top-2 -right-2" size="lg" />
          </VoxelCard>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {attributes.map((attr, index) => (
            <motion.div
              key={attr.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <VoxelCard variant={attr.variant} className="h-full">
                <div className="relative">
                  {/* Icon Block */}
                  <div className="w-14 h-14 mb-6 relative">
                    <div className="absolute inset-0 bg-emerald-600 rounded-sm translate-x-1 translate-y-1" />
                    <div className="relative w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-sm flex items-center justify-center border-2 border-emerald-300/30">
                      <attr.icon className="w-7 h-7 text-emerald-950" />
                    </div>
                  </div>

                  <h3
                    className="text-xl font-black text-emerald-100 mb-3"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    {attr.title}
                  </h3>
                  <p className="text-emerald-300/80 leading-relaxed">
                    {attr.description}
                  </p>

                  {/* Decorative vine */}
                  <motion.div
                    className="absolute -bottom-2 -right-2 flex gap-1"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-sm" />
                    <div className="w-2 h-2 bg-lime-400 rounded-sm" />
                  </motion.div>
                </div>
              </VoxelCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
