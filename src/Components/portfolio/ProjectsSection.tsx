import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Github, Cpu, Layers, TreePine } from 'lucide-react';
import VoxelCard from './VoxelCard';
import VoxelButton from './VoxelButton';
import PixelLeaf from './PixelLeaf';

const projects = [
  {
    title: "Autonomous Microcontroller Rover",
    subtitle: "Winner - Best 1st Year Group Project Prize",
    icon: Cpu,
    description: "Led a team of 6 to design a rover with web-server architecture. Implemented a buddy-system for delegation and successfully integrated hardware/firmware for real-time data processing and obstacle maneuvering.",
    techStack: ["Microcontroller", "WiFi Web Server", "C++", "Sensors"],
    hasAward: true,
    variant: 'wood',
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    imageAlt: "Autonomous microcontroller rover project with embedded sensors and WiFi connectivity for real-time obstacle navigation"
  },
  {
    title: "FPGA Design & Quartus",
    subtitle: "Advanced Coursework",
    icon: Layers,
    description: "Current extensive coursework exploring FPGA architecture and hardware description languages. Deep dive into digital system design and optimization.",
    techStack: ["MAX10 DE10-Lite", "Quartus Prime", "SystemVerilog"],
    hasAward: false,
    variant: 'glass',
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    imageAlt: "FPGA development board MAX10 DE10-Lite used for digital system design with Quartus Prime and SystemVerilog"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <TreePine className="w-5 h-5 text-green-400" aria-hidden="true" />
            <span className="text-green-400 text-sm font-bold tracking-widest uppercase">Projects</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-emerald-100" style={{ fontFamily: "'VT323', monospace" }}>
            Featured Work
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <VoxelCard variant={project.variant} className="h-full">
                <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                  
                  {project.hasAward && (
                    <motion.div 
                      className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-amber-500/90 border-2 border-amber-400 rounded-sm"
                      initial={{ scale: 0, rotate: -10 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, type: 'spring' }}
                      role="img"
                      aria-label="Award winner badge"
                    >
                      <Award className="w-4 h-4 text-amber-950" aria-hidden="true" />
                      <span className="text-amber-950 text-xs font-black">WINNER</span>
                    </motion.div>
                  )}
                  
                  <div className="absolute bottom-4 left-4">
                    <div className="w-14 h-14 relative">
                      <div className="absolute inset-0 bg-emerald-800 rounded-sm translate-x-1 translate-y-1" />
                      <div className="relative w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-sm flex items-center justify-center border-2 border-emerald-300/50">
                        <project.icon className="w-7 h-7 text-emerald-950" aria-label={project.title} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-emerald-100 mb-1" style={{ fontFamily: "'VT323', monospace" }}>
                  {project.title}
                </h3>
                <p className="text-emerald-500 text-sm font-bold mb-4">{project.subtitle}</p>
                
                <p className="text-emerald-200/80 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map(tech => (
                    <span 
                      key={tech} 
                      className="px-3 py-1.5 text-xs font-bold rounded-sm bg-lime-900/40 text-lime-300 border-2 border-lime-700/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t-2 border-emerald-800/50">
                  <button 
                    className="flex items-center gap-2 text-emerald-400 hover:text-lime-400 transition-colors text-sm font-bold"
                    aria-label={`View source code for ${project.title}`}
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    Code
                  </button>
                  <button 
                    className="flex items-center gap-2 text-emerald-400 hover:text-lime-400 transition-colors text-sm font-bold"
                    aria-label={`View details for ${project.title}`}
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    Details
                  </button>
                </div>
                
                <PixelLeaf className="absolute -top-1 -right-1" size="md" />
              </VoxelCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}