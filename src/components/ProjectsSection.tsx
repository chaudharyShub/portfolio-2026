import { motion } from "framer-motion";
import { ExternalLink, Github, Terminal, ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  filename: string;
  desc: string;
  tags: string[];
  accent: string;
  accent2: string;
  github?: string;
  live?: string;
};

const projects: Project[] = [
  {
    title: "SportZentric",
    filename: "sport-zentric.tsx",
    desc: "A sports-tech platform that lets coaches create and manage training batches, while athletes seamlessly join sessions and events to sharpen their skills.",
    tags: [
      "React.js",
      "Tailwind CSS",
      "React Hook Form",
      "Styled Components",
      "RTK Query",
    ],
    accent: "hsl(var(--highlight-blue))",
    accent2: "hsl(var(--highlight-cyan))",
  },
  {
    title: "RunTheDay (RTD)",
    filename: "run-the-day.tsx",
    desc: "A US-based race & marathon registration and result-publishing platform with real-time interactions across Race Directors, Runners, and Volunteers.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Redux",
      "Material UI",
    ],
    accent: "hsl(var(--highlight-green))",
    accent2: "hsl(var(--highlight-cyan))",
  },
  {
    title: "Desktop Application",
    filename: "system-monitor.ts",
    desc: "A cross-platform Windows & Linux desktop app with a background service that monitors and logs power on/off events and sleep/wake cycles with high accuracy.",
    tags: [
      "Electron.js",
      "React.js",
      "TypeScript",
      "Node.js",
      "MQTT",
      "Redux",
    ],
    accent: "hsl(var(--highlight-pink))",
    accent2: "hsl(var(--highlight-purple))",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background ambience */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 45% at 25% 30%, hsl(var(--highlight-pink) / 0.12), transparent 70%), radial-gradient(45% 45% at 75% 70%, hsl(var(--primary) / 0.12), transparent 70%)",
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
        { x: "8%", y: "20%", c: "hsl(var(--highlight-pink))", d: 0 },
        { x: "92%", y: "30%", c: "hsl(var(--highlight-blue))", d: 0.7 },
        { x: "12%", y: "85%", c: "hsl(var(--highlight-green))", d: 1.4 },
        { x: "90%", y: "82%", c: "hsl(var(--highlight-purple))", d: 2 },
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
            <span className="text-primary">~/projects</span>
            <span className="text-muted-foreground">— chapter 03</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight text-center"
        >
          Featured <span className="text-gradient-primary">projects</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-2xl mx-auto text-center mb-14"
        >
          A selection of projects that showcase my skills and experience across
          different domains and technologies.
        </motion.p>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              {/* Outer glow on hover */}
              <div
                aria-hidden
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}, ${project.accent2})`,
                }}
              />

              <div className="relative bg-card border border-border rounded-xl overflow-hidden h-full transition-colors duration-300 group-hover:border-transparent flex flex-col">
                {/* Hover gradient ring */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    padding: "1px",
                    background: `linear-gradient(135deg, ${project.accent}, ${project.accent2})`,
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Window chrome */}
                <div className="relative flex items-center justify-between gap-2 px-4 py-3 border-b border-border bg-gradient-to-b from-white/[0.04] to-transparent">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-highlight-red/70 shadow-[0_0_6px_hsl(var(--highlight-red)/0.6)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-highlight-yellow/70 shadow-[0_0_6px_hsl(var(--highlight-yellow)/0.6)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-highlight-green/70 shadow-[0_0_6px_hsl(var(--highlight-green)/0.6)]" />
                    <span className="ml-2 text-[11px] text-foreground">
                      {project.filename}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-md border border-border/60 bg-black/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                      >
                        <Github size={13} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-md border border-border/60 bg-black/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Preview area: gradient + grid pattern + project title */}
                <div
                  className="relative h-44 overflow-hidden border-b border-border"
                  style={{
                    background: `linear-gradient(135deg, ${project.accent}3a, ${project.accent2}1a 60%, transparent)`,
                  }}
                >
                  {/* Grid pattern */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(hsl(var(--foreground) / 0.18) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.18) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                      maskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%)",
                      WebkitMaskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%)",
                    }}
                  />
                  {/* Glow blob */}
                  <div
                    aria-hidden
                    className="absolute -top-8 -right-8 w-44 h-44 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                    style={{ background: project.accent }}
                  />
                  {/* Title overlay */}
                  <div className="absolute inset-0 flex items-end p-5">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="font-display font-black text-2xl text-foreground tracking-tight">
                        {project.title}
                      </h3>
                      <ArrowUpRight
                        size={20}
                        className="text-muted-foreground/50 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  </div>
                  {/* Filename watermark in corner */}
                  <div className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-wider text-foreground/40">
                    /preview
                  </div>
                </div>

                {/* Body */}
                <div className="relative flex-1 flex flex-col p-5">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors"
                        style={{
                          borderColor: `${project.accent}40`,
                          color: project.accent,
                          background: `${project.accent}0d`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
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

export default ProjectsSection;
