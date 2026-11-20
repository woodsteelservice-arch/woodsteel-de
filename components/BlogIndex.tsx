"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate, type BlogPost } from "@/lib/blog";

type Clanek = BlogPost & { minuty: number };

/** Entfernt Diakritika, damit „Wintergarten" auch „Wintergaerten" findet. */
const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function BlogIndex({
  clanky,
  kategorie,
}: {
  clanky: Clanek[];
  kategorie: { nazev: string; pocet: number }[];
}) {
  const [kategoria, setKategoria] = useState<string>("vse");
  const [hledani, setHledani] = useState("");

  const filtrovane = useMemo(() => {
    const q = norm(hledani.trim());
    return clanky.filter((p) => {
      if (kategoria !== "vse" && p.category !== kategoria) return false;
      if (!q) return true;
      return norm(`${p.title} ${p.excerpt} ${p.category}`).includes(q);
    });
  }, [clanky, kategoria, hledani]);

  // Hlavný článok ukazujeme len v nefiltrovanom pohľade — inak by mizol a skákal.
  const cisty = kategoria === "vse" && !hledani.trim();
  const [hlavni, ...zbytek] = filtrovane;
  const mrizka = cisty ? zbytek : filtrovane;

  return (
    <>
      {/* ── Filtr a hledání ────────────────────────────────────────── */}
      <section
        // Hlavička má tri výšky (h-14 / sm:h-16 / lg:h-20) — lišta musí sadnúť presne pod ňu.
        className="sticky top-14 sm:top-16 lg:top-20 z-30 border-y border-brown/[0.07] bg-white/85 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <Pilulka
                aktivni={kategoria === "vse"}
                onClick={() => setKategoria("vse")}
                popisek="Alle"
                pocet={clanky.length}
              />
              {kategorie.map((k) => (
                <Pilulka
                  key={k.nazev}
                  aktivni={kategoria === k.nazev}
                  onClick={() => setKategoria(k.nazev)}
                  popisek={k.nazev}
                  pocet={k.pocet}
                />
              ))}
            </div>

            <div className="relative shrink-0 lg:w-64">
              <Search
                size={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mutedbrand"
              />
              <input
                type="search"
                value={hledani}
                onChange={(e) => setHledani(e.target.value)}
                placeholder="Beiträge durchsuchen"
                aria-label="Beiträge durchsuchen"
                className="w-full rounded-full bg-cream/50 py-2.5 pl-10 pr-9 text-sm text-brown outline-none ring-1 ring-brown/[0.08] transition-all placeholder:text-mutedbrand/70 focus:bg-white focus:ring-2 focus:ring-gold"
              />
              {hledani && (
                <button
                  type="button"
                  onClick={() => setHledani("")}
                  aria-label="Suche zurücksetzen"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mutedbrand hover:text-brown"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Hlavní článek ──────────────────────────────────────────── */}
      {cisty && hlavni && (
        <section className="pt-12 lg:pt-16 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <Link href={`/${hlavni.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-7 lg:gap-12 items-center">
                <div className="relative aspect-[16/11] overflow-hidden rounded-3xl bg-cream shadow-[0_28px_70px_-30px_rgba(63,34,17,0.45)]">
                  <Image
                    src={hlavni.image}
                    alt={hlavni.title}
                    fill
                    priority
                    sizes="(min-width:1024px) 58vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brown">
                    Neu
                  </span>
                </div>

                <div>
                  <div className="text-eyebrow text-gold mb-4">{hlavni.category}</div>
                  <h2 className="text-display-2 font-bold text-brown transition-colors group-hover:text-gold">
                    {hlavni.title}
                  </h2>
                  <p className="mt-5 text-mutedbrand leading-relaxed lg:text-lg">
                    {hlavni.excerpt}
                  </p>
                  <Meta datum={hlavni.date} minuty={hlavni.minuty} className="mt-6" />
                  <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-brown px-6 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-gold group-hover:text-brown">
                    Beitrag lesen
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>

            <div className="mt-14 lg:mt-20 h-px bg-gradient-to-r from-transparent via-brown/10 to-transparent" />
          </div>
        </section>
      )}

      {/* ── Mřížka ─────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 pb-24 lg:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {!cisty && (
            <p className="mb-8 text-sm text-mutedbrand">
              {filtrovane.length === 0
                ? "Dazu haben wir nichts gefunden."
                : `${filtrovane.length} ${filtrovane.length === 1 ? "Beitrag" : "Beiträge"}`}
              {hledani.trim() && (
                <>
                  {" "}zu <span className="font-semibold text-brown">&bdquo;{hledani.trim()}&ldquo;</span>
                </>
              )}
            </p>
          )}

          {filtrovane.length === 0 ? (
            <div className="rounded-3xl bg-cream/40 px-6 py-16 text-center">
              <p className="font-display text-xl font-semibold text-brown">
                Dazu haben wir noch nichts geschrieben.
              </p>
              <p className="mt-2 text-sm text-mutedbrand">
                Versuchen Sie ein anderes Wort oder sehen Sie alle Beiträge an.
              </p>
              <button
                type="button"
                onClick={() => {
                  setHledani("");
                  setKategoria("vse");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-brown/15 px-5 py-2.5 text-sm font-semibold text-brown transition-colors hover:border-gold hover:text-gold"
              >
                Alle anzeigen
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {mrizka.map((post, i) => (
                <Karta key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Pilulka({
  aktivni,
  onClick,
  popisek,
  pocet,
}: {
  aktivni: boolean;
  onClick: () => void;
  popisek: string;
  pocet: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={aktivni}
      className={cn(
        "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
        aktivni
          ? "bg-brown text-white shadow-[0_8px_20px_-8px_rgba(63,34,17,0.55)]"
          : "bg-cream/50 text-brown hover:bg-gold/15"
      )}
    >
      {popisek}
      <span className={cn("ml-2 text-xs", aktivni ? "text-cream/55" : "text-mutedbrand")}>
        {pocet}
      </span>
    </button>
  );
}

function Meta({
  datum,
  minuty,
  className,
}: {
  datum: string;
  minuty: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4 text-xs text-mutedbrand", className)}>
      <span className="inline-flex items-center gap-1.5">
        <Calendar size={12} />
        {formatDate(datum)}
      </span>
      <span className="h-3 w-px bg-brown/15" />
      <span className="inline-flex items-center gap-1.5">
        <Clock size={12} />
        {minuty} Min. Lesezeit
      </span>
    </div>
  );
}

function Karta({ post, index }: { post: Clanek; index: number }) {
  return (
    <Link
      href={`/${post.slug}`}
      className="group flex flex-col reveal"
      style={{ animationDelay: `${Math.min(index, 5) * 70}ms` }}
    >
      <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl bg-cream shadow-[0_14px_40px_-22px_rgba(63,34,17,0.4)] transition-shadow duration-500 group-hover:shadow-[0_26px_60px_-24px_rgba(63,34,17,0.5)]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brown backdrop-blur-sm">
          {post.category}
        </span>
      </div>

      <h3 className="font-display text-xl font-bold leading-tight text-brown transition-colors group-hover:text-gold">
        {post.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mutedbrand">{post.excerpt}</p>

      <div className="mt-auto pt-5">
        <Meta datum={post.date} minuty={post.minuty} />
      </div>
    </Link>
  );
}
