import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="max-w-3xl mx-auto px-8 py-24">
      <motion.h3 
        className="section-header mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        About
      </motion.h3>
      <div className="flex flex-col gap-8">
        <motion.p 
          className="body-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          I build websites and web applications that are fast, reliable and easy to use.
        </motion.p>
        
        <motion.p 
          className="body-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My focus is turning ideas into working products — from{" "}
          <span className="text-emphasis">clean interfaces</span> and{" "}
          <span className="text-emphasis">responsive layouts</span> to{" "}
          <span className="text-emphasis">solid, maintainable code</span>.
        </motion.p>
        
        <motion.p 
          className="body-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          I care about the details — performance, accessibility, and experiences that just work on any device.
        </motion.p>
        
        <motion.p 
          className="heading-display text-xl italic text-foreground/80 mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Curious and optimistic.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutSection;
