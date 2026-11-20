"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ImagePlus,
  Loader2,
  Lock,
  MoveHorizontal,
  RotateCcw,
  Share2,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FARBY, KRAJE, PRODUKTY, PROSTREDI } from "@/lib/vizualizace";

/** Skutočné realizácie do prázdneho plátna. */
const UKAZKY = [
  { src: "/images/zimna-zahrada-kittse.jpeg" },
  { src: "/images/hlinikova-pergola-senec.jpeg" },
  { src: "/images/zimna-zahrada-horne-janiky.jpeg" },
  { src: "/images/hlinikova-pergola-trencin.jpeg" },
  { src: "/images/zimna-zahrada-dunajska-luzna.jpeg" },
];

/** Fázy generovania — text sa mení, nech 35 sekúnd čakania nie je prázdnych. */
const FAZY_GENEROVANIA = [
  { do: 18, text: "Unterlagen werden vorbereitet" },
  { do: 44, text: "Wir studieren unsere echten Projekte" },
  { do: 72, text: "Die Konstruktion entsteht" },
  { do: 93, text: "Licht und Schatten werden abgestimmt" },
  { do: 100, text: "Fast fertig" },
];

type Faza = "nastaveni" | "generuje" | "zamceno" | "odemceno";

/** Jedno dokončené generovanie — drží aj voľby, za ktorých vzniklo. */
type Varianta = {
  id: string;
  image: string;
  produkt: string;
  farba: string;
  fotka: string | null;
};

const MAX_FOTKA_MB = 8;

