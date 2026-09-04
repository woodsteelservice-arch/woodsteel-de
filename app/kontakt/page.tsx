import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InquiryForm } from "@/components/InquiryForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MapEmbed } from "@/components/MapEmbed";

export const metadata: Metadata = {
  title: "Kontakt - WoodSteel",
  description:
    "Schreiben Sie uns oder rufen Sie an und vereinbaren Sie einen kostenlosen Termin bei Ihnen zu Hause. Wir sind in der Slowakei, Tschechien, Österreich und Ungarn tätig.",
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
              <Link href="/" className="hover:text-brown">WoodSteel</Link>
              <span className="opacity-50">/</span>
              <span className="text-mutedbrand">Kontakt</span>
            </div>
            <h1 className="text-display-1 font-extrabold text-brown">
              Starten wir Ihr Projekt.
            </h1>
            <p className="mt-5 text-mutedbrand text-base lg:text-lg max-w-2xl mx-auto">
              Füllen Sie das Formular aus, rufen Sie an oder vereinbaren Sie ein
              persönliches Treffen in unserem Betrieb.
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
                  <a href="tel:+421904473111" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-gold/15 group-hover:bg-gold flex items-center justify-center transition-colors shrink-0">
                      <Phone size={18} className="text-gold group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-eyebrow text-mutedbrand">Telefón</div>
                      <div className="font-display font-bold text-lg text-brown group-hover:text-gold">
                        +421 904 473 111
                      </div>
                    </div>
                  </a>
                  <a href="mailto:info@woodsteel.sk" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-gold/15 group-hover:bg-gold flex items-center justify-center transition-colors shrink-0">
                      <Mail size={18} className="text-gold group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-eyebrow text-mutedbrand">E-mail</div>
                      <div className="font-display font-bold text-lg text-brown group-hover:text-gold">
                        info@woodsteel.sk
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="border-t border-cream pt-8">
                <h2 className="font-display font-bold text-2xl text-brown mb-6">
                  Standort
                </h2>
                <div className="space-y-4 text-mutedbrand">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gold mt-1 shrink-0" />
                    <div className="text-charcoal">
                      <div className="font-semibold">Rovinka</div>
                      <div className="text-sm text-mutedbrand">
                        Bezirk Senec, Slowakische Republik
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-gold mt-1 shrink-0" />
                    <div className="text-charcoal text-sm">
                      <div className="font-semibold">Öffnungszeiten</div>
                      <div className="text-mutedbrand mt-1">
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

        {/* Map */}
        <section className="pb-20 lg:pb-28 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-brown mb-6">
              So finden Sie uns
            </h2>
            <MapEmbed title="WoodSteel Rovinka" />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
