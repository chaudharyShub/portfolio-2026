import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Senior Software Engineer",
    company: "Tech Company",
    period: "2023 — Present",
    desc: "Leading frontend architecture and building scalable web applications with React.js and Next.js. Mentoring junior developers and driving best practices.",
    tags: ["React.js", "Next.js", "TypeScript", "Node.js"],
  },
  {
    role: "Full Stack Developer",
    company: "Digital Agency",
    period: "2022 — 2023",
    desc: "Developed full-stack applications for various clients using the MERN stack. Implemented RESTful APIs and optimized database queries for performance.",
    tags: ["MongoDB", "Express.js", "React.js", "Tailwind CSS"],
  },
  {
    role: "Junior Developer",
    company: "Startup",
    period: "2021 — 2022",
    desc: "Built responsive user interfaces and integrated third-party APIs. Collaborated in agile teams to deliver features on tight deadlines.",
    tags: ["JavaScript", "React.js", "MUI", "Git"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4 inline-block">Experience</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Work <span className="text-gradient-primary">experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey building impactful software solutions.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative pl-10 pb-12 last:pb-0"
            >
              {/* Timeline line */}
              {i < experiences.length - 1 && (
                <div className="absolute left-[15px] top-10 bottom-0 w-px bg-border" />
              )}
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center">
                <Briefcase size={14} className="text-primary" />
              </div>

              <div className="card-glass p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="font-display font-semibold text-foreground">{exp.role}</h3>
                  <span className="text-xs font-mono text-muted-foreground">{exp.period}</span>
                </div>
                <p className="text-sm text-primary font-medium mb-2">{exp.company}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{exp.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="text-xs font-mono px-2.5 py-1 rounded-full border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
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