/** Zmenší fotku na max 1600 px a prevedie na JPEG — ušetrí prenos aj vstup modelu. */
function zmensitFotku(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read"));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("decode"));
      img.onload = () => {
        const max = 1600;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("canvas"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

/** Odhalí deti, až keď sa doskrolujú do záberu. */
function Odhalit({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [videt, setVidet] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Callback pozorovateľa beží asynchrónne, takže setState v ňom je v poriadku.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVidet(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        videt ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        "motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none",
        className
      )}
      style={{ transitionDelay: videt ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/** Posuvník pred/po vo výsledku — ťahaním sa odkrýva pôvodná fotka. */
function PredPo({ pred, po }: { pred: string; po: string }) {
  const [pozice, setPozice] = useState(55);
  const ref = useRef<HTMLDivElement>(null);
  const tahame = useRef(false);

  const nastav = useCallback((clientX: number) => {
    const el = ref.current;
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
    <div
      ref={ref}
      className="absolute inset-0 select-none overflow-hidden"
      onMouseDown={(e) => {
        tahame.current = true;
        nastav(e.clientX);
      }}
      onTouchStart={(e) => {
        tahame.current = true;
        nastav(e.touches[0].clientX);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={po} alt="Visualisierung" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pozice}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pred} alt="Originalfoto" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-white/90 shadow-[0_0_14px_rgba(0,0,0,0.5)]"
        style={{ left: `${pozice}%` }}
      >
        <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <MoveHorizontal size={17} className="text-brown" />
        </span>
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-brown/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        Vorher
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brown">
        Nachher
      </span>
    </div>
  );
}

export function Vizualizator() {
  const [produkt, setProdukt] = useState(PRODUKTY[0].kod);
  const [farba, setFarba] = useState(FARBY[0].kod);
  const [prostredi, setProstredi] = useState(PROSTREDI[0].kod);
  const [fotka, setFotka] = useState<string | null>(null);

  const [faza, setFaza] = useState<Faza>("nastaveni");
  // Každé generovanie si odložíme, nech sa dajú varianty porovnať medzi sebou.
  const [varianty, setVarianty] = useState<Varianta[]>([]);
  const [aktivnaId, setAktivnaId] = useState<string | null>(null);
  /** Kontakt pýtame raz za návštevu — ďalšie varianty sa už neuzamykajú. */
  const [odemknuto, setOdemknuto] = useState(false);
  const [chyba, setChyba] = useState<string | null>(null);
  const [formOtevren, setFormOtevren] = useState(false);
  const [postup, setPostup] = useState(0);
  const [srovnani, setSrovnani] = useState(true);

  const souborRef = useRef<HTMLInputElement>(null);
  const vysledekRef = useRef<HTMLDivElement>(null);

  // Jemný náklon plátna za myšou. Transform nastavujeme priamo na prvku —
  // cez state by to prekresľovalo 60× za sekundu.
  const platnoRef = useRef<HTMLDivElement>(null);
  const ramecRef = useRef(0);
  function sledujMys(e: React.MouseEvent<HTMLDivElement>) {
    const el = platnoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(ramecRef.current);
    ramecRef.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const x = ((clientY - r.top) / r.height - 0.5) * -3;
      const y = ((clientX - r.left) / r.width - 0.5) * 3;
      el.style.transform = `perspective(1400px) rotateX(${x}deg) rotateY(${y}deg)`;
    });
  }
  function zrusNaklon() {
    cancelAnimationFrame(ramecRef.current);
    if (platnoRef.current) {
      platnoRef.current.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
    }
  }

  const aktivna = varianty.find((v) => v.id === aktivnaId) ?? null;
  const obrazek = aktivna?.image ?? null;

  // Popisky pod plátnom patria zobrazenej variante, nie aktuálnemu výberu.
  const produktData = PRODUKTY.find((p) => p.kod === (aktivna?.produkt ?? produkt))!;
  const farbaData = FARBY.find((f) => f.kod === (aktivna?.farba ?? farba))!;
  const panelProdukt = PRODUKTY.find((p) => p.kod === produkt)!;
  const panelFarba = FARBY.find((f) => f.kod === farba)!;

  // Pomalé striedanie ukážok v prázdnom plátne.
  const [ukazka, setUkazka] = useState(0);
  const prazdne = faza === "nastaveni" && !obrazek;
  useEffect(() => {
    if (!prazdne) return;
    const id = setInterval(() => setUkazka((i) => (i + 1) % UKAZKY.length), 4600);
    return () => clearInterval(id);
  }, [prazdne]);

  // Ukazovateľ postupu. Model nehlási, ako ďaleko je, takže postup odhadujeme
  // časom a pred cieľom ho zabrzdíme — nikdy nedobehne na 100 % sám od seba.
  useEffect(() => {
    if (faza !== "generuje") return;
    const id = setInterval(() => {
      setPostup((p) => (p >= 95 ? p : p + Math.max(0.4, (96 - p) / 38)));
    }, 240);
    return () => clearInterval(id);
  }, [faza]);

  const fazaText = FAZY_GENEROVANIA.find((f) => postup < f.do)?.text ?? "Fast fertig";

  /**
   * Zdieľanie hotovej vizualizácie. O pergole sa doma rozhoduje vo dvojici,
   * takže „pošli to partnerovi" je najprirodzenejší ďalší krok.
   */
  const [vieZdielat, setVieZdielat] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setVieZdielat(typeof navigator !== "undefined" && typeof navigator.canShare === "function");
    }, 0);
    return () => clearTimeout(t);
  }, []);

  async function zdielat() {
    if (!obrazek) return;
    try {
      const blob = await (await fetch(obrazek)).blob();
      const file = new File([blob], "ws-wintergarten-visualisierung.jpg", { type: blob.type || "image/jpeg" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Meine Visualisierung von WS Wintergarten",
          text: `${produktData.nazev} — ${farbaData.nazev}`,
        });
      }
    } catch {
      // Používateľ zdieľanie zrušil alebo ho systém odmietol — nič neriešime.
    }
  }

  /** Prepnutie na skôr vygenerovanú variantu. */
  function zobrazVariantu(v: Varianta) {
    setAktivnaId(v.id);
    setFaza(odemknuto ? "odemceno" : "zamceno");
    setChyba(null);
  }

  async function vybratFotku(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > MAX_FOTKA_MB * 1024 * 1024) {
      setChyba(`Das Foto ist zu groß (max. ${MAX_FOTKA_MB} MB).`);
      return;
    }
    try {
      setFotka(await zmensitFotku(file));
      setChyba(null);
    } catch {
      setChyba("Das Foto konnte nicht geladen werden. Bitte versuchen Sie ein anderes.");
    }
  }

  async function generovat() {
    setFaza("generuje");
    setPostup(0);
    setChyba(null);
    setTimeout(() => vysledekRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);

    try {
      const res = await fetch("/api/vizualizacia/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produkt, farba, prostredi, photo: fotka ?? undefined }),
      });
      const json = await res.json();
      if (!res.ok) {
        setChyba(json?.error ?? "Die Visualisierung konnte nicht erstellt werden.");
        setFaza("nastaveni");
        return;
      }
      setPostup(100);
      const nova: Varianta = {
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : String(Date.now()),
        image: json.image,
        produkt,
        farba,
        fotka,
      };
      setVarianty((v) => [...v, nova]);
      setAktivnaId(nova.id);
      setFaza(odemknuto ? "odemceno" : "zamceno");
    } catch {
      setChyba("Die Verbindung ist fehlgeschlagen. Bitte prüfen Sie Ihre Verbindung und versuchen es erneut.");
      setFaza("nastaveni");
    }
  }

  function znovu() {
    // Varianty necháme — filmový pás pod plátnom sa k nim vie vrátiť.
    setFaza("nastaveni");
    setAktivnaId(null);
    setChyba(null);
    setSrovnani(true);
  }

  /** Koľko krokov má návštevník za sebou — plní prúžok nad panelom. */
  const hotovoKrokov = 2 + (fotka ? 1 : 0);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,390px)_minmax(0,1fr)] gap-6 lg:gap-12 items-start">
        {/* ── Panel nastavení ─────────────────────────────────────────── */}
        <Odhalit className="lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-brown/[0.07] shadow-[0_18px_60px_-24px_rgba(63,34,17,0.26)]">
            {/* prúžok postupu výberom */}
            <div className="h-1 w-full bg-brown/[0.06]">
              <div
                className="h-full bg-gradient-to-r from-gold/70 to-gold transition-[width] duration-500 ease-out"
                style={{ width: `${(hotovoKrokov / 3) * 100}%` }}
              />
            </div>

            <div className="p-6 sm:p-8">
              <Krok cislo={1} titulek="Was interessiert Sie" />
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {PRODUKTY.map((p) => {
                  const aktivni = p.kod === produkt;
                  return (
                    <button
                      key={p.kod}
                      type="button"
                      onClick={() => setProdukt(p.kod)}
                      className={cn(
                        "group relative overflow-hidden text-left rounded-2xl px-3.5 py-3.5 ring-1 transition-all duration-300 active:scale-[0.97]",
                        aktivni
                          ? "bg-brown ring-brown shadow-[0_14px_30px_-10px_rgba(63,34,17,0.5)] -translate-y-1"
                          : "bg-cream/30 ring-brown/[0.08] hover:ring-gold hover:bg-gold/[0.07] hover:shadow-[0_10px_26px_-10px_rgba(203,171,88,0.55)] hover:-translate-y-1"
                      )}
                    >
                      <div
                        className={cn(
                          "font-display font-semibold text-sm leading-snug pr-5 transition-colors",
                          aktivni ? "text-white" : "text-brown"
                        )}
                      >
                        {p.nazev}
                      </div>
                      <div
                        className={cn(
                          "text-[11px] leading-snug mt-1 transition-colors",
                          aktivni ? "text-cream/65" : "text-mutedbrand"
                        )}
                      >
                        {p.popis}
                      </div>
                      <span
                        className={cn(
                          "absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold transition-all duration-300",
                          aktivni ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        )}
                      >
                        <Check size={11} strokeWidth={3} className="text-brown" />
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8">
                <Krok cislo={2} titulek="Farbe der Konstruktion" />
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {FARBY.map((f) => {
                    const aktivni = f.kod === farba;
                    return (
                      <button
                        key={f.kod}
                        type="button"
                        onClick={() => setFarba(f.kod)}
                        title={f.kod}
                        aria-label={f.nazev}
                        className={cn(
                          "group relative h-11 w-11 rounded-full transition-all duration-300 active:scale-95",
                          aktivni
                            ? "ring-2 ring-gold ring-offset-2 ring-offset-white scale-110"
                            : "ring-1 ring-brown/15 hover:ring-brown/40 hover:scale-105"
                        )}
                        style={{ backgroundColor: f.swatch }}
                      >
                        <Check
                          size={16}
                          strokeWidth={3}
                          className={cn(
                            "absolute inset-0 m-auto transition-all duration-300",
                            aktivni ? "scale-100 opacity-100" : "scale-50 opacity-0",
                            f.swatch === "#F2F0EA" || f.swatch === "#A7ABAD" ? "text-brown" : "text-white"
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
                <div key={panelFarba.kod} className="mt-4 flex items-center gap-2 reveal">
                  <p className="text-xs text-mutedbrand">
                    <span className="font-semibold text-brown">{panelFarba.nazev}</span>
                    <span className="mx-1.5 text-brown/20">·</span>
                    {panelFarba.kod}
                  </p>
                  {panelFarba.oblibene && (
                    <span className="shrink-0 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-brown ring-1 ring-gold/30">
                      Beliebteste Wahl
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <Krok cislo={3} titulek="Wohin damit" />

                {fotka ? (
                  <div className="mt-4 relative rounded-2xl overflow-hidden ring-1 ring-brown/10 reveal">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={fotka} alt="Ihr Foto" className="w-full h-36 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brown/75 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
                      <span className="text-white text-xs font-semibold">Ihr Foto</span>
                      <button
                        type="button"
                        onClick={() => setFotka(null)}
                        className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brown hover:bg-white transition-colors"
                      >
                        <Trash2 size={11} />
                        Entfernen
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mt-4 space-y-2">
                      {PROSTREDI.map((p) => {
                        const aktivni = p.kod === prostredi;
                        return (
                          <button
                            key={p.kod}
                            type="button"
                            onClick={() => setProstredi(p.kod)}
                            className={cn(
                              "w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 ring-1 text-left transition-all duration-300",
                              aktivni
                                ? "bg-gold/10 ring-gold/50"
                                : "bg-cream/25 ring-brown/[0.07] hover:ring-gold/60 hover:bg-gold/[0.06]"
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full ring-1 transition-colors",
                                aktivni ? "bg-gold ring-gold" : "bg-white ring-brown/20"
                              )}
                            >
                              <Check
                                size={10}
                                strokeWidth={3}
                                className={cn("text-brown transition-all", aktivni ? "scale-100" : "scale-0")}
                              />
                            </span>
                            <span className="text-sm font-medium text-brown">{p.nazev}</span>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => souborRef.current?.click()}
                      className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-brown/20 px-4 py-3 text-sm font-semibold text-brown hover:border-gold hover:bg-gold/[0.08] hover:text-gold transition-colors"
                    >
                      <ImagePlus size={15} className="text-gold" />
                      Foto hochladen
                    </button>
                    <p className="mt-2 text-[11px] leading-relaxed text-mutedbrand">
                      Mit Ihrem eigenen Foto sehen Sie die Konstruktion direkt an Ihrem Haus —
                      und können sie mit dem heutigen Zustand vergleichen.
                    </p>
                  </>
                )}

                <input
                  ref={souborRef}
                  type="file"
                  accept="image/*"
                  onChange={vybratFotku}
                  className="hidden"
                />
              </div>

              <button
                type="button"
                onClick={generovat}
                disabled={faza === "generuje"}
                className="relative mt-8 w-full group inline-flex justify-center items-center gap-2 overflow-hidden px-6 py-4 bg-gold hover:bg-gold-hover disabled:bg-brown/15 disabled:text-brown/40 text-brown hover:text-white font-semibold rounded-full transition-all shadow-[0_8px_24px_rgba(203,171,88,0.35)] hover:shadow-[0_18px_40px_rgba(203,171,88,0.45)] hover:-translate-y-0.5 disabled:translate-y-0 disabled:shadow-none"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                {faza === "generuje" ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Wird erstellt…
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />
                    Visualisierung erstellen
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-[11px] text-mutedbrand">
                Kostenlos und unverbindlich · in etwa einer Minute fertig
              </p>
            </div>
          </div>
        </Odhalit>

        {/* ── Plátno ───────────────────────────────────────────────────── */}
        <Odhalit delay={120}>
          <div ref={vysledekRef}>
            <div
              ref={platnoRef}
              onMouseMove={sledujMys}
              onMouseLeave={zrusNaklon}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-cream ring-1 ring-brown/[0.08] shadow-[0_28px_80px_-28px_rgba(63,34,17,0.38)] transition-transform duration-300 ease-out will-change-transform motion-reduce:transform-none"
              style={{ transform: "perspective(1400px) rotateX(0deg) rotateY(0deg)" }}
            >
              {/* prázdny stav — bežia skutočné realizácie */}
              {prazdne && (
                <div className="absolute inset-0">
                  {UKAZKY.map((u, i) => (
                    <div
                      key={u.src}
                      className={cn(
                        "absolute inset-0 transition-opacity duration-[1600ms] ease-in-out",
                        i === ukazka ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <Image
                        src={u.src}
                        alt=""
                        fill
                        sizes="(min-width:1024px) 60vw, 100vw"
                        priority={i === 0}
                        className={cn("object-cover", i === ukazka && "ws-kenburns")}
                      />
                    </div>
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/92 via-brown/40 to-brown/10" />
                  {/* mäkká tmavá šošovka pod textom — fotky sú rôzne svetlé */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse 60% 45% at 50% 46%, rgba(63,34,17,0.62), transparent 72%)" }}
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                    <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-md">
                      <span className="absolute inset-0 rounded-full ring-1 ring-gold/40 animate-ping [animation-duration:3s]" />
                      <Sparkles size={22} className="text-gold" />
                    </span>
                    <h3 className="mt-5 font-display text-xl sm:text-2xl font-bold text-white">
                      Hier erscheint Ihre Visualisierung
                    </h3>
                    <p className="mt-2.5 text-sm text-cream/80 max-w-sm mx-auto leading-relaxed">
                      Wählen Sie links Produkt und Farbe. Im Hintergrund laufen unsere echten
                      Projekte — genau nach ihnen entsteht Ihr Entwurf.
                    </p>
                  </div>

                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {UKAZKY.map((u, i) => (
                      <span
                        key={u.src}
                        className={cn(
                          "h-1 rounded-full transition-all duration-500",
                          i === ukazka ? "w-6 bg-gold" : "w-1.5 bg-white/40"
                        )}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* generovanie — fázy, postup a skenovanie */}
              {faza === "generuje" && (
                <div className="absolute inset-0 bg-brown">
                  {/* Podklad: ak máme fotku domu, skenujeme priamo ju. */}
                  {fotka && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={fotka} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(203,171,88,0.16)_50%,transparent_75%)] bg-[length:220%_100%] animate-[ws-sheen_2.2s_linear_infinite]" />
                  {/* skenovacia linka + mriežka — „niečo sa tu meria" */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.16]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(203,171,88,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(203,171,88,0.9) 1px, transparent 1px)",
                      backgroundSize: "48px 48px",
                    }}
                  />
                  <div aria-hidden className="ws-scan absolute inset-x-0 h-24">
                    <div className="h-full w-full bg-gradient-to-b from-transparent via-gold/25 to-transparent" />
                    <div className="h-px w-full bg-gold/80 shadow-[0_0_16px_rgba(203,171,88,0.9)]" />
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                    <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 ring-1 ring-gold/40">
                      <span className="absolute inset-0 rounded-full ring-2 ring-gold/30 animate-ping [animation-duration:2.4s]" />
                      <Loader2 size={22} className="text-gold animate-spin" />
                    </span>
                    <h3 key={fazaText} className="mt-5 font-display text-xl sm:text-2xl font-bold text-white reveal">
                      {fazaText}…
                    </h3>
                    <p className="mt-2 text-sm text-cream/60">
                      {panelProdukt.nazev.toLowerCase()} · {panelFarba.nazev.toLowerCase()}
                    </p>

                    <div className="mt-7 w-full max-w-xs">
                      <div className="h-1 w-full overflow-hidden rounded-full bg-white/15">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-gold/70 to-gold transition-[width] duration-300 ease-out"
                          style={{ width: `${postup}%` }}
                        />
                      </div>
                      <div className="mt-2 text-[11px] tabular-nums text-cream/50">
                        {Math.round(postup)} %
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* výsledok */}
              {obrazek && faza !== "generuje" && (
                <>
                  {faza === "odemceno" && aktivna?.fotka && srovnani ? (
                    <PredPo pred={aktivna.fotka} po={obrazek} />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={obrazek}
                      alt={
                        faza === "odemceno"
                          ? `${produktData.nazev} — ${farbaData.nazev}`
                          : "Unscharfe Vorschau der Visualisierung"
                      }
                      className={cn(
                        "absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-[900ms] ease-out",
                        faza === "zamceno" ? "blur-2xl scale-110" : "blur-0 scale-100"
                      )}
                    />
                  )}

                  {faza === "zamceno" && (
                    <button
                      type="button"
                      onClick={() => setFormOtevren(true)}
                      aria-label="Visualisierung anzeigen"
                      className="group absolute inset-0 flex flex-col items-center justify-center text-center px-8 cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-brown/55 transition-colors group-hover:bg-brown/45" />
                      <div className="relative">
                        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-300 group-hover:scale-105">
                          <Lock size={24} className="text-brown" />
                        </span>
                        <h3 className="mt-5 font-display text-xl sm:text-2xl font-bold text-white">
                          Ihre Visualisierung ist fertig
                        </h3>
                        <p className="mt-2.5 text-sm text-cream/85 max-w-sm mx-auto leading-relaxed">
                          Kontaktdaten eingeben und Sie sehen sie sofort in voller Qualität —
                          samt Preisrahmen von unserem Techniker.
                        </p>
                        <span className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 bg-gold group-hover:bg-gold-hover text-brown group-hover:text-white font-semibold rounded-full transition-colors shadow-[0_8px_24px_rgba(203,171,88,0.4)]">
                          Visualisierung anzeigen
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </button>
                  )}

                  {faza === "odemceno" && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl bg-white/92 backdrop-blur-sm px-4 py-3">
                        <div className="min-w-0">
                          <div className="text-eyebrow text-gold">{produktData.nazev}</div>
                          <div className="font-display font-semibold text-brown truncate">
                            {farbaData.nazev}
                          </div>
                        </div>
                        <a
                          href={obrazek}
                          download="ws-wintergarten-visualisierung.jpg"
                          className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-brown px-4 py-2 text-xs font-semibold text-white hover:bg-charcoal transition-colors"
                        >
                          Herunterladen
                        </a>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {chyba && (
              <div className="mt-4 rounded-2xl bg-red-50 ring-1 ring-red-200 px-4 py-3 text-sm text-red-800 reveal">
                {chyba}
              </div>
            )}

            {/* Po odomknutí už kontakt máme — ďalšie CTA by bolo len otravné. */}
            {faza === "odemceno" && (
              <div className="mt-4 flex flex-wrap items-center gap-3 reveal">
                <button
                  type="button"
                  onClick={znovu}
                  className="inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full border-2 border-brown/15 hover:border-gold text-brown hover:text-gold font-semibold text-sm transition-colors"
                >
                  <RotateCcw size={15} />
                  Andere Variante testen
                </button>

                {vieZdielat && (
                  <button
                    type="button"
                    onClick={zdielat}
                    className="inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full bg-cream/70 hover:bg-gold/15 text-brown font-semibold text-sm transition-colors"
                  >
                    <Share2 size={15} className="text-gold" />
                  Visualisierung senden
                  </button>
                )}

                {aktivna?.fotka && (
                  <button
                    type="button"
                    onClick={() => setSrovnani((v) => !v)}
                    className="inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full bg-cream/70 hover:bg-cream text-brown font-semibold text-sm transition-colors"
                  >
                    <MoveHorizontal size={15} className="text-gold" />
                    {srovnani ? "Nur Visualisierung zeigen" : "Mit Originalfoto vergleichen"}
                  </button>
                )}
              </div>
            )}

            {varianty.length > 1 && (
              <div className="mt-5 reveal">
                <p className="text-eyebrow text-mutedbrand/70 mb-3">
                  Ihre Varianten · {varianty.length}
                </p>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                  {varianty.map((v) => {
                    const vp = PRODUKTY.find((p) => p.kod === v.produkt);
                    const vf = FARBY.find((f) => f.kod === v.farba);
                    const je = v.id === aktivnaId;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => zobrazVariantu(v)}
                        title={`${vp?.nazev} — ${vf?.nazev}`}
                        className={cn(
                          "group relative h-20 w-28 shrink-0 overflow-hidden rounded-xl transition-all duration-300",
                          je
                            ? "ring-2 ring-gold ring-offset-2 ring-offset-white"
                            : "ring-1 ring-brown/10 hover:ring-brown/30 opacity-75 hover:opacity-100"
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={v.image}
                          alt=""
                          className={cn(
                            "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                            !odemknuto && "blur-md scale-110"
                          )}
                        />
                        <span
                          className="absolute bottom-1.5 left-1.5 h-3.5 w-3.5 rounded-full ring-1 ring-white/80"
                          style={{ backgroundColor: vf?.swatch }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="mt-5 text-xs leading-relaxed text-mutedbrand">
              Die Visualisierung ist ein illustrativer Entwurf, erstellt mit künstlicher
              Intelligenz auf Basis unserer echten Projekte. Maße, Ausführung und Preis
              bestätigt unser Techniker nach dem Aufmaß.
            </p>
          </div>
        </Odhalit>
      </div>

      {formOtevren && (
        <OdemykaciFormular
          produkt={produkt}
          farba={farba}
          produktNazev={produktData.nazev}
          farbaNazev={farbaData.nazev}
          onZavrit={() => setFormOtevren(false)}
          onHotovo={() => {
            setFormOtevren(false);
            setOdemknuto(true);
            setFaza("odemceno");
          }}
        />
      )}
    </>
  );
}

function Krok({ cislo, titulek }: { cislo: number; titulek: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brown text-[11px] font-bold text-cream">
        {cislo}
      </span>
      <h3 className="font-display text-base font-semibold text-brown whitespace-nowrap">
        {titulek}
      </h3>
      {/* vlasová linka dotiahne riadok do kraja — drží panel uprataný */}
      <span aria-hidden className="h-px flex-1 bg-brown/[0.07]" />
    </div>
  );
}

// ── Formulár ────────────────────────────────────────────────────────────────

function OdemykaciFormular({
  produkt,
  farba,
  produktNazev,
  farbaNazev,
  onZavrit,
  onHotovo,
}: {
  /** kódy z číselníka — posielajú sa na server */
  produkt: string;
  farba: string;
  /** názvy pre text vo formulári */
  produktNazev: string;
  farbaNazev: string;
  onZavrit: () => void;
  onHotovo: () => void;
}) {
  const [jmeno, setJmeno] = useState("");
  const [prijmeni, setPrijmeni] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [kraj, setKraj] = useState("");
  const [souhlas, setSouhlas] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  const [odesila, setOdesila] = useState(false);
  const [chyby, setChyby] = useState<string[]>([]);

  async function odeslat(e: React.FormEvent) {
    e.preventDefault();
    const nove: string[] = [];
    if (jmeno.trim().length < 2) nove.push("jmeno");
    if (prijmeni.trim().length < 2) nove.push("prijmeni");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nove.push("email");
    if (!/^\d{9,15}$/.test(telefon.replace(/[\s\-+/()]/g, ""))) nove.push("telefon");
    if (!kraj) nove.push("kraj");
    if (!souhlas) nove.push("souhlas");
    setChyby(nove);
    if (nove.length > 0) return;

    setOdesila(true);
    try {
      await fetch("/api/vizualizacia-lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jmeno: jmeno.trim(),
          prijmeni: prijmeni.trim(),
          email: email.trim(),
          telefon: telefon.trim(),
          kraj,
          produkt,
          farba,
          consent: true,
          website,
        }),
      });
    } catch {
      // Lead sa nepodarilo odoslať, ale návštevníkovi vizualizáciu neberieme —
      // chyba je zalogovaná na serveri.
    }
    setOdesila(false);
    onHotovo();
  }

  const chybny = (pole: string) => chyby.includes(pole);
  const inputClass = (pole: string) =>
    cn(
      "w-full rounded-xl bg-cream/40 px-4 py-3 text-sm text-brown placeholder:text-mutedbrand/70 ring-1 transition-all outline-none",
      chybny(pole)
        ? "ring-red-400 bg-red-50/50 focus:ring-red-500"
        : "ring-brown/[0.09] focus:ring-2 focus:ring-gold focus:bg-white"
    );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-brown/70 backdrop-blur-sm"
        onClick={onZavrit}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="vizu-form-titulek"
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl reveal"
      >
        <button
          type="button"
          onClick={onZavrit}
          aria-label="Schließen"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream/70 text-brown hover:bg-cream transition-colors"
        >
          <X size={17} />
        </button>

        <div className="px-6 sm:px-8 pt-8 pb-7">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 ring-1 ring-gold/30">
            <Sparkles size={19} className="text-gold" />
          </span>
          <h2 id="vizu-form-titulek" className="mt-4 font-display text-2xl font-bold text-brown">
            Noch ein Schritt, dann ist sie Ihre
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-mutedbrand">
            Kontaktdaten eingeben und die Visualisierung wird sofort freigeschaltet.
            Wir melden uns mit einem Preisrahmen für <span className="font-semibold text-brown">{produktNazev}</span> in{" "}
            <span className="font-semibold text-brown">{farbaNazev}</span>.
          </p>

          <form onSubmit={odeslat} className="mt-6 space-y-3" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="vizu-jmeno" className="sr-only">Vorname</label>
                <input
                  id="vizu-jmeno"
                  value={jmeno}
                  onChange={(e) => setJmeno(e.target.value)}
                  placeholder="Vorname"
                  autoComplete="given-name"
                  className={inputClass("jmeno")}
                />
              </div>
              <div>
                <label htmlFor="vizu-prijmeni" className="sr-only">Nachname</label>
                <input
                  id="vizu-prijmeni"
                  value={prijmeni}
                  onChange={(e) => setPrijmeni(e.target.value)}
                  placeholder="Nachname"
                  autoComplete="family-name"
                  className={inputClass("prijmeni")}
                />
              </div>
            </div>

            <div>
              <label htmlFor="vizu-email" className="sr-only">E-Mail</label>
              <input
                id="vizu-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-Mail"
                autoComplete="email"
                className={inputClass("email")}
              />
            </div>

            <div>
              <label htmlFor="vizu-telefon" className="sr-only">Telefonnummer</label>
              <input
                id="vizu-telefon"
                type="tel"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                placeholder="Telefonnummer"
                autoComplete="tel"
                className={inputClass("telefon")}
              />
            </div>

            <div>
              <label htmlFor="vizu-kraj" className="sr-only">Bundesland</label>
              <select
                id="vizu-kraj"
                value={kraj}
                onChange={(e) => setKraj(e.target.value)}
                className={cn(inputClass("kraj"), !kraj && "text-mutedbrand/70")}
              >
                <option value="">Bundesland</option>
                {KRAJE.map((k) => (
                  <option key={k} value={k} className="text-brown">
                    {k}
                  </option>
                ))}
              </select>
            </div>

            {/* honeypot — skrytý pre ľudí, boti ho vyplnia */}
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
              <span
                className={cn(
                  "mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] ring-1 transition-colors",
                  souhlas ? "bg-gold ring-gold" : chybny("souhlas") ? "bg-white ring-red-400" : "bg-white ring-brown/25"
                )}
              >
                {souhlas && <Check size={12} strokeWidth={3} className="text-brown" />}
              </span>
              <input
                type="checkbox"
                checked={souhlas}
                onChange={(e) => setSouhlas(e.target.checked)}
                className="sr-only"
              />
              <span className="text-[12px] leading-relaxed text-mutedbrand">
                Ich bin mit der Verarbeitung meiner Daten zur Bearbeitung der Anfrage
                einverstanden. Mehr in der{" "}
                <Link href="/ochrana-osobnych-udajov" className="text-brown underline hover:text-gold">
                  Datenschutzerklärung
                </Link>
                .
              </span>
            </label>

            {chyby.length > 0 && (
              <p className="text-xs text-red-700">
                Bitte prüfen Sie die markierten Felder.
              </p>
            )}

            <button
              type="submit"
              disabled={odesila}
              className="w-full group inline-flex justify-center items-center gap-2 px-6 py-4 bg-gold hover:bg-gold-hover disabled:bg-brown/15 disabled:text-brown/40 text-brown hover:text-white font-semibold rounded-full transition-all shadow-[0_8px_24px_rgba(203,171,88,0.35)]"
            >
              {odesila ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Wird gesendet…
                </>
              ) : (
                <>
                  Visualisierung anzeigen
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-mutedbrand">
              Kein Spam. Es meldet sich unser Techniker, kein Roboter.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
