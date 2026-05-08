import { useCallback, useEffect, useRef } from "react";
import { useHasFinePointer } from "./useHasFinePointer";
import { useReducedMotion } from "./useReducedMotion";

type Options = {
  /** Max degrees of rotation on each axis. */
  max?: number;
  /** Higher = snappier follow. (0..1] */
  ease?: number;
  /** Optional Z translate while hovered. */
  lift?: number;
  /** Apply scale during hover. */
  scale?: number;
};

/**
 * 3D parallax tilt for a card on hover. Cheap (transform only), runs in a
 * single rAF, no global listeners, and respects reduced motion / touch.
 *
 * Apply `style={{ transformStyle: "preserve-3d" }}` to inner content if you
 * want children to depth-shift; the wrapper itself uses `perspective`.
 */
export function useTilt<T extends HTMLElement>({
  max = 8,
  ease = 0.16,
  lift = 0,
  scale = 1,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const target = useRef({ rx: 0, ry: 0, s: 1, z: 0 });
  const current = useRef({ rx: 0, ry: 0, s: 1, z: 0 });
  const rafId = useRef<number | null>(null);
  const hovering = useRef(false);
  const fine = useHasFinePointer();
  const reduced = useReducedMotion();

  const apply = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const t = target.current;
    const c = current.current;
    c.rx += (t.rx - c.rx) * ease;
    c.ry += (t.ry - c.ry) * ease;
    c.s += (t.s - c.s) * ease;
    c.z += (t.z - c.z) * ease;

    el.style.transform = `perspective(900px) rotateX(${c.rx.toFixed(
      2,
    )}deg) rotateY(${c.ry.toFixed(2)}deg) translateZ(${c.z.toFixed(
      2,
    )}px) scale(${c.s.toFixed(3)})`;

    const stillMoving =
      Math.abs(t.rx - c.rx) > 0.02 ||
      Math.abs(t.ry - c.ry) > 0.02 ||
      Math.abs(t.s - c.s) > 0.001 ||
      Math.abs(t.z - c.z) > 0.05;

    if (hovering.current || stillMoving) {
      rafId.current = requestAnimationFrame(apply);
    } else {
      rafId.current = null;
      el.style.transform = "";
    }
  }, [ease]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;

    const onEnter = () => {
      hovering.current = true;
      target.current.s = scale;
      target.current.z = lift;
      if (rafId.current == null) rafId.current = requestAnimationFrame(apply);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      target.current.ry = px * max * 2;
      target.current.rx = -py * max * 2;
      if (rafId.current == null) rafId.current = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      hovering.current = false;
      target.current.rx = 0;
      target.current.ry = 0;
      target.current.s = 1;
      target.current.z = 0;
      if (rafId.current == null) rafId.current = requestAnimationFrame(apply);
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
  }, [apply, fine, reduced, max, lift, scale]);

  return ref;
}
