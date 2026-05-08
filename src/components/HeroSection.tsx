import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  FileCode2,
  GitBranch,
  Circle,
  Sparkles,
} from "lucide-react";
import { useLiveDuration, formatLiveDuration } from "@/hooks/useLiveDuration";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import LiveDurationInline from "@/components/LiveDuration";
import ParticleField from "@/components/fx/ParticleField";
import Magnetic from "@/components/fx/Magnetic";
import TiltCard from "@/components/fx/TiltCard";
import AnimatedText from "@/components/fx/AnimatedText";

const floatingWords = [
  { text: "SSH", x: "45%", y: "5%", color: "hsl(var(--highlight-cyan))", delay: 0.5 },
  { text: "API", x: "38%", y: "18%", color: "hsl(var(--highlight-pink))", delay: 0 },
  { text: "{ }", x: "75%", y: "15%", color: "hsl(var(--highlight-purple))", delay: 1 },
  { text: "</>", x: "22%", y: "18%", color: "hsl(var(--primary))", delay: 1.8 },
  { text: "npm", x: "82%", y: "65%", color: "hsl(var(--highlight-orange))", delay: 0.8 },
  { text: "TCP", x: "28%", y: "75%", color: "hsl(var(--highlight-purple))", delay: 2 },
  { text: "DOM", x: "65%", y: "88%", color: "hsl(var(--highlight-yellow))", delay: 1.2 },
  { text: "JSX", x: "55%", y: "95%", color: "hsl(var(--highlight-blue))", delay: 0.3 },
  { text: "=>", x: "22%", y: "62%", color: "hsl(var(--highlight-green))", delay: 0.6 },
  { text: "R&D", x: "10%", y: "75%", color: "hsl(var(--highlight-green))", delay: 2.5 },
];

type TokenType =
  | "keyword"
  | "ident"
  | "prop"
  | "string"
  | "op"
  | "bracket"
  | "punct"
  | "comment"
  | "plain";

type Token = { t: TokenType; v: string };
type CodeLine = { indent?: number; tokens: Token[] };

const tokenColor: Record<TokenType, string> = {
  keyword: "hsl(var(--highlight-purple))",
  ident: "hsl(var(--highlight-blue))",
  prop: "hsl(var(--highlight-orange))",
  string: "hsl(var(--highlight-green))",
  op: "hsl(0 0% 78%)",
  bracket: "hsl(var(--highlight-yellow))",
  punct: "hsl(0 0% 60%)",
  comment: "hsl(0 0% 45%)",
  plain: "hsl(0 0% 88%)",
};

const arr = (...items: string[]): Token[] => {
  const out: Token[] = [{ t: "bracket", v: "[" }];
  items.forEach((s, i) => {
    out.push({ t: "string", v: `"${s}"` });
    if (i < items.length - 1) out.push({ t: "punct", v: ", " });
  });
  out.push({ t: "bracket", v: "]" });
  return out;
};

const prop = (key: string, ...value: Token[]): Token[] => [
  { t: "prop", v: key },
  { t: "op", v: ": " },
  ...value,
  { t: "punct", v: "," },
];

const buildCodeLines = (experienceValue: string): CodeLine[] => [
  { tokens: [{ t: "comment", v: "// developer profile" }] },
  {
    tokens: [
      { t: "keyword", v: "const" },
      { t: "plain", v: " " },
      { t: "ident", v: "developer" },
      { t: "op", v: " = " },
      { t: "bracket", v: "{" },
    ],
  },
  { indent: 2, tokens: prop("name", { t: "string", v: '"Shubham Chaudhary"' }) },
  { indent: 2, tokens: prop("experience", { t: "string", v: `"${experienceValue}"` }) },
  { indent: 2, tokens: prop("passion", { t: "string", v: '"Building scalable web apps"' }) },
  { indent: 2, tokens: prop("front_end", ...arr("React", "Next.js", "Tailwind")) },
  { indent: 2, tokens: prop("back_end", ...arr("Node.js", "Express", "MongoDB")) },
  { indent: 2, tokens: prop("cloud", ...arr("Docker", "AWS", "Lambda")) },
  { indent: 2, tokens: prop("coffee", { t: "string", v: '"Moderate"' }) },
  { indent: 2, tokens: prop("ginger_tea", { t: "string", v: '"Infinity"' }) },
  {
    tokens: [
      { t: "bracket", v: "}" },
      { t: "punct", v: ";" },
    ],
  },
];

