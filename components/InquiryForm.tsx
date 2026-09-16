"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  variant?: "card" | "inline";
  defaultProduct?: string;
}

/**
 * Vlastné líniové značky produktov. Fotografie nesie zvyšok webu — tu by
 * súperili s obsahom, preto konštrukcie naznačuje jednoduchá kresba.
 */
const glyph = {
  strokeWidth: 1.25,
  className: "h-7 w-7",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

const PRODUCTS = [
  {
    name: "Pergola",
    icon: (
      <svg {...glyph}>
        <path d="M3 8h18" />
        <path d="M5.5 8v12M18.5 8v12" />
        <path d="M6 4.5h12" />
        <path d="M8 4.5V8M12 4.5V8M16 4.5V8" />
      </svg>
    ),
  },
  {
    name: "Wintergarten",
    icon: (
      <svg {...glyph}>
        <path d="M3 20V9.5L12 4l9 5.5V20" />
        <path d="M2.5 20h19" />
        <path d="M12 6.2V20" />
        <path d="M3.5 13.5h17" />
      </svg>
    ),
  },
  {
    name: "Verglasung",
    icon: (
      <svg {...glyph}>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="M9 5v14M15 5v14" />
      </svg>
    ),
  },
  {
    name: "Sonstiges",
    icon: (
      <svg {...glyph}>
        <path d="M12 6v12M6 12h12" />
      </svg>
    ),
  },
];

/** Kedy chce mať zákazník hotovo — pomáha nám plánovať výrobu */
const TIMING = ["So bald wie möglich", "In 3 Monaten", "In 6 Monaten", "Ich informiere mich noch"];

/** Záujem o bezplatnú obhliadku */
const CONSULT = ["Ja, gerne", "Vorerst nicht"];

/** Polia, ktoré tvoria ukazovateľ vyplnenosti */
const REQUIRED = ["name", "phone", "email"];

/** Marketingové parametre z adresy — chodia do Sheetu spolu s dopytom */
function trackingParams() {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  return {
    page: window.location.pathname,
    utmSource: q.get("utm_source") ?? "",
    utmMedium: q.get("utm_medium") ?? "",
    utmCampaign: q.get("utm_campaign") ?? "",
    utmTerm: q.get("utm_term") ?? "",
    utmContent: q.get("utm_content") ?? "",
    gclid: q.get("gclid") ?? "",
    referrer: document.referrer,
  };
}

export function InquiryForm({ variant = "card", defaultProduct = "" }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  const [product, setProduct] = useState(defaultProduct);
  const [timing, setTiming] = useState("");
  const [consult, setConsult] = useState("");
  const [progress, setProgress] = useState(0);
  /** Krátke potvrdenie cez celú obrazovku hneď po odoslaní */
  const [celebrate, setCelebrate] = useState(false);

  function recount(form: HTMLFormElement) {
    const filled = REQUIRED.filter((name) => {
      const el = form.elements.namedItem(name) as HTMLInputElement | null;
      return Boolean(el?.value.trim());
    }).length;
    const consent = form.elements.namedItem("consent") as HTMLInputElement | null;
    setProgress((filled + (consent?.checked ? 1 : 0)) / (REQUIRED.length + 1));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const data = new FormData(e.currentTarget);
    const text = (key: string) => String(data.get(key) ?? "").trim();

    try {
      // Lomka na konci je nutná — next.config.ts má trailingSlash: true,
      // bez nej by POST prešiel cez zbytočný 308 redirect.
      const response = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: text("product"),
          timing: text("timing"),
          consult: text("consult"),
          city: text("city"),
          psc: text("psc"),
          message: text("message"),
          name: text("name"),
          phone: text("phone"),
          email: text("email"),
          consent: data.get("consent") !== null,
          website: text("website"),
          ...trackingParams(),
        }),
      });

      if (!response.ok) throw new Error(`lead_${response.status}`);
    } catch {
      setStatus("idle");
      setError(
        "Das Absenden ist fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie uns an info@wswintergarten.de."
      );
      return;
    }

    setStatus("success");
    setCelebrate(true);
    window.setTimeout(() => setCelebrate(false), 2800);
  }

  const shell = cn(
    "relative overflow-hidden rounded-2xl bg-white ring-1 ring-brown/[0.08]",
    "shadow-[0_1px_2px_rgba(63,34,17,0.04),0_14px_36px_rgba(63,34,17,0.07)]",
    variant === "card" ? "p-7 lg:p-10" : "p-6 sm:p-8"
  );

  if (status === "success") {
    return (
      <>
        {/* Potvrdenie cez celú obrazovku — na pár sekúnd, potom sa stiahne */}
        {celebrate && (
          <div
            role="status"
            aria-live="polite"
            onClick={() => setCelebrate(false)}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-brown/95 backdrop-blur-md cursor-pointer px-6"
          >
            <div className="relative flex h-28 w-28 items-center justify-center">
              <span aria-hidden className="ws-ring absolute inset-0 rounded-full ring-2 ring-gold/40" />
              <span aria-hidden className="ws-ring-delayed absolute inset-0 rounded-full ring-2 ring-gold/25" />
              <span
                aria-hidden
                className="ws-pop absolute inset-0 rounded-full bg-gold/15 ring-1 ring-gold/50"
              />
              <Check size={52} className="ws-pop relative text-gold" strokeWidth={2.25} />
            </div>

            <p
              className="ws-rise mt-9 font-display text-3xl sm:text-4xl font-bold text-white text-center"
            >
              Ihre Anfrage ist unterwegs.
            </p>
            <p
              className="ws-rise mt-3 text-cream/70 text-center"
            >
              Vielen Dank. Wir melden uns schnellstmöglich.
            </p>
          </div>
        )}

        <div className={cn(shell, "text-center")}>
          <div className="ws-dialog-in py-8">
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
              <span aria-hidden className="absolute inset-0 rounded-full bg-gold/10 ring-1 ring-gold/35" />
              <Check size={28} className="relative text-gold" strokeWidth={2.5} />
            </div>

            <h3 className="mt-6 font-display text-2xl font-bold text-brown">
              Ihre Anfrage ist unterwegs.
            </h3>
            <p className="mt-2.5 text-mutedbrand">Vielen Dank.</p>
            <p className="mt-1 text-mutedbrand">Wir melden uns schnellstmöglich.</p>
          </div>
        </div>
      </>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      onInput={(e) => recount(e.currentTarget)}
      onChange={(e) => recount(e.currentTarget)}
      className={shell}
    >
      {/* Pasca na botov — človek toto pole nikdy nevidí, a teda ani nevyplní */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {/* Ukazovateľ vyplnenosti na hornej hrane */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-brown/[0.06]" />
      <span
        aria-hidden
        className="absolute left-0 top-0 h-0.5 bg-gold transition-[width] duration-500 ease-out"
        style={{ width: `${progress * 100}%` }}
      />

      {/* Hlavička so stavovým indikátorom */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-brown leading-tight">
            Angebot binnen 24 Stunden
          </h3>
          <p className="mt-2 text-sm text-mutedbrand">
            Sagen Sie uns, was Sie vorhaben. Wir melden uns mit einer Lösung nach Maß.
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-gold/10 px-3 py-1.5 ring-1 ring-gold/25">
          <span className="relative flex h-1.5 w-1.5">
            <span
              aria-hidden
              className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-70 animate-ping [animation-duration:2.4s]"
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-brown/70">
            Antwort noch heute
          </span>
        </span>
      </div>

      {/* Výber produktu */}
      <div className="mt-9">
        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mutedbrand mb-3">
          Für welches Produkt interessieren Sie sich?
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PRODUCTS.map((p) => {
            const selected = product === p.name;
            return (
              <label
                key={p.name}
                className={cn(
                  "group/card relative flex cursor-pointer select-none flex-col items-center justify-center gap-3",
                  "rounded-xl px-3 py-5 ring-1 transition-all duration-200 ease-out active:scale-[0.98]",
                  selected
                    ? "bg-gold/[0.07] ring-2 ring-gold -translate-y-0.5"
                    : "bg-white ring-brown/10 hover:ring-gold/40 hover:-translate-y-0.5"
                )}
              >
                <input
                  type="radio"
                  name="product"
                  value={p.name}
                  checked={selected}
                  onChange={(e) => setProduct(e.target.value)}
                  className="sr-only"
                />

                <span
                  className={cn(
                    "transition-colors duration-200",
                    selected ? "text-gold" : "text-mutedbrand/70 group-hover/card:text-gold/80"
                  )}
                >
                  {p.icon}
                </span>

                <span
                  className={cn(
                    "text-center text-xs leading-tight transition-colors duration-200",
                    selected ? "font-semibold text-brown" : "text-mutedbrand group-hover/card:text-brown"
                  )}
                >
                  {p.name}
                </span>

                {/* Potvrdenie voľby */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute right-2 top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gold",
                    "transition-all duration-200 ease-out",
                    selected ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  )}
                >
                  <Check size={11} strokeWidth={3} className="text-brown" />
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Termín realizácie */}
      <div className="mt-8">
        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mutedbrand mb-3">
          Wann möchten Sie fertig sein?
        </span>
        <div className="flex flex-wrap gap-2">
          {TIMING.map((t) => (
            <Chip
              key={t}
              name="timing"
              value={t}
              selected={timing === t}
              onSelect={setTiming}
            />
          ))}
        </div>
      </div>

      {/* Bezplatná obhliadka */}
      <div className="mt-8">
        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mutedbrand mb-3">
          Möchten Sie eine kostenlose Beratung und einen Vor-Ort-Termin?
        </span>
        <div className="flex flex-wrap gap-2">
          {CONSULT.map((c) => (
            <Chip
              key={c}
              name="consult"
              value={c}
              selected={consult === c}
              onSelect={setConsult}
            />
          ))}
        </div>
      </div>

      {/* Kde staviame */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
        <Field label="Ort" name="city" placeholder="Wien" />
        <Field label="PLZ" name="psc" placeholder="1010" />
        <div className="sm:col-span-2">
          <TextareaField
            label="Kurze Beschreibung (optional)"
            name="message"
            placeholder="Zum Beispiel: Terrasse 5×4 m, Südausrichtung, Holzhaus …"
          />
        </div>
      </div>

      {/* Kontakt — až na záver, keď je projekt popísaný */}
      <div className="mt-9 border-t border-brown/[0.08] pt-8">
        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mutedbrand mb-5">
          Kontaktdaten
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
          <Field label="Vor- und Nachname *" name="name" required placeholder="Max Mustermann" />
          <Field label="Telefon *" name="phone" type="tel" required placeholder="+43 660 1234567" />
          <div className="sm:col-span-2">
            <Field label="E-Mail *" name="email" type="email" required placeholder="ihre@adresse.at" />
          </div>
          <label className="sm:col-span-2 flex items-start gap-3 text-xs text-mutedbrand cursor-pointer group/check">
          <input type="checkbox" name="consent" required className="peer sr-only" />
          <span
            aria-hidden
            className={cn(
              "mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px]",
              "ring-1 ring-brown/20 transition-colors duration-200",
              "group-hover/check:ring-gold/60",
              "peer-checked:bg-gold peer-checked:ring-gold",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-gold",
              "peer-checked:[&_svg]:opacity-100"
            )}
          >
            <Check size={12} strokeWidth={3} className="text-brown opacity-0 transition-opacity duration-200" />
          </span>
          <span>
            Ich stimme der Verarbeitung meiner personenbezogenen Daten gemäß{" "}
            <Link
              href="/ochrana-osobnych-udajov"
              className="text-brown underline decoration-brown/25 underline-offset-2 transition-colors hover:text-gold hover:decoration-gold"
            >
              Datenschutzerklärung
            </Link>
            .
            </span>
          </label>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-7 rounded-xl bg-gold/[0.08] px-4 py-3 text-sm text-brown ring-1 ring-gold/30"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className={cn(
          "group relative mt-9 w-full overflow-hidden rounded-full px-7 py-4",
          "bg-gold text-brown font-semibold",
          "transition-[background-color,color,transform] duration-200",
          "hover:bg-gold-hover hover:text-white active:scale-[0.99]",
          "disabled:cursor-wait"
        )}
      >
        <span
          className={cn(
            "inline-flex items-center justify-center gap-2 transition-all duration-200",
            sending ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
          )}
        >
          Anfrage absenden
          <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>

        {/* Priebeh odosielania */}
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-2.5 transition-opacity duration-200",
            sending ? "opacity-100" : "opacity-0"
          )}
        >
          <span
            aria-hidden
            className="h-4 w-4 rounded-full border-2 border-brown/25 border-t-brown animate-spin"
          />
          Wird gesendet …
        </span>
      </button>
    </form>
  );
}

/** Textová voľba — použitá pri termíne realizácie a pri obhliadke */
function Chip({
  name,
  value,
  selected,
  onSelect,
}: {
  name: string;
  value: string;
  selected: boolean;
  onSelect: (v: string) => void;
}) {
  return (
    <label
      className={cn(
        "cursor-pointer select-none rounded-full px-4 py-2.5 text-sm",
        "ring-1 transition-all duration-200 active:scale-[0.98]",
        selected
          ? "bg-gold/[0.12] text-brown font-semibold ring-gold"
          : "bg-white text-mutedbrand ring-brown/10 hover:text-brown hover:ring-gold/40"
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="sr-only"
      />
      {value}
    </label>
  );
}

/**
 * Podčiarknuté pole s plávajúcim popiskom. Podčiarknutie sa pri zameraní
 * vykreslí zľava doprava, vyplnené pole potvrdí drobná fajka.
 */
function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className="relative">
      <input
        {...props}
        id={id}
        className={cn(
          "peer w-full bg-transparent pt-5 pb-2.5 pr-6 text-charcoal",
          "border-b border-brown/15 outline-none transition-colors duration-200",
          "placeholder:text-transparent focus:placeholder:text-mutedbrand/40",
          "hover:border-brown/30"
        )}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out peer-focus:scale-x-100"
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 top-5 text-sm text-mutedbrand",
          "transition-all duration-200 ease-out",
          "peer-focus:top-0 peer-focus:text-[0.7rem] peer-focus:tracking-[0.1em] peer-focus:text-gold",
          "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:tracking-[0.1em]"
        )}
      >
        {label}
      </label>
      <Check
        aria-hidden
        size={15}
        strokeWidth={2.5}
        className={cn(
          "pointer-events-none absolute right-0 bottom-3 text-gold",
          "opacity-0 transition-opacity duration-200",
          "peer-[:not(:placeholder-shown)]:opacity-100"
        )}
      />
    </div>
  );
}

function TextareaField({
  label,
  ...props
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <div className="relative">
      <textarea
        {...props}
        id={id}
        rows={3}
        className={cn(
          "peer w-full resize-none bg-transparent pt-5 pb-2.5 text-charcoal",
          "border-b border-brown/15 outline-none transition-colors duration-200",
          "placeholder:text-transparent focus:placeholder:text-mutedbrand/40",
          "hover:border-brown/30"
        )}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out peer-focus:scale-x-100"
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 top-5 text-sm text-mutedbrand",
          "transition-all duration-200 ease-out",
          "peer-focus:top-0 peer-focus:text-[0.7rem] peer-focus:tracking-[0.1em] peer-focus:text-gold",
          "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:tracking-[0.1em]"
        )}
      >
        {label}
      </label>
    </div>
  );
}
