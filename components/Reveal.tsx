"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  /** Oneskorenie v ms — na postupné odhaľovanie prvkov v mriežke */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "figure";
}

/**
 * Odhalí obsah, keď sa dostane do zorného poľa. Prvok sa zobrazí raz
 * a pozorovanie sa ukončí. Pri `prefers-reduced-motion` sa animácia
 * vypína cez CSS, obsah teda ostáva vždy čitateľný.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const supported = typeof IntersectionObserver !== "undefined";
    let observer: IntersectionObserver | undefined;

    if (supported) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer?.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      observer.observe(el);
    }

    // Poistka: obsah sa nesmie nikdy zaseknúť v skrytom stave — ani bez
    // podpory pozorovateľa, ani keď z akéhokoľvek dôvodu nezareaguje.
    const fallback = window.setTimeout(
      () => {
        setVisible(true);
        observer?.disconnect();
      },
      supported ? 1600 : 0
    );

    return () => {
      observer?.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={cn("ws-reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
