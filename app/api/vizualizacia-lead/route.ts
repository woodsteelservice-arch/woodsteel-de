import { NextResponse } from "next/server";
import { FARBY, KRAJE, PRODUKTY } from "@/lib/vizualizace";

/**
 * Kontaktné údaje, ktorými si návštevník odomyká vygenerovanú vizualizáciu.
 *
 * Ide tou istou cestou ako bežné dopyty z webu (`/api/lead`) — do Make scenára
 * „WOODSTEEL WEBLEADS → Woodsteel leads" — rovnako ako dopyty z webu.
 * Kľúče aj ich tvar sú preto zhodné s `/api/lead`, inak by scenár riadok
 * nenamapoval. Vizualizáciu v tabuľke rozlíšiš podľa stránky a poznámky.
 *
 * Pozor: `trailingSlash: true` v next.config.ts platí aj na API — klient musí
 * volať "/api/vizualizacia-lead/" so lomkou, inak dostane 308 redirect.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface VizuLeadPayload {
  jmeno?: string;
  prijmeni?: string;
  email?: string;
  telefon?: string;
  kraj?: string;
  produkt?: string;
  farba?: string;
  consent?: boolean;
  /** Honeypot — musí zostať prázdny, boti ho vyplnia */
  website?: string;
}

const isValidPhone = (phone: string) => /^\d{9,15}$/.test(phone.replace(/[\s\-+/()]/g, ""));

/**
 * Hodnota do Sheetu. Scenár zapisuje s `valueInputOption: RAW`, takže Sheets
 * obsah bunky nevyhodnocuje. Vedúce `=`, `+`, `-` a `@` napriek tomu
 * odstraňujeme — keby sa modul niekedy prepol na USER_ENTERED.
 */
function safeForSheet(value: unknown): string {
  const s = String(value ?? "").trim();
  return s.replace(/^[=+\-@]+/, "");
}

/** Telefón na tvar +49xxxxxxxxxx, nech sa dá v Sheets hľadať */
function normalizePhone(phone: string): string {
  const trimmed = phone.trim();
  if (!trimmed) return "";
  const digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+")) return `+${digits}`;
  // Nemecké čísla sa píšu s vedúcou nulou — tú nahradíme predvoľbou.
  if (digits.startsWith("0")) return `+49${digits.slice(1)}`;
  return `+${digits}`;
}

/** Čas v berlínskej zóne, formát "YYYY-MM-DD HH:mm:ss" */
function berlinTimestamp(): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .format(new Date())
    .replace("T", " ");
}

export async function POST(request: Request) {
  let body: VizuLeadPayload;
  try {
    body = (await request.json()) as VizuLeadPayload;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot — botovi potvrdíme odoslanie, ale nikam ho neposielame
  if (body.website) return NextResponse.json({ ok: true });

  const errors: string[] = [];
  if (!body.jmeno || body.jmeno.trim().length < 2) errors.push("jmeno");
  if (!body.prijmeni || body.prijmeni.trim().length < 2) errors.push("prijmeni");
  if (!body.email || !EMAIL_RE.test(body.email)) errors.push("email");
  if (!body.telefon || !isValidPhone(body.telefon)) errors.push("telefon");
  if (!body.kraj || !KRAJE.includes(body.kraj)) errors.push("kraj");
  if (body.consent !== true) errors.push("consent");
  if (errors.length > 0) {
    return NextResponse.json(
      { error: "Bitte prüfen Sie Ihre Angaben.", fields: errors },
      { status: 400 }
    );
  }

  // Produkt a farbu beriem z číselníka, nie z toho, čo poslal prehliadač —
  // do tabuľky tak nikdy nepristane ľubovoľný text od návštevníka.
  const produkt = PRODUKTY.find((p) => p.kod === body.produkt);
  const farba = FARBY.find((f) => f.kod === body.farba);

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "";

  const lead = {
    datum: berlinTimestamp(),
    lead_id: crypto.randomUUID(),
    web: "wswintergarten.de",
    stranka: "/vizualizacia/",
    produkt: safeForSheet(produkt?.nazev ?? "Visualisierung"),
    termin: "",
    obhliadka: "",
    mesto: safeForSheet(body.kraj),
    psc: "",
    poznamka: safeForSheet(
      farba ? `KI-Visualisierung — Farbe ${farba.nazev} (${farba.kod})` : "KI-Visualisierung"
    ),
    meno: safeForSheet(`${body.jmeno!.trim()} ${body.prijmeni!.trim()}`),
    telefon: safeForSheet(normalizePhone(body.telefon!)),
    email: safeForSheet(body.email),
    suhlas: "áno",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    gclid: "",
    referrer: "",
    user_agent: safeForSheet(request.headers.get("user-agent")),
    ip,
  };

  const makeUrl = process.env.MAKE_WEBHOOK_URL;
  if (!makeUrl) {
    console.error("[vizu-lead] MAKE_WEBHOOK_URL nie je nastavená — lead sa nezapísal:", lead);
    return NextResponse.json({ error: "Senden fehlgeschlagen." }, { status: 502 });
  }

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.MAKE_WEBHOOK_APIKEY) {
      headers["x-make-apikey"] = process.env.MAKE_WEBHOOK_APIKEY;
    }

    const response = await fetch(makeUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[vizu-lead] Make odmietol požiadavku:", response.status, detail, lead);
      return NextResponse.json({ error: "Senden fehlgeschlagen." }, { status: 502 });
    }
  } catch (error) {
    console.error("[vizu-lead] Volanie na Make zlyhalo:", error, lead);
    return NextResponse.json({ error: "Senden fehlgeschlagen." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
