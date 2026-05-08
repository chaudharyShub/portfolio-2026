import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLiveDuration, type LiveDuration } from "@/hooks/useLiveDuration";

const pad2 = (n: number) => n.toString().padStart(2, "0");

type Unit = { value: string; label: string; accent: string };

const buildUnits = (d: LiveDuration): Unit[] => [
  { value: pad2(d.years), label: "Y", accent: "hsl(var(--highlight-purple))" },
  { value: pad2(d.months), label: "MO", accent: "hsl(var(--highlight-pink))" },
  { value: pad2(d.days), label: "D", accent: "hsl(var(--highlight-cyan))" },
  { value: pad2(d.hours), label: "H", accent: "hsl(var(--primary))" },
  { value: pad2(d.minutes), label: "M", accent: "hsl(var(--highlight-green))" },
  { value: pad2(d.seconds), label: "S", accent: "hsl(var(--highlight-orange))" },
];

type LiveDurationInlineProps = {
  className?: string;
  /** Show the pulsing "LIVE" indicator on the left side. Defaults to true. */
  showLive?: boolean;
};

/**
 * Inline digital-clock style elapsed-experience counter.
 * Renders as a compact terminal-styled pill with monospace, tabular digits
 * (so they don't jitter as they tick) and a colorful, eye-catching layout.
 *
 * Example: `[● LIVE | 03 Y · 07 MO · 11 D · 14 H · 23 M · 17 S]`
 */
export const LiveDurationInline = ({
  className,
  showLive = true,
}: LiveDurationInlineProps) => {
  const d = useLiveDuration();
  const units = buildUnits(d);

  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-1.5 align-middle whitespace-nowrap",
        "px-2.5 py-[5px] rounded-md",
        "border border-primary/30",
        "bg-[linear-gradient(135deg,hsl(var(--primary)/0.10),hsl(var(--highlight-purple)/0.08)_50%,hsl(var(--primary)/0.10))]",
        "shadow-[0_0_18px_-4px_hsl(var(--primary)/0.45),inset_0_1px_0_hsl(0_0%_100%/0.06)]",
        "backdrop-blur-sm",
        "font-mono tabular-nums text-[0.78em] leading-none",
        className
      )}
      aria-label={`Experience: ${units
        .map((u) => `${parseInt(u.value, 10)}${u.label.toLowerCase()}`)
        .join(" ")}`}
    >
      {showLive && (
        <span className="flex items-center gap-1.5 pr-2 mr-0.5 border-r border-border/60">
          <motion.span
            className="relative inline-block w-1.5 h-1.5 rounded-full bg-highlight-green shadow-[0_0_6px_hsl(var(--highlight-green))]"
            animate={{ opacity: [1, 0.35, 1], scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[0.72em] uppercase tracking-[0.18em] text-highlight-green font-bold">
            LIVE
          </span>
        </span>
      )}

      <span className="inline-flex items-center gap-1">
        {units.map((u, i) => {
          const isSeconds = u.label === "S";
          return (
            <span key={u.label} className="inline-flex items-center">
              <motion.span
                key={isSeconds ? `${u.label}-${u.value}` : u.label}
                initial={
                  isSeconds ? { opacity: 0.35, scale: 0.92, y: -1 } : false
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="text-foreground font-bold"
                style={{
                  textShadow: `0 0 10px ${u.accent}55`,
                }}
              >
                {u.value}
              </motion.span>
              <span
                className="ml-[2px] text-[0.7em] font-bold tracking-[0.12em]"
                style={{ color: u.accent }}
              >
                {u.label}
              </span>
              {i < units.length - 1 && (
                <motion.span
                  className="mx-1 text-muted-foreground/40 select-none"
                  animate={{ opacity: [0.25, 0.7, 0.25] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: "easeInOut",
                  }}
                  aria-hidden
                >
                  ·
                </motion.span>
              )}
            </span>
          );
        })}
      </span>
    </span>
  );
};

type LiveTotalYearsProps = {
  /**
   * Years already completed before the live counter started
   * (e.g. prior career experience).
   */
  priorYears?: number;
  /** Suffix appended after the number. Defaults to "+ years". */
  suffix?: string;
  className?: string;
};

/**
 * Renders `priorYears + (full years elapsed since the live counter start)`,
 * e.g. `5+ years`. The number auto-increments the moment a full year of
 * elapsed time completes (when the inner `years` value rolls over), so it
 * stays accurate forever without manual edits.
 */
export const LiveTotalYears = ({
  priorYears = 0,
  suffix = "+ years",
  className,
}: LiveTotalYearsProps) => {
  const d = useLiveDuration();
  const total = priorYears + d.years;

  return (
    <span className={cn("tabular-nums", className)}>
      {total}
      {suffix}
    </span>
  );
};

export default LiveDurationInline;
