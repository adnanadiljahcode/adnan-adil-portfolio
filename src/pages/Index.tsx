import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

// 1. Define section list with their numbers and display titles
const SECTIONS = [
  { id: "hero", index: "01", label: "Home" },
  { id: "work", index: "02", label: "Experience" },
  { id: "education", index: "03", label: "Education" },
  { id: "about", index: "04", label: "About" },
  { id: "contact", index: "05", label: "Contact" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);

  useEffect(() => {
    // 2. Set up observer options
    // rootMargin offset triggers when a section is in the top-middle third of the screen
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", 
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const match = SECTIONS.find((s) => s.id === entry.target.id);
          if (match) {
            setActiveSection(match);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // 3. Observe each section element
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Clean up observer when unmounting
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* 4. Pass active index and label down to Navigation */}
      <Navigation 
        currentIndex={activeSection.index} 
        currentPage={activeSection.label} 
      />
      <main>
        <HeroSection />
        <ExperienceSection />
        <EducationSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
