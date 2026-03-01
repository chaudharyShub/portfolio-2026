import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";

const floatingWords = [
  { text: "SSH", x: "45%", y: "5%", color: "hsl(var(--highlight-cyan))", delay: 0.5 },
  { text: "API", x: "38%", y: "18%", color: "hsl(var(--highlight-pink))", delay: 0 },
  { text: "{ }", x: "75%", y: "15%", color: "hsl(var(--highlight-purple))", delay: 1 },
  { text: "</>", x: "22%", y: "18%", color: "hsl(var(--primary))", delay: 1.8 },
  { text: "x1", x: "85%", y: "35%", color: "hsl(var(--highlight-green))", delay: 1.5 },
  { text: "npm", x: "82%", y: "65%", color: "hsl(var(--highlight-orange))", delay: 0.8 },
  { text: "TCP", x: "28%", y: "75%", color: "hsl(var(--highlight-purple))", delay: 2 },
  { text: "DOM", x: "65%", y: "88%", color: "hsl(var(--highlight-yellow))", delay: 1.2 },
  { text: "JSX", x: "55%", y: "95%", color: "hsl(var(--highlight-blue))", delay: 0.3 },
  { text: "=>", x: "22%", y: "62%", color: "hsl(var(--highlight-green))", delay: 0.6 },
];

const dots = Array.from({ length: 30 }, (_, i) => ({
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 3,
}));

// const codeLines = [
//   { text: "const app = express();", indent: 0 },
//   { text: "app.use(cors());", indent: 0 },
//   { text: "", indent: 0 },
//   { text: "export default App;", indent: 0 },
//   { text: "db.connect(URI);", indent: 0 },
// ];

const codeLines = [
  { text: `import React from "react";`, indent: 0 },
  { text: `import { useEffect, useState } from "react";`, indent: 0 },
  { text: "", indent: 0 },
  { text: "const app = express();", indent: 0 },
  { text: "db.connect(URI);", indent: 0 },
  { text: "export default App;", indent: 0 },
];

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Floating dots */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="dot-particle"
          style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size, background: "rgba(255,255,255,0.4)" }}
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: dot.delay }}
        />
      ))}

      {/* Network lines */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="network-line"
          style={{
            left: `${10 + i * 8}%`,
            top: `${10 + i * 8}%`,
            width: `${150 + Math.random() * 250}px`,
            transform: `rotate(${20 + i * 20}deg)`,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          }}
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      {/* Floating words */}
      {floatingWords.map((word, i) => (
        <motion.span
          key={i}
          className="floating-word font-mono text-base md:text-lg"
          style={{ left: word.x, top: word.y, color: word.color }}
          animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 5 + i * 0.3, repeat: Infinity, delay: word.delay, ease: "easeInOut" }}
        >
          {word.text}
        </motion.span>
      ))}

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="section-badge mb-8 py-2 px-5 bg-[#0a192f] border-[#1e293b] flex items-center gap-2"
            >
              <span className="mr-2 inline-block w-[10px] h-[10px] rounded-full bg-highlight-green shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-[#4589ff] text-xs font-semibold">Available for opportunities</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-display font-black leading-[1.05] mb-8 tracking-tighter">
              Hi, I'm a
              <br />
              <span className="text-gradient-primary">Frontend</span>
              <br />
              Developer
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              3+ years of experience crafting modern web applications with{" "}
              <span className="text-foreground font-medium">React.js,</span>{" "}
              <span className="text-foreground font-medium">Next.js,</span>{" "}
              <span className="text-foreground font-medium">Express.js,</span>{" "}
              <span className="text-foreground font-medium">Node.js,</span> basically with the {" "}
              <span className="text-foreground font-medium">MERN stack</span>. I turn complex problems into elegant, scalable solutions.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#projects"
                className="px-6 py-3 rounded-lg font-bold bg-[#4589ff] hover:bg-[#3273dc] transition-all text-white shadow-[0_0_20px_rgba(69,137,255,0.3)]"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg border border-[#1e293b] text-white font-bold bg-black/50 backdrop-blur-sm hover:bg-white/5 transition-all"
              >
                Get In Touch
              </a>
            </div>

            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/chaudharyShub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/shubham-chaudhary-4398bba8 " },
                { icon: Mail, href: "mailto:sc07807cs@gmail.com" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  className="w-12 h-12 rounded-xl border border-[#1e293b] bg-black/40 flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/20 transition-all hover:-translate-y-1"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right code window */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="code-window max-w-md ml-auto">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-highlight-red/70" />
                <div className="w-3 h-3 rounded-full bg-highlight-yellow/70" />
                <div className="w-3 h-3 rounded-full bg-highlight-green/70" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">server.js</span>
              </div>
              <div className="p-5 font-mono text-sm space-y-2">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="text-muted-foreground"
                    style={{ paddingLeft: line.indent * 16 }}
                  >
                    {line.text || "\u00A0"}
                  </motion.div>
                ))}
                <motion.div
                  className="inline-block w-2 h-4 bg-primary"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-muted-foreground" size={24} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
