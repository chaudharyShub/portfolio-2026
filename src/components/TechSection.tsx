import { memo } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiMui,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiDocker,
  SiAmazon,
  SiElectron,
} from "react-icons/si";
import { IoInfinite } from "react-icons/io5";
import { IconType } from "react-icons";
import { Layers, Server, Wrench, Cloud, type LucideIcon } from "lucide-react";
import TiltCard from "@/components/fx/TiltCard";
import Marquee from "@/components/fx/Marquee";
import SectionHeader from "@/components/fx/SectionHeader";
import { useSpotlight } from "@/hooks/useSpotlight";

interface Skill {
  name: string;
  level: number;
  color: string;
  icon: IconType;
}

interface Category {
  title: string;
  label: string;
  icon: LucideIcon;
  accent: string;
  accent2: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    title: "Frontend",
    label: "frontend.toolbox",
    icon: Layers,
    accent: "hsl(var(--highlight-purple))",
    accent2: "hsl(var(--highlight-pink))",
    skills: [
      { name: "React.js", level: 95, color: "#61DAFB", icon: SiReact },
      { name: "Next.js", level: 88, color: "#FFFFFF", icon: SiNextdotjs },
      { name: "TypeScript", level: 90, color: "#3178C6", icon: SiTypescript },
      { name: "JavaScript", level: 95, color: "#F7DF1E", icon: SiJavascript },
      { name: "Tailwind CSS", level: 92, color: "#06B6D4", icon: SiTailwindcss },
      { name: "MUI", level: 85, color: "#007FFF", icon: SiMui },
      { name: "HTML5", level: 95, color: "#E34F26", icon: SiHtml5 },
      { name: "CSS3", level: 92, color: "#1572B6", icon: SiCss3 },
      { name: "Electron.js", level: 90, color: "#B07BFF", icon: SiElectron },
    ],
  },
  {
    title: "Backend",
    label: "backend.toolbox",
    icon: Server,
    accent: "hsl(var(--highlight-cyan))",
    accent2: "hsl(var(--primary))",
    skills: [
      { name: "Node.js", level: 90, color: "#339933", icon: SiNodedotjs },
      { name: "Express.js", level: 70, color: "#FFFFFF", icon: SiExpress },
      { name: "MongoDB", level: 70, color: "#47A248", icon: SiMongodb },
    ],
  },
  {
    title: "Tools & DevOps",
    label: "devops.toolbox",
    icon: Wrench,
    accent: "hsl(var(--highlight-orange))",
    accent2: "hsl(var(--highlight-yellow))",
    skills: [
      { name: "Git", level: 90, color: "#F05032", icon: SiGit },
      { name: "Docker", level: 70, color: "#2496ED", icon: SiDocker },
    ],
  },
  {
    title: "Cloud (Foundational)",
    label: "cloud.toolbox",
    icon: Cloud,
    accent: "hsl(var(--highlight-green))",
    accent2: "hsl(var(--highlight-cyan))",
    skills: [
      { name: "AWS EC2", level: 48, color: "#FF9900", icon: SiAmazon },
      { name: "AWS S3", level: 51, color: "#FF9900", icon: SiAmazon },
      { name: "AWS Lambda", level: 50, color: "#FF9900", icon: SiAmazon },
      { name: "CI/CD", level: 49, color: "#646CFF", icon: IoInfinite },
    ],
  },
];

const SkillBar = memo(function SkillBar({
  skill,
  delay,
  accent,
}: {
  skill: Skill;
  delay: number;
  accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ delay, duration: 0.4 }}
      className="mb-4 last:mb-0 group/skill"
    >
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2">
          <skill.icon
            className="text-base transition-transform duration-300 group-hover/skill:scale-125 group-hover/skill:rotate-6"
            style={{ color: skill.color }}
          />
          <span className="text-[13px] text-foreground font-semibold tracking-tight">
            {skill.name}
          </span>
        </div>
        <span
          className="text-[11px] font-mono font-bold tabular-nums"
          style={{ color: accent }}
        >
          {skill.level}%
        </span>
      </div>
      <div className="h-[5px] rounded-full bg-muted/50 overflow-hidden border border-border/40 relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ delay: delay + 0.2, duration: 0.9, ease: "easeOut" }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${skill.color}, ${accent})`,
            boxShadow: `0 0 6px ${skill.color}80`,
            willChange: "width",
          }}
        >
          <motion.span
            className="absolute inset-y-0 w-1/3 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.35), transparent)",
              willChange: "transform",
            }}
            animate={{ x: ["-100%", "300%"] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay + 0.4,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
});

