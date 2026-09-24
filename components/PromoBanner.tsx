"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const DEADLINE_KEY = "ws-promo-deadline-v1";
const CAMPAIGN_DAYS = 30;
const SHOW_AFTER_MS = 1200;

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function remainingFrom(deadline: number): Remaining {
  const diff = Math.max(0, deadline - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/**
 * Uvítací banner s odpočtom akcie. Ukáže sa pri každom načítaní úvodnej
 * stránky. Termín akcie je uložený natrvalo, takže odpočet medzi
 * návštevami plynie ďalej a neresetuje sa.
 */
export function PromoBanner() {
  const [open, setOpen] = useState(false);
  const [left, setLeft] = useState<Remaining | null>(null);

  useEffect(() => {
    let deadline: number;
    try {
      const stored = localStorage.getItem(DEADLINE_KEY);
      deadline = stored ? Number(stored) : Date.now() + CAMPAIGN_DAYS * 86_400_000;
      if (!stored) localStorage.setItem(DEADLINE_KEY, String(deadline));
    } catch {
      return; // súkromný režim bez úložiska — banner preskočíme
    }

    const first = window.setTimeout(() => setLeft(remainingFrom(deadline)), 0);
    const timer = window.setInterval(() => setLeft(remainingFrom(deadline)), 1000);
    const entrance = window.setTimeout(() => setOpen(true), SHOW_AFTER_MS);

    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
      window.clearTimeout(entrance);
    };
  }, []);

  // Kým je banner otvorený, Escape ho zavrie a stránka pod ním nescrolluje
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function dismiss() {
    setOpen(false);
  }

  if (!open || !left) return null;

  const units: Array<[number, string]> = [
    [left.days, "Tage"],
    [left.hours, "Std"],
    [left.minutes, "Min"],
    [left.seconds, "Sek"],
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Laufende Aktion"
      className="fixed inset-0 z-[65] flex items-center justify-center px-5"
    >
      <div
        className="absolute inset-0 bg-brown/65 backdrop-blur-md"
        onClick={dismiss}
        aria-hidden
      />

      <div
        className={cn(
          "ws-banner-in relative w-[min(24rem,100%)] overflow-hidden rounded-[1.75rem]",
          "bg-white/85 backdrop-blur-2xl ring-1 ring-white/60",
          "shadow-[0_40px_100px_rgba(63,34,17,0.45)]",
          "px-7 pb-7 pt-8 sm:px-9 sm:pb-8 sm:pt-9"
        )}
      >
        {/* Svetelný odlesk v hornom rohu */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(203,171,88,0.30),transparent_70%)] blur-2xl"
        />
        {/* Vlasová linka po hornej hrane */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        <button
          type="button"
          onClick={dismiss}
          aria-label="Schließen"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-mutedbrand/70 transition-colors hover:bg-brown/[0.06] hover:text-brown"
        >
          <X size={15} />
        </button>

        <div className="relative text-center">
          {/* Stav ponuky */}
          <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3.5 py-1.5 ring-1 ring-gold/25">
            <span className="relative flex h-1.5 w-1.5">
              <span
                aria-hidden
                className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-70 animate-ping [animation-duration:2.4s]"
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-brown/70">
              Zeitlich begrenztes Angebot
            </span>
          </span>

          {/* Zľava */}
          <div className="mt-7 flex items-start justify-center">
            <span className="bg-gradient-to-br from-gold via-gold to-gold-hover bg-clip-text font-display text-[clamp(5rem,20vw,6.5rem)] font-extrabold leading-[0.82] tracking-[-0.04em] text-transparent">
              23
            </span>
            <span className="ml-1.5 mt-3 font-display text-3xl font-extrabold text-gold/80">%</span>
          </div>

          <p className="mt-4 font-display text-xl font-bold tracking-tight text-brown">
            Rabatt
          </p>
          <p className="mt-1.5 text-sm text-mutedbrand">auf alle Produkte</p>

          {/* Odpočet */}
          <div className="mt-8 grid grid-cols-4 gap-2">
            {units.map(([value, unit]) => (
              <div
                key={unit}
                className={cn(
                  "flex flex-col items-center rounded-2xl py-3",
                  "bg-gradient-to-b from-white to-cream/45",
                  "ring-1 ring-brown/[0.07] shadow-[0_2px_10px_rgba(203,171,88,0.12)]"
                )}
              >
                <span className="font-display text-[1.35rem] font-extrabold leading-none text-brown tabular-nums">
                  {String(value).padStart(2, "0")}
                </span>
                <span className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mutedbrand">
                  {unit}
                </span>
              </div>
            ))}
          </div>

          {/* Výzva */}
          <Link
            href="/akcna-cenova-ponuka"
            onClick={dismiss}
            className={cn(
              "ws-cta group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full",
              "bg-gradient-to-br from-gold via-gold to-gold-hover px-6 py-4",
              "text-sm font-bold tracking-[0.01em] text-brown ring-1 ring-white/40",
              "transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
            )}
          >
            Angebot anfordern
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
