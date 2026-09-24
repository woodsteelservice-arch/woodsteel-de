"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

/**
 * Mapa krajín, v ktorých máme realizácie. Obrysy sú vykreslené priamo v SVG —
 * bez externej mapovej služby, takže sa načíta okamžite a nesleduje návštevníka.
 * Názov krajiny je vždy na mape (kvôli dotykovým zariadeniam) a pri prejdení
 * myšou sa zvýrazní.
 */
const COUNTRIES = [
  { code: "DEU", name: "Deutschland", cx: 38.1, cy: 8.1, d: "M155.8 12.9 L148.1 8.0 L140.8 16.1 L120.0 24.4 L109.2 35.0 L88.1 44.2 L93.2 56.9 L96.3 74.9 L111.1 85.1 L127.5 103.4 L117.2 123.0 L106.8 128.4 L110.9 156.2 L108.2 163.4 L99.2 154.7 L85.2 153.4 L64.5 161.0 L38.9 159.2 L34.8 170.5 L20.1 158.6 L11.3 161.0 L-9.5 153.0 L-16.4 148.4 L-26.2 156.3 L-41.2 159.3 L-44.7 158.0 L-43.5 127.0 L-32.6 109.0 L-29.1 99.8 L-48.4 96.5 L-59.9 93.5 L-65.7 90.2 L-79.6 78.9 L-84.5 71.4 L-75.8 64.7 L-86.5 51.3 L-80.1 43.3 L-89.6 25.3 L-94.0 12.7 L-85.3 -0.6 L-83.9 -21.6 L-66.3 -22.8 L-70.0 -29.1 L-59.4 -37.1 L-70.0 -50.0 L-59.4 -62.2 L-55.3 -78.9 L-32.6 -98.2 L-18.1 -91.9 L-6.6 -106.6 L2.0 -105.3 L-13.8 -124.6 L-15.3 -148.4 L7.8 -145.5 L24.5 -138.8 L30.9 -127.5 L51.0 -125.4 L65.5 -110.7 L85.6 -118.3 L95.7 -129.6 L123.1 -121.2 L134.7 -114.9 L148.5 -107.8 L152.5 -80.6 L144.2 -62.6 L157.7 -52.1 L160.6 -31.2 L156.3 -18.6 L162.3 -8.2Z" },
  { code: "CZE", name: "Tschechien", cx: 177.9, cy: 65.1, d: "M225.1 115.3 L211.7 107.3 L198.1 109.5 L175.6 96.5 L165.4 99.7 L149.0 117.1 L127.5 103.4 L111.1 85.1 L96.3 74.9 L93.2 56.9 L88.1 44.2 L109.2 35.0 L120.0 24.4 L140.8 16.1 L148.1 8.0 L155.8 12.9 L168.7 8.5 L182.5 22.2 L204.2 25.9 L202.4 37.6 L218.1 46.4 L222.5 35.4 L242.4 40.2 L245.1 53.5 L266.7 56.1 L280.0 77.0 L271.4 77.1 L266.9 84.7 L260.2 86.6 L258.3 96.3 L252.8 98.3 L252.0 102.3 L242.1 106.7 L229.2 106.0 L225.1 115.3Z" },
  { code: "SVK", name: "Slowakei", cx: 299.0, cy: 109.8, d: "M280.0 77.0 L281.7 79.6 L293.6 73.8 L308.3 88.9 L325.4 79.8 L339.1 84.2 L360.0 78.1 L387.6 94.5 L379.5 105.6 L373.9 122.8 L367.7 127.1 L336.6 114.2 L327.1 116.8 L320.3 126.8 L306.6 132.1 L303.5 129.4 L289.4 136.0 L277.8 137.3 L275.5 145.8 L251.1 151.0 L240.4 146.4 L225.7 135.5 L222.8 120.7 L225.1 115.3 L229.2 106.0 L242.1 106.7 L252.0 102.3 L252.8 98.3 L258.3 96.3 L260.2 86.6 L266.9 84.7 L271.4 77.1 L280.0 77.0Z" },
  // Popisok je posunutý od ťažiska na východ a nadol — na pôvodnom mieste
  // by „Ö" po pridaní Nemecka zasahovalo za rakúsku hranicu.
  { code: "AUT", name: "Österreich", cx: 158, cy: 170, d: "M225.7 135.5 L223.5 152.9 L207.1 153.0 L212.7 162.2 L203.1 189.6 L197.6 196.8 L172.2 197.9 L157.5 207.5 L133.6 204.2 L92.1 193.2 L85.6 178.4 L56.9 185.8 L53.5 193.9 L35.9 187.9 L21.1 186.7 L8.0 179.0 L12.4 168.5 L11.3 161.0 L20.1 158.6 L34.8 170.5 L38.9 159.2 L64.5 161.0 L85.2 153.4 L99.2 154.7 L108.2 163.4 L110.9 156.2 L106.8 128.4 L117.2 123.0 L127.5 103.4 L149.0 117.1 L165.4 99.7 L175.6 96.5 L198.1 109.5 L211.7 107.3 L225.1 115.3 L222.8 120.7 L225.7 135.5Z" },
  { code: "HUN", name: "Ungarn", cx: 294.7, cy: 174.8, d: "M203.1 189.6 L212.7 162.2 L207.1 153.0 L223.5 152.9 L225.7 135.5 L240.4 146.4 L251.1 151.0 L275.5 145.8 L277.8 137.3 L289.4 136.0 L303.5 129.4 L306.6 132.1 L320.3 126.8 L327.1 116.8 L336.6 114.2 L367.7 127.1 L373.9 122.8 L390.0 134.4 L392.0 145.8 L374.3 154.7 L360.5 183.6 L343.0 212.5 L319.7 220.5 L301.6 218.6 L279.4 229.8 L268.5 236.2 L244.5 228.0 L222.8 209.7 L213.6 204.5 L208.0 190.1 L203.1 189.6Z" },
];

