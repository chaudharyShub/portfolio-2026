import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "booting kernel...",
  "pixels are loading...",
  "compiling components...",
  "bundling experiences...",
  "warming up the dev server...",
  "polishing the UI...",
  "ready to render!",
];

const TOTAL_MS = 2600;

const Preloader = () => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / TOTAL_MS);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const msgTimer = window.setInterval(() => {
      setMsgIdx((i) => Math.min(i + 1, messages.length - 1));
    // }, Math.floor(TOTAL_MS / messages.length));
    }, 500);

    const hideTimer = window.setTimeout(() => {
      setShow(false);
    }, TOTAL_MS + 350);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(msgTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!show) {
      document.body.style.overflow = "";
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
        >
          {/* Ambient gradient bloom */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(45% 45% at 25% 25%, hsl(var(--highlight-purple) / 0.28), transparent 70%), radial-gradient(45% 45% at 75% 75%, hsl(var(--primary) / 0.28), transparent 70%), radial-gradient(35% 35% at 50% 90%, hsl(var(--highlight-pink) / 0.18), transparent 70%)",
            }}
          />

          {/* Subtle scanlines for the CRT / terminal feel */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, white 2px, white 3px)",
            }}
          />

          {/* Floating particles */}
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${(i * 53) % 100}%`,
                top: `${(i * 37) % 100}%`,
                width: 3 + (i % 3),
                height: 3 + (i % 3),
                background:
                  i % 2 === 0
                    ? "hsl(var(--primary))"
                    : "hsl(var(--highlight-purple))",
                boxShadow: "0 0 10px currentColor",
                color:
                  i % 2 === 0
                    ? "hsl(var(--primary))"
                    : "hsl(var(--highlight-purple))",
              }}
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.4, 0.8] }}
              transition={{
                duration: 2 + (i % 4),
                repeat: Infinity,
                delay: (i * 0.13) % 1.5,
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center gap-8 px-6">
            {/* Brand mark */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative"
            >
              <motion.div
                aria-hidden
                className="absolute -inset-3 rounded-3xl blur-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--highlight-purple)), hsl(var(--primary)), hsl(var(--highlight-pink)))",
                }}
                animate={{ opacity: [0.55, 0.95, 0.55] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative w-20 h-20 rounded-2xl bg-card border border-border/80 flex items-center justify-center font-mono text-2xl font-bold text-[#4589ff] shadow-[inset_0_1px_0_hsl(0_0%_100%/0.06)]">
                {">_"}
                <motion.span
                  className="ml-0.5 inline-block w-[3px] h-5"
                  style={{
                    background: "hsl(var(--highlight-blue))",
                    boxShadow: "0 0 8px hsl(var(--highlight-blue) / 0.7)",
                  }}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Boot message + progress */}
            <div className="flex flex-col items-center gap-5 w-[min(80vw,320px)]">
              <div className="flex items-center gap-2 font-mono text-sm h-6 self-stretch justify-center">
                <span className="text-highlight-green">$</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={msgIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="text-foreground"
                  >
                    {messages[msgIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-muted/50 overflow-hidden border border-border/60 relative">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress * 100}%`,
                    background:
                      "linear-gradient(90deg, hsl(var(--highlight-purple)), hsl(var(--primary)), hsl(var(--highlight-pink)))",
                    boxShadow:
                      "0 0 12px hsl(var(--primary) / 0.7), 0 0 4px hsl(var(--highlight-purple) / 0.6)",
                  }}
                />
                {/* Moving shimmer */}
                <motion.div
                  className="absolute top-0 bottom-0 w-1/3 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.25), transparent)",
                  }}
                  animate={{ x: ["-100%", "350%"] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <div className="flex items-center justify-between w-full text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                <span>shubham_chaudhary.dev</span>
                <span className="text-foreground">
                  {Math.round(progress * 100)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
