"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ws-consent-v1";
const REOPEN_EVENT = "ws-open-cookie-settings";

/**
 * Znovu otvorí lištu s nastavením cookies. GDPR vyžaduje, aby sa dal súhlas
 * odvolať rovnako ľahko, ako bol udelený — bez tohto by ho po prvej voľbe
 * už nebolo ako zmeniť.
 */
export function openCookieSettings() {
  window.dispatchEvent(new Event(REOPEN_EVENT));
}

type Consent = {
  necessary: true; // always granted
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

function setGtagConsent(c: Consent) {
  type WindowWithGtag = Window & {
    gtag?: (
      command: "consent",
      type: "update",
      params: Record<string, "granted" | "denied">
    ) => void;
  };
  const w = window as WindowWithGtag;
  if (typeof w.gtag !== "function") return;
  w.gtag("consent", "update", {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
    functionality_storage: c.preferences ? "granted" : "denied",
    personalization_storage: c.preferences ? "granted" : "denied",
  });
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<Consent>({
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setOpen(true);
        return;
      }
      const parsed = JSON.parse(stored) as Consent;
      setConsent(parsed);
      setGtagConsent(parsed);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    function reopen() {
      setShowDetails(true);
      setOpen(true);
    }
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, []);

  function commit(next: Consent) {
    setConsent(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setGtagConsent(next);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="fixed bottom-3 right-3 left-3 sm:bottom-5 sm:right-5 sm:left-auto sm:max-w-[480px] z-50 bg-white rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.18)] border border-cream p-5 sm:p-6"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
          <Cookie size={20} className="text-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-brown text-base">
            Diese Website verwendet Cookies
          </h3>
          <p className="text-xs text-mutedbrand mt-1.5 leading-relaxed">
            Cookies helfen uns, die Website zu verbessern, ihre Leistung zu messen und Werbung zu personalisieren.{" "}
            <Link href="/ochrana-osobnych-udajov" className="text-gold underline">
              Mehr erfahren
            </Link>
            .
          </p>
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Schließen"
          className="shrink-0 text-mutedbrand hover:text-brown transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {showDetails && (
        <div className="mt-5 space-y-3 border-t border-cream pt-4">
          <Option label="Notwendig" desc="Ohne sie funktioniert die Website nicht." checked disabled />
          <Option
            label="Analyse"
            desc="Helfen uns, die Website zu verbessern (GA4)."
            checked={consent.analytics}
            onChange={(v) => setConsent({ ...consent, analytics: v })}
          />
          <Option
            label="Marketing"
            desc="Für relevantere Werbung (Meta Pixel)."
            checked={consent.marketing}
            onChange={(v) => setConsent({ ...consent, marketing: v })}
          />
          <Option
            label="Präferenzen"
            desc="Speichern Ihrer Einstellungen."
            checked={consent.preferences}
            onChange={(v) => setConsent({ ...consent, preferences: v })}
          />
        </div>
      )}

      <div className="mt-5 flex flex-col sm:flex-row gap-2">
        <button
          onClick={() =>
            commit({ necessary: true, analytics: true, marketing: true, preferences: true })
          }
          className="flex-1 px-4 py-2.5 bg-gold hover:bg-gold-hover text-brown hover:text-white font-semibold text-sm rounded-full transition-all"
        >
          Alle zulassen
        </button>
        {showDetails ? (
          <button
            onClick={() => commit(consent)}
            className="px-4 py-2.5 border-2 border-brown/15 hover:border-gold text-brown hover:text-gold font-semibold text-sm rounded-full transition-colors"
          >
            Auswahl speichern
          </button>
        ) : (
          <button
            onClick={() => setShowDetails(true)}
            className="px-4 py-2.5 border-2 border-brown/15 hover:border-gold text-brown hover:text-gold font-semibold text-sm rounded-full transition-colors"
          >
            Einstellen
          </button>
        )}
        <button
          onClick={() =>
            commit({ necessary: true, analytics: false, marketing: false, preferences: false })
          }
          className="px-4 py-2.5 text-mutedbrand hover:text-brown font-medium text-sm transition-colors"
        >
          Ablehnen
        </button>
      </div>
    </div>
  );
}

function Option({
  label,
  desc,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label className={cn("flex items-start gap-3 cursor-pointer", disabled && "opacity-60 cursor-not-allowed")}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 accent-[#cbab58]"
      />
      <span className="flex-1">
        <span className="block text-sm font-semibold text-brown">{label}</span>
        <span className="block text-xs text-mutedbrand">{desc}</span>
      </span>
    </label>
  );
}
