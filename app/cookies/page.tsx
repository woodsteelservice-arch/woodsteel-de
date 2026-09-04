import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Cookies - WoodSteel",
  description:
    "Welche Cookies wir auf dieser Website verwenden, wozu sie dienen und wie Sie Ihre Einwilligung jederzeit ändern oder widerrufen.",
  alternates: { canonical: "https://woodsteel.sk/cookies/" },
};

/** Kategórie zodpovedajú prepínačom v lište súhlasu (components/CookieConsent.tsx). */
const categories = [
  {
    name: "Notwendig",
    state: "Immer aktiv",
    text: "Sie sichern die Grundfunktionen der Website — etwa das Speichern Ihrer Auswahl in diesem Banner. Ohne sie würde die Website nicht funktionieren, deshalb lassen sie sich nicht abschalten.",
  },
  {
    name: "Analyse",
    state: "Optional",
    text: "Sie messen die Besucherzahlen und welche Seiten interessieren, damit wir die Website verbessern können. Wir nutzen Google Analytics 4 und Google Tag Manager.",
  },
  {
    name: "Marketing",
    state: "Optional",
    text: "Sie ermöglichen es, die Wirkung von Werbung zu messen und Ihnen relevantere Angebote zu zeigen. Wir nutzen Meta Pixel und die Werbefunktionen von Google.",
  },
  {
    name: "Präferenzen",
    state: "Optional",
    text: "Sie merken sich Ihre Einstellungen, damit Sie diese beim nächsten Besuch nicht erneut vornehmen müssen.",
  },
];

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-32 lg:pt-40 pb-12 bg-cream/40">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
            <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
              <Link href="/" className="hover:text-brown">WoodSteel</Link>
              <span className="opacity-50">/</span>
              <span className="text-mutedbrand">Cookies</span>
            </div>
            <h1 className="text-display-1 font-extrabold text-brown">
              <span className="text-gold">Cookies.</span>
            </h1>
            <p className="mt-5 text-mutedbrand text-base lg:text-lg max-w-2xl mx-auto">
              Cookies sind kleine Dateien, die eine Website in Ihrem Browser ablegt. Nachfolgend finden Sie,
              wofür wir sie einsetzen und wie Sie Ihre Auswahl jederzeit ändern.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-5 lg:px-8">
            <div className="space-y-4">
              {categories.map((c) => (
                <div key={c.name} className="rounded-2xl border border-cream bg-white p-5 lg:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="font-display text-lg font-bold text-brown">{c.name}</h2>
                    <span className="shrink-0 text-xs font-semibold text-mutedbrand bg-cream/60 rounded-full px-3 py-1">
                      {c.state}
                    </span>
                  </div>
                  <p className="mt-2 text-mutedbrand leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-gold/30 bg-cream/30 p-6 lg:p-8">
              <h2 className="font-display text-xl font-bold text-brown">Einwilligung ändern</h2>
              <p className="mt-2 text-mutedbrand leading-relaxed">
                Sie können Ihre Einwilligung jederzeit ändern oder vollständig widerrufen. Analyse- und Marketing-
                Cookies werden erst nach Ihrer Einwilligung geladen — bis dahin sind sie blockiert.
              </p>
              <div className="mt-5">
                <CookieSettingsButton />
              </div>
            </div>

            <p className="mt-10 text-mutedbrand leading-relaxed">
              Cookies können Sie auch direkt in den Einstellungen Ihres Browsers verwalten, dort lassen sich
              vorhandene Dateien löschen und neue blockieren. Wie wir mit personenbezogenen
              Daten umgehen, beschreibt die{" "}
              <Link href="/ochrana-osobnych-udajov" className="text-gold underline">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
