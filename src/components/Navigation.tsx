import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavigationProps {
  currentPage?: string;
  currentIndex?: string;
}

const Navigation = ({ currentPage, currentIndex = "01" }: NavigationProps) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState({
    page: currentPage || "Home",
    index: currentIndex,
  });

  useEffect(() => {
    const sectionLabels: Record<string, string> = {
      work: "Experience",
      education: "Education",
      about: "About",
      contact: "Contact",
    };
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section, footer[id]")
    );

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.35;
      let currentSection = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= activationLine) {
          currentSection = section;
        } else {
          break;
        }
      }

      if (!currentSection) return;

      const id = currentSection.id;
      const sectionIndex = sections.indexOf(currentSection) + 1;
      setActiveSection({
        page: sectionLabels[id] || "Home",
        index: String(sectionIndex).padStart(2, "0"),
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-foreground hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-10 h-10 rounded-full bg-foreground/10 border border-foreground/20 flex items-center justify-center">
              <span className="heading-display text-lg">A</span>
            </div>
          </Link>

          {/* Center - Current Section */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div className="nav-number">
              <span>{activeSection.index}</span>
            </div>
            <span className="text-mono text-sm text-foreground/80">
              {activeSection.page}
            </span>
          </div>

          {/* Right - Location & Time */}
          <div className="text-right text-mono text-xs text-foreground/70 leading-relaxed hidden md:block">
            <div>Karachi</div>
            <div>{new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
