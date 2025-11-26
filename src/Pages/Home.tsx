import React from 'react';
// NOTICE: Imports now match your 'Components' folder name
import VoxelBackground from '@/Components/portfolio/VoxelBackground';
import Navbar from '@/Components/portfolio/Navbar';
import HeroSection from '@/Components/portfolio/HeroSection';
import AboutSection from '@/Components/portfolio/AboutSection';
import ExperienceSection from '@/Components/portfolio/ExperienceSection';
import ProjectsSection from '@/Components/portfolio/ProjectsSection';
import SkillsSection from '@/Components/portfolio/SkillsSection';
import ValuesSection from '@/Components/portfolio/ValuesSection';
import ContactSection from '@/Components/portfolio/ContactSection';
import Footer from '@/Components/portfolio/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-emerald-950 antialiased overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&family=Inter:wght@400;500;600;700&display=swap');
        
        * { font-family: 'Inter', sans-serif; }
        
        html { scroll-behavior: smooth; }
        
        /* Pixelated scrollbar */
        ::-webkit-scrollbar { width: 12px; }
        ::-webkit-scrollbar-track { background: #022c22; }
        ::-webkit-scrollbar-thumb { background: #10b981; border: 2px solid #022c22; }
        ::-webkit-scrollbar-thumb:hover { background: #059669; }
      `}</style>

      <VoxelBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ValuesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
