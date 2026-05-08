import { memo, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Briefcase,
  Wrench,
  Code2,
  Calendar,
  Building2,
  type LucideIcon,
} from "lucide-react";
import TiltCard from "@/components/fx/TiltCard";
import SectionHeader from "@/components/fx/SectionHeader";
import { useSpotlight } from "@/hooks/useSpotlight";

type Experience = {
  role: string;
  company: string;
  period: string;
  desc: string;
  tags: string[];
  icon: LucideIcon;
  accent: string;
  accent2: string;
  current?: boolean;
};

const experiences: Experience[] = [
  {
    role: "Frontend Developer",
    company: "Koru UX",
    period: "May 2026 — ",
    desc: "Frontend engineer specializing in React, Next.js, and Electron — building responsive, user-friendly interfaces with clean, optimized code. Translated requirements into production UI.",
    tags: [
      "React.js",
      "Next.js",
      "Electron.js",
      "TypeScript",
      "Tailwind",
      "Material UI",
      "Redux",
      "Git",
    ],
    icon: Briefcase,
    accent: "hsl(var(--highlight-pink))",
    accent2: "hsl(var(--highlight-purple))",
    current: true,
  },
  {
    role: "Software Engineer",
    company: "ShepHertz Technologies",
    period: "April 2026 — May 2026",
    desc: "Building cross-platform desktop web browser using Electron.js, collaborating on features, optimizing performance, and shipping with modern tools and integrations.",
    tags: [
      "React.js",
      "Electron.js",
      "JavaScript",
      "TypeScript",
      "Tailwind",
      "Cursor AI",
      "Git",
    ],
    icon: Code2,
    accent: "hsl(var(--highlight-purple))",
    accent2: "hsl(var(--primary))",
  },
  {
    role: "Software Engineer",
    company: "Quokka Labs",
    period: "Sept 2022 — March 2026",
    desc: "Frontend engineer specializing in React, Next.js, and Electron — building responsive, user-friendly interfaces with clean, optimized code. Translated requirements into production UI and contributed to backend (Node, Express, MongoDB) when handling APIs and end-to-end functionality.",
    tags: [
      "React.js",
      "Next.js",
      "Electron.js",
      "TypeScript",
      "Tailwind",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Material UI",
      "Redux",
      "REST APIs",
      "Git",
    ],
    icon: Briefcase,
    accent: "hsl(var(--highlight-cyan))",
    accent2: "hsl(var(--highlight-blue))",
  },
  {
    role: "Mechanical Engineer",
    company: "Riviera Home Furnishings",
    period: "June 2020 — June 2022",
    desc: "Led a team of 10–12 technicians in the maintenance department of a bathmat manufacturing plant. Owned preventive & breakdown maintenance, scheduled repairs, identified root causes of equipment failures, coordinated with production, and upheld safety/quality standards to keep production uninterrupted.",
    tags: [
      "Supervision",
      "Preventive Maintenance",
      "Breakdown Maintenance",
      "Project Management",
      "Leadership",
      "Ownership",
    ],
    icon: Wrench,
    accent: "hsl(var(--highlight-orange))",
    accent2: "hsl(var(--highlight-yellow))",
  },
];

const ExperienceCard = memo(function ExperienceCard({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) {
  const spotRef = useSpotlight<HTMLDivElement>();

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ delay: index * 0.1, duration: 0.55 }}
      className="relative pl-14 pb-10 last:pb-0"
    >
      {/* Timeline node */}
      <div className="absolute left-0 top-1">
        <div className="relative">
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-full blur-md"
            style={{ background: exp.accent }}
            animate={{ opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="relative w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${exp.accent}33, ${exp.accent2}11)`,
              border: `1px solid ${exp.accent}66`,
              boxShadow: `0 0 12px ${exp.accent}55`,
            }}
          >
            <exp.icon size={15} style={{ color: exp.accent }} />
          </div>
          {exp.current && (
            <span
              aria-hidden
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-highlight-green border-2 border-background animate-pulse"
            />
          )}
        </div>
      </div>

      <TiltCard max={4} ease={0.18} lift={3} className="group relative">
        <div
          aria-hidden
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${exp.accent}, ${exp.accent2})`,
          }}
        />

        <div
          ref={spotRef}
          className="relative bg-card border border-border rounded-xl overflow-hidden transition-colors duration-300 group-hover:border-transparent"
          style={
            {
              "--mx": "50%",
              "--my": "-50%",
            } as React.CSSProperties
          }
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(280px circle at var(--mx) var(--my), ${exp.accent}26, transparent 65%)`,
            }}
          />

          <div
            aria-hidden
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              padding: "1px",
              background: `linear-gradient(135deg, ${exp.accent}, ${exp.accent2})`,
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          <div className="relative flex items-center justify-between gap-3 px-5 py-3 border-b border-border bg-gradient-to-b from-white/[0.04] to-transparent">
            <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
              <span className="text-highlight-green">$</span>
              <span className="text-foreground">git log --role</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              <Calendar size={10} />
              <span>{exp.period}</span>
              {exp.current && (
                <span
                  className="ml-1 px-1.5 py-0.5 rounded text-highlight-green border border-highlight-green/30 bg-highlight-green/10"
                  style={{ fontSize: "9px" }}
                >
                  current
                </span>
              )}
            </div>
          </div>

          <div className="relative p-5">
            <h3 className="font-display font-bold text-foreground text-lg leading-tight mb-1.5 transition-transform duration-300 group-hover:translate-x-0.5">
              {exp.role}
            </h3>
            <div className="flex items-center gap-1.5 mb-3">
              <Building2 size={13} style={{ color: exp.accent }} />
              <span
                className="text-sm font-medium"
                style={{ color: exp.accent }}
              >
                {exp.company}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {exp.desc}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {exp.tags.map((tag, ti) => (
                <span
                  key={ti}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full border transition-all duration-300 hover:scale-110"
                  style={{
                    borderColor: `${exp.accent}33`,
                    color: exp.accent,
                    background: `${exp.accent}0a`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
});

const ExperienceSection = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 30%"],
  });
  // Smooth the rail growth so it never appears jittery.
  const railScaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 45% at 18% 22%, hsl(var(--primary) / 0.12), transparent 70%), radial-gradient(45% 45% at 82% 78%, hsl(var(--highlight-purple) / 0.12), transparent 70%)",
        }}
      />
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

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          badge="~/experience"
          chapter="chapter 04"
          title={
            <>
              Work <span className="text-gradient-primary">experience</span>
            </>
          }
          titleClassName="text-4xl md:text-5xl"
          subtitle="A timeline of the roles, products, and teams I've helped ship along the way."
        />

        <div ref={railRef} className="max-w-3xl mx-auto relative">
          {/* Static dim rail */}
          <div
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-px pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--border) / 0.8), hsl(var(--border) / 0.4))",
            }}
          />
          {/* Animated colored rail that grows with scroll progress */}
          <motion.div
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-px pointer-events-none origin-top"
            style={{
              scaleY: railScaleY,
              background:
                "linear-gradient(180deg, hsl(var(--highlight-purple)), hsl(var(--primary)), hsl(var(--highlight-orange)))",
              boxShadow:
                "0 0 12px hsl(var(--primary) / 0.65), 0 0 4px hsl(var(--highlight-purple) / 0.65)",
              willChange: "transform",
            }}
          />

          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
