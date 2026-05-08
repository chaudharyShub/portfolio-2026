import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  baseAlpha: number;
};

type Props = {
  /**
   * Approximate density: ~ 1 particle per `density` square pixels.
   * Lower = more particles.
   */
  density?: number;
  /** Hard cap so giant viewports don't get punished. */
  maxParticles?: number;
  /** Distance (px) at which two particles become connected by a line. */
  linkDistance?: number;
  /** Cursor influence radius (px). Set 0 to disable. */
  cursorRadius?: number;
  /** Top-level palette (HSL hue values). */
  hues?: number[];
  /** Optional className for the wrapper. */
  className?: string;
  /** If true, only animate while in the viewport (default true). */
  pauseOffscreen?: boolean;
};

/**
 * GPU-friendly Canvas particle network.
 *
 * Why a single canvas instead of N motion divs?
 * - One draw pass per frame instead of N React/style commits.
 * - Lines between nearby particles cost only line-segments, not DOM nodes.
 * - Pauses cleanly on tab blur and when scrolled out of view.
 * - Honors `prefers-reduced-motion` (renders one static frame and stops).
 */
const ParticleField = ({
  density = 14000,
  maxParticles = 90,
  linkDistance = 130,
  cursorRadius = 140,
  hues = [217, 270, 322, 185, 142],
  className,
  pauseOffscreen = true,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let rafId: number | null = null;
    let visible = true;
    let docVisible = !document.hidden;
    const cursor = { x: -9999, y: -9999, active: false };

    const seed = (count: number) => {
      particles = new Array(count).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 0.6 + Math.random() * 1.6,
        hue: hues[(Math.random() * hues.length) | 0],
        baseAlpha: 0.35 + Math.random() * 0.45,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement || document.body;
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(
        maxParticles,
        Math.max(20, Math.floor((width * height) / density)),
      );
      seed(target);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor.x = e.clientX - rect.left;
      cursor.y = e.clientY - rect.top;
      cursor.active = true;
    };
    const onLeave = () => {
      cursor.active = false;
      cursor.x = -9999;
      cursor.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update + draw particles.
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cursor repel — purely visual, very subtle.
        if (cursor.active && cursorRadius > 0) {
          const dx = p.x - cursor.x;
          const dy = p.y - cursor.y;
          const d2 = dx * dx + dy * dy;
          const r2 = cursorRadius * cursorRadius;
          if (d2 < r2 && d2 > 0.01) {
            const f = (1 - d2 / r2) * 0.6;
            const inv = 1 / Math.sqrt(d2);
            p.vx += (dx * inv) * f * 0.05;
            p.vy += (dy * inv) * f * 0.05;
          }
        }

        // Drag — keeps the swarm calm.
        p.vx *= 0.985;
        p.vy *= 0.985;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap.
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Particle dot.
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.baseAlpha})`;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 65%, 0.65)`;
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Links — O(n^2) but n is capped at ~90 so it's negligible.
      const ld2 = linkDistance * linkDistance;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < ld2) {
            const t = 1 - d2 / ld2;
            ctx.strokeStyle = `hsla(${a.hue}, 90%, 65%, ${t * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Cursor cohesive line — connect cursor to nearby particles.
      if (cursor.active) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - cursor.x;
          const dy = p.y - cursor.y;
          const d2 = dx * dx + dy * dy;
          const r2 = cursorRadius * cursorRadius * 1.2;
          if (d2 < r2) {
            const t = 1 - d2 / r2;
            ctx.strokeStyle = `hsla(${p.hue}, 95%, 70%, ${t * 0.55})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(cursor.x, cursor.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      if (visible && docVisible) draw();
      rafId = requestAnimationFrame(loop);
    };

    resize();

    if (reduced) {
      // Render exactly one frame, no animation loop.
      draw();
      return () => undefined;
    }

    let resizeRaf: number | null = null;
    const onResize = () => {
      if (resizeRaf != null) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null;
        resize();
      });
    };

    const onVisibility = () => {
      docVisible = !document.hidden;
    };

    let observer: IntersectionObserver | null = null;
    if (pauseOffscreen && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) visible = e.isIntersecting;
        },
        { threshold: 0 },
      );
      observer.observe(canvas);
    }

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    rafId = requestAnimationFrame(loop);

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      if (resizeRaf != null) cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      observer?.disconnect();
    };
  }, [reduced, density, maxParticles, linkDistance, cursorRadius, hues, pauseOffscreen]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={
        "absolute inset-0 w-full h-full pointer-events-auto " + (className ?? "")
      }
      style={{ touchAction: "none" }}
    />
  );
};

export default ParticleField;
