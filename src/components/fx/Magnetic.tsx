import { forwardRef, useImperativeHandle, type ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  ease?: number;
  /** Inline style for the wrapping span. */
  style?: React.CSSProperties;
  /** Render as a different element. Defaults to a `<span>`. */
  as?: "span" | "div";
};

/**
 * Wraps children with a magnetic hover effect (cursor-pull).
 * GPU-only (transform), single rAF, no global listeners. Touch/reduced-motion
 * users get a static element.
 *
 * The default display is set via a class (not inline style) so that responsive
 * utilities like `hidden md:inline-block` from `className` can override it.
 */
const Magnetic = forwardRef<HTMLElement, Props>(
  ({ children, className, strength, ease, style, as = "span" }, externalRef) => {
    const ref = useMagnetic<HTMLElement>({ strength, ease });
    useImperativeHandle(externalRef, () => ref.current as HTMLElement);

    const Tag = as as "span";
    return (
      <Tag
        ref={ref as React.RefObject<HTMLSpanElement>}
        className={cn(as === "div" ? "block" : "inline-block", className)}
        style={{ willChange: "transform", ...style }}
      >
        {children}
      </Tag>
    );
  },
);

Magnetic.displayName = "Magnetic";

export default Magnetic;
