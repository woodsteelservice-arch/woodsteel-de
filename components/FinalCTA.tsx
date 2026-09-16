import { Phone, Mail } from "lucide-react";
import { InquiryForm } from "./InquiryForm";

export function FinalCTA() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-32 bg-cream/40">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — copy + secondary info */}
          <div className="lg:sticky lg:top-32">
            <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
              <span className="w-8 h-px bg-gold/60" />
              Bereit anzufangen?
            </div>
            <h2 className="text-display-2 font-bold text-brown">
              Wir gestalten Ihre Terrasse nach Ihren Vorstellungen.
            </h2>
            <p className="mt-5 text-mutedbrand text-base lg:text-lg leading-relaxed max-w-xl">
              Kostenloser Termin bei Ihnen zu Hause + Angebot binnen&nbsp;24-48&nbsp;Stunden.
              Unverbindlich und ohne Druck.
            </p>

            <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5">
              <a
                href="tel:+421904473111"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-gold/15 group-hover:bg-gold flex items-center justify-center transition-colors">
                  <Phone size={20} className="text-gold group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-eyebrow text-mutedbrand">Rufen Sie uns an</div>
                  <div className="font-display font-bold text-lg text-brown group-hover:text-gold transition-colors">
                    +421 904 473 111
                  </div>
                </div>
              </a>
              <a
                href="mailto:info@wswintergarten.de"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-gold/15 group-hover:bg-gold flex items-center justify-center transition-colors">
                  <Mail size={20} className="text-gold group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-eyebrow text-mutedbrand">Schreiben Sie uns</div>
                  <div className="font-display font-bold text-lg text-brown group-hover:text-gold transition-colors">
                    info@wswintergarten.de
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right — inline form */}
          <InquiryForm variant="card" />
        </div>
      </div>
    </section>
  );
}
