import { motion } from "framer-motion";
import { Code2, Server, Database, Layers } from "lucide-react";

const cards = [
  {
    icon: Code2,
    title: "Frontend Development",
    desc: "Building responsive, accessible UIs with React.js, Next.js, and modern CSS frameworks like Tailwind and MUI.",
  },
  {
    icon: Server,
    title: "Backend Development",
    // desc: "Designing RESTful APIs and microservices with Node.js, Express.js, and integrating with various databases.",
    desc: "Designing RESTful APIs with Node.js, Express.js, and integrating with various databases.",
  },
  // {
  //   icon: Database,
  //   title: "Database Design",
  //   desc: "Proficient in MongoDB schema design, data modeling, and query optimization for scalable applications.",
  // },
  {
    icon: Layers,
    title: "Clean Architecture",
    desc: "Following SOLID principles, design patterns, and writing maintainable, well-tested code.",
  },
];

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "3+", label: "Projects Delivered" },
  { value: "5+", label: "Happy Clients" },
  { value: "10K+", label: "Lines of Code" },
];

const codeBlock = `const developer = {
  name: "Software Engineer",
  experience: "3+ years",
  passion: "Building scalable web apps",
  front_end: ["React.js", "Next.js", "Electron.js", "Tailwind CSS"],
  back_end: ["Node.js", "Express.js", "MongoDB"],
  cloud: ["Docker", "EC2", "S3", "Lambda"],
  coffee: "Moderate",
  ginger_tea: "Infinity",
};`;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 tracking-tight">
            Passionate about building{" "}
            <span className="text-gradient-primary">great software</span>
          </h2>
          <p className="text-muted-foreground max-w-6xl mx-auto text-lg">
            With 5+ years of total experience (2 years as a Mechanical Engineer & 3 years as a Software Engineer), I've navigated a unique career path that combines engineering precision with creative web development.
            I'm a full stack software engineer with 3+ years of hands-on experience building scalable web applications.
            I specialize in the MERN stack and love creating products that make a real difference for users.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="card-glass p-6 hover:glow-border transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <card.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={itemVariants} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Code block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="code-window max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-highlight-red/70" />
            <div className="w-3 h-3 rounded-full bg-highlight-yellow/70" />
            <div className="w-3 h-3 rounded-full bg-highlight-green/70" />
            <span className="ml-2 text-xs text-muted-foreground font-mono">about.ts</span>
          </div>
          <pre className="p-5 font-mono text-sm text-muted-foreground overflow-x-auto">
            <code>
              {codeBlock.split("\n").map((line, i) => (
                <div key={i}>
                  {line.includes("const") && (
                    <span>
                      <span className="text-accent">const</span>
                      {line.replace("const", "")}
                    </span>
                  )}
                  {line.includes(":") && !line.includes("const") && !line.includes("[") && !line.includes("};") && (
                    <span>
                      {"  "}
                      <span className="text-highlight-blue">{line.trim().split(":")[0]}</span>
                      {": "}
                      <span className="text-highlight-green">
                        {line.trim().split(":").slice(1).join(":").trim()}
                      </span>
                    </span>
                  )}
                  {line.includes("front_end") && (
                    <span>
                      {"  "}
                      <span className="text-highlight-blue">front_end</span>
                      {": "}
                      <span className="text-highlight-yellow">{line.trim().split(":").slice(1).join(":").trim()}</span>
                    </span>
                  )}
                  {line.includes("back_end") && (
                    <span>
                      {"  "}
                      <span className="text-highlight-blue">back_end</span>
                      {": "}
                      <span className="text-highlight-yellow">{line.trim().split(":").slice(1).join(":").trim()}</span>
                    </span>
                  )}
                  {line.includes("cloud") && (
                    <span>
                      {"  "}
                      <span className="text-highlight-blue">cloud</span>
                      {": "}
                      <span className="text-highlight-yellow">{line.trim().split(":").slice(1).join(":").trim()}</span>
                    </span>
                  )}
                  {/* {line.includes("Infinity") && !line.includes("[") && (
                    <span>
                      {"  "}
                      <span className="text-highlight-blue">coffee</span>
                      {": "}
                      <span className="text-highlight-pink">Infinity</span>,
                    </span>
                  )} */}
                  {line.includes("};") && <span>{line}</span>}
                </div>
              ))}
            </code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
