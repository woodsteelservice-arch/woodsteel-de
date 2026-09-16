import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FinalCTA } from "@/components/FinalCTA";
import { realizations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Referenzen - WS Wintergarten",
  description:
    "Fotos fertiger Pergolen, Wintergärten, Verglasungen und Carports aus abgeschlossenen Projekten.",
  alternates: { canonical: "https://woodsteel.sk/realizacie/" },
};

export default function RealizaciePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative pt-32 lg:pt-40 pb-12 bg-cream/40">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
            <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
              <Link href="/" className="hover:text-brown transition-colors">WS Wintergarten</Link>
              <span className="opacity-50">/</span>
              <span className="text-mutedbrand">Referenzen</span>
            </div>
            <h1 className="text-display-1 font-extrabold text-brown max-w-4xl mx-auto">
              350+ Projekte<br className="hidden md:inline" />
              <span className="text-gold">in 4 EU-Ländern.</span>
            </h1>
            <p className="mt-6 text-mutedbrand text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Eine Auswahl fertiger Projekte — Pergolen, Wintergärten
              und Terrassenverglasungen.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {realizations.map((r) => (
                <article key={r.image} className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream">
                  <Image src={r.image} alt={r.location ? `${r.category} — ${r.location}` : r.category} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/85 via-brown/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6 text-white">
                    <div className="text-eyebrow text-gold/95 mb-1">{r.category}</div>
                    {r.location && (
                      <div className="flex items-center gap-1.5 font-display font-semibold text-lg">
                        <MapPin size={14} className="opacity-80" />
                        {r.location}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
