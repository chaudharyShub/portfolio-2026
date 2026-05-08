import { useEffect, useState } from "react";

/**
 * True only on devices that have a fine pointer (mouse / trackpad) and
 * support hover. Used to gate cursor-tracking effects so they never run
 * on touch devices where they'd be both useless and a perf hit.
 */
export function useHasFinePointer(): boolean {
  const [fine, setFine] = useState<boolean>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  return fine;
}
