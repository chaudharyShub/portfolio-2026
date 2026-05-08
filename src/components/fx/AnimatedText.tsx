import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  text: string;
  className?: string;
  /** Per-word stagger in seconds. */
  stagger?: number;
  /** Animation start delay. */
  delay?: number;
  /** Duration of each word's reveal. */
  duration?: number;
  /** If true, uses `whileInView` instead of `animate`. */
  inView?: boolean;
  /** Once-only viewport trigger. */
  once?: boolean;
};

/**
 * Splits text into words and reveals them in sequence with a soft slide.
 * Whitespace is preserved. Words don't break mid-line on wrap.
 *
 * Performance:
 *   - Single parent variant + child variant — Framer Motion batches the
 *     stagger as one animation pipeline, not N React state updates.
 *   - Returns a static span when reduced-motion is requested.
 */
const AnimatedText = memo(function AnimatedText({
  text,
  className,
  stagger = 0.045,
  delay = 0,
  duration = 0.5,
  inView = true,
  once = true,
}: Props) {
  const reduced = useReducedMotion();
  const words = useMemo(() => text.split(/(\s+)/), [text]);

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const item = {
    hidden: { opacity: 0, y: "0.6em", filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, ease: [0.22, 0.61, 0.36, 1] as const },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      {...(inView
        ? { whileInView: "visible", viewport: { once, margin: "-10% 0px" } }
        : { animate: "visible" })}
      style={{ display: "inline-block" }}
    >
      {words.map((w, i) =>
        /\s/.test(w) ? (
          <span key={i}>{w}</span>
        ) : (
          <motion.span
            key={i}
            variants={item}
            style={{ display: "inline-block", willChange: "transform, opacity" }}
          >
            {w}
          </motion.span>
        ),
      )}
    </motion.span>
  );
});

export default AnimatedText;
