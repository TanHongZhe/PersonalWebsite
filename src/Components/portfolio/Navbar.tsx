import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, TreePine } from 'lucide-react';
import VoxelButton from './VoxelButton';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-emerald-950/90 backdrop-blur-xl border-b-4 border-emerald-800/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo Block */}
            <a href="#" className="flex items-center gap-3">
              <div className="w-12 h-12 relative">
                <div className="absolute inset-0 bg-emerald-800 rounded-sm translate-x-1 translate-y-1" />
                <div className="relative w-full h-full bg-gradient-to-br from-lime-400 to-emerald-500 rounded-sm flex items-center justify-center border-2 border-lime-300/30">
                  <TreePine className="w-6 h-6 text-emerald-950" />
                </div>
              </div>
              <span
                className="text-emerald-100 font-black text-xl hidden sm:block"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                Portfolio
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="relative px-4 py-2 text-emerald-300 hover:text-lime-300 text-sm font-bold transition-colors uppercase tracking-wide"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {link.label}
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-lime-400 rounded-sm opacity-0"
                    whileHover={{ opacity: 1 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <VoxelButton
                onClick={() => scrollToSection('#contact')}
                variant="primary"
              >
                Get in Touch
              </VoxelButton>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-10 h-10 relative">
                <div className="absolute inset-0 bg-emerald-800 rounded-sm translate-x-0.5 translate-y-0.5" />
                <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-sm flex items-center justify-center">
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 text-emerald-950" />
                  ) : (
                    <Menu className="w-5 h-5 text-emerald-950" />
                  )}
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-emerald-950/98 backdrop-blur-xl" />
            <div className="relative pt-24 px-6">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(link.href)}
                    className="relative p-4 text-left"
                  >
                    <div className="absolute inset-0 bg-emerald-800/30 rounded-sm border-2 border-emerald-700/30" />
                    <span
                      className="relative text-2xl font-black text-emerald-100"
                      style={{ fontFamily: "'VT323', monospace" }}
                    >
                      {link.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
