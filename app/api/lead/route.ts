import { NextResponse } from "next/server";

/**
 * Príjem dopytov z formulára `components/InquiryForm.tsx` a ich preposlanie
 * do Make.com, ktorý ich zapisuje do Google Sheets ("Woodsteel leads",
 * hárok "leads z webstranky .sk").
 *
 * Volanie na Make ide výhradne zo servera — z prehliadača návštevníka
 * neodchádza na doménu tretej strany nič (GDPR aj ad-blockery).
 * Webhook URL sa nastavuje premennou MAKE_WEBHOOK_URL na Verceli.
 *
 * Pozor: `trailingSlash: true` v next.config.ts platí aj na API — klient
 * musí volať "/api/lead/" so lomkou, inak dostane 308 redirect.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LeadPayload {
  product?: string;
  timing?: string;
  consult?: string;
  city?: string;
  psc?: string;
  message?: string;
  name?: string;
  phone?: string;
  email?: string;
  consent?: boolean;
  /** Honeypot — musí zostať prázdny, boti ho vyplnia */
  website?: string;
  // Meta
  page?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  referrer?: string;
}

function isValidPhone(phone: string): boolean {
  return /^\d{9,15}$/.test(phone.replace(/[\s\-+/()]/g, ""));
}

/**
 * Hodnota do Sheetu. Escapovať začiatočné `=`, `+`, `-` či `@` netreba —
 * Make zapisuje riadok s `valueInputOption: RAW`, takže Sheets obsah bunky
 * vôbec nevyhodnocuje a vzorec z neho nikdy nevznikne. (Keby sa modul
 * niekedy prepol na USER_ENTERED, escapovanie treba doplniť.)
 */
function safeForSheet(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

/** Telefón na tvar +421904473111 (bez medzier), aby sa dal v Sheets hľadať */
function normalizePhone(phone: string): string {
  const trimmed = phone.trim();
  if (!trimmed) return "";
  const digits = trimmed.replace(/\D/g, "");
  return (trimmed.startsWith("+") ? "+" : "") + digits;
}

/** Čas v bratislavskej zóne, formát "YYYY-MM-DD HH:mm:ss" */
function bratislavaTimestamp(): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Bratislava",
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
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot — botovi potvrdíme odoslanie, ale nikam ho neposielame
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const errors: string[] = [];
  if (!body.name || body.name.trim().length < 2) errors.push("name");
  if (!body.phone || !isValidPhone(body.phone)) errors.push("phone");
  if (!body.email || !EMAIL_RE.test(body.email)) errors.push("email");
  if (body.consent !== true) errors.push("consent");
  if (errors.length > 0) {
    return NextResponse.json(
      { error: "Bitte überprüfen Sie Ihre Angaben.", fields: errors },
      { status: 400 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "";

  // Kľúče sú ploché a slovenské — presne takto ich mapuje Make scenár
  // "WOODSTEEL WEBLEADS → Woodsteel leads (hárok leads z webstranky .sk)".
  const lead = {
    datum: bratislavaTimestamp(),
    lead_id: crypto.randomUUID(),
    web: "woodsteel.sk",
    stranka: safeForSheet(body.page),
    produkt: safeForSheet(body.product),
    termin: safeForSheet(body.timing),
    obhliadka: safeForSheet(body.consult),
    mesto: safeForSheet(body.city),
    psc: safeForSheet(body.psc),
    poznamka: safeForSheet(body.message),
    meno: safeForSheet(body.name),
    telefon: safeForSheet(normalizePhone(String(body.phone))),
    email: safeForSheet(body.email),
    suhlas: "ja",
    utm_source: safeForSheet(body.utmSource),
    utm_medium: safeForSheet(body.utmMedium),
    utm_campaign: safeForSheet(body.utmCampaign),
    utm_term: safeForSheet(body.utmTerm),
    utm_content: safeForSheet(body.utmContent),
    gclid: safeForSheet(body.gclid),
    referrer: safeForSheet(body.referrer),
    user_agent: safeForSheet(request.headers.get("user-agent")),
    ip,
  };

  const makeUrl = process.env.MAKE_WEBHOOK_URL;
  if (!makeUrl) {
    console.error("[lead] MAKE_WEBHOOK_URL nie je nastavená — dopyt sa nezapísal:", lead);
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
      console.error("[lead] Make odmietol požiadavku:", response.status, detail, lead);
      return NextResponse.json({ error: "Senden fehlgeschlagen." }, { status: 502 });
    }
  } catch (error) {
    console.error("[lead] Volanie na Make zlyhalo:", error, lead);
    return NextResponse.json({ error: "Senden fehlgeschlagen." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, leadId: lead.lead_id });
}
