import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="Home" />
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
