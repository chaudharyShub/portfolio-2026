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
  SiVite,
  SiElectron,
} from "react-icons/si";
import { IoInfinite } from "react-icons/io5";
import { IconType } from "react-icons";

interface Skill {
  name: string;
  level: number;
  color: string;
  icon: IconType;
}

const categories: { title: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 95, color: "#61DAFB", icon: SiReact },
      { name: "Next.js", level: 88, color: "#FFFFFF", icon: SiNextdotjs },
      { name: "TypeScript", level: 90, color: "#3178C6", icon: SiTypescript },
      { name: "JavaScript", level: 95, color: "#F7DF1E", icon: SiJavascript },
      { name: "Tailwind CSS", level: 92, color: "#06B6D4", icon: SiTailwindcss },
      { name: "MUI", level: 85, color: "#007FFF", icon: SiMui },
      { name: "HTML5", level: 95, color: "#E34F26", icon: SiHtml5 },
      { name: "CSS3", level: 92, color: "#1572B6", icon: SiCss3 },
      { name: "Electron.js", level: 82, color: "#764ABC", icon: SiElectron },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 92, color: "#339933", icon: SiNodedotjs },
      { name: "Express.js", level: 90, color: "#FFFFFF", icon: SiExpress },
      { name: "MongoDB", level: 88, color: "#47A248", icon: SiMongodb },
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Git", level: 90, color: "#F05032", icon: SiGit },
      { name: "Docker", level: 75, color: "#2496ED", icon: SiDocker },
    ],
  },
  {
    title: "Cloud (Foundational)",
    skills: [
      { name: "AWS EC2", level: 48, color: "#FF9900", icon: SiAmazon },
      { name: "AWS S3", level: 51, color: "#FF9900", icon: SiAmazon },
      { name: "AWS Lambda", level: 50, color: "#FF9900", icon: SiAmazon },
      { name: "CI/CD", level: 49, color: "#646CFF", icon: IoInfinite },
    ],
  },
];

const SkillBar = ({ skill, delay }: { skill: Skill; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
    className="mb-5"
  >
    <div className="flex justify-between mb-2">
      <div className="flex items-center gap-2">
        <skill.icon className="text-lg" style={{ color: skill.color }} />
        <span className="text-sm text-foreground font-bold tracking-tight">{skill.name}</span>
      </div>
      <span className="text-xs text-[#4589ff] font-mono font-bold">{skill.level}%</span>
    </div>
    <div className="h-2 rounded-full bg-muted overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: skill.color }}
      />
    </div>
  </motion.div>
);

const TechSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4 inline-block">Tech Stack</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Technologies I{" "}
            <span className="text-gradient-primary">work with</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit covering frontend, backend, and DevOps technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1, duration: 0.5 }}
              className="card-glass p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h3 className="font-display font-semibold text-foreground">{cat.title}</h3>
              </div>
              {cat.skills.map((skill, si) => (
                <SkillBar key={si} skill={skill} delay={ci * 0.1 + si * 0.05} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSection;
