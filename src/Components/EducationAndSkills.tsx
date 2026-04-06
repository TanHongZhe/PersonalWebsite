import { motion } from 'framer-motion';
import { BookOpen, Award } from 'lucide-react';

const certifications = [
  { 
    title: "SPARK Startup 2024", 
    award: "1st Prize Winner", 
    image: "/images/cert-spark.png" 
  },
  { 
    title: "2024 Drake University Physics Prize Test", 
    award: "9th Place", 
    image: "/images/cert-drake.png" 
  },
  { 
    title: "Outstanding Cambridge Learner Awards", 
    award: "Top in the World Award for As Level Mathematics (9709)", 
    image: "/images/cert-cambridge.png" 
  },
  { 
    title: "Chen Jingrun's Cup Secondary School Mathematics Competition", 
    award: "High Distinction", 
    image: "/images/cert-jingrun.png" 
  },
  { 
    title: "Taylor's College ACCA Tomorrow's Young Business Leaders", 
    award: "1st Prize Winner", 
    image: "/images/cert-acca.png" 
  }
];

export default function EducationAndSkills() {
  return (
    <section id="education" className="py-24 section-medium relative px-4 md:px-8 border-t border-border/30">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="lg:sticky lg:top-32 self-start"
        >
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-display font-bold text-foreground">Education</h2>
          </div>
          
          <div className="space-y-8">
            <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary group-hover:w-2 transition-all" />
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 shrink-0 bg-white rounded-xl overflow-hidden shadow-lg p-2 border border-white/10 hidden sm:block">
                  <img src="/images/logo-imperial.png" alt="Imperial College London - Education of Hong Zhe Tan" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2 w-full">Imperial College London <span className="text-primary text-sm tracking-wider font-medium lg:block xl:inline">(QS World Ranking 2)</span></h3>
                  <p className="text-primary font-medium mb-4">Expected June 2027</p>
                  <p className="text-muted-foreground">BEng in Electrical & Electronic Engineering</p>
                  <ul className="mt-4 space-y-2 text-foreground/80 font-body">
                    <li>• Clubs: Robotics, Investment, Finance, Entrepreneurs, AI.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary group-hover:w-2 transition-all" />
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 shrink-0 bg-white rounded-xl overflow-hidden shadow-lg p-2 border border-white/10 hidden sm:block">
                  <img src="/images/logo-sunway.png" alt="Sunway College - Education of Hong Zhe Tan" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2">Sunway College</h3>
                  <p className="text-primary font-medium mb-4">Graduated June 2024</p>
                  <p className="text-muted-foreground">CAIE A Level (4A*) - Maths, Further Maths, Physics, Chemistry</p>
                  <ul className="mt-4 space-y-2 text-foreground/80 font-body">
                    <li>• Top in the World (Maths)</li>
                    <li>• Sunway High Achiever 2024</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary group-hover:w-2 transition-all" />
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 shrink-0 bg-white rounded-xl overflow-hidden shadow-lg p-2 border border-white/10 hidden sm:block">
                  <img src="/images/logo-taylors.png" alt="Taylor's International School - Education of Hong Zhe Tan" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-2">Taylor's International School Puchong</h3>
                  <p className="text-primary font-medium mb-4">Graduated Nov 2022</p>
                  <p className="text-muted-foreground">IGCSE - 9A*</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-display font-bold text-foreground">Certifications & Awards</h2>
          </div>
          
          <div className="space-y-6">
            {certifications.map((cert, index) => (
              <div key={index} className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group border border-border/50 hover:border-primary/40 transition-colors">
                <h3 className="text-xl md:text-2xl font-display font-bold mb-2 leading-tight">{cert.title}</h3>
                <p className="text-primary font-medium mb-6 leading-relaxed text-sm md:text-base">{cert.award}</p>
                <div className="rounded-xl overflow-hidden border border-border/30 bg-white/5 aspect-[4/3] flex items-center justify-center relative group">
                   <img 
                      src={cert.image} 
                      alt={`${cert.title} - Certificate awarded to Hong Zhe Tan`}
                      className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                   />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
