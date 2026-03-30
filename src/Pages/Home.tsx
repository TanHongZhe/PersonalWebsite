import NavBar from '../Components/NavBar.tsx';
import HeroSection from '../Components/HeroSection.tsx';
import Experience from '../Components/Experience.tsx';
import Achievements from '../Components/Achievements.tsx';
import EducationAndSkills from '../Components/EducationAndSkills.tsx';
import Contact from '../Components/Contact.tsx';

export default function Home() {
  return (
    <div className="bg-background min-h-screen selection:bg-primary/30 text-foreground" style={{ overflowClipMargin: 0, overflowX: 'clip' }}>
      <NavBar />
      <HeroSection />
      <Experience />
      <Achievements />
      <EducationAndSkills />
      <Contact />
      
      <footer className="py-8 section-dark text-center border-t border-border mb-0 mt-0">
        <p className="text-muted-foreground font-body text-sm text-balance">
          © {new Date().getFullYear()} Tan Hong Zhe. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
