import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Github } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSuccess(true);
        form.reset();
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 section-dark relative px-4 md:px-8 overflow-hidden border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-primary font-display font-medium tracking-widest mb-2 uppercase">Get In Touch</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-foreground">Contact Me</h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Side: Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h4 className="text-3xl font-display font-bold text-white mb-6">Let's Connect</h4>
            <p className="text-foreground/80 font-body text-lg leading-relaxed mb-10">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about electronics, system architecture, and technology. Feel free to reach out!
            </p>
            
            <div className="space-y-6">
              <a href="mailto:hongzhetan7@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body">Personal Email</p>
                  <p className="text-lg font-medium text-white group-hover:text-primary transition-colors">hongzhetan7@gmail.com</p>
                </div>
              </a>

              <a href="mailto:hzt24@ic.ac.uk" className="flex items-center gap-4 group">
                <div className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body">University Email</p>
                  <p className="text-lg font-medium text-white group-hover:text-primary transition-colors">hzt24@ic.ac.uk</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body">Location</p>
                  <p className="text-lg font-medium text-white group-hover:text-primary transition-colors">London, UK</p>
                </div>
              </div>

              <a href="https://linkedin.com/in/hong-zhe-tan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body">LinkedIn</p>
                  <p className="text-lg font-medium text-white group-hover:text-primary transition-colors">Connect with me</p>
                </div>
              </a>

              <a href="https://github.com/tanhongzhe" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body">GitHub</p>
                  <p className="text-lg font-medium text-white group-hover:text-primary transition-colors">Check out my projects</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="glass-card rounded-3xl p-8 shadow-2xl backdrop-blur-3xl bg-background/90 border border-primary/20 h-full flex flex-col justify-center">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-display font-bold text-white mb-4">Message Sent!</h4>
                  <p className="text-foreground/80 font-body mb-8">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary/10 transition-colors font-medium text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form action="https://formspree.io/f/xlgobyba" method="POST" onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
                  <h4 className="text-2xl font-display font-bold text-white mb-6">Send Me a Message</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder="John Doe"
                    required
                    className="w-full bg-black/30 border border-border/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">Subject</label>
                  <input 
                    type="text" 
                    name="subject" 
                    id="subject" 
                    placeholder="Hello Hongzhe!"
                    required
                    className="w-full bg-black/30 border border-border/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">Message</label>
                  <textarea 
                    name="message" 
                    id="message" 
                    rows={5}
                    placeholder="I would like to talk about..."
                    required
                    className="w-full bg-black/30 border border-border/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body resize-none"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed text-primary-foreground font-body font-medium rounded-xl px-4 py-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all transform hover:-translate-y-1 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
            )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
