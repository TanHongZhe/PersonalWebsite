import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

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

const ExperienceCard = ({ exp, index, scrollYProgress, total, isLast }: { exp: typeof experiences[0], index: number, scrollYProgress: MotionValue<number>, total: number, isLast: boolean }) => {
  // Each experience gets an equal chunk of the total scroll
  const sectionLen = 1 / total;
  const start = index * sectionLen;
  const end = (index + 1) * sectionLen;

  // Phase 1: Logo fades in (0% - 20% of section)
  const logoFadeIn = start + sectionLen * 0.05;
  const logoFullyIn = start + sectionLen * 0.20;
  
  // Phase 2: Logo holds, then fades as card comes in (20% - 45%)
  const logoFadeOut = start + sectionLen * 0.40;
  
  // Phase 3: Card fades in (35% - 50%)
  const cardFadeIn = start + sectionLen * 0.35;
  const cardFullyIn = start + sectionLen * 0.50;
  
  // Phase 4: Card holds (50% - 80%), then fades out (80% - 95%)
  const cardFadeOut = start + sectionLen * 0.80;
  const cardGone = start + sectionLen * 0.95;

  // Logo animation
  const logoOpacity = useTransform(
    scrollYProgress,
    index === 0 
      ? [start, logoFullyIn, logoFadeOut - sectionLen * 0.05, logoFadeOut] 
      : [start, logoFadeIn, logoFullyIn, logoFadeOut - sectionLen * 0.05, logoFadeOut],
    index === 0 
      ? [1, 1, 1, 0] 
      : [0, 0, 1, 1, 0]
  );

  const logoScale = useTransform(
    scrollYProgress,
    [start, logoFullyIn, logoFadeOut],
    [0.5, 1, 1.3]
  );

  const logoY = useTransform(
    scrollYProgress,
    [start, logoFullyIn, logoFadeOut],
    [40, 0, -40]
  );

  // Card animation — last card stays visible (doesn't fade out)
  const cardOpacity = useTransform(
    scrollYProgress,
    isLast
      ? [cardFadeIn, cardFullyIn]
      : [cardFadeIn, cardFullyIn, cardFadeOut, cardGone],
    isLast
      ? [0, 1]
      : [0, 1, 1, 0]
  );

  const cardY = useTransform(
    scrollYProgress,
    isLast
      ? [cardFadeIn, cardFullyIn]
      : [cardFadeIn, cardFullyIn, cardFadeOut, cardGone],
    isLast
      ? [60, 0]
      : [60, 0, 0, -60]
  );

  const pointerEvents = useTransform(
    cardOpacity,
    (val) => (val > 0.3 ? "auto" : "none")
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Big Logo Float Animation */}
      <motion.div
        style={{
          opacity: logoOpacity,
          scale: logoScale,
          y: logoY,
          pointerEvents: "none"
        }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
      >
        {exp.logo && (
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-white flex flex-col items-center justify-center p-6 shadow-[0_0_40px_rgba(255,255,255,0.2)] overflow-hidden">
            <img
              src={exp.logo}
              alt={`${exp.company} logo`}
              className="w-full h-full object-contain opacity-100"
            />
          </div>
        )}
      </motion.div>

      {/* Actual Card content */}
      <motion.div
        style={{
          opacity: cardOpacity,
          y: cardY,
          pointerEvents: pointerEvents as any
        }}
        className="glass-card rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-start hover:border-primary/50 transition-colors relative z-20 w-full max-w-5xl bg-background/95 backdrop-blur-3xl shadow-2xl"
      >
        <div className="lg:w-1/3 w-full">
          <div className="flex items-center gap-4 mb-4">
            {exp.logo && (
              <div className="w-14 h-14 rounded-full bg-white flex flex-col items-center justify-center p-2 shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/10 overflow-hidden">
                <img src={exp.logo} alt={`${exp.company} logo`} className="w-full h-full object-contain" />
              </div>
            )}
            <div>
              <p className="text-primary font-body font-medium mb-1">{exp.date}</p>
              <h4 className="text-2xl font-display font-bold text-foreground leading-tight">{exp.role}</h4>
            </div>
          </div>
          <p className="text-xl text-muted-foreground font-display">{exp.company}</p>
        </div>

        <div className="lg:w-2/3">
          <p className="text-foreground/80 font-body text-lg leading-relaxed mb-6">
            {exp.description}
          </p>

          {exp.images && exp.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exp.images.map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-border/50 group aspect-video bg-section-dark">
                  <img
                    src={img}
                    alt={`${exp.company} image ${i + 1}`}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="experience" ref={containerRef} className="relative w-full bg-background" style={{ height: `${experiences.length * 150}vh` }}>
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-4 md:px-8 py-24">
        <div className="absolute top-8 w-full text-center z-30 pointer-events-none">
          <h2 className="text-primary font-display font-medium tracking-widest mb-2 uppercase drop-shadow-md">Career</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-foreground drop-shadow-lg">Work Experience</h3>
        </div>

        <div className="relative w-full max-w-6xl mx-auto flex-1 flex items-center justify-center mt-12 md:mt-20">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              exp={exp}
              index={index}
              scrollYProgress={scrollYProgress}
              total={experiences.length}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
