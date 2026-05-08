import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Page-wide scroll progress bar fixed to the top of the viewport.
 * - Uses Framer Motion's MotionValue pipeline (no React re-renders).
 * - `useSpring` smooths the bar without dropping frames.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] z-[80] origin-left pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, hsl(var(--highlight-purple)), hsl(var(--primary)), hsl(var(--highlight-pink)), hsl(var(--highlight-cyan)))",
        boxShadow: "0 0 10px hsl(var(--primary) / 0.55)",
        willChange: "transform",
      }}
    />
  );
};

export default ScrollProgress;
