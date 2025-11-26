import React from 'react';
import { motion } from 'framer-motion';
import { CircuitBoard, Wrench, Server, Users, Pickaxe } from 'lucide-react';
import VoxelCard from './VoxelCard';

const skillCategories = [
  {
    icon: CircuitBoard,
    title: "Core",
    color: "emerald",
    skills: ["Circuit Design", "Firmware Simulation", "Root Cause Analysis", "PCB Layout", "Signal Processing"],
    variant: 'glass'
  },
  {
    icon: Wrench,
    title: "Tools",
    color: "amber",
    skills: ["LTSpice", "MATLAB/Simulink", "Quartus Prime", "SystemVerilog", "C/C++"],
    variant: 'wood'
  },
  {
    icon: Server,
    title: "Infrastructure",
    color: "green",
    skills: ["HV/MV Switchgear", "UPS Systems", "PDU", "Stand-by Generators", "33kV Transformers"],
    variant: 'stone'
  },
  {
    icon: Users,
    title: "Soft Skills",
    color: "lime",
    skills: ["Technical Reporting", "Stakeholder Management", "Team Leadership", "Project Planning"],
    variant: 'leaf'
  }
];

const colorMap = {
  emerald: {
    icon: 'from-emerald-400 to-emerald-500',
    shadow: 'bg-emerald-700',
    badge: 'bg-emerald-900/50 border-emerald-700/50 text-emerald-300'
  },
  amber: {
    icon: 'from-amber-400 to-amber-500',
    shadow: 'bg-amber-700',
    badge: 'bg-amber-900/50 border-amber-700/50 text-amber-300'
  },
  green: {
    icon: 'from-green-400 to-green-500',
    shadow: 'bg-green-700',
    badge: 'bg-green-900/50 border-green-700/50 text-green-300'
  },
  lime: {
    icon: 'from-lime-400 to-lime-500',
    shadow: 'bg-lime-700',
    badge: 'bg-lime-900/50 border-lime-700/50 text-lime-300'
  }
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Pickaxe className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-bold tracking-widest uppercase">Expertise</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-emerald-100" style={{ fontFamily: "'VT323', monospace" }}>
            Technical Skills
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <VoxelCard variant={category.variant} className="h-full">
                {/* Icon Block */}
                <div className="w-14 h-14 mb-5 relative">
                  <div className={`absolute inset-0 ${colorMap[category.color].shadow} rounded-sm translate-x-1 translate-y-1`} />
                  <div className={`relative w-full h-full bg-gradient-to-br ${colorMap[category.color].icon} rounded-sm flex items-center justify-center border-2 border-white/20`}>
                    <category.icon className="w-7 h-7 text-slate-900" />
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-emerald-100 mb-4" style={{ fontFamily: "'VT323', monospace" }}>
                  {category.title}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span 
                      key={skill}
                      className={`px-3 py-1.5 text-xs font-bold rounded-sm border-2 ${colorMap[category.color].badge}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </VoxelCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}