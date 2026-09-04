import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { Footer } from "@/components/Footer";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { FinalCTA } from "@/components/FinalCTA";
import { ProductStickyCTA } from "@/components/ProductStickyCTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { zasklenieFaqs } from "@/lib/faqs";
import { JsonLd, productSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Terrassenverglasung - WoodSteel",
  description:
    "Terrassen- und Balkonverglasung mit und ohne Rahmen. Schützt vor Wind und Regen, die Terrasse nutzen Sie auch außerhalb der Saison.",
  alternates: { canonical: "https://woodsteel.sk/zasklenie-teras/" },
};

// Systémy zasklenia — texty a fotografie prevzaté z woodsteel.sk
const systems = [
  {
    id: "ramove-zasklenie",
    href: "/zasklenie-teras/ramove-zasklenie",
    name: "Aluminium-Schiebesystem mit Rahmen",
    tag: "System mit Rahmen",
    claim: "Schützt Ihre Terrasse vor Wind und Regen.",
    description:
      "Das Schiebesystem mit Rahmen besteht aus hochwertigen Aluminiumprofilen, ergänzt durch Komponenten aus Edelstahl. Als Füllung verwenden wir Einfach- oder Isolierverglasung, mit der sich Räume bis zu einer Höhe von 2,7 Metern verglasen lassen. Wenn Sie ein gutes Preis-Leistungs-Verhältnis suchen, ist dieses System die ideale Wahl.",
    image: "/images/zasklenie-ramovy-system.jpg",
    features: [
      "schützt vor Lärm, Staub und schlechtem Wetter",
      "erschwert das gewaltsame Eindringen",
      "Sicherungen gegen das Aushebeln der Scheiben",
      "einfache Montage dank vormontiertem System",
      "leichte, schnelle Bedienung und Pflege",
      "freie Wahl der Flügelanzahl und Öffnungsart",
    ],
  },
  {
    id: "bezramove-zasklenie",
    href: "/zasklenie-teras/bezramove-zasklenie",
    name: "Rahmenloses Schiebesystem",
    tag: "System ohne Rahmen",
    claim: "Die Terrassenverglasung schützt vor Wind und Regen.",
    description:
      "Das rahmenlose Schiebesystem ist die Designlösung für anspruchsvollere Kunden, die einen modernen, minimalistischen Auftritt ohne sichtbare Rahmen suchen. Es nutzt Einfach-Sicherheitsglas, mit dem sich Räume bis zu einer Höhe von 3 Metern verglasen lassen. Es bietet nicht nur verlässlichen Schutz vor Wind, Regen, Schnee und Schmutz, sondern auch ein hochwertiges, edles Erscheinungsbild.",
    image: "/images/zasklenie-bezramovy-system.jpg",
    features: [
      "sorgt für einen völlig freien Blick in den Garten",
      "erschwert das gewaltsame Eindringen",
      "Sicherungen gegen das Aushebeln der Scheiben",
      "leichte, schnelle Bedienung und Pflege",
      "freie Wahl der Flügelanzahl und Öffnungsart",
    ],
  },
];

export default function ZasklenieTerasPage() {
  return (
    <>
      <JsonLd
        data={productSchema({
          name: "WoodSteel Terrassenverglasung",
          description:
            "Rahmenlose Schiebesysteme für die Terrassenverglasung. Im Sommer offen, im Winter ein geschlossener Raum.",
          image:
            "/images/zimna-zahrada-horne-janiky.jpeg",
          category: "Verglasung",
        })}
      />
      <JsonLd data={faqSchema(zasklenieFaqs)} />
      <Header overlay />
      <main className="flex-1">
        <section className="relative min-h-[80svh] flex items-end overflow-hidden">
          <Image
            src="/images/zasklenie-teras-hero.jpg"
            alt="Terrassenverglasung"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/95 via-brown/60 to-brown/20" />
          <div className="relative z-10 max-w-7xl mx-auto w-full px-5 lg:px-8 pb-20 pt-32 lg:pb-24 lg:pt-40">
            <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
              <Link href="/" className="hover:text-white transition-colors">WoodSteel</Link>
              <span>/</span>
              <span className="text-white">Terrassenverglasung</span>
            </div>
            <h1 className="text-display-1 font-extrabold text-white max-w-3xl">
              Terrassenverglasung <span className="text-gold">nach Ihren Vorstellungen.</span>
            </h1>
            <p className="mt-6 text-cream/90 text-lg max-w-2xl leading-relaxed">
              Wir fertigen Ihre Terrassenverglasung nach Maß, genau nach Ihren Vorstellungen.
              Eine elegante und funktionale Lösung für Ihren Außenbereich, hochwertig
              verarbeitet und witterungsbeständig.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/akcna-cenova-ponuka" className="inline-flex justify-center items-center gap-2 px-7 py-4 bg-gold hover:bg-gold-hover text-brown hover:text-white font-semibold rounded-full transition-all shadow-[0_8px_24px_rgba(203,171,88,0.4)] hover:-translate-y-0.5">
                Angebot anfordern <ArrowRight size={18} />
              </Link>
              <a href="tel:+421904473111" className="inline-flex justify-center items-center gap-2 px-7 py-4 border-2 border-white/40 hover:border-white text-white font-semibold rounded-full transition-colors">
                <Phone size={18} /> +421 904 473 111
              </a>
            </div>
          </div>
        </section>

        {/* Úvod */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
            <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
              <span className="w-8 h-px bg-gold/60" />
              Terrassenverglasung von WoodSteel
            </div>
            <h2 className="text-display-2 font-bold text-brown">
              Eine Terrasse, die Sie auch außerhalb der Saison nutzen
            </h2>
            <p className="mt-7 text-mutedbrand text-base lg:text-lg leading-relaxed">
              Unsere Fachleute helfen Ihnen gerne bei der Wahl der Terrassenverglasung,
              beraten Sie und erstellen ein Angebot nach Maß. Alles zu einem fairen
              Preis und mit professionellem Auftreten.
            </p>
          </div>
        </section>

        {/* Systémy zasklenia — detail má každý na vlastnej stránke */}
        <section className="py-16 sm:py-20 lg:py-28 bg-cream/40">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <SectionHeader eyebrow="Systeme" title="Zwei Systeme, zwei verschiedene Ergebnisse" />
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {systems.map((sys) => (
                <Link
                  key={sys.name}
                  href={sys.href}
                  id={sys.id}
                  className="group scroll-mt-28 bg-white rounded-2xl overflow-hidden border border-cream hover:border-gold/40 transition-colors"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                    <Image
                      src={sys.image}
                      alt={sys.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7 lg:p-8">
                    <div className="text-eyebrow text-gold">{sys.tag}</div>
                    <h3 className="mt-3 font-display font-bold text-xl lg:text-2xl text-brown">
                      {sys.name}
                    </h3>
                    <p className="mt-3 font-display italic text-brown/80">{sys.claim}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-gold font-semibold text-sm group-hover:gap-3 transition-all">
                      System ansehen
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Process />
        <Reviews />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ProductStickyCTA productName="Zasklenie terás" />
    </>
  );
}
