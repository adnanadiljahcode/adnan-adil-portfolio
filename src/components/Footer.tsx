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
      whileInView={{ opacity: 1.5 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-mono text-xs text-foreground/60">
        
        {/* 1. Copyright */}
        <p className="text-foreground/40">
          © Adnan Adil 2026
        </p>
        | 
        {/* 2. Direct Email Link */}
        <a
          href="mailto:adnan.adil.jah@gmail.com"
          className="flex items-center gap-1 hover:text-foreground transition-colors group"
        >
          <span>adnan.adil.jah@gmail.com</span>
          <ArrowUpRight className="w-3 h-3 text-foreground/30 group-hover:text-foreground/70 transition-colors" />
        </a>
        |
        {/* 3. Location & Live Time */}
        <div className="flex items-center gap-2 text-foreground/50">
          <span>Karachi, PK</span>
          <span>{currentTime || "UTC+5"}</span>
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;