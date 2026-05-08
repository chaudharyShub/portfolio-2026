import { forwardRef, useImperativeHandle, type ReactNode } from "react";
import { useTilt } from "@/hooks/useTilt";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  ease?: number;
  lift?: number;
  scale?: number;
  style?: React.CSSProperties;
};

/**
 * Wraps children with a 3D parallax tilt effect that follows the cursor.
 * Pure transform — never re-renders React. Inactive on touch / reduced motion.
 */
const TiltCard = forwardRef<HTMLDivElement, Props>(
  ({ children, className, max, ease, lift, scale, style }, externalRef) => {
    const ref = useTilt<HTMLDivElement>({ max, ease, lift, scale });
    useImperativeHandle(externalRef, () => ref.current as HTMLDivElement);

    return (
      <div
        ref={ref}
        className={className}
        style={{
          willChange: "transform",
          transformStyle: "preserve-3d",
          ...style,
        }}
      >
        {children}
      </div>
    );
  },
);

TiltCard.displayName = "TiltCard";

export default TiltCard;
