"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Tenký ukazovateľ prečítaného pri hornom okraji okna.
 *
 * Obsah článku má svoj vlastný v bočnom stĺpci, ale ten je len na širokej
 * obrazovke — tento vidno aj na mobile.
 */
export function ReadingProgress() {
  const [postup, setPostup] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const prepocet = () => {
      ticking.current = false;
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
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent" aria-hidden>
      <div
        className="h-full bg-gradient-to-r from-gold/60 to-gold transition-[width] duration-150 ease-out"
        style={{ width: `${postup}%` }}
      />
    </div>
  );
}

/** Zdieľanie článku — odkaz do schránky, Facebook, WhatsApp, e-mail. */
export function ArticleShare({ title }: { title: string }) {
  const [zkopirovano, setZkopirovano] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    // window je dostupné až na klientovi, preto až v efekte
    const t = setTimeout(() => setUrl(window.location.href), 0);
    return () => clearTimeout(t);
  }, []);

  async function zkopirovat() {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setZkopirovano(true);
      setTimeout(() => setZkopirovano(false), 2000);
    } catch {
      // Schránka nemusí byť povolená — tlačidlo potom nič neurobí.
    }
  }

  // lucide v1 už neobsahuje značkové ikony — Facebook nakreslíme ako malé SVG.
  const Facebook = (props: { size?: number; className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      width={props.size ?? 14}
      height={props.size ?? 14}
      fill="currentColor"
      aria-hidden
      className={props.className}
    >
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.12-2.4-.12-2.38 0-4 1.45-4 4.11V9.9H7.6V13h2.7v8h3.2z" />
    </svg>
  );

  const enc = encodeURIComponent;
  const odkazy = [
    { nazev: "Facebook", ikona: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { nazev: "WhatsApp", ikona: MessageCircle, href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
    { nazev: "E-Mail", ikona: Mail, href: `mailto:?subject=${enc(title)}&body=${enc(url)}` },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="text-xs font-semibold text-mutedbrand">Teilen:</span>

      <button
        type="button"
        onClick={zkopirovat}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors",
          zkopirovano ? "bg-gold/20 text-brown" : "bg-cream/60 text-brown hover:bg-gold/15"
        )}
      >
        {zkopirovano ? <Check size={13} /> : <Link2 size={13} />}
        {zkopirovano ? "Kopiert" : "Link"}
      </button>

      {odkazy.map((o) => {
        const Ikona = o.ikona;
        return (
          <a
            key={o.nazev}
            href={url ? o.href : "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Auf ${o.nazev} teilen`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cream/60 text-brown transition-colors hover:bg-gold/15"
          >
            <Ikona size={14} />
          </a>
        );
      })}
    </div>
  );
}
