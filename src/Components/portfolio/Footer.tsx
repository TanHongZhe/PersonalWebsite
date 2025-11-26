import React from 'react';
import { motion } from 'framer-motion';
import { TreePine } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 relative z-10 border-t-4 border-emerald-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div 
            className="flex items-center gap-3 text-emerald-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Pixel Tree Icon */}
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 bg-green-800 rounded-sm translate-x-0.5 translate-y-0.5" />
              <div className="relative w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-sm flex items-center justify-center">
                <TreePine className="w-4 h-4 text-green-950" />
              </div>
            </div>
            <span className="text-sm font-bold">Designed with reliability in mind</span>
          </motion.div>
          
          <p className="text-emerald-600 text-sm font-medium">
            © {new Date().getFullYear()} — Built block by block
          </p>
        </div>
      </div>
    </footer>
  );
}