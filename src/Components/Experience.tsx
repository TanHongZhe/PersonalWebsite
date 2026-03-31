import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const experiences = [
  {
    role: "Data Centre Design & Planning Intern",
    company: "AIMS Data Centre",
    date: "July - Sept 2025",
    description: "Managed IST for Tier III centers, developed foundational knowledge of high-reliability power systems (e.g., stand-by diesel generators, 33kV/132kV and 415V/33kV transformers, switchgear, UPS's, and PDU's) and cooling infrastructure (FWU/cooling towers).",
    images: ["/images/aims-1.jpg", "/images/aims-2.jpg"],
    logo: "/images/aims-logo.png"
  },
  {
    role: "Hardware Electrical Intern",
    company: "Ventrix Labs",
    date: "Feb - June 2025",
    description: "Developed a modular carbon capture prototype and a CO2 tracking solution successfully deployed at a local brewery.",
    images: ["/images/ventrix-1.jpg", "/images/ventrix-2.jpg"],
    logo: "/images/ventrix-logo.png"
  },
  {
    role: "Co-Marketing Director",
    company: "Rakan Tutor",
    date: "Feb 2025 - Present",
    description: <>Mainly handled content marketing and created their official website (<a href="https://rakantutor.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors underline decoration-primary/30 underline-offset-4">rakantutor.org</a>). Built content that garnered over 500k views across LinkedIn and Instagram over the past 12 months.</>,
    images: ["/images/rakan-tutor.jpg"],
    logo: "/images/rakan-tutor-logo.png"
  },
  {
    role: "Algorithmic Trading Participant",
    company: "Optiver & Imperial Trading Academy",
    date: "May - Jun 2025",
    description: "Built Python-based trading algorithms to capitalize on market inefficiencies. Implemented market-making & arbitrage strategies and gained expertise in pricing complex derivatives within 25 updates/sec limits.",
    images: ["/images/optiver-new.png", "/images/optiver-2.jpg"],
    logo: "/images/optiver-logo.png"
  }
];

const ExperienceCard = ({ exp }: { exp: typeof experiences[0] }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    if (!exp.images || exp.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % exp.images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [exp.images]);

  return (
    <div className="glass-card rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-start hover:border-primary/50 transition-colors relative z-20 w-full max-w-5xl bg-background/98 backdrop-blur-3xl shadow-2xl max-h-[85vh] overflow-y-auto hide-scrollbar">
      <div className="lg:w-1/3 w-full shrink-0">
        <div className="flex items-center gap-4 mb-4">
          {exp.logo && (
            <div className="w-14 h-14 rounded-full bg-white flex flex-col items-center justify-center p-2 shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/10 overflow-hidden">
              <img src={exp.logo} loading="lazy" alt={`${exp.company} logo`} className="w-full h-full object-contain" />
            </div>
          )}
          <div>
            <p className="text-primary font-body font-medium mb-1">{exp.date}</p>
            <h4 className="text-2xl font-display font-bold text-foreground leading-tight">{exp.role}</h4>
          </div>
        </div>
        <p className="text-xl text-muted-foreground font-display">{exp.company}</p>
      </div>

      <div className="lg:w-2/3 w-full">
        <p className="text-foreground/80 font-body text-lg leading-relaxed mb-6">
          {exp.description}
        </p>

        {exp.images && exp.images.length > 0 && (
          <>
            {/* Mobile Auto-Slideshow */}
            <div className="md:hidden relative w-full aspect-video rounded-xl overflow-hidden border border-border/50 bg-section-dark">
              {exp.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${exp.company} image ${i + 1}`}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentImageIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ))}
            </div>

            {/* Desktop Full Grid */}
            <div className="hidden md:grid grid-cols-2 gap-4">
              {exp.images.map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-border/50 group aspect-video bg-section-dark relative">
                  <img
                    src={img}
                    alt={`${exp.company} image ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 absolute inset-0"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate horizontal translation based on scroll progress
  // Translate from 0% to -(N-1)/N * 100%
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(experiences.length - 1) * 100 / experiences.length}%`]
  );

  return (
    <section id="experience" className="relative w-full bg-background">
      {/* Container provides exact scrollable height for horizontal sliding */}
      <div ref={containerRef} className="relative w-full" style={{ height: `${experiences.length * 100}vh` }}>
        <div className="sticky top-0 h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden pt-20 pb-16 md:pt-24 md:pb-24">
          
          {/* Header sits securely above the horizontal track now */}
          <div className="relative w-full text-center z-10 pointer-events-none shrink-0 mb-6 md:mb-10 flex flex-col items-center">
            <h2 className="text-primary font-display font-medium tracking-widest mb-1 md:mb-2 text-sm md:text-base uppercase drop-shadow-md">Career</h2>
            <h3 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold text-foreground drop-shadow-lg leading-tight">Work Experience</h3>
          </div>

          {/* self-start pins the track perfectly to the left edge so Card 1 displays center */}
          <motion.div 
            className="flex flex-1 items-center self-start" 
            style={{ 
              x: xTranslate,
              width: `${experiences.length * 100}vw` 
            }}
          >
            {experiences.map((exp, index) => (
              <div key={index} className="w-screen h-full flex items-center justify-center px-4 md:px-8 pb-14 md:pb-16">
                <ExperienceCard exp={exp} />
              </div>
            ))}
          </motion.div>

          {/* Progress Bar Track at the absolute bottom */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-[80%] max-w-2xl h-1.5 md:h-2 bg-white/10 rounded-full overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20">
             <motion.div 
               className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.8)]"
               style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
             />
          </div>
        </div>
      </div>
    </section>
  );
}
