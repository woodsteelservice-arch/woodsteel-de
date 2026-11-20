"use client";

import { useEffect, useRef, useState } from "react";
import { List, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TocPolozka } from "@/lib/article-toc";

/**
 * Obsah článku so sledovaním polohy.
 *
 * Na širokej obrazovke stojí vpravo a drží sa pri skrolovaní, na mobile je
 * schovaný pod tlačidlom. Aktívna sekcia sa určuje podľa toho, ktorý nadpis
 * je najvyššie nad pomyselnou čiarou pod hlavičkou — to je spoľahlivejšie než
 * čakať, kým nadpis „pretne" stred obrazovky.
 */
function Odkaz({
  polozka,
  aktivni,
  zvyrazneno,
  onClick,
}: {
  polozka: TocPolozka;
  aktivni: boolean;
  zvyrazneno: boolean;
  onClick: () => void;
}) {
  return (
    <a
      href={`#${polozka.id}`}
      onClick={onClick}
      className={cn(
        "group relative block rounded-lg py-1.5 pl-4 pr-2 text-sm leading-snug transition-colors duration-200",
        polozka.uroven === 3 && "pl-8 text-[13px]",
        aktivni || zvyrazneno ? "text-brown font-semibold" : "text-mutedbrand hover:text-brown"
      )}
    >
      {/* zvislá linka — práve čítaná položka ju má zlatú */}
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full transition-all duration-300",
          polozka.uroven === 3 && "left-4",
          aktivni ? "bg-gold" : zvyrazneno ? "bg-gold/40" : "bg-brown/10 group-hover:bg-brown/25"
        )}
      />
      {polozka.text}
    </a>
  );
}

export function ArticleToc({ obsah }: { obsah: TocPolozka[] }) {
  const [aktivni, setAktivni] = useState<string>(obsah[0]?.id ?? "");
  const [otevreno, setOtevreno] = useState(false);
  const [postup, setPostup] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (obsah.length === 0) return;

    const prepocet = () => {
      ticking.current = false;

      // 1) aktívna sekcia
      const hranice = 140;
      let posledny = obsah[0].id;
      for (const p of obsah) {
        const el = document.getElementById(p.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= hranice) posledny = p.id;
        else break;
      }
      setAktivni(posledny);

      // 2) postup čítania
      const vyska = document.documentElement.scrollHeight - window.innerHeight;
      setPostup(vyska > 0 ? Math.min(100, Math.max(0, (window.scrollY / vyska) * 100)) : 0);
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(prepocet);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [obsah]);

  if (obsah.length < 3) return null;

  // H3 sa opakujú v každej kapitole („Jak to funguje", „Pro koho"…), takže ich
  // ukazujeme len pod práve čítanou kapitolou. Inak je obsah nečitateľne dlhý.
  const skupiny: { hlavni: TocPolozka; deti: TocPolozka[] }[] = [];
  for (const p of obsah) {
    if (p.uroven === 2 || skupiny.length === 0) skupiny.push({ hlavni: p, deti: [] });
    else skupiny[skupiny.length - 1].deti.push(p);
  }
  const aktivniSkupina = skupiny.findIndex(
    (sk) => sk.hlavni.id === aktivni || sk.deti.some((d) => d.id === aktivni)
  );

  const seznam = (
    <ul className="space-y-0.5">
      {skupiny.map((sk, i) => {
        const jeSkupina = i === aktivniSkupina;
        return (
          <li key={sk.hlavni.id}>
            <Odkaz
              polozka={sk.hlavni}
              aktivni={sk.hlavni.id === aktivni}
              zvyrazneno={jeSkupina}
              onClick={() => setOtevreno(false)}
            />
            {sk.deti.length > 0 && jeSkupina && (
              <ul className="mt-0.5 space-y-0.5">
                {sk.deti.map((d) => (
                  <li key={d.id}>
                    <Odkaz
                      polozka={d}
                      aktivni={d.id === aktivni}
                      zvyrazneno={false}
                      onClick={() => setOtevreno(false)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* ── Desktop ─────────────────────────────────────────────── */}
      <aside className="hidden lg:block h-full">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1 [scrollbar-width:thin]">
          <div className="mb-4 flex items-center gap-2 text-eyebrow text-gold">
            <List size={13} />
            Inhalt
          </div>

          <nav aria-label="Inhaltsverzeichnis">{seznam}</nav>

          <div className="mt-6 border-t border-brown/[0.08] pt-4">
            <div className="h-1 w-full overflow-hidden rounded-full bg-brown/[0.07]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold/70 to-gold transition-[width] duration-150 ease-out"
                style={{ width: `${postup}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] tabular-nums text-mutedbrand">
              {Math.round(postup)} % gelesen
            </p>
          </div>
        </div>
      </aside>

      {/* ── Mobil ───────────────────────────────────────────────── */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOtevreno(true)}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-brown px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-8px_rgba(63,34,17,0.6)]"
        >
          <List size={15} className="text-gold" />
          Inhalt
        </button>

        {otevreno && (
          <div className="fixed inset-0 z-50 flex items-end">
            <div
              className="absolute inset-0 bg-brown/60 backdrop-blur-sm"
              onClick={() => setOtevreno(false)}
              aria-hidden
            />
            <div className="relative max-h-[75vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 pb-10">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-eyebrow text-gold inline-flex items-center gap-2">
                  <List size={13} />
                  Inhalt
                </span>
                <button
                  type="button"
                  onClick={() => setOtevreno(false)}
                  aria-label="Inhalt schließen"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/70 text-brown"
                >
                  <X size={17} />
                </button>
              </div>
              <nav aria-label="Inhaltsverzeichnis">{seznam}</nav>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
