import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Software Engineer",
    company: "ShepHertz Technologies",
    period: "April.2026 — Current",
    desc: "Developing cross-platform desktop applications using Electron.js, collaborating on features, optimizing performance, and gaining experience with modern tools and integrations.",
    tags: [
      "React.js",
      "Electron.js",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind",
      "TypeScript",
      "Git",
      "Cursor AI",
    ],
  },
  {
    role: "Software Engineer",
    company: "Quokka Labs",
    period: "Sept.2022 — March.2026",
    desc: "I work as a Frontend Developer specializing in React.js, Next.js, Electron.js, JavaScript, HTML, and CSS, building responsive, user-friendly interfaces with clean and optimized code. I collaborate closely with teams to translate requirements into functional UI and ensure smooth user experiences. Alongside frontend work, I also have hands-on experience with backend technologies like Node.js, Express, and MongoDB, enabling me to handle APIs, basic server logic, and end-to-end functionality when needed.",
    tags: [
      "React.js",
      "Next.js",
      "Electron.js",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Electron.js",
      "Material UI",
      "Redux",
      "Git",
      "REST APIs",
    ],
  },
  {
    role: "Mechanical Engineer",
    company: "Riviera Home Furnishings",
    period: "June.2020 — June.2022",
    desc: "I led a team of 10-12 technicians in the maintenance department of a bathmat manufacturing plant, overseeing both preventive and breakdown maintenance to ensure uninterrupted production. I developed maintenance schedules, identified root causes of equipment failures, and streamlined repair processes to reduce downtime. I also coordinated closely with production teams, maintained documentation, and ensured adherence to safety and quality standards.",
    tags: [
      "Supervision",
      "Preventive Maintenance",
      "Breakdown Maintenance",
      "Project Management",
      "Leadership",
      "Ownership",
    ],
  },
  // {
  //   role: "Junior Developer",
  //   company: "Startup",
  //   period: "2021 — 2022",
  //   desc: "Built responsive user interfaces and integrated third-party APIs. Collaborated in agile teams to deliver features on tight deadlines.",
  //   tags: ["JavaScript", "React.js", "MUI", "Git"],
  // },
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
                  <h3 className="font-display font-semibold text-foreground">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-primary font-medium mb-2">
                  {exp.company}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {exp.desc}
                </p>
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
