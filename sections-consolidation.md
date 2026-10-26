To fit your contact details into a single footer row, you can merge the contact information (email, location, and the live Karachi clock) directly into `Footer.tsx` and eliminate the standalone `<ContactSection />`. 

Here is how the code and layout work together to achieve this.

---

1. The Strategy: Condensing Text & Sizing

The current `ContactSection` uses large headers (`Get in touch`, `Location`) and multi-line descriptions (`Karachi, Pakistan 🇵🇰` + `6:29 PM local time`). 

To fit everything cleanly into one horizontal row:
- Reduce font size: Use `text-xs` (12px) or `text-[11px]` with `font-mono`.
- Condense text: Combine the location and clock into a single compact badge: `Karachi 🇵🇰 6:30 PM`.
- Remove duplicate text: Drop "Made in Karachi" from the copyright line since the live clock already displays Karachi.
- Use flexbox distribution: Place Copyright on the left, Contact/Email in the middle, and Location/Clock on the right (with a graceful single-column wrap on very small mobile screens).

---

2. The Updated `src/components/Footer.tsx`

We bring the live Asia/Karachi time hook from `ContactSection` directly into `Footer`:

```tsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const localTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Karachi",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(localTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.footer 
      id="contact"
      className="py-10 px-8 border-t border-foreground/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-mono text-xs text-foreground/60">
        
        {/* 1. Copyright */}
        <p className="text-foreground/40">
          © Adnan Adil 2026
        </p>

        {/* 2. Direct Email Link */}
        <a
          href="mailto:adnan.adil.jah@gmail.com"
          className="flex items-center gap-1 hover:text-foreground transition-colors group"
        >
          <span>adnan.adil.jah@gmail.com</span>
          <ArrowUpRight className="w-3 h-3 text-foreground/30 group-hover:text-foreground/70 transition-colors" />
        </a>

        {/* 3. Location & Live Time */}
        <div className="flex items-center gap-2 text-foreground/50">
          <span>Karachi, PK</span>
          <span>🇵🇰</span>
          <span>·</span>
          <span>{currentTime || "UTC+5"}</span>
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;
```

---

3. Updating `src/pages/Index.tsx`

Because the footer now handles the contact row (and keeps the `id="contact"` anchor so any top navigation links still scroll smoothly to the bottom), you can remove `<ContactSection />`:

```tsx
// src/pages/Index.tsx
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
```

---

Alternative Layout: Inline Dot Separators

If you prefer all three items centered together on one continuous line rather than spaced across the full width, the inner container can simply be:

```tsx
<div className="flex flex-wrap items-center justify-center gap-3 text-mono text-xs text-foreground/50">
  <span>© Adnan Adil 2026</span>
  <span>/</span>
  <a href="mailto:adnan.adil.jah@gmail.com" className="text-foreground/80 hover:text-foreground">
    adnan.adil.jah@gmail.com
  </a>
  <span>/</span>
  <span>Karachi 🇵🇰 {currentTime}</span>
</div>
```

---

Would you prefer the left/center/right spaced layout or the centered inline row with dividers? Whenever you are ready to apply this to the site, let me know and we can switch to Build mode and put it in place.