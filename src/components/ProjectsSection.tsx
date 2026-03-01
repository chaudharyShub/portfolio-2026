import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    desc: "A full-featured e-commerce platform with product management, cart, checkout, and payment integration built with the MERN stack.",
    tags: ["React.js", "Node.js", "MongoDB", "Express.js", "Stripe"],
    color: "hsl(var(--highlight-blue))",
  },
  {
    title: "Real-Time Chat Application",
    desc: "Scalable real-time messaging app with WebSocket integration, user authentication, and message history.",
    tags: ["Next.js", "Node.js", "Socket.io", "MongoDB"],
    color: "hsl(var(--highlight-green))",
  },
  {
    title: "Project Management Tool",
    desc: "A Kanban-style project management tool with drag-and-drop, team collaboration, and task tracking features.",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Express.js"],
    color: "hsl(var(--highlight-pink))",
  },
  {
    title: "Desktop Analytics Dashboard",
    desc: "Cross-platform desktop application for visualizing business analytics and generating reports.",
    tags: ["Electron.js", "React.js", "MUI", "Docker"],
    color: "hsl(var(--highlight-orange))",
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
            A selection of projects that showcase my skills and experience across different domains and technologies.
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
                style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}44)` }}
              />
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.desc}</p>
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
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github size={18} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
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
