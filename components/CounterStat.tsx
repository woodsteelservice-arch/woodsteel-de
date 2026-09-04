"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  label: string;
  invert?: boolean;
}

/**
 * Animated stat — counts from 0 to the numeric part of `value` when scrolled into view.
 * Preserves the suffix ("+", "h", etc.) verbatim.
 */
export function CounterStat({ value, label, invert = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Východiskom je správne číslo — keby sa animácia nespustila, návštevník
  // uvidí platný údaj, nikdy nie nulu.
  const [displayValue, setDisplayValue] = useState(value);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match || typeof IntersectionObserver === "undefined") return;

    const target = parseFloat(match[1]);
    const suffix = match[2];

    const run = () => {
      if (animated.current) return;
      animated.current = true;

      const duration = 1400;
      const start = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        // rAF odovzdáva čas začiatku snímky, ktorý môže predchádzať `start` —
        // bez orezania by prvé snímky vykreslili záporné číslo
        const progress = Math.min(1, Math.max(0, (now - start) / duration));
        const current = target * ease(progress);
        const formatted = Number.isInteger(target)
          ? Math.round(current).toString()
          : current.toFixed(1);
        setDisplayValue(formatted + suffix);
        if (progress < 1) requestAnimationFrame(tick);
        else setDisplayValue(value); // dorovnaj presne na cieľ
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center p-5 sm:p-6 lg:p-8">
      <div
        className={`font-display font-extrabold text-[clamp(1.75rem,5vw,3rem)] lg:text-5xl leading-none tabular-nums transition-transform duration-500 ease-out group-hover:scale-110 ${
          invert ? "text-gold" : "text-brown"
        }`}
      >
        {displayValue}
      </div>
      <div
        className={`mt-1.5 sm:mt-2 text-[11px] sm:text-eyebrow tracking-[0.15em] sm:tracking-[0.18em] uppercase font-semibold transition-colors duration-500 ${
          invert ? "text-cream/85 group-hover:text-white" : "text-mutedbrand group-hover:text-brown"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
