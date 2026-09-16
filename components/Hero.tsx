import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[88svh] sm:min-h-[100svh] flex items-end overflow-hidden">
      <Image
        src="/images/hero-dunajska-luzna.jpg"
        alt="Wintergarten von WS Wintergarten"
        fill
        priority
        sizes="100vw"
        className="object-cover scale-105"
      />

      {/* Fotka je svetlá a málo kontrastná — plošný závoj by ju zmazal.
          Tmavíme preto hlavne ľavý dolný roh, kde sedí text. */}
      <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/45 to-brown/10 sm:via-brown/30 sm:to-brown/5" />
      {/* Na mobile text zaberá celú šírku, takže bočné tmavenie musí byť
          slabšie — inak fotku zmaže úplne. */}
      <div className="absolute inset-0 bg-gradient-to-r from-brown/45 via-transparent to-transparent sm:from-brown/75 sm:via-brown/15" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-8 pb-16 pt-28 sm:pb-24 sm:pt-32 lg:pb-32 lg:pt-40">
        <div className="max-w-3xl">
          <div className="reveal">
            <span className="text-eyebrow text-gold inline-flex items-center gap-2">
              <span className="w-8 h-px bg-gold" />
              Konstruktionen nach Maß seit 2021
            </span>
          </div>

          <h1 className="text-display-2 font-extrabold text-white mt-4 sm:mt-6 max-w-2xl reveal" style={{ animationDelay: "100ms" }}>
            Wenn Komfort auf<br className="hidden sm:inline" />{" "}
            <span className="text-gold">den Außenraum trifft.</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-cream/90 mt-5 sm:mt-6 max-w-2xl leading-relaxed reveal" style={{ animationDelay: "200ms" }}>
            Pergolen, Wintergärten, Terrassenverglasung und Carports — nach
            Maß. Wir planen und bauen sie mit eigenem Team, vom ersten Aufmaß
            bis zur Übergabe des fertigen Raums.
          </p>

          <div className="mt-6 sm:mt-7 reveal" style={{ animationDelay: "260ms" }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/12 backdrop-blur-md border border-gold/40 text-cream text-sm">
              <Zap size={16} className="text-gold" />
              Angebot binnen 24 Stunden
            </span>
          </div>

          <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3 reveal" style={{ animationDelay: "340ms" }}>
            <Link
              href="/akcna-cenova-ponuka"
              className="group inline-flex justify-center items-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 bg-gold hover:bg-gold-hover text-brown hover:text-white font-semibold rounded-full transition-all shadow-[0_8px_24px_rgba(203,171,88,0.4)] hover:shadow-[0_16px_36px_rgba(203,171,88,0.5)] hover:-translate-y-0.5"
            >
              Kostenloser Termin bei Ihnen
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#realizations"
              className="inline-flex justify-center items-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 bg-transparent border border-white/40 hover:border-white text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              Referenzen ansehen
            </Link>
          </div>

          <div className="mt-8 sm:mt-10 inline-flex items-center gap-2 text-cream/70 text-xs reveal" style={{ animationDelay: "420ms" }}>
            <MapPin size={12} />
            Projekt: Wintergarten
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10 animate-pulse">
        <span className="text-eyebrow text-cream/60">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-cream/60 to-transparent" />
      </div>
    </section>
  );
}