const FloatingWords = memo(function FloatingWords() {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <>
        {floatingWords.map((word, i) => (
          <span
            key={i}
            aria-hidden
            className="floating-word font-mono text-base md:text-lg"
            style={{ left: word.x, top: word.y, color: word.color }}
          >
            {word.text}
          </span>
        ))}
      </>
    );
  }
  return (
    <>
      {floatingWords.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="floating-word font-mono text-base md:text-lg"
          style={{
            left: word.x,
            top: word.y,
            color: word.color,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [-2, 2, -2],
            opacity: [0.5, 0.85, 0.5],
          }}
          transition={{
            duration: 5 + i * 0.3,
            repeat: Infinity,
            delay: word.delay,
            ease: "easeInOut",
          }}
        >
          {word.text}
        </motion.span>
      ))}
    </>
  );
});

const HeroSection = () => {
  const liveDuration = useLiveDuration();
  // Recompute the experience string only when the seconds tick — but the
  // CodeBody is memoized on `experience` so rebuilds are cheap.
  const experience = formatLiveDuration(liveDuration);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* GPU-friendly canvas particle network — replaces 30 motion divs */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleField
          density={18000}
          maxParticles={70}
          linkDistance={140}
          cursorRadius={170}
          hues={[217, 270, 322, 185, 142, 25]}
        />
      </div>

      <FloatingWords />

      {/* Readability vignette */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, hsl(var(--background) / 0.72) 0%, hsl(var(--background) / 0.55) 35%, hsl(var(--background) / 0.2) 65%, transparent 100%)",
          backdropFilter: "blur(1.5px)",
          WebkitBackdropFilter: "blur(1.5px)",
        }}
      />

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
              <motion.span
                className="relative inline-block w-1.5 h-1.5 rounded-full bg-highlight-green shadow-[0_0_6px_hsl(var(--highlight-green))]"
                animate={{ opacity: [1, 0.35, 1], scale: [1, 1.15, 1] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-[#4589ff] ml-2 text-xs font-semibold">
                Available for opportunities
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-display font-black leading-[1.05] mb-8 tracking-tighter">
              <AnimatedText text="Hi, I'm a" stagger={0.06} duration={0.55} inView={false} />
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
                className="text-gradient-primary inline-block"
              >
                Front End
              </motion.span>
              <br />
              <AnimatedText text="Developer" stagger={0.06} duration={0.55} delay={0.7} inView={false} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed"
            >
              <LiveDurationInline /> of experience crafting modern web
              applications with{" "}
              <span className="text-foreground font-medium">React.js,</span>{" "}
              <span className="text-foreground font-medium">Next.js,</span>{" "}
              <span className="text-foreground font-medium">Electron.js,</span>{" "}
              <span className="text-foreground font-medium">Express.js,</span>{" "}
              <span className="text-foreground font-medium">Node.js,</span>{" "}
              basically with the{" "}
              <span className="text-foreground font-medium">MERN stack</span>. I
              turn complex problems into elegant, scalable solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Magnetic strength={14}>
                <a
                  href="#projects"
                  className="group/cta relative inline-flex px-6 py-3 rounded-lg font-bold text-white overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--highlight-purple)), hsl(var(--primary)))",
                    boxShadow:
                      "0 8px 30px hsl(var(--primary) / 0.45), inset 0 1px 0 hsl(0 0% 100% / 0.12)",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/cta:translate-x-[400%] transition-transform duration-1000 ease-in-out"
                  />
                  <span className="relative">View My Work</span>
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex gap-4"
            >
              {[
                { icon: Github, href: "https://github.com/chaudharyShub", label: "GitHub" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/shubham-chaudhary-4398bba8 ",
                  label: "LinkedIn",
                },
                { icon: Mail, href: "mailto:sc07807cs@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }, i) => (
                <Magnetic key={i} strength={10}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="group/social relative w-12 h-12 rounded-xl border border-[#1e293b] bg-black/40 backdrop-blur-sm flex items-center justify-center text-muted-foreground transition-colors duration-300 hover:text-white overflow-hidden"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--highlight-purple) / 0.25), hsl(var(--primary) / 0.25))",
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-xl opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"
                      style={{
                        padding: "1px",
                        background:
                          "linear-gradient(135deg, hsl(var(--highlight-purple)), hsl(var(--primary)))",
                        WebkitMask:
                          "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />
                    <Icon
                      size={20}
                      className="relative z-10 transition-transform duration-300 group-hover/social:scale-110"
                    />
                  </a>
                </Magnetic>
              ))}
            </motion.div>
          </motion.div>

          {/* Right code window */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <TiltCard
              max={6}
              ease={0.18}
              lift={12}
              className="relative max-w-md ml-auto"
            >
              {/* Ambient color bloom behind the card */}
              <div
                aria-hidden
                className="absolute -inset-8 rounded-[2rem] blur-3xl opacity-60 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(45% 45% at 25% 20%, hsl(var(--highlight-purple) / 0.45), transparent 70%), radial-gradient(45% 45% at 80% 85%, hsl(var(--primary) / 0.45), transparent 70%), radial-gradient(35% 35% at 60% 50%, hsl(var(--highlight-pink) / 0.25), transparent 70%)",
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-3 -right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase text-white shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--highlight-purple)), hsl(var(--primary)))",
                  boxShadow:
                    "0 4px 14px hsl(var(--primary) / 0.45), 0 0 0 1px hsl(0 0% 100% / 0.08) inset",
                }}
              >
                <Sparkles size={11} />
                v2026
              </motion.div>

              <div className="relative rounded-xl">
                <div className="animated-border" aria-hidden />
                <CodeWindow experience={experience} />
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.2 }}
      >
        <ChevronDown className="text-muted-foreground" size={24} />
      </motion.a>
    </section>
  );
};

