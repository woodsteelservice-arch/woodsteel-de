import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Zap, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InquiryForm } from "@/components/InquiryForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Angebot anfordern - WS Wintergarten",
  description:
    "Fordern Sie ein unverbindliches Angebot innerhalb 48 Stunden an. Kostenloser Termin und Aufmaß direkt bei Ihnen.",
  alternates: { canonical: "https://woodsteel.sk/akcna-cenova-ponuka/" },
};

const promises = [
  "Wir reagieren an Werktagen innerhalb einer Stunde",
  "Angebot innerhalb 24 bis 48 Stunden",
  "Unverbindlicher und kostenloser Beratungstermin bei Ihnen Zuhause",
  "Visualisierung im Angebot inbegriffen",
  "Garantierter Festpreis ohne Nachträge",
];

export default function CenovaPonukaPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-32 lg:pt-40 pb-12 bg-cream/40">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
            <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
              <Link href="/" className="hover:text-brown">WS Wintergarten</Link>
              <span className="opacity-50">/</span>
              <span className="text-mutedbrand">Angebot</span>
            </div>
            <h1 className="text-display-1 font-extrabold text-brown max-w-4xl mx-auto">
              Kostenloses Angebot<br className="hidden md:inline" />
              <span className="text-gold">innerhalb 48 Stunden.</span>
            </h1>
            <p className="mt-6 text-mutedbrand text-base lg:text-lg max-w-2xl mx-auto">
              Füllen Sie das kurze Formular aus — unser Vertriebsmitarbeiter meldet sich
              und vereinbart einen kostenlosen Termin bei Ihnen zu Hause, in 3-7 Tagen.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-2 space-y-10">
              {/* Why us */}
              <div>
                <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
                  <Zap size={14} /> Unser Versprechen
                </div>
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-brown">
                  Keine Überraschungen. Garantiert.
                </h2>
                <ul className="mt-7 space-y-4">
                  {promises.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className="mt-0.5 w-6 h-6 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <span className="text-charcoal text-sm leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a href="mailto:info@wswintergarten.de" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-gold/15 group-hover:bg-gold flex items-center justify-center transition-colors shrink-0">
                  <Mail size={18} className="text-gold group-hover:text-white" />
                </div>
                <div>
                  <div className="text-xs text-eyebrow text-mutedbrand">Oder schreiben Sie uns direkt</div>
                  <div className="font-display font-bold text-lg text-brown group-hover:text-gold transition-colors">
                    info@wswintergarten.de
                  </div>
                </div>
              </a>
            </div>

            <div className="lg:col-span-3">
              <InquiryForm variant="card" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