export function CoverageMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <Reveal>
          <h2 className="text-display-2 font-bold text-brown">
            Projekte in <span className="text-gold">fünf Ländern</span>
          </h2>
          <p className="mt-5 text-mutedbrand leading-relaxed max-w-xl mx-auto">
            Neben Deutschland bauen wir auch bei weiteren vier Nachbarländern.
            Aufmaß, Fertigung und Montage übernehmen wir mit eigenem Team.
          </p>
        </Reveal>

        <div
          className={cn(
            "relative mt-10 sm:mt-14 overflow-hidden rounded-[1.75rem] px-4 py-8 sm:px-12 sm:py-12",
            "bg-gradient-to-b from-cream/45 via-white to-cream/25",
            "ring-1 ring-brown/[0.07] shadow-[0_1px_2px_rgba(63,34,17,0.04),0_18px_44px_rgba(63,34,17,0.06)]"
          )}
          onMouseLeave={() => setActive(null)}
        >
          {/* Tlmené zlaté svetlo za mapou */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(203,171,88,0.16),transparent_70%)] blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
          />
          <svg
            viewBox="-102 -157 502 402"
            className="relative w-full h-auto max-w-2xl mx-auto"
            role="img"
            aria-label="Karte der Länder, in denen wir Projekte umsetzen: Deutschland, Tschechien, Slowakei, Österreich und Ungarn"
          >
            {COUNTRIES.map((c) => {
              const on = active === c.code;
              return (
                <g
                  key={c.code}
                  onMouseEnter={() => setActive(c.code)}
                  onFocus={() => setActive(c.code)}
                  onBlur={() => setActive(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={c.name}
                  className="cursor-pointer outline-none"
                >
                  <path
                    d={c.d}
                    className={cn(
                      "transition-all duration-300",
                      on
                        ? "fill-gold/50 stroke-gold [filter:drop-shadow(0_6px_14px_rgba(203,171,88,0.45))]"
                        : "fill-gold/12 stroke-gold/45"
                    )}
                    strokeWidth={on ? 2 : 1.25}
                    strokeLinejoin="round"
                  />
                  <text
                    x={c.cx}
                    y={c.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={cn(
                      "pointer-events-none select-none transition-all duration-300",
                      on ? "fill-brown" : "fill-brown/55"
                    )}
                    style={{
                      fontSize: on ? 16.5 : 14,
                      fontWeight: on ? 800 : 600,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {c.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
