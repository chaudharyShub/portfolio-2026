import { useEffect, useState } from "react";

export type LiveDuration = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// Career start: 26 September 2022, 00:00 local time.
export const CAREER_START_DATE = new Date(2022, 8, 26, 0, 0, 0, 0);

function computeDuration(start: Date, now: Date): LiveDuration {
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    // Borrow days from the previous calendar month relative to "now".
    const prevMonthLastDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      0
    ).getDate();
    days += prevMonthLastDay;
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours, minutes, seconds };
}

/**
 * Returns the elapsed duration since `start`, refreshed every second
 * and aligned to the wall-clock second boundary so it ticks like a
 * real digital clock.
 */
export function useLiveDuration(start: Date = CAREER_START_DATE): LiveDuration {
  const [duration, setDuration] = useState<LiveDuration>(() =>
    computeDuration(start, new Date())
  );

  useEffect(() => {
    let timeoutId: number;

    const tick = () => {
      setDuration(computeDuration(start, new Date()));
      // Schedule the next update right at the next wall-clock second.
      const msToNextSecond = 1000 - (Date.now() % 1000);
      timeoutId = window.setTimeout(tick, msToNextSecond);
    };

    // First aligned tick.
    const initialDelay = 1000 - (Date.now() % 1000);
    timeoutId = window.setTimeout(tick, initialDelay);

    return () => window.clearTimeout(timeoutId);
  }, [start]);

  return duration;
}

const pad2 = (n: number) => n.toString().padStart(2, "0");

/** Compact textual form: "3y 07mo 11d 14h 23m 17s". */
export function formatLiveDuration(d: LiveDuration): string {
  return `${d.years}y ${pad2(d.months)}mo ${pad2(d.days)}d ${pad2(
    d.hours
  )}h ${pad2(d.minutes)}m ${pad2(d.seconds)}s`;
}
