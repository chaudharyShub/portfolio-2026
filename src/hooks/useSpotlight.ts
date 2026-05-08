import { useCallback, useEffect, useRef } from "react";
import { useHasFinePointer } from "./useHasFinePointer";

/**
 * Sets two CSS custom properties (`--mx` / `--my`) on the ref'd element
 * that track the cursor's local coordinates as percentages. Designed to
 * power radial-gradient "spotlight" or border-glow effects via pure CSS.
 *
 * - Pointer listeners are local to the element, so this costs nothing
 *   while idle and never fires for off-screen cards.
 * - Updates are batched into a single rAF per pointer move (60fps cap).
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const next = useRef<{ x: number; y: number } | null>(null);
  const rafId = useRef<number | null>(null);
  const fine = useHasFinePointer();

  const flush = useCallback(() => {
    rafId.current = null;
    const el = ref.current;
    const n = next.current;
    if (!el || !n) return;
    el.style.setProperty("--mx", `${n.x.toFixed(1)}%`);
    el.style.setProperty("--my", `${n.y.toFixed(1)}%`);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      next.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
      if (rafId.current == null) rafId.current = requestAnimationFrame(flush);
    };

    const onLeave = () => {
      // Park the spotlight off-element so the gradient fades out smoothly.
      next.current = { x: 50, y: -50 };
      if (rafId.current == null) rafId.current = requestAnimationFrame(flush);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, [fine, flush]);

  return ref;
}
