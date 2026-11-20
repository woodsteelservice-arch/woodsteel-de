import { readdir, readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { PRODUKTY, FARBY, PROSTREDI, type ProduktVizu } from "@/lib/vizualizace";

export const runtime = "nodejs";
// Nano Banana 2.1 vracia obrázok typicky za 20–60 s.
export const maxDuration = 300;

/**
 * Verejné generovanie vizualizácií pre návštevníkov webu.
 *
 * Engine je rovnaký ako v internom nástroji woodsteel-pricing (`/api/visualize`):
 * Nano Banana 2.1 cez fal.ai, s automatickým fallbackom na priame Google API,
 * keď je fal účet bez kreditu. Rozlíšenie držíme na 1K.
 *
 * POZOR: na rozdiel od interného nástroja tu NIE je prihlásenie, takže každý
 * request niečo stojí. Preto je nižšie jednoduchý rate limit podľa IP.
 *
 * Pozor 2: `trailingSlash: true` v next.config.ts platí aj na API — klient musí
 * volať "/api/vizualizacia/" so lomkou, inak dostane 308 redirect.
 */

const NANO_BANANA_FAL = process.env.FAL_MODEL_NANO_BANANA ?? "google/nano-banana-2.1/edit";
const GEMINI_MODEL = process.env.GEMINI_IMAGE_MODEL ?? "gemini-nano-banana-2.1";
const geminiUrl = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

/** Nano Banana 2.1 zvládne až 14 referenčných obrázkov. */
const REF_LIMIT = 14;

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

type InlineImage = { mimeType: string; data: string };
type Vysledok = { image: string } | { chyba: string; status: number };

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// ── Rate limit ────────────────────────────────────────────────────────────

/**
 * Jednoduchý limit v pamäti inštancie. Nie je to neprierazná ochrana
 * (Vercel škáluje na viac inštancií), ale zastaví bežné preklikávanie.
 */
const HITS = new Map<string, number[]>();
const LIMIT = Number(process.env.VIZU_RATE_LIMIT ?? 6);
const OKNO_MS = 60 * 60 * 1000;

function prekrocenyLimit(ip: string): boolean {
  const teraz = Date.now();
  const predosle = (HITS.get(ip) ?? []).filter((t) => teraz - t < OKNO_MS);
  if (predosle.length >= LIMIT) {
    HITS.set(ip, predosle);
    return true;
  }
  predosle.push(teraz);
  HITS.set(ip, predosle);
  if (HITS.size > 5000) {
    for (const [k, v] of HITS) if (v.every((t) => teraz - t >= OKNO_MS)) HITS.delete(k);
  }
  return false;
}

// ── Referenčné fotky realizácií ───────────────────────────────────────────

async function loadReferencePhotos(
  produkt: ProduktVizu,
  farbaKeyword: string | undefined,
  limit: number
): Promise<InlineImage[]> {
  const dir = path.join(process.cwd(), "public", "reference");
  let files: string[] = [];
  try {
    files = (await readdir(dir)).filter((f) => MIME[path.extname(f).toLowerCase()]);
  } catch {
    return [];
  }

  const keywords = PRODUKTY.find((p) => p.kod === produkt)?.refKeywords ?? [];
  const byProdukt = files.filter((f) => keywords.some((k) => norm(f).includes(k)));
  let pool = byProdukt.length > 0 ? byProdukt : files;

  if (farbaKeyword) {
    const byFarba = pool.filter((f) => norm(f).includes(farbaKeyword));
    if (byFarba.length >= 2) pool = byFarba;
  }

  return Promise.all(
    pool.slice(0, limit).map(async (f) => ({
      mimeType: MIME[path.extname(f).toLowerCase()],
      data: (await readFile(path.join(dir, f))).toString("base64"),
    }))
  );
}

function dataUrlToInline(dataUrl: string): InlineImage | null {
  const m = dataUrl.match(/^data:(image\/[a-z+.-]+);base64,(.+)$/i);
  return m ? { mimeType: m[1], data: m[2] } : null;
}

// ── Prompt ────────────────────────────────────────────────────────────────

const INTRO =
  "You are creating a photorealistic sales visualization for WoodSteel, " +
  "a manufacturer of premium aluminium pergolas and winter gardens.\n\n";

function promptSFotkou(produktEn: string, farba: string, refCount: number) {
  return (
    INTRO +
    "The FIRST image is a photo of a customer's house.\n" +
    (refCount > 0
      ? `The following ${refCount} image(s) are reference photos of real WoodSteel installations — ` +
        "carefully study the construction style, slim profiles, glazing, roof design and proportions " +
        "and replicate them faithfully.\n"
      : "") +
    `\nTask: Edit the FIRST image so that a WoodSteel ${produktEn} in color "${farba}" ` +
    "is naturally attached to the house, in the most suitable position (typically over the terrace " +
    "or along the main rear facade). Match the perspective, lighting, shadows and weather of the " +
    "original photo. The house, garden and all other elements must remain exactly as in the original " +
    "photo. The result must look like a real photograph taken with the same camera, not a 3D render."
  );
}

function promptBezFotky(produktEn: string, farba: string, prostrediEn: string, refCount: number) {
  return (
    INTRO +
    (refCount > 0
      ? `The ${refCount} attached images are reference photos of real WoodSteel installations — ` +
        "carefully study the construction style, slim profiles, glazing, roof design and proportions " +
        "and replicate them faithfully.\n\n"
      : "") +
    `Task: Create a single photorealistic exterior photograph of a WoodSteel ${produktEn} ` +
    `in color "${farba}", built at ${prostrediEn}. ` +
    "Shoot it like a professional architectural photographer: three-quarter view, eye level, " +
    "soft late-afternoon daylight, clear sky, tasteful outdoor furniture under the structure. " +
    "The result must look like a real photograph, not a 3D render. " +
    "No people, no text, no watermarks, no logos."
  );
}

// ── Volania modelov ───────────────────────────────────────────────────────

async function callFal(
  prompt: string,
  images: InlineImage[],
  extra: Record<string, unknown> = {}
): Promise<Vysledok> {
  const apiKey = process.env.FAL_KEY;
  if (!apiKey) return { chyba: "FAL_KEY nie je nastavený", status: 500 };

  const res = await fetch(`https://fal.run/${NANO_BANANA_FAL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Key ${apiKey}` },
    body: JSON.stringify({
      prompt,
      image_urls: images.map((i) => `data:${i.mimeType};base64,${i.data}`),
      output_format: "jpeg",
      resolution: "1K",
      ...extra,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("[vizualizacia] fal.ai error", res.status, detail);
    return { chyba: detail, status: res.status };
  }

  const json = await res.json();
  const url: string | undefined = json?.images?.[0]?.url;
  if (!url) {
    console.error("[vizualizacia] fal.ai bez obrázka", JSON.stringify(json).slice(0, 800));
    return { chyba: "bez obrázka", status: 502 };
  }
  if (url.startsWith("data:")) return { image: url };

  const imgRes = await fetch(url);
  const mime = imgRes.headers.get("content-type") ?? "image/jpeg";
  const b64 = Buffer.from(await imgRes.arrayBuffer()).toString("base64");
  return { image: `data:${mime};base64,${b64}` };
}

async function callGemini(prompt: string, images: InlineImage[]): Promise<Vysledok> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { chyba: "GEMINI_API_KEY nie je nastavený", status: 500 };

  const res = await fetch(geminiUrl(GEMINI_MODEL), {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }, ...images.map((i) => ({ inlineData: i }))] }],
      generationConfig: { responseModalities: ["IMAGE"] },
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("[vizualizacia] Gemini error", res.status, detail);
    return { chyba: detail, status: res.status };
  }

  const json = await res.json();
  const parts: { inlineData?: { mimeType: string; data: string } }[] =
    json?.candidates?.[0]?.content?.parts ?? [];
  const img = parts.find((p) => p.inlineData?.data)?.inlineData;
  if (!img) {
    console.error("[vizualizacia] Gemini bez obrázka", JSON.stringify(json).slice(0, 800));
    return { chyba: "bez obrázka", status: 502 };
  }
  return { image: `data:${img.mimeType};base64,${img.data}` };
}

