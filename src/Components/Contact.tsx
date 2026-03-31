import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Mail, MapPin, Linkedin, Github, Send } from 'lucide-react';

const SlideToSubmit = ({ isSubmitting, onTrigger }: { isSubmitting: boolean; onTrigger: () => boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const knobWidth = 56; 
  
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setMaxWidth(containerRef.current.offsetWidth - knobWidth - 8); 
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [knobWidth]);

  const handleDragEnd = async () => {
    const threshold = maxWidth * 0.8;
    if (x.get() >= threshold) {
      if (onTrigger()) {
        await controls.start({ x: maxWidth });
      } else {
        controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
      }
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  const textOpacity = useTransform(x, [0, maxWidth / 2], [1, 0]);
  const bgWidth = useTransform(x, (val) => val + knobWidth + 8);
  
  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-[60px] rounded-xl overflow-hidden flex items-center justify-center p-1 border transition-all duration-300 ${isSubmitting ? 'bg-primary border-primary shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-primary/10 border-primary/30 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]'}`}
    >
      <motion.div 
        className="absolute left-0 top-0 bottom-0 bg-primary/20 z-0 pointer-events-none"
        style={{ width: bgWidth }}
      />
      
      {!isSubmitting && (
        <motion.span 
          style={{ opacity: textOpacity }}
          className="absolute z-10 font-body text-primary font-medium text-base pointer-events-none flex items-center gap-2"
        >
          Slide to Send
          <Send className="w-4 h-4 opacity-50" />
        </motion.span>
      )}

      {isSubmitting && (
         <span className="absolute z-10 font-body text-primary-foreground font-medium animate-pulse text-base flex items-center gap-2">
           <Send className="w-5 h-5" />
           Sending...
         </span>
      )}

      {!isSubmitting && (
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: maxWidth }}
          dragElastic={0.05}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x }}
          className="absolute left-1 top-1 bottom-1 w-14 bg-primary rounded-lg flex items-center justify-center text-primary-foreground cursor-grab active:cursor-grabbing shadow-[0_0_20px_rgba(255,255,255,0.3)] z-20 group"
        >
          <Send className="w-5 h-5 ml-1 transition-transform group-active:scale-95 text-primary-foreground" />
        </motion.div>
      )}
    </div>
  );
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const triggerSubmit = () => {
    if (formRef.current) {
      if (formRef.current.checkValidity()) {
        formRef.current.requestSubmit();
        return true;
      } else {
        formRef.current.reportValidity();
        return false;
      }
    }
    return false;
  };
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
                <form ref={formRef} action="https://formspree.io/f/xlgobyba" method="POST" onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
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
                
                <SlideToSubmit isSubmitting={isSubmitting} onTrigger={triggerSubmit} />
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