const CodeWindow = memo(function CodeWindow({
  experience,
}: {
  experience: string;
}) {
  // Re-build code lines whenever the live experience string changes (every
  // second). That's still cheap because the structure is shallow and the
  // outer parent is memoized so React only diffs this subtree.
  const codeLines = useMemo(() => buildCodeLines(experience), [experience]);

  return (
    <div className="code-window relative">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-gradient-to-b from-white/[0.04] to-transparent">
        <span className="w-3 h-3 rounded-full bg-highlight-red/80 shadow-[0_0_8px_hsl(var(--highlight-red)/0.6)]" />
        <span className="w-3 h-3 rounded-full bg-highlight-yellow/80 shadow-[0_0_8px_hsl(var(--highlight-yellow)/0.6)]" />
        <span className="w-3 h-3 rounded-full bg-highlight-green/80 shadow-[0_0_8px_hsl(var(--highlight-green)/0.6)]" />

        <div className="ml-3 flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
          <FileCode2 size={13} className="text-highlight-blue" />
          <span className="text-foreground">about.ts</span>
          <span
            className="ml-1 w-1.5 h-1.5 rounded-full bg-highlight-orange"
            title="unsaved"
          />
        </div>

        <span className="ml-auto text-[10px] font-mono uppercase tracking-wider text-highlight-blue px-2 py-0.5 rounded border border-highlight-blue/30 bg-highlight-blue/10">
          TS
        </span>
      </div>

      <div className="flex font-mono text-[13px] leading-6">
        <div className="flex flex-col gap-2 items-end pl-4 pr-3 py-5 select-none border-r border-border/60 text-muted-foreground/40 text-xs">
          {codeLines.map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>

        <div className="flex-1 py-5 pl-4 pr-5 overflow-hidden">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
              style={{ paddingLeft: (line.indent ?? 0) * 10 }}
              className="whitespace-pre"
            >
              {line.tokens.length === 0
                ? "\u00A0"
                : line.tokens.map((tok, j) => (
                    <span
                      key={j}
                      style={{ color: tokenColor[tok.t] }}
                      className={tok.t === "comment" ? "italic" : ""}
                    >
                      {tok.v}
                    </span>
                  ))}
              {i === codeLines.length - 1 && (
                <motion.span
                  className="inline-block w-[7px] h-[15px] align-middle ml-1 rounded-[1px]"
                  style={{
                    background: "hsl(var(--highlight-blue))",
                    boxShadow: "0 0 8px hsl(var(--highlight-blue) / 0.7)",
                  }}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-2 border-t border-border bg-gradient-to-t from-primary/[0.06] to-transparent text-[10px] font-mono">
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1">
            <GitBranch size={11} className="text-highlight-purple" />
            main
          </span>
          <span className="flex items-center gap-1 text-highlight-green">
            <Circle size={6} className="fill-current" />0 problems
          </span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <span>UTF-8</span>
          <span>LF</span>
          <span className="text-highlight-blue">TypeScript</span>
        </div>
      </div>
    </div>
  );
});

export default HeroSection;
