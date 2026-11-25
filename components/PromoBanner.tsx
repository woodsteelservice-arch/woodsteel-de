"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const SHOW_AFTER_MS = 1200;
/** Kým záprah doletí nad stred obrazovky — vtedy „odovzdá" kartu. */
const DELIVER_AFTER_MS = 900;

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

/**
 * Koniec decembra — polnoc na Nový rok v lokálnom čase. Vianočná ponuka tak
 * odpočítava do konca roka a po novom roku sa odpočet posunie na december
 * nasledujúceho roka.
 */
function endOfDecember(now: number): number {
  const d = new Date(now);
  return new Date(d.getFullYear() + 1, 0, 1, 0, 0, 0, 0).getTime();
}

function remainingNow(): Remaining {
  const now = Date.now();
  const diff = Math.max(0, endOfDecember(now) - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

type Flake = {
  left: number;
  size: number;
  fall: number;
  delay: number;
  sway: number;
  swayFor: number;
  opacity: number;
  blur: number;
};

/**
 * Vločky majú pevné (deterministické) rozloženie — vzor pôsobí náhodne, ale
 * je vždy rovnaký, takže sa server a prehliadač nikdy nerozídu.
 */
function createFlakes(count: number): Flake[] {
  let seed = 0x5eed;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0x1_0000_0000;
  };

  return Array.from({ length: count }, () => {
    // Hĺbka: 0 = vločka vzadu (malá, bledá, pomalá), 1 = vpredu
    const depth = rnd();
    return {
      left: rnd() * 100,
      size: 1.6 + depth * 3.4,
      fall: 17 - depth * 7,
      delay: -rnd() * 17,
      sway: 6 + rnd() * 16,
      swayFor: 3 + rnd() * 3.5,
      opacity: 0.26 + depth * 0.5,
      blur: depth < 0.3 ? 0.8 : 0,
    };
  });
}

const FLAKES = createFlakes(56);

/** Jemné sneženie na celej obrazovke — existuje len kým je banner otvorený. */
function Snowfall() {
  return (
    <div
      aria-hidden
      className="ws-snow-layer pointer-events-none absolute inset-0 overflow-hidden"
    >
      {FLAKES.map((flake, i) => (
        <span
          key={i}
          className="ws-snow"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDuration: `${flake.fall}s`,
            animationDelay: `${flake.delay}s`,
            filter: flake.blur ? `blur(${flake.blur}px)` : undefined,
          }}
        >
          <span
            className="ws-snow-sway"
            style={
              {
                animationDuration: `${flake.swayFor}s`,
                "--ws-sway": `${flake.sway}px`,
              } as React.CSSProperties
            }
          />
        </span>
      ))}
    </div>
  );
}

/**
 * Minimalistický zlatý záprah — kresba jednou linkou. Preletí ponad stránku
 * a „donesie" banner: karta klesne presne vtedy, keď je záprah nad ňou.
 */
function Deer({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <path d="M20 44 C20 36 30 33 46 33 L66 33 C72 32 76 28 80 22 C84 15 90 9 95 6 C100 2 110 3 113 8 C116 12 112 18 105 18 C100 18 97 16 96 13 C92 18 88 24 85 30 C82 36 80 41 79 46 C79 53 72 56 62 56 L38 56 C27 56 20 52 20 44 Z" />
      <path d="M20 42 C15 37 13 32 14 27" />
      <path d="M101 4 C99 -5 93 -10 85 -11 M101 4 C105 -3 111 -7 117 -7 M96 -3 L89 -5 M107 -2 L113 -5" />
      <path d="M74 52 L88 66 L99 63" />
      <path d="M68 55 L76 70 L88 74" />
      <path d="M32 52 L16 64 L6 59" />
      <path d="M38 55 L28 70 L16 74" />
    </g>
  );
}

function SantaSleigh() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[11%] flex justify-start"
    >
      <div className="ws-sleigh relative">
        {/* Svetelná stopa za záprahom */}
        <span className="absolute right-full top-[58%] h-px w-[26vw] bg-gradient-to-l from-gold/45 via-gold/12 to-transparent" />

        <svg
          viewBox="0 -14 400 122"
          className="w-[clamp(15rem,36vw,25rem)] drop-shadow-[0_10px_28px_rgba(203,171,88,0.4)]"
          fill="none"
          stroke="url(#wsSleighGold)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="wsSleighGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e6cd8c" />
              <stop offset="55%" stopColor="#cbab58" />
              <stop offset="100%" stopColor="#b8973f" />
            </linearGradient>
          </defs>

          {/* Opraty */}
          <g strokeWidth="2" opacity="0.6">
            <path d="M111 36 C160 42 210 46 249 44" />
            <path d="M254 38 C280 38 310 38 344 37" />
          </g>

          {/* Sane so sediacou siluetou */}
          <g transform="translate(0,16)">
            <path d="M6 84 C0 84 0 77 7 77 L112 77 C125 77 131 70 129 61" />
            <path d="M18 77 L18 54 C18 45 25 40 36 40 L94 40 C102 40 106 46 103 54 L99 77" />
            <path d="M18 54 C14 42 20 31 33 30 C41 29 45 36 40 41 C37 44 32 43 30 40" />
            <circle cx="74" cy="21" r="6" />
            <path d="M62 40 C62 29 67 23 75 23 C83 23 89 29 89 40" />
            <path d="M86 29 C95 26 103 23 110 21" />
            <path d="M67 16 C72 7 80 4 85 8 C88 10 86 13 82 14" />
            <circle cx="87" cy="8" r="2.8" />
          </g>

          <Deer transform="translate(168,26) scale(0.9)" />
          <Deer transform="translate(268,10) scale(0.9)" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Uvítací banner s odpočtom vianočnej akcie. Ukáže sa pri každom načítaní
 * úvodnej stránky; sneženie aj záprah žijú len spolu s ním. Odpočet beží do
 * konca decembra — nič sa neukladá do úložiska.
 */
export function PromoBanner() {
  const [open, setOpen] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [left, setLeft] = useState<Remaining | null>(null);

  useEffect(() => {
    // Zostatok sa počíta pri každom tiku nanovo, takže o polnoci na Nový rok
    // odpočet plynulo preskočí bez obnovenia stránky.
    const first = window.setTimeout(() => setLeft(remainingNow()), 0);
    const timer = window.setInterval(() => setLeft(remainingNow()), 1000);
    const entrance = window.setTimeout(() => setOpen(true), SHOW_AFTER_MS);
    const delivery = window.setTimeout(
      () => setDelivered(true),
      SHOW_AFTER_MS + DELIVER_AFTER_MS
    );

    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
      window.clearTimeout(entrance);
      window.clearTimeout(delivery);
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
      aria-label="Weihnachtsaktion"
      className="fixed inset-0 z-[65] flex items-center justify-center overflow-hidden px-5"
    >
      <div
        className="absolute inset-0 bg-brown/65 backdrop-blur-md"
        onClick={dismiss}
        aria-hidden
      />

      <Snowfall />
      <SantaSleigh />

      {delivered && (
        <div
          className={cn(
            "ws-banner-drop relative w-[min(24rem,100%)] overflow-hidden rounded-[1.75rem]",
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
                Weihnachtsangebot
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
              Weihnachtsrabatt
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
      )}
    </div>
  );
}
