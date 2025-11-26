import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Zap } from 'lucide-react';
import VoxelCard from './VoxelCard';
import GrowingVine from './GrowingVine';

const experiences = [
  {
    role: 'EEE Intern',
    company: 'Ventrix Lab',
    period: 'Term-time',
    description: 'Sole EEE intern for a modular direct carbon capture startup.',
    achievement:
      'Developed a sensing and data refinery system from scratch. Acted as the technical bridge between hardware and data science teams to track capture efficiency.',
    tags: ['Carbon Capture', 'Sensor Systems', 'Data Pipeline'],
    variant: 'leaf',
  },
  {
    role: 'Data Center Intern',
    company: 'AIMS Data Center',
    period: 'Summer 2024',
    description:
      'Operations and critical infrastructure for Tier III colocation facilities (100MW+).',
    achievement:
      'Managed on-site Integrated System Testing (IST) for N+1/2N redundancy systems. Designed a Hot Aisle Containment (HAC) solution for an 8MW AWS facility, contributing to a PUE of 1.4.',
    tags: ['Critical Infrastructure', 'Redundancy Systems', 'Thermal Design'],
    variant: 'stone',
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-bold tracking-widest uppercase">
              Experience
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-black text-emerald-100"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            Professional Journey
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Vine */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-2 hidden md:block">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-lime-500 via-green-600 to-emerald-700 rounded-sm"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              style={{ transformOrigin: 'top' }}
            />
            {/* Vine nodes */}
            {[0, 50, 100].map((pos, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-lime-400 rounded-sm border-2 border-lime-300"
                style={{ top: `${pos}%` }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.3 }}
              />
            ))}
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                }`}
              >
                <VoxelCard variant={exp.variant}>
                  <div className="flex items-center gap-3 mb-4">
                    {/* Role Icon Block */}
                    <div className="w-12 h-12 relative">
                      <div className="absolute inset-0 bg-amber-700 rounded-sm translate-x-1 translate-y-1" />
                      <div className="relative w-full h-full bg-gradient-to-br from-amber-400 to-amber-500 rounded-sm flex items-center justify-center border-2 border-amber-300/30">
                        <Briefcase className="w-5 h-5 text-amber-950" />
                      </div>
                    </div>
                    <div>
                      <h3
                        className="text-lg font-black text-emerald-100"
                        style={{ fontFamily: "'VT323', monospace" }}
                      >
                        {exp.role}
                      </h3>
                      <p className="text-lime-400 text-sm font-bold">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-emerald-400/70 text-sm mb-4 font-medium">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>

                  <p className="text-emerald-200/80 mb-4">{exp.description}</p>

                  {/* Achievement Block */}
                  <div className="p-4 bg-emerald-950/50 border-l-4 border-lime-500 rounded-sm mb-4">
                    <p className="text-emerald-200/90 text-sm leading-relaxed">
                      <span className="text-lime-400 font-bold">
                        ⚡ Key Achievement:
                      </span>{' '}
                      {exp.achievement}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-bold rounded-sm bg-emerald-800/50 text-emerald-300 border-2 border-emerald-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Progress Vine */}
                  <GrowingVine progress={100} className="mt-4" />
                </VoxelCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
