import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "SportZentric",
    desc: "Developed a sports-tech platform enabling coaches to create and manage training batches, allowing athletes to seamlessly join and enhance their skills through structured sessions and events.",
    tags: [
      "React.js",
      "Tailwind CSS",
      "React hook form",
      "Styled Components",
      "RTK Query",
    ],
    color: "hsl(var(--highlight-blue))",
  },
  {
    title: "RunTheDay (RTD)",
    desc: "Built a US-based online race/marathon registration and result publishing platform with real-time user interactions, supporting diverse roles including Race Directors, Race Runners, and Volunteers.",
    tags: [
      "Next.js",
      "Typescript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Redux",
      "Material UI",
    ],
    color: "hsl(var(--highlight-green))",
  },
  {
    title: "Desktop Application",
    desc: "Built a cross-platform (Windows & Linux) desktop application with a background service to monitor and log system activity, capturing power on/off events and sleep/wake cycles with high accuracy.",
    tags: ["Electron.js", "React.js", "TypeScript", "Node.js", "MQTT", "Redux"],
    color: "hsl(var(--highlight-pink))",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4 inline-block">Projects</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="text-gradient-primary">projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my skills and experience
            across different domains and technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-glass p-6 group hover:glow-border transition-all duration-300"
            >
              <div
                className="w-full h-40 rounded-lg mb-5 opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${project.color}, ${project.color}44)`,
                }}
              />
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="text-xs font-mono px-2.5 py-1 rounded-full border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={18} />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
