import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const achievements = [
  {
    title: "SPARK 2024 Start-Up Competition Winner",
    category: "Entrepreneurship & SCM",
    description: "Secured 1st place in the International Council of Malaysian Scholars flagship competition. Pitched an impactful startup idea focusing on a Supply Chain Management inventory system with demand forecasting, heat map visualization, and customized GPT solutions.",
    images: ["/images/spark-1.jpg", "/images/spark-2.jpg"]
  },
  {
    title: "Duck Vader - Best 1st Year Group Project",
    category: "Imperial College London",
    description: "Won the 1st Place prize out of the entire cohort for our robotics project 'Duck Vader'. Delivered a high-performance, well-engineered solution demonstrating strong technical capability and teamwork.",
    images: ["/images/duck-vader.jpg"]
  }
];

export default function Achievements() {
  return (
    <section id="projects" className="py-24 section-dark relative px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <Trophy className="w-12 h-12 text-primary mb-4" />
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">Awards & Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {achievements.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-6 md:p-10 border border-primary/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
              
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-1/2 flex flex-col justify-center">
                  <span className="text-primary font-medium tracking-wider uppercase mb-3 block">{item.category}</span>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">{item.title}</h3>
                  <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>
                
                <div className="lg:w-1/2 grid gap-4">
                  {item.images.map((img, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-border/50 bg-black max-h-[300px] relative">
                      <img 
                        src={img} 
                        alt={item.title}
                        className="w-full h-full object-cover object-top transition-transform hover:scale-105 duration-700"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
