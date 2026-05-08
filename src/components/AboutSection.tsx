import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import {
  Code2,
  Server,
  MonitorCheck,
  Terminal,
  Sparkles,
  Layers,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import LiveDurationInline, { LiveTotalYears } from "@/components/LiveDuration";
import { useLiveDuration } from "@/hooks/useLiveDuration";

type AccentCard = {
  icon: typeof Code2;
  label: string;
  title: string;
  desc: string;
  accent: string;
  accent2: string;
  skills: string[];
};

const cards: AccentCard[] = [
  {
    icon: Code2,
    label: "frontend.module.ts",
    title: "Frontend Development",
    desc: "Building responsive, accessible UIs with React, Next.js, and modern design systems like Tailwind and MUI.",
    accent: "hsl(var(--highlight-purple))",
    accent2: "hsl(var(--highlight-pink))",
    skills: ["React", "Next.js", "Tailwind", "TypeScript", "JavaScript"],
  },
  {
    icon: Server,
    label: "backend.module.ts",
    title: "Backend Development",
    desc: "Designing RESTful APIs with Node.js and Express, integrating with SQL and NoSQL databases.",
    accent: "hsl(var(--highlight-cyan))",
    accent2: "hsl(var(--primary))",
    skills: ["Node.js", "Express", "MongoDB", "REST", "JWT"],
  },
  {
    icon: MonitorCheck,
    label: "desktop.module.ts",
    title: "Desktop Applications",
    desc: "Cross-platform desktop apps with Electron.js — web technologies meet native OS power.",
    accent: "hsl(var(--highlight-orange))",
    accent2: "hsl(var(--highlight-yellow))",
    skills: ["Electron", "React", "IPC", "Node APIs", "Auto-update"],
  },
];

type Stat = {
  icon: typeof Code2;
  value: number;
  suffix: string;
  label: string;
  /**
   * If true, `value` is computed live from the SE-experience counter
   * (full years elapsed since 26 Sept 2022) and re-evaluates every render.
   * Used so the "Years Experience" stat auto-rolls 3 → 4 → 5 … without
   * manual edits.
   */
  live?: boolean;
};

const stats: Stat[] = [
  { icon: Zap, value: 0, suffix: "+", label: "Years Experience", live: true },
  { icon: Layers, value: 4, suffix: "+", label: "Projects Delivered" },
  { icon: Sparkles, value: 5, suffix: "+", label: "Happy Clients" },
  { icon: Code2, value: 10, suffix: "K+", label: "Lines of Code" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

/**
 * Wraps `Counter` so the target value reflects the live SE-experience years
 * (full years elapsed since 26 Sept 2022). The Counter only re-animates if
 * `to` actually changes, so this stays visually identical to the static
 * Counter except it auto-bumps once per year.
 */
const LiveYearsCounter = ({
  priorYears = 0,
  suffix,
}: {
  priorYears?: number;
  suffix: string;
}) => {
  const d = useLiveDuration();
  return <Counter to={priorYears + d.years} suffix={suffix} />;
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background ambience: blurred color blooms */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 45% at 18% 25%, hsl(var(--highlight-purple) / 0.14), transparent 70%), radial-gradient(45% 45% at 82% 75%, hsl(var(--primary) / 0.14), transparent 70%)",
        }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      {/* A few floating glowing dots for continuity with hero */}
      {[
        { x: "10%", y: "20%", c: "hsl(var(--highlight-purple))", d: 0 },
        { x: "92%", y: "30%", c: "hsl(var(--primary))", d: 0.6 },
        { x: "8%", y: "70%", c: "hsl(var(--highlight-cyan))", d: 1.2 },
        { x: "94%", y: "82%", c: "hsl(var(--highlight-pink))", d: 1.8 },
        { x: "50%", y: "8%", c: "hsl(var(--highlight-green))", d: 2.2 },
      ].map((p, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: 5,
            height: 5,
            background: p.c,
            boxShadow: `0 0 10px ${p.c}, 0 0 20px ${p.c}`,
          }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.4, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, delay: p.d }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        {/* Section badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm font-mono text-xs">
            <Terminal size={12} className="text-primary" />
            <span className="text-primary">~/about</span>
            <span className="text-muted-foreground">— chapter 01</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-10 tracking-tight text-center"
        >
          Passionate about building{" "}
          <span className="text-gradient-primary">great software</span>
        </motion.h2>

        {/* Narrative as a JSDoc-style comment block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="max-w-3xl mx-auto mb-20 relative"
        >
          <div
            aria-hidden
            className="absolute -inset-4 rounded-2xl blur-2xl opacity-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--highlight-purple) / 0.25), hsl(var(--primary) / 0.25))",
            }}
          />
          <div className="relative bg-card/60 border border-border rounded-2xl p-6 md:p-7 backdrop-blur-sm">
            <div className="font-mono text-xs text-muted-foreground/80 mb-3 select-none">
              <span className="text-highlight-purple">/**</span>
            </div>
            <div className="flex gap-4">
              <div
                aria-hidden
                className="w-px self-stretch flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(var(--highlight-purple) / 0.6), hsl(var(--primary) / 0.6), transparent)",
                }}
              />
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                With{" "}
                <span className="text-foreground font-semibold">
                  <LiveTotalYears priorYears={2} />
                </span>{" "}
                of total experience -{" "}
                <span className="text-foreground">
                  2 years as a Mechanical Engineer
                </span>{" "}
                &amp;{" "}
                <span className="text-foreground">
                  <LiveDurationInline showLive={false} /> as a Software Engineer
                </span>{" "}
                - I&apos;ve navigated a unique career path that fuses
                engineering precision with creative web development. I&apos;m a
                full-stack engineer with hands-on experience building{" "}
                <span className="text-highlight-purple font-medium">
                  scalable web applications
                </span>
                . I specialize in the{" "}
                <span className="text-primary font-medium">MERN stack</span>{" "}
                (frontend-heavy) and love crafting products that genuinely make
                a difference.
              </p>
            </div>
            <div className="font-mono text-xs text-muted-foreground/80 mt-3 select-none">
              <span className="text-highlight-purple">*/</span>
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="group relative"
            >
              {/* Outer glow on hover */}
              <div
                aria-hidden
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${card.accent}, ${card.accent2})`,
                }}
              />

              <div className="relative bg-card border border-border rounded-xl p-6 h-full overflow-hidden transition-colors duration-300 group-hover:border-transparent">
                {/* Gradient border ring on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    padding: "1px",
                    background: `linear-gradient(135deg, ${card.accent}, ${card.accent2})`,
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Soft accent corner glow */}
                <div
                  aria-hidden
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-30 group-hover:opacity-60 blur-3xl transition-opacity duration-500 pointer-events-none"
                  style={{ background: card.accent }}
                />

                {/* File label header */}
                <div className="relative flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: card.accent,
                        boxShadow: `0 0 8px ${card.accent}`,
                      }}
                    />
                    <span className="text-muted-foreground">{card.label}</span>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-muted-foreground/40 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  />
                </div>

                {/* Icon block */}
                <div
                  className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${card.accent}22, ${card.accent2}11)`,
                    border: `1px solid ${card.accent}33`,
                  }}
                >
                  <card.icon size={22} style={{ color: card.accent }} />
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-xl blur-md opacity-40 -z-10"
                    style={{ background: card.accent }}
                  />
                </div>

                <h3 className="relative font-display font-bold text-foreground text-lg mb-2">
                  {card.title}
                </h3>

                <p className="relative text-sm text-muted-foreground leading-relaxed mb-5">
                  {card.desc}
                </p>

                {/* Skill chips */}
                <div className="relative flex flex-wrap gap-1.5">
                  {card.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors"
                      style={{
                        borderColor: `${card.accent}40`,
                        color: card.accent,
                        background: `${card.accent}0d`,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats panel — styled like a code-window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto"
        >
          <div
            aria-hidden
            className="absolute -inset-2 rounded-2xl opacity-50 blur-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--highlight-purple) / 0.35), hsl(var(--primary) / 0.35), hsl(var(--highlight-pink) / 0.25))",
            }}
          />
          <div className="relative bg-card/80 border border-border rounded-2xl backdrop-blur-sm overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border bg-gradient-to-b from-white/[0.04] to-transparent">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-highlight-red/70 shadow-[0_0_6px_hsl(var(--highlight-red)/0.6)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-highlight-yellow/70 shadow-[0_0_6px_hsl(var(--highlight-yellow)/0.6)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-highlight-green/70 shadow-[0_0_6px_hsl(var(--highlight-green)/0.6)]" />
                <span className="ml-2 text-highlight-green">$</span>
                <span className="text-muted-foreground">stats.json</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-highlight-green animate-pulse" />
                live
              </div>
            </div>

            {/* Grid of stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border/60"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="text-center px-6 py-8 group relative"
                >
                  <stat.icon
                    size={18}
                    className="mx-auto mb-3 text-muted-foreground/60 group-hover:text-primary transition-colors"
                  />
                  <div className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-1.5 leading-none">
                    {stat.live ? (
                      <LiveYearsCounter
                        priorYears={stat.value}
                        suffix={stat.suffix}
                      />
                    ) : (
                      <Counter to={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
