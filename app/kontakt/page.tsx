import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InquiryForm } from "@/components/InquiryForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";

function Instagram({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Kontakt - WS Wintergarten",
  description:
    "Schreiben Sie uns und vereinbaren Sie einen kostenlosen Termin bei Ihnen zu Hause. Wir sind in der Slowakei, Tschechien, Österreich und Ungarn tätig.",
  alternates: { canonical: "https://woodsteel.sk/kontakt/" },
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-32 lg:pt-40 pb-12 bg-cream/40">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
            <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
              <Link href="/" className="hover:text-brown">WS Wintergarten</Link>
              <span className="opacity-50">/</span>
              <span className="text-mutedbrand">Kontakt</span>
            </div>
            <h1 className="text-display-1 font-extrabold text-brown">
              Starten wir Ihr Projekt.
            </h1>
            <p className="mt-5 text-mutedbrand text-base lg:text-lg max-w-2xl mx-auto">
              Füllen Sie das Formular aus, schreiben Sie uns eine E-Mail oder
              vereinbaren Sie ein persönliches Treffen in unserem Betrieb.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left — contact details */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display font-bold text-2xl text-brown mb-6">
                  Direkte Kontakte
                </h2>
                <div className="space-y-5">
                  <a href="mailto:info@wswintergarten.de" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-gold/15 group-hover:bg-gold flex items-center justify-center transition-colors shrink-0">
                      <Mail size={18} className="text-gold group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-eyebrow text-mutedbrand">E-mail</div>
                      <div className="font-display font-bold text-lg text-brown group-hover:text-gold">
                        info@wswintergarten.de
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://www.instagram.com/ws_wintergarten/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/15 group-hover:bg-gold flex items-center justify-center transition-colors shrink-0">
                      <Instagram size={18} className="text-gold group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-eyebrow text-mutedbrand">Instagram</div>
                      <div className="font-display font-bold text-lg text-brown group-hover:text-gold">
                        @ws_wintergarten
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="border-t border-cream pt-8">
                <h2 className="font-display font-bold text-2xl text-brown mb-6">
                  Öffnungszeiten
                </h2>
                <div className="space-y-4 text-mutedbrand">
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-gold mt-1 shrink-0" />
                    <div className="text-charcoal text-sm">
                      <div className="text-mutedbrand">
                        Mo–Fr: 8:00 – 17:00 Uhr<br />
                        Sa: nach Vereinbarung<br />
                        So: geschlossen
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
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
