import { useCallback, useEffect, useRef } from "react";
import { useHasFinePointer } from "./useHasFinePointer";
import { useReducedMotion } from "./useReducedMotion";

type Options = {
  /** Max pixels the element can shift toward the cursor. */
  strength?: number;
  /** Higher = snappier follow. (0..1] */
  ease?: number;
};

/**
 * Attaches a smooth, GPU-only "magnetic" hover follow to a ref'd element.
 * - Uses pointer events on the element (no global listeners) so it costs
 *   nothing while idle.
 * - Animates with a single rAF loop and `transform: translate3d` (compositor-
 *   only, no layout/paint).
 * - Auto-disables on touch devices and when reduced motion is requested.
 */
export function useMagnetic<T extends HTMLElement>({
  strength = 18,
  ease = 0.18,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const active = useRef(false);
  const fine = useHasFinePointer();
  const reduced = useReducedMotion();

  const tick = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const dx = target.current.x - current.current.x;
    const dy = target.current.y - current.current.y;
    current.current.x += dx * ease;
    current.current.y += dy * ease;

    el.style.transform = `translate3d(${current.current.x.toFixed(
      2,
    )}px, ${current.current.y.toFixed(2)}px, 0)`;

    if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05 || active.current) {
      rafId.current = requestAnimationFrame(tick);
    } else {
      rafId.current = null;
      el.style.transform = "";
    }
  }, [ease]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.current.x = ((e.clientX - cx) / rect.width) * strength * 2;
      target.current.y = ((e.clientY - cy) / rect.height) * strength * 2;
      if (rafId.current == null) rafId.current = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      active.current = true;
    };

    const onLeave = () => {
      active.current = false;
      target.current.x = 0;
      target.current.y = 0;
      if (rafId.current == null) rafId.current = requestAnimationFrame(tick);
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      el.style.transform = "";
    };
  }, [fine, reduced, strength, tick]);

  return ref;
}
