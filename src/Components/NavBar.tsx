import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Shifting to a menu button after scrolling down 150px
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
  ];

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <AnimatePresence mode="wait">
          {!isScrolled ? (
            <motion.nav
              key="full-nav"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="glass-card rounded-full px-8 py-3 flex items-center gap-6 border border-primary/20 shadow-lg backdrop-blur-md bg-background/40 pointer-events-auto w-max"
            >
              <div className="flex items-center gap-6 font-body text-sm font-medium text-foreground/80">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </a>
                ))}
              </div>
              <div className="w-px h-6 bg-border/50 hidden sm:block"></div>
              <a href="#contact" className="bg-primary/20 text-primary border border-primary/30 px-5 py-2 rounded-full font-body text-sm font-medium hover:bg-primary/40 transition-colors hidden sm:block">
                Contact Me
              </a>
            </motion.nav>
          ) : (
            <motion.button
              key="menu-btn"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-4 md:right-8 glass-card border border-primary/40 p-3 rounded-full text-primary hover:bg-primary/20 transition-colors pointer-events-auto backdrop-blur-md shadow-lg shadow-primary/20"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && isScrolled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-24 right-4 md:right-8 z-50 glass-card border border-primary/20 rounded-2xl p-4 flex flex-col gap-3 min-w-[200px] shadow-2xl backdrop-blur-xl bg-background/90"
          >
            <div className="mb-2 px-2">
              <span className="text-muted-foreground font-display text-sm tracking-widest uppercase">Navigation</span>
            </div>
            
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-foreground/90 font-body text-lg font-medium hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/10"
              >
                {link.name}
              </a>
            ))}
            
            <div className="h-px w-full bg-border/50 my-1" />
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="text-center bg-primary text-primary-foreground py-3 rounded-xl font-body font-medium shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-0.5"
            >
              Contact Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
