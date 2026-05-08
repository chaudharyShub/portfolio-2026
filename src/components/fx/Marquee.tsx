import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Seconds for one full loop. Smaller = faster. */
  speed?: number;
  /** Reverse the direction. */
  reverse?: boolean;
  /** Pause when hovered. */
  pauseOnHover?: boolean;
  className?: string;
};

/**
 * CSS-only infinite marquee. Uses transform on a duplicated track so the
 * animation runs entirely on the compositor and never touches layout.
 *
 * Children should be a single horizontal flex container of items; we render
 * it twice so the loop seamlessly wraps.
 */
const Marquee = ({
  children,
  speed = 28,
  reverse = false,
  pauseOnHover = true,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "marquee group relative flex w-full overflow-hidden",
        pauseOnHover && "marquee--hoverable",
        className,
      )}
      style={
        {
          "--marquee-duration": `${speed}s`,
          "--marquee-direction": reverse ? "reverse" : "normal",
          maskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        } as React.CSSProperties
      }
    >
      <div className="marquee-track flex shrink-0 items-center gap-6 pr-6">
        {children}
      </div>
      <div
        aria-hidden
        className="marquee-track flex shrink-0 items-center gap-6 pr-6"
      >
        {children}
      </div>
    </div>
  );
};

export default Marquee;
