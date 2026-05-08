import { motion } from "framer-motion";
import {
  Briefcase,
  Wrench,
  Code2,
  Calendar,
  Building2,
  Terminal,
  type LucideIcon,
} from "lucide-react";

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

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background ambience */}
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

      {/* Floating dots */}
      {[
        { x: "5%", y: "15%", c: "hsl(var(--primary))", d: 0 },
        { x: "94%", y: "25%", c: "hsl(var(--highlight-purple))", d: 0.7 },
        { x: "6%", y: "85%", c: "hsl(var(--highlight-orange))", d: 1.4 },
        { x: "92%", y: "78%", c: "hsl(var(--highlight-cyan))", d: 2 },
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
            <span className="text-primary">~/experience</span>
            <span className="text-muted-foreground">— chapter 04</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight text-center"
        >
          Work <span className="text-gradient-primary">experience</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-2xl mx-auto text-center mb-14"
        >
          A timeline of the roles, products, and teams I&apos;ve helped ship
          along the way.
        </motion.p>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Gradient timeline rail */}
          <div
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-px pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--highlight-purple) / 0.7), hsl(var(--primary) / 0.5), hsl(var(--highlight-orange) / 0.5), transparent)",
            }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative pl-14 pb-10 last:pb-0"
            >
              {/* Timeline node */}
              <div className="absolute left-0 top-1">
                <div className="relative">
                  {/* Outer halo */}
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-full blur-md"
                    style={{
                      background: exp.accent,
                      opacity: 0.5,
                    }}
                  />
                  <div
                    className="relative w-10 h-10 rounded-full flex items-center justify-center"
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

              {/* Card */}
              <div className="group relative">
                {/* Glow on hover */}
                <div
                  aria-hidden
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${exp.accent}, ${exp.accent2})`,
                  }}
                />

                <div className="relative bg-card border border-border rounded-xl overflow-hidden transition-colors duration-300 group-hover:border-transparent">
                  {/* Hover gradient ring */}
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

                  {/* Log header */}
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

                  {/* Body */}
                  <div className="relative p-5">
                    <h3 className="font-display font-bold text-foreground text-lg leading-tight mb-1.5">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Building2
                        size={13}
                        style={{ color: exp.accent }}
                      />
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

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag, ti) => (
                        <span
                          key={ti}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
