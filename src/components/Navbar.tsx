import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ["home", "about", "skills", "projects", "experience", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50" : ""
        }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-mono text-sm font-bold text-white">
          <span className="w-8 h-8 rounded-lg bg-[#4589ff]/10 border border-[#4589ff]/30 flex items-center justify-center text-[#4589ff] text-xs">
            {">_"}
          </span>
          <span className="tracking-tight">shubham_chaudhary</span>
        </a>

        <div className="hidden md:flex items-center gap-2 lg:gap-8">
          {navItems.map((item) => {
            const itemId = item.toLowerCase();
            const isActive = activeSection === itemId;
            return (
              <a
                key={item}
                href={`#${itemId}`}
                className={`text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-lg ${isActive
                  ? "bg-[#0a192f] text-[#4589ff] shadow-[inset_0_0_20px_rgba(69,137,255,0.05)]"
                  : "text-muted-foreground hover:text-white"
                  }`}
              >
                {item}
              </a>
            );
          })}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex px-6 py-2 rounded-lg bg-[#4589ff] text-white text-sm font-bold hover:bg-[#3273dc] transition-all shadow-[0_0_15px_rgba(69,137,255,0.2)]"
        >
          Let's Talk
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
