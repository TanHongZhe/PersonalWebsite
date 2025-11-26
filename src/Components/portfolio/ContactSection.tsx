import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Send,
  Linkedin,
  Github,
  Mail,
  ArrowUpRight,
  MessageSquare,
} from 'lucide-react';
import VoxelCard from './VoxelCard';
import VoxelButton from './VoxelButton';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const socials = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      desc: 'Connect professionally',
      href: 'https://linkedin.com',
      color: 'from-blue-400 to-blue-500',
      shadow: 'bg-blue-700',
    },
    {
      icon: Github,
      label: 'GitHub',
      desc: 'View my code',
      href: 'https://github.com',
      color: 'from-slate-400 to-slate-500',
      shadow: 'bg-slate-700',
    },
    {
      icon: Mail,
      label: 'Email',
      desc: 'Direct communication',
      href: 'mailto:contact@example.com',
      color: 'from-emerald-400 to-emerald-500',
      shadow: 'bg-emerald-700',
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-5 h-5 text-lime-400" />
              <span className="text-lime-400 text-sm font-bold tracking-widest uppercase">
                Contact
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-black text-emerald-100 mb-6"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              Let's Connect
            </h2>
            <p className="text-emerald-200/80 text-lg mb-10 leading-relaxed">
              Interested in collaborating or have an opportunity to discuss? I'm
              always open to conversations about engineering, innovation, and
              sustainability.
            </p>

            <div className="space-y-4">
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="block"
                >
                  <VoxelCard variant="stone" className="!p-0">
                    <div className="flex items-center gap-4 p-4">
                      <div className="w-12 h-12 relative shrink-0">
                        <div
                          className={`absolute inset-0 ${social.shadow} rounded-sm translate-x-1 translate-y-1`}
                        />
                        <div
                          className={`relative w-full h-full bg-gradient-to-br ${social.color} rounded-sm flex items-center justify-center border-2 border-white/20`}
                        >
                          <social.icon className="w-5 h-5 text-slate-900" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-emerald-100 font-bold">
                          {social.label}
                        </p>
                        <p className="text-emerald-400/70 text-sm">
                          {social.desc}
                        </p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                    </div>
                  </VoxelCard>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <VoxelCard variant="glass">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm text-emerald-300 font-bold mb-2 block uppercase tracking-wide">
                    Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your name"
                    className="bg-emerald-950/50 border-2 border-emerald-700/50 text-emerald-100 placeholder:text-emerald-600 focus:border-lime-500/50 h-12 rounded-sm"
                  />
                </div>

                <div>
                  <label className="text-sm text-emerald-300 font-bold mb-2 block uppercase tracking-wide">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="bg-emerald-950/50 border-2 border-emerald-700/50 text-emerald-100 placeholder:text-emerald-600 focus:border-lime-500/50 h-12 rounded-sm"
                  />
                </div>

                <div>
                  <label className="text-sm text-emerald-300 font-bold mb-2 block uppercase tracking-wide">
                    Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your project..."
                    className="bg-emerald-950/50 border-2 border-emerald-700/50 text-emerald-100 placeholder:text-emerald-600 focus:border-lime-500/50 min-h-[150px] resize-none rounded-sm"
                  />
                </div>

                <VoxelButton type="submit" variant="primary" className="w-full">
                  <Send className="w-5 h-5" />
                  Send Message
                </VoxelButton>
              </form>
            </VoxelCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
