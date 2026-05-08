import { useEffect, useRef, useState } from "react";
import { useHasFinePointer } from "@/hooks/useHasFinePointer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Two-layer custom cursor:
 *   - A tiny dot that snaps to the cursor (instant feedback).
 *   - A larger ring that lerps toward it (smooth, "magnetic" feel).
 *
 * Only one rAF runs while the mouse is on the page. We never re-render React
 * for movement — only for hover-state changes (interactive vs idle).
 *
 * Auto-disabled on touch devices and when the user prefers reduced motion.
 */
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const rafId = useRef<number | null>(null);
  const fine = useHasFinePointer();
  const reduced = useReducedMotion();

  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!fine || reduced) return;

    document.body.classList.add("has-custom-cursor");

    const tick = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const isInteractive = (el: Element | null) =>
      !!el?.closest(
        'a, button, [role="button"], input, textarea, select, summary, [data-cursor="hover"]',
      );

    const onOver = (e: PointerEvent) => {
      setHover(isInteractive(e.target as Element | null));
    };
    const onOut = (e: PointerEvent) => {
      if (!isInteractive(e.relatedTarget as Element | null)) setHover(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 z-[90] pointer-events-none rounded-full opacity-0"
        style={{
          width: hover ? 44 : 30,
          height: hover ? 44 : 30,
          border: "1.5px solid hsl(var(--primary) / 0.85)",
          background: hover
            ? "hsl(var(--primary) / 0.10)"
            : "hsl(var(--primary) / 0.05)",
          boxShadow:
            "0 0 18px hsl(var(--primary) / 0.45), inset 0 0 12px hsl(var(--primary) / 0.18)",
          transition:
            "width 220ms ease, height 220ms ease, background-color 220ms ease, transform 60ms linear",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 z-[91] pointer-events-none rounded-full opacity-0"
        style={{
          width: pressed ? 4 : hover ? 6 : 5,
          height: pressed ? 4 : hover ? 6 : 5,
          background: "hsl(0 0% 100%)",
          boxShadow: "0 0 8px hsl(var(--primary) / 0.85)",
          transition: "width 120ms ease, height 120ms ease",
        }}
      />
    </>
  );
};

export default CustomCursor;
