import { createHmac, timingSafeEqual } from "crypto";

/**
 * Ochrana AI vizualizácie proti míňaniu kreditu (fal.ai / Google Gemini).
 *
 * 1. Vstupenka — generovať sa dá až po odoslaní kontaktu. `/api/vizualizacia-lead/`
 *    vydá podpísanú vstupenku (HMAC, platí pár hodín), `/api/vizualizacia/` bez nej
 *    nič negeneruje. Obrázok sa tak nedá vytiahnuť obídením formulára.
 * 2. Denné limity — spoločné pre .sk, .cz aj .de. Počítadlo drží woodsteel-pricing
 *    (Neon) na `/api/vizu-kvota`, lebo tento web nemá databázu a beží na viacerých
 *    inštanciách. Limity sú nastavené tam (50/deň spolu, 5/deň na IP, 20/deň Gemini).
 *
 * Obe veci používajú tajomstvo `VIZU_SECRET` (rovnaké na všetkých weboch aj
 * v woodsteel-pricing). Bez neho sa nevygeneruje nič — radšej nefunkčná
 * vizualizácia ako neobmedzený účet.
 */

export const WEB = "wswintergarten.de";

const KVOTA_URL =
  process.env.VIZU_KVOTA_URL ?? "https://woodsteel-pricing.vercel.app/api/vizu-kvota";

/** Ako dlho platí vstupenka po odoslaní kontaktu. */
const PLATNOST_MS = 3 * 60 * 60 * 1000;

function tajomstvo(): string | null {
  return process.env.VIZU_SECRET || null;
}

/** IP návštevníka — na Verceli ju hlavičky nastavuje platforma. */
export function ipZPoziadavky(request: Request): string {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "neznama"
  );
}

// ── Vstupenka ───────────────────────────────────────────────────────────────

function podpis(data: string, kluc: string): string {
  return createHmac("sha256", `vstupenka:${kluc}`).update(data).digest("base64url");
}

/** Vydá vstupenku po úspešne vyplnenom kontakte. Bez tajomstva vráti null. */
export function vydajVstupenku(): string | null {
  const kluc = tajomstvo();
  if (!kluc) return null;
  const data = `${WEB}|${Date.now() + PLATNOST_MS}`;
  return `${data}.${podpis(data, kluc)}`;
}

export function overVstupenku(vstupenka: unknown): boolean {
  const kluc = tajomstvo();
  if (!kluc || typeof vstupenka !== "string" || vstupenka.length > 200) return false;
  const i = vstupenka.lastIndexOf(".");
  if (i < 0) return false;
  const data = vstupenka.slice(0, i);
  const prijaty = Buffer.from(vstupenka.slice(i + 1));
  const spravny = Buffer.from(podpis(data, kluc));
  if (prijaty.length !== spravny.length || !timingSafeEqual(prijaty, spravny)) return false;
  const [web, exp] = data.split("|");
  return web === WEB && Number(exp) > Date.now();
}

// ── Denné limity ────────────────────────────────────────────────────────────

type Akcia = "rezervuj" | "gemini" | "vrat";
export type Kvota = { ok: true } | { ok: false; dovod: "ip" | "den" | "gemini" | "chyba" };

async function zavolajKvotu(akcia: Akcia, ip: string, extra: Record<string, unknown> = {}): Promise<Kvota> {
  const kluc = tajomstvo();
  if (!kluc) {
    console.error("[vizu-ochrana] VIZU_SECRET nie je nastavený — generovanie je vypnuté");
    return { ok: false, dovod: "chyba" };
  }
  try {
    const res = await fetch(KVOTA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${kluc}` },
      body: JSON.stringify({ akcia, ip, web: WEB, ...extra }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[vizu-ochrana] kvóta odpovedala", res.status, await res.text().catch(() => ""));
      return { ok: false, dovod: "chyba" };
    }
    const json = (await res.json()) as { ok?: boolean; dovod?: "ip" | "den" };
    if (json.ok) return { ok: true };
    return { ok: false, dovod: akcia === "gemini" ? "gemini" : (json.dovod ?? "den") };
  } catch (e) {
    console.error("[vizu-ochrana] kvóta nedostupná", e);
    return { ok: false, dovod: "chyba" };
  }
}

/** Rezervuje jedno generovanie (limit na IP aj spoločný denný limit). */
export const rezervujGenerovanie = (ip: string) => zavolajKvotu("rezervuj", ip);
/** Rezervuje záložné generovanie cez Gemini (vlastný denný limit). */
export const rezervujGemini = (ip: string) => zavolajKvotu("gemini", ip);
/** Generovanie zlyhalo — vráti rezervované kusy, nech sa návštevníkovi nezapočítajú. */
export async function vratRezervaciu(ip: string, gemini: boolean): Promise<void> {
  await zavolajKvotu("vrat", ip, { gemini });
}
