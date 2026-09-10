import { NextResponse } from "next/server";

const CATALOG_FILE = "/download/woodsteel-katalog-de.pdf";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Odošle PDF katalóg na zadaný e-mail.
 *
 * Odosielanie beží cez Resend a zapne sa až po nastavení premenných
 * RESEND_API_KEY a CATALOG_FROM_EMAIL. Kým nie sú nastavené, endpoint
 * vráti `emailSent: false` — používateľ katalóg aj tak dostane, stránka
 * mu ho stiahne priamo v prehliadači.
 */
export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse." }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
  const pdfUrl = `${siteUrl}${CATALOG_FILE}`;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CATALOG_FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn(
      "[katalog] RESEND_API_KEY alebo CATALOG_FROM_EMAIL nie sú nastavené — e-mail sa neodoslal."
    );
    return NextResponse.json({ ok: true, emailSent: false, pdfUrl });
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "WoodSteel Katalog",
        text: [
          "Guten Tag,",
          "",
          "im Anhang senden wir Ihnen den WoodSteel Katalog — Pergolen, Wintergärten und Terrassenverglasung.",
          `Ak by sa príloha nezobrazila, katalóg si stiahnete tu: ${pdfUrl}`,
          "",
          "Bei Fragen rufen Sie uns gerne unter +421 904 473 111 an.",
          "",
          "WoodSteel SK s. r. o.",
        ].join("\n"),
        attachments: [{ filename: "woodsteel-katalog.pdf", path: pdfUrl }],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[katalog] Resend odmietol požiadavku:", response.status, detail);
      return NextResponse.json({ ok: true, emailSent: false, pdfUrl });
    }

    return NextResponse.json({ ok: true, emailSent: true, pdfUrl });
  } catch (error) {
    console.error("[katalog] Odoslanie e-mailu zlyhalo:", error);
    return NextResponse.json({ ok: true, emailSent: false, pdfUrl });
  }
}
