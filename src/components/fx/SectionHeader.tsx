import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { type ReactNode } from "react";

type Props = {
  /** Path-style badge label (e.g. `~/about`). */
  badge: string;
  /** Sub-label (e.g. `chapter 01`). */
  chapter?: string;
  /** Heading content. Use `<span className="text-gradient-primary">…</span>`. */
  title: ReactNode;
  /** Optional subtitle paragraph. */
  subtitle?: string;
  /** Extra classes for the heading. */
  titleClassName?: string;
};

/**
 * Reusable, animated section header (terminal-styled badge + animated title).
 * The fade/blur reveal is one motion node — kept light to avoid jank.
 */
const SectionHeader = ({
  badge,
  chapter,
  title,
  subtitle,
  titleClassName = "text-4xl md:text-5xl lg:text-6xl",
}: Props) => {
  return (
    <div className="flex flex-col items-center mb-14">
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.45 }}
        className="relative mb-6"
      >
        <span
          aria-hidden
          className="absolute -inset-2 rounded-full blur-xl opacity-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--highlight-purple) / 0.6), hsl(var(--primary) / 0.6))",
          }}
        />
        <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm font-mono text-xs">
          <Terminal size={12} className="text-primary" />
          <span className="text-primary">{badge}</span>
          {chapter && (
            <span className="text-muted-foreground">— {chapter}</span>
          )}
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        className={`font-display font-bold tracking-tight text-center mb-4 ${titleClassName}`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="text-muted-foreground max-w-2xl mx-auto text-center"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