/** fal bez kreditu („User is locked. Reason: TOP_UP") → ten istý model priamo cez Google. */
const falBezKreditu = (chyba: string) => /locked|top.?up|balance|exhausted|credit/i.test(chyba);

// ── Route ─────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "neznama";

  if (prekrocenyLimit(ip)) {
    return NextResponse.json(
      { error: "Sie haben schon mehrere Visualisierungen erstellt. Bitte versuchen Sie es in einer Stunde noch einmal oder schreiben Sie uns direkt — wir erstellen Ihren Entwurf gern persönlich." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });

  const produkt = PRODUKTY.find((p) => p.kod === body.produkt);
  const farba = FARBY.find((f) => f.kod === body.farba);
  if (!produkt || !farba) {
    return NextResponse.json({ error: "Bitte wählen Sie Produkt und Farbe." }, { status: 400 });
  }

  const house = typeof body.photo === "string" ? dataUrlToInline(body.photo) : null;
  if (typeof body.photo === "string" && !house) {
    return NextResponse.json({ error: "Das Foto konnte nicht geladen werden. Bitte versuchen Sie ein anderes." }, { status: 400 });
  }

  const refs = await loadReferencePhotos(produkt.kod, farba.refKeyword, REF_LIMIT);

  let prompt: string;
  let images: InlineImage[];
  let extra: Record<string, unknown> = {};
  if (house) {
    prompt = promptSFotkou(produkt.en, farba.kod, refs.length);
    images = [house, ...refs];
  } else {
    const prostredi = PROSTREDI.find((p) => p.kod === body.prostredi) ?? PROSTREDI[0];
    prompt = promptBezFotky(produkt.en, farba.kod, prostredi.en, refs.length);
    images = refs;
    // Plátno na webe je 4:3 — bez tohto vracia model štvorec a orezali by sme ho.
    extra = { aspect_ratio: "4:3" };
  }

  let vysledok: Vysledok = await callFal(prompt, images, extra);
  if ("chyba" in vysledok && (falBezKreditu(vysledok.chyba) || vysledok.status === 500)) {
    console.error("[vizualizacia] fal nedostupný → fallback na Gemini:", vysledok.chyba);
    vysledok = await callGemini(prompt, images);
  }

  if ("chyba" in vysledok) {
    return NextResponse.json(
      { error: "Die Visualisierung konnte gerade nicht erstellt werden. Bitte versuchen Sie es noch einmal." },
      { status: 502 }
    );
  }

  return NextResponse.json({ image: vysledok.image });
}
