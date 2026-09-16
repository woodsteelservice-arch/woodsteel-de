import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { FinalCTA } from "@/components/FinalCTA";
import { SectionHeader } from "@/components/SectionHeader";
import { Faq } from "@/components/Faq";
import { ProductStickyCTA } from "@/components/ProductStickyCTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { realizations } from "@/lib/data";
import { zimnaZahradaFaqs } from "@/lib/faqs";
import { JsonLd, productSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Wintergärten - WS Wintergarten",
  description:
    "Holz- und Aluminium-Wintergärten nach Maß. Verglasung mit und ohne Rahmen, eigene Fertigung und Montage.",
  alternates: { canonical: "https://woodsteel.sk/zimne-zahrady/" },
};

const variants = [
  {
    name: "Aluminium-Wintergarten",
    tag: "Aluminium",
    description:
      "Leichte Konstruktion und großzügige Verglasung mit maximalem Lichteinfall. Klares, modernes Design und ein Raum, den Sie das ganze Jahr genießen.",
    image:
      "/images/zimna-zahrada-hamuliakovo.jpeg",
  },
  {
    name: "Holz-Wintergarten",
    tag: "Holz",
    description:
      "Die natürliche Wärme und der Charakter von Holz. Ein Material, das dem Raum Behaglichkeit gibt und mit der Zeit Patina ansetzt.",
    image:
      "/images/drevena-zimna-zahrada5.jpg",
  },
];

const features = [
  "Verglasung mit oder ohne Rahmen",
  "Wartungsfreie Aluminiumprofile",
  "Schiebesysteme",
  "Möglichkeit für Sonnenschutz (Screen-Rollos)",
  "Optional Heizung / Klimaanlage",
  "5+ Jahre Garantie",
  "Eigene Fertigung in der Slowakei",
];

export default function ZimneZahradyPage() {
  const projects = realizations.filter((r) => r.category.toLowerCase().includes("wintergarten"));

  return (
    <>
      <JsonLd
        data={productSchema({
          name: "WS Wintergarten Wintergärten",
          description:
            "Wintergärten aus Aluminium oder Holz nach Maß. Verglasung mit und ohne Rahmen, Schiebesysteme. Eigene Fertigung.",
          image:
            "/images/zimna-zahrada-hero.jpeg",
          category: "Wintergärten",
        })}
      />
      <JsonLd data={faqSchema(zimnaZahradaFaqs)} />
      <Header overlay />
      <main className="flex-1">
        <section className="relative min-h-[80svh] flex items-end overflow-hidden">
          <Image
            src="/images/zimna-zahrada-hero.jpeg"
            alt="Aluminium-Wintergarten von WS Wintergarten"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/95 via-brown/60 to-brown/20" />
          <div className="relative z-10 max-w-7xl mx-auto w-full px-5 lg:px-8 pb-20 pt-32 lg:pb-24 lg:pt-40">
            <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
              <Link href="/" className="hover:text-white transition-colors">WS Wintergarten</Link>
              <span>/</span>
              <span className="text-white">Wintergärten</span>
            </div>
            <h1 className="text-display-1 font-extrabold text-white max-w-3xl">
              Wintergärten, in denen <span className="text-gold">der Sommer nie endet.</span>
            </h1>
            <p className="mt-6 text-cream/90 text-lg max-w-2xl leading-relaxed">
              Ein vollwertiger Wohnbereich, unabhängig vom Wetter. Aluminium oder Holz,
              Verglasung mit und ohne Rahmen, Schiebesysteme mit sanftem Lauf.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="#variants" className="inline-flex justify-center items-center gap-2 px-7 py-4 bg-gold hover:bg-gold-hover text-brown hover:text-white font-semibold rounded-full transition-all shadow-[0_8px_24px_rgba(203,171,88,0.4)] hover:-translate-y-0.5">
                Varianten ansehen <ArrowRight size={18} />
              </Link>
              <a href="mailto:info@wswintergarten.de" className="inline-flex justify-center items-center gap-2 px-7 py-4 border-2 border-white/40 hover:border-white text-white font-semibold rounded-full transition-colors">
                <Mail size={18} /> info@wswintergarten.de
              </a>
            </div>
          </div>
        </section>

        <section id="variants" className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <SectionHeader eyebrow="Varianten" title="Zwei Ausführungen, ein Qualitätsstandard" subtitle="Sie wählen Material und Nutzungsart — technische Lösung und Montage bleiben bei uns." />
            <div className="mt-16 space-y-16 lg:space-y-24">
              {variants.map((v, i) => (
                <div key={v.name} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream">
                    <Image src={v.image} alt={v.name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div>
                    <div className="text-eyebrow text-gold">{v.tag}</div>
                    <h3 className="mt-3 text-display-3 font-bold text-brown">{v.name}</h3>
                    <p className="mt-5 text-mutedbrand leading-relaxed">{v.description}</p>
                    <Link href="/akcna-cenova-ponuka" className="mt-8 inline-flex items-center gap-2 py-2 text-gold font-semibold text-sm hover:gap-3 transition-all">
                      Angebot anfordern <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32 bg-cream/50">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="text-eyebrow text-gold mb-4">Serienmäßige Ausstattung</div>
              <h2 className="text-display-2 font-bold text-brown">Wohnen unter Sternen — auch im Winter.</h2>
              <p className="mt-6 text-mutedbrand leading-relaxed">Jeder Wintergarten von WS Wintergarten durchläuft denselben Prozess in fünf Schritten — vom persönlichen Aufmaß bis zur Endmontage durch unser Team.</p>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-charcoal text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <SectionHeader eyebrow="Referenzen" title="Unsere Wintergärten bei echten Kunden" subtitle="Einblicke in fertige Projekte." />
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {projects.map((r) => (
                <article key={r.image} className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream">
                  <Image src={r.image} alt={r.location ? `${r.category} — ${r.location}` : r.category} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/85 via-brown/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="text-eyebrow text-gold/90">{r.category}</div>
                    {r.location && (
                      <div className="font-display font-semibold text-lg mt-1">{r.location}</div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Process />
        <Reviews />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
