"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  /** Doplní do bočného stĺpca kartu s kontaktom */
  help?: boolean;
}

export function Faq({
  items,
  eyebrow = "Časté otázky",
  title = "FAQ",
  subtitle,
  compact = false,
  help = false,
}: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-cream/30 via-cream/60 to-cream/30",
        compact ? "py-14 sm:py-20" : "py-16 sm:py-20 lg:py-28"
      )}
    >
      {/* Svetelná atmosféra sekcie */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(203,171,88,0.16),transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(203,171,88,0.10),transparent_70%)] blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] gap-10 lg:gap-14">
          {/* Bočný stĺpec */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              {/* Dekoratívny otáznik za nadpisom */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-10 -left-4 select-none font-display font-extrabold text-[9rem] leading-none text-gold/[0.10]"
              >
                ?
              </span>

              <div className="relative">
                <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
                  <span className="w-8 h-px bg-gold/60" />
                  {eyebrow}
                </div>
                <h2
                  className={cn(
                    "font-bold text-brown",
                    compact ? "text-display-3" : "text-display-2"
                  )}
                >
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-4 text-mutedbrand leading-relaxed">{subtitle}</p>
                )}
              </div>
            </div>

            {help && (
              <div className="mt-8 rounded-2xl border border-cream bg-white/80 backdrop-blur-sm p-6 shadow-[0_8px_28px_rgba(63,34,17,0.06)]">
                <p className="text-sm text-mutedbrand leading-relaxed">
                  Ihre Frage war nicht dabei? Wir haben auch auf weitere eine Antwort.
                </p>
                <Link
                  href="/faq"
                  className="mt-4 group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold via-gold to-gold-hover px-5 py-2.5 text-sm font-semibold text-brown transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(203,171,88,0.45)]"
                >
                  Alle Fragen ansehen
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            )}
          </div>

          {/* Otázky */}
          <div className="rounded-3xl border border-cream bg-white/85 backdrop-blur-sm p-2 sm:p-3 shadow-[0_12px_44px_rgba(63,34,17,0.08)]">
            {items.map((item, i) => {
              const isOpen = open === i;
              const panelId = `${uid}-panel-${i}`;
              const buttonId = `${uid}-button-${i}`;

              return (
                <div
                  key={item.question}
                  className={cn(
                    "group relative rounded-2xl transition-colors duration-300",
                    isOpen ? "bg-gold/[0.06]" : "hover:bg-cream/50",
                    i !== 0 && !isOpen && "before:absolute before:inset-x-4 before:top-0 before:h-px before:bg-cream"
                  )}
                >
                  {/* Zlatý akcent otvorenej otázky */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-gold to-gold/30 transition-all duration-500 ease-out",
                      isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                    )}
                  />

                  <button
                    id={buttonId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-start gap-4 sm:gap-5 px-4 sm:px-6 py-5 text-left cursor-pointer"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "shrink-0 pt-0.5 font-display font-extrabold text-sm tabular-nums transition-colors duration-300",
                        isOpen ? "text-gold" : "text-brown/25 group-hover:text-gold/60"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "flex-1 font-display font-bold text-base sm:text-lg leading-snug transition-colors duration-300",
                        isOpen ? "text-gold" : "text-brown"
                      )}
                    >
                      {item.question}
                    </span>

                    <span
                      aria-hidden
                      className={cn(
                        "shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500",
                        isOpen
                          ? "bg-gold text-white rotate-[135deg] shadow-[0_6px_18px_rgba(203,171,88,0.45)]"
                          : "bg-cream text-brown group-hover:bg-gold/25"
                      )}
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={cn(
                          "pl-[3rem] sm:pl-[3.75rem] pr-4 sm:pr-6 pb-5 text-charcoal/90 leading-relaxed",
                          "transition-opacity duration-500",
                          isOpen ? "opacity-100" : "opacity-0"
                        )}
                      >
                        {item.answer}
                      </div>
                    </div>
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
