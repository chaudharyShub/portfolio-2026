import { forwardRef, useImperativeHandle, type ReactNode } from "react";
import { useSpotlight } from "@/hooks/useSpotlight";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Color of the spotlight pool. Defaults to the primary color. */
  color?: string;
  /** Strength multiplier for the spotlight. */
  intensity?: number;
  /** Pixel radius of the spotlight pool. */
  size?: number;
  style?: React.CSSProperties;
};

/**
 * A wrapper that draws a soft radial-gradient "spotlight" wherever the cursor
 * hovers, plus a subtle gradient border that follows the same cursor.
 * Both effects are pure CSS variables driven by useSpotlight (rAF-throttled),
 * so they cost nothing while idle and don't trigger React re-renders.
 */
const Spotlight = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      className,
      color = "hsl(var(--primary) / 0.18)",
      intensity = 1,
      size = 280,
      style,
    },
    externalRef,
  ) => {
    const ref = useSpotlight<HTMLDivElement>();
    useImperativeHandle(externalRef, () => ref.current as HTMLDivElement);

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        style={
          {
            "--spot-color": color,
            "--spot-size": `${size}px`,
            "--spot-intensity": intensity,
            "--mx": "50%",
            "--my": "-50%",
            ...style,
          } as React.CSSProperties
        }
      >
        {/* Spotlight pool */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(var(--spot-size) circle at var(--mx) var(--my), var(--spot-color), transparent 70%)",
            opacity: "calc(var(--spot-intensity, 1))",
          }}
        />
        {children}
      </div>
    );
  },
);

Spotlight.displayName = "Spotlight";

export default Spotlight;
