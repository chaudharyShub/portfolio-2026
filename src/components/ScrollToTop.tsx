import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER_PX = 400;
const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;

      setVisible(scrollTop > SHOW_AFTER_PX);
      setProgress(ratio);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          type="button"
          onClick={handleClick}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full flex items-center justify-center group"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--highlight-purple) / 0.32), hsl(var(--primary) / 0.32))",
            border: "1px solid hsl(var(--primary) / 0.4)",
            backdropFilter: "blur(14px) saturate(160%)",
            WebkitBackdropFilter: "blur(14px) saturate(160%)",
            boxShadow:
              "inset 0 1px 0 hsl(0 0% 100% / 0.15), 0 8px 24px hsl(var(--primary) / 0.35)",
          }}
        >
          {/* Progress ring */}
          <svg
            aria-hidden
            className="absolute inset-0 -rotate-90 pointer-events-none"
            viewBox="0 0 50 50"
            width="100%"
            height="100%"
          >
            <circle
              cx="25"
              cy="25"
              r={RADIUS}
              fill="none"
              stroke="hsl(0 0% 100% / 0.15)"
              strokeWidth="2"
            />
            <circle
              cx="25"
              cy="25"
              r={RADIUS}
              fill="none"
              stroke="hsl(0 0% 100% / 0.95)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              style={{
                transition: "stroke-dashoffset 0.15s linear",
                filter: "drop-shadow(0 0 4px hsl(0 0% 100% / 0.6))",
              }}
            />
          </svg>

          {/* Soft outer glow on hover */}
          <span
            aria-hidden
            className="absolute -inset-1 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none -z-10"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--highlight-purple)), hsl(var(--primary)))",
            }}
          />

          <ArrowUp
            size={18}
            className="text-white relative z-10 group-hover:-translate-y-0.5 transition-transform duration-200"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
