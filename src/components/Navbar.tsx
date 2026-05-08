import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Magnetic from "@/components/fx/Magnetic";

const navItems = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
] as const;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    // Throttle scroll handler with requestAnimationFrame so it runs at most
    // once per frame, not per scroll event.
    const onScroll = () => {
      lastScroll.current = window.scrollY;
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(() => {
          setScrolled(lastScroll.current > 50);
          tickingRef.current = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    const sectionIds = [
      "home",
      "about",
      "skills",
      "projects",
      "experience",
      "contact",
    ];
    const observed = new Set<string>();

    const tryObserveAll = () => {
      for (const id of sectionIds) {
        if (observed.has(id)) continue;
        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
          observed.add(id);
        }
      }
      return observed.size === sectionIds.length;
    };

    // Sections below the hero are lazy-loaded (React.lazy + Suspense), so they
    // don't exist in the DOM when the navbar mounts. Watch the document and
    // re-attempt observation each time new nodes appear, until every section
    // is wired up.
    let mutationObserver: MutationObserver | null = null;
    if (!tryObserveAll() && typeof MutationObserver !== "undefined") {
      mutationObserver = new MutationObserver(() => {
        if (tryObserveAll()) {
          mutationObserver?.disconnect();
          mutationObserver = null;
        }
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      mutationObserver?.disconnect();
    };
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[backdrop-filter,background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-border/60 shadow-[0_8px_32px_-12px_hsl(var(--primary)/0.25)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Magnetic strength={6} ease={0.2}>
            <a
              href="#home"
              className="flex items-center gap-2 font-mono text-sm font-bold text-white group"
              aria-label="Home"
            >
              <span
                className="relative w-9 h-9 rounded-lg bg-[#4589ff]/10 border border-[#4589ff]/30 flex items-center justify-center text-[#4589ff] text-xs overflow-hidden"
                style={{ willChange: "transform" }}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  {">_"}
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--highlight-purple) / 0.6), hsl(var(--primary) / 0.6))",
                  }}
                />
              </span>
              <span className="tracking-tight transition-colors duration-300 group-hover:text-[#4589ff]">
                shubham_chaudhary.dev
              </span>
            </a>
          </Magnetic>

          <div className="hidden md:flex items-center gap-1 lg:gap-2 relative">
            {navItems.map((item) => {
              const itemId = item.toLowerCase();
              const isActive = activeSection === itemId;
              return (
                <a
                  key={item}
                  href={`#${itemId}`}
                  className={`relative text-sm font-semibold transition-colors duration-200 px-4 py-2 rounded-lg ${
                    isActive
                      ? "text-[#4589ff]"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden
                      className="absolute inset-0 rounded-lg bg-[#0a192f] shadow-[inset_0_0_20px_rgba(69,137,255,0.07),0_4px_18px_-8px_hsl(var(--primary)/0.6)] border border-[#4589ff]/20"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </a>
              );
            })}
          </div>

          <Magnetic strength={10} className="hidden md:inline-block">
            <a
              href="#contact"
              className="relative inline-flex px-5 py-2 rounded-lg border border-[#1e293b] text-white text-sm font-bold bg-black/50 backdrop-blur-sm overflow-hidden group"
            >
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--highlight-purple) / 0.18), hsl(var(--primary) / 0.18))",
                }}
              />
              <span
                aria-hidden
                className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out"
              />
              <span className="relative">Let's Talk</span>
            </a>
          </Magnetic>

          <button
            type="button"
            className="md:hidden w-10 h-10 rounded-lg border border-border bg-black/40 flex items-center justify-center text-muted-foreground hover:text-white"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex"
                >
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="m"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex"
                >
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="md:hidden fixed inset-0 z-40 pt-20 bg-background/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
              {navItems.map((item, i) => {
                const itemId = item.toLowerCase();
                const isActive = activeSection === itemId;
                return (
                  <motion.a
                    key={item}
                    href={`#${itemId}`}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + i * 0.04,
                      duration: 0.25,
                    }}
                    className={`px-5 py-4 rounded-xl border text-base font-semibold tracking-tight ${
                      isActive
                        ? "text-[#4589ff] bg-[#0a192f] border-[#4589ff]/20"
                        : "text-foreground bg-card/40 border-border"
                    }`}
                  >
                    {item}
                  </motion.a>
                );
              })}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.25 }}
                className="mt-4 px-5 py-4 rounded-xl text-center text-white font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--highlight-purple)), hsl(var(--primary)))",
                  boxShadow: "0 8px 24px hsl(var(--primary) / 0.45)",
                }}
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
