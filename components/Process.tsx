"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";
import { process } from "@/lib/data";

const STEP_MS = 700; // ako dlho svieti jeden krok
const HOLD_MS = 2400; // pauza s celou osou rozsvietenou pred ďalším kolom

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  /** Krok, ktorý práve prechádza automatickým prehrávaním */
  const [playing, setPlaying] = useState<number | null>(null);
  /** Krok pod kurzorom — preberá kontrolu nad osou */
  const [hovered, setHovered] = useState<number | null>(null);
  /** Najvzdialenejší odhalený krok (obsah sa už neskrýva späť) */
  const [seen, setSeen] = useState(-1);

  const total = process.length;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      const t = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      // nízky prah, aby sa os rozbehla aj na mobile, kde je sekcia vysoká
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);

    // Poistka, aby obsah nikdy nezostal skrytý
    const fallback = window.setTimeout(() => {
      setInView(true);
      observer.disconnect();
    }, 1800);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  // Os sa prehráva sama dokola; kurzor prehrávanie pozastaví
  useEffect(() => {
    if (!inView) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      const t = window.setTimeout(() => setSeen(total - 1), 0);
      return () => window.clearTimeout(t);
    }
    if (hovered !== null) return;

    let cancelled = false;
    let timer = 0;

    const run = (step: number) => {
      if (cancelled) return;
      if (step < total) {
        setPlaying(step);
        setSeen((s) => (step > s ? step : s));
        timer = window.setTimeout(() => run(step + 1), STEP_MS);
      } else {
        setPlaying(null);
        timer = window.setTimeout(() => run(0), HOLD_MS);
      }
    };

    run(0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [inView, hovered, total]);

  const active = hovered ?? playing;
  const progress =
    active === null ? (inView ? 100 : 0) : ((active + 1) / total) * 100;

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-16 sm:py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-cream/30 via-cream/60 to-cream/30"
    >
      {/* Jemná svetelná atmosféra sekcie */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.9),transparent_60%)]"
      />
      {/* Rozptýlené svetlo sledujúce aktívny krok */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute hidden lg:block h-[460px] w-[460px] -translate-x-1/2 rounded-full",
          "bg-[radial-gradient(circle,rgba(203,171,88,0.18),transparent_70%)] blur-3xl",
          "transition-[left,opacity] duration-[900ms] ease-out",
          inView ? "opacity-100" : "opacity-0"
        )}
        style={{ left: `${progress}%`, top: "38%" }}
      />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader
          eyebrow="So gehen wir vor"
          title="Von der ersten Anfrage bis zur Schlüsselübergabe"
          subtitle="Fünf Schritte, bei denen Sie immer wissen, was als Nächstes kommt."
        />

        <div
          className="mt-14 sm:mt-16 lg:mt-24 relative"
          onMouseLeave={() => setHovered(null)}
        >
          {/* Vodorovná os (desktop) */}
          <div className="hidden lg:block absolute left-0 right-0 top-7 h-px bg-brown/10" />
          <div
            className="hidden lg:block absolute left-0 top-7 h-px bg-gradient-to-r from-gold/30 via-gold to-gold transition-[width] duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
          <span
            aria-hidden
            className={cn(
              "hidden lg:block absolute top-7 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold z-20",
              "shadow-[0_0_0_5px_rgba(203,171,88,0.16),0_0_22px_rgba(203,171,88,0.95)]",
              "transition-[left,opacity] duration-700 ease-out",
              inView ? "opacity-100" : "opacity-0"
            )}
            style={{ left: `${progress}%` }}
          />

          {/* Zvislá os (mobil a tablet) */}
          <div className="lg:hidden absolute left-7 top-0 bottom-0 w-px bg-brown/10" />
          <div
            className="lg:hidden absolute left-7 top-0 w-px bg-gradient-to-b from-gold/30 via-gold to-gold transition-[height] duration-700 ease-out"
            style={{ height: `${progress}%` }}
          />
          <span
            aria-hidden
            className={cn(
              "lg:hidden absolute left-7 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold z-20",
              "shadow-[0_0_0_5px_rgba(203,171,88,0.16),0_0_22px_rgba(203,171,88,0.95)]",
              "transition-[top,opacity] duration-700 ease-out",
              inView ? "opacity-100" : "opacity-0"
            )}
            style={{ top: `${progress}%` }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-5 xl:gap-x-6 gap-y-5 lg:gap-y-0 relative">
            {process.map((p, i) => {
              const isActive = active === i;
              const isPassed = hovered !== null && i < hovered;
              const lit = active === null ? inView : i <= active;
              const revealed = i <= seen;

              return (
                <div
                  key={p.n}
                  onMouseEnter={() => setHovered(i)}
                  className="group relative flex lg:block items-stretch gap-5"
                >
                  {/* Bod na osi */}
                  <div className="relative shrink-0 lg:mx-auto lg:w-14">
                    <div
                      className={cn(
                        "relative z-10 flex h-14 w-14 items-center justify-center rounded-full",
                        "font-display font-extrabold text-lg transition-all duration-500",
                        lit
                          ? "bg-gradient-to-br from-gold to-gold-hover text-white shadow-[0_10px_26px_rgba(203,171,88,0.45)]"
                          : "bg-white text-gold/40 ring-1 ring-gold/20 shadow-[0_4px_14px_rgba(63,34,17,0.06)]",
                        isActive && "scale-110 shadow-[0_16px_38px_rgba(203,171,88,0.55)]"
                      )}
                    >
                      <span
                        className={cn(
                          "transition-all duration-300",
                          isPassed ? "absolute scale-0 opacity-0" : "scale-100 opacity-100"
                        )}
                      >
                        {p.n}
                      </span>
                      <Check
                        size={22}
                        strokeWidth={3}
                        className={cn(
                          "absolute transition-all duration-300",
                          isPassed ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        )}
                      />
                    </div>

                    {/* Prstenec pri aktívnom kroku */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-0 rounded-full border border-gold/60 transition-all duration-500",
                        isActive ? "scale-[1.35] opacity-70" : "scale-100 opacity-0"
                      )}
                    />
                  </div>

                  {/* Karta kroku */}
                  <div
                    className={cn(
                      "relative flex-1 min-w-0 overflow-hidden rounded-2xl p-5 sm:p-6 lg:mt-7",
                      "bg-white/70 backdrop-blur-sm border transition-all duration-500 ease-out",
                      isActive
                        ? "border-gold/45 shadow-[0_18px_46px_rgba(63,34,17,0.12)] lg:-translate-y-1.5 bg-white/90"
                        : "border-cream shadow-[0_4px_18px_rgba(63,34,17,0.05)]",
                      revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                      hovered !== null && !isActive && "lg:opacity-70"
                    )}
                  >
                    {/* Zlatý akcent, ktorý sa pri aktívnom kroku roztiahne */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-0 top-0 h-[2px] bg-gradient-to-r from-gold to-gold/0 transition-all duration-700 ease-out",
                        isActive ? "w-full opacity-100" : "w-0 opacity-0"
                      )}
                    />

                    <div
                      className={cn(
                        "text-eyebrow text-[0.7rem] transition-colors duration-500",
                        lit ? "text-gold" : "text-mutedbrand/60"
                      )}
                    >
                      {p.meta}
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-brown">{p.title}</h3>
                    <p className="mt-1.5 text-sm text-mutedbrand leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
