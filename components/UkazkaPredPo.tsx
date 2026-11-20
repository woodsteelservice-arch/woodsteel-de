"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Ukážka „pred / po" na podstránke vizualizácie.
 *
 * Obe fotky sú skutočný výstup nášho nástroja: `ukazka-pred.jpg` je fotka domu
 * s prázdnou terasou, `ukazka-po.jpg` vznikla tak, že sme ju poslali do
 * `/api/vizualizace` (pergola, RAL 7016 antracit).
 *
 * Keď sa sekcia doskroluje do záberu, posuvník sám prebehne zľava doprava,
 * aby bolo vidieť, čo sa stane. Potom ho preberá návštevník.
 */
export function UkazkaPredPo() {
  const [pozice, setPozice] = useState(0);
  const [spusteno, setSpusteno] = useState(false);
  const obalRef = useRef<HTMLDivElement>(null);
  const plochaRef = useRef<HTMLDivElement>(null);
  const tahame = useRef(false);

  useEffect(() => {
    const el = obalRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSpusteno(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!spusteno) return;
    const bezPohybu = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    if (bezPohybu) {
      raf = requestAnimationFrame(() => setPozice(50));
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now();
    const trvanie = 1700;
    const krok = (t: number) => {
      const p = Math.min(1, (t - start) / trvanie);
      const e = 1 - Math.pow(1 - p, 3); // plynulé dobrzdenie
      setPozice(e * 55);
      if (p < 1) raf = requestAnimationFrame(krok);
    };
    raf = requestAnimationFrame(krok);
    return () => cancelAnimationFrame(raf);
  }, [spusteno]);

  const nastav = useCallback((clientX: number) => {
    const el = plochaRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPozice(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => tahame.current && nastav(e.clientX);
    const touch = (e: TouchEvent) => tahame.current && nastav(e.touches[0].clientX);
    const stop = () => (tahame.current = false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", touch);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", touch);
      window.removeEventListener("touchend", stop);
    };
  }, [nastav]);

  return (
    <div ref={obalRef}>
      <div
        ref={plochaRef}
        role="slider"
        aria-label="Schieberegler für Vorher-Nachher-Vergleich"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pozice)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPozice((p) => Math.max(0, p - 4));
          if (e.key === "ArrowRight") setPozice((p) => Math.min(100, p + 4));
        }}
        onMouseDown={(e) => {
          tahame.current = true;
          nastav(e.clientX);
        }}
        onTouchStart={(e) => {
          tahame.current = true;
          nastav(e.touches[0].clientX);
        }}
        className="group relative aspect-[4/3] sm:aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl ring-1 ring-brown/10 shadow-[0_30px_80px_-30px_rgba(63,34,17,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <Image
          src="/images/ukazka-po.jpg"
          alt="Visualisierung einer Aluminium-Pergola über der Terrasse"
          fill
          sizes="(min-width:1024px) 70vw, 100vw"
          className="object-cover"
        />

        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pozice}% 0 0)` }}>
          <Image
            src="/images/ukazka-pred.jpg"
            alt="Haus mit leerer Terrasse vor der Umsetzung"
            fill
            sizes="(min-width:1024px) 70vw, 100vw"
            className="object-cover"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_18px_rgba(0,0,0,0.55)]"
          style={{ left: `${pozice}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl transition-transform duration-300 group-hover:scale-110">
            <MoveHorizontal size={19} className="text-brown" />
          </span>
        </div>

        <span
          className={cn(
            "pointer-events-none absolute left-4 top-4 rounded-full bg-brown/75 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-opacity duration-500",
            pozice < 12 ? "opacity-0" : "opacity-100"
          )}
        >
          Vorher
        </span>
        <span
          className={cn(
            "pointer-events-none absolute right-4 top-4 rounded-full bg-gold px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-brown transition-opacity duration-500",
            pozice > 88 ? "opacity-0" : "opacity-100"
          )}
        >
          Nachher
        </span>

        <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-[11px] font-semibold text-brown backdrop-blur-sm sm:hidden">
          Mit dem Finger ziehen
        </span>
      </div>

      <p className="mt-4 text-center text-xs text-mutedbrand">
        Aluminium-Pergola, RAL 7016 Anthrazit · Beispielentwurf aus diesem Werkzeug
      </p>
    </div>
  );
}