const CategoryCard = memo(function CategoryCard({
  cat,
  index,
}: {
  cat: Category;
  index: number;
}) {
  const spotRef = useSpotlight<HTMLDivElement>();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <TiltCard max={5} ease={0.2} lift={4} className="group relative h-full">
        <div
          aria-hidden
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${cat.accent}, ${cat.accent2})`,
          }}
        />

        <div
          ref={spotRef}
          className="relative bg-card border border-border rounded-xl overflow-hidden h-full transition-colors duration-300 group-hover:border-transparent"
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
              background: `radial-gradient(280px circle at var(--mx) var(--my), ${cat.accent}26, transparent 65%)`,
            }}
          />

          <div
            aria-hidden
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              padding: "1px",
              background: `linear-gradient(135deg, ${cat.accent}, ${cat.accent2})`,
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          <div className="relative flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-b from-white/[0.04] to-transparent">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: cat.accent,
                  boxShadow: `0 0 8px ${cat.accent}`,
                }}
              />
              <span className="text-foreground">{cat.label}</span>
            </div>
            <span
              className="text-[10px] font-mono uppercase tracking-wider"
              style={{ color: cat.accent }}
            >
              {cat.skills.length} pkgs
            </span>
          </div>

          <div className="relative flex items-center gap-2.5 px-5 pt-5 pb-4">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
              style={{
                background: `linear-gradient(135deg, ${cat.accent}22, ${cat.accent2}11)`,
                border: `1px solid ${cat.accent}33`,
              }}
            >
              <cat.icon size={16} style={{ color: cat.accent }} />
            </div>
            <h3 className="font-display font-bold text-foreground">
              {cat.title}
            </h3>
          </div>

          <div className="relative px-5 pb-5">
            {cat.skills.map((skill, si) => (
              <SkillBar
                key={si}
                skill={skill}
                delay={index * 0.08 + si * 0.04}
                accent={cat.accent}
              />
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
});

const TechSection = () => {
  // Flatten all unique skills into a single array for the marquee.
  const allSkills = categories.flatMap((c) => c.skills);
  const seen = new Set<string>();
  const marqueeSkills = allSkills.filter((s) => {
    if (seen.has(s.name)) return false;
    seen.add(s.name);
    return true;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background ambience */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 45% at 80% 25%, hsl(var(--highlight-cyan) / 0.12), transparent 70%), radial-gradient(45% 45% at 20% 75%, hsl(var(--highlight-purple) / 0.12), transparent 70%)",
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
          badge="~/skills"
          chapter="chapter 02"
          title={
            <>
              Technologies I{" "}
              <span className="text-gradient-primary">work with</span>
            </>
          }
          titleClassName="text-4xl md:text-5xl"
          subtitle="A comprehensive toolkit covering frontend, backend, and DevOps technologies — installed and ready to ship."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {categories.map((cat, ci) => (
            <CategoryCard key={ci} cat={cat} index={ci} />
          ))}
        </div>

        {/* Infinite scrolling tech marquee */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.5 }}
          className="relative max-w-6xl mx-auto rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute -inset-2 rounded-2xl blur-2xl opacity-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--highlight-purple) / 0.25), hsl(var(--primary) / 0.25))",
            }}
          />
          <div className="relative flex items-center justify-between px-5 py-3 border-b border-border bg-gradient-to-b from-white/[0.04] to-transparent">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-highlight-green">$</span>
              <span className="text-foreground">npx tech --list --all</span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              {marqueeSkills.length} packages
            </span>
          </div>

          <div className="relative py-5">
            <Marquee speed={32}>
              {marqueeSkills.map((s, i) => (
                <div
                  key={`${s.name}-${i}`}
                  className="group/chip relative flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-black/30 backdrop-blur-sm hover:border-foreground/30 transition-colors duration-300 cursor-default"
                >
                  <s.icon
                    className="text-base transition-transform duration-300 group-hover/chip:scale-125 group-hover/chip:rotate-12"
                    style={{ color: s.color }}
                  />
                  <span className="text-xs font-mono font-semibold text-foreground/90 whitespace-nowrap">
                    {s.name}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechSection;
