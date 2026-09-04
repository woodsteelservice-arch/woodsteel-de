import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
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
import { pergolaFaqs } from "@/lib/faqs";
import { JsonLd, productSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pergolen - WoodSteel",
  description:
    "Holz- und Aluminium-Pergolen nach Maß — Planung, eigene Fertigung und Montage. Carports und Vorbereitung für eine spätere Verglasung.",
  alternates: { canonical: "https://woodsteel.sk/pergoly/" },
};

const variants = [
  {
    name: "Aluminium-Pergola",
    tag: "Aluminium",
    description:
      "Aluminium-Pergolen sind in den letzten Jahren zu einer beliebten und idealen Lösung für viele Gärten geworden. Sie sind witterungsbeständig, pflegeleicht und modern im Auftritt. Sie garantieren eine lange Lebensdauer und schaffen einen behaglichen Außenbereich. Entscheiden Sie sich mit unseren Aluminium-Pergolen für Eleganz und Langlebigkeit.",
    image:
      "/images/hlinikova-pergola-senec.jpeg",
  },
  {
    name: "Holz-Pergola aus Brettschichtholz",
    tag: "Holz",
    description:
      "Holz-Pergolen sind der zeitlose Klassiker für jeden Garten. Mit ihrem traditionellen Auftritt machen sie jeden Außenbereich behaglich. Sie überzeugen durch lange Lebensdauer und lassen sich in ihrem Erscheinungsbild allen Bedürfnissen und Wünschen unserer Kunden anpassen. So werden sie zur harmonischen Ergänzung jedes Gartens.",
    image:
      "/images/drevena-pergola-woodsteel.jpg",
  },
  {
    name: "Carport",
    tag: "Carport",
    description:
      "Unsere Carports bieten zuverlässigen Schutz vor schlechtem Wetter. Sie sind die ideale Lösung, um Ihr Fahrzeug in optimalem Zustand zu halten. Wir bieten mehrere Varianten und Ausführungen an und helfen Ihnen, ein stilvolles und funktionales Carport zu finden, das Ihr Auto und Ihre Investition verlässlich schützt.",
    image:
      "/images/IMG_5562.jpg",
  },
];

const features = [
  "Vorbereitet für eine spätere Verglasung",
  "Eigene Fertigung in der Slowakei",
  "5+ Jahre Garantie",
  "Integrierte LED-Beleuchtung als Option",
  "Möglichkeit für Sonnenschutz (Screen-Rollos)",
  "Entwässerung in den Stützen",
];

export default function PergolyPage() {
  const pergolaProjects = realizations.filter((r) =>
    r.category.toLowerCase().includes("pergola"),
  );

  return (
    <>
      <JsonLd
        data={productSchema({
          name: "Pergoly WoodSteel",
          description:
            "Aluminium- und Holz-Pergolen sowie Aluminium-Carports. Eigene Fertigung mit 5+ Jahren Garantie.",
          image:
            "/images/hlinikova-pergola-trencin.jpeg",
          category: "Pergoly",
        })}
      />
      <JsonLd data={faqSchema(pergolaFaqs)} />
      <Header overlay />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[80svh] flex items-end overflow-hidden">
          <Image
            src="/images/hlinikova-pergola-trencin.jpeg"
            alt="Aluminium-Pergola — Trenčín"
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
              <span className="text-white">Pergoly</span>
            </div>
            <h1 className="text-display-1 font-extrabold text-white max-w-3xl">
              Pergolen nach Maß, die <span className="text-gold">Generationen überdauern.</span>
            </h1>
            {/* Price badge */}
            <p className="mt-6 text-cream/90 text-lg max-w-2xl leading-relaxed">
              Aluminium- und Holz-Pergolen sowie Aluminium-Carports.
              Jede Pergola planen wir genau für Ihr Haus — vom Aufmaß bis zur Endmontage.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                href="#variants"
                className="inline-flex justify-center items-center gap-2 px-7 py-4 bg-gold hover:bg-gold-hover text-brown hover:text-white font-semibold rounded-full transition-all shadow-[0_8px_24px_rgba(203,171,88,0.4)] hover:-translate-y-0.5"
              >
                Varianten ansehen
                <ArrowRight size={18} />
              </Link>
              <a
                href="tel:+421904473111"
                className="inline-flex justify-center items-center gap-2 px-7 py-4 border-2 border-white/40 hover:border-white text-white font-semibold rounded-full transition-colors"
              >
                <Phone size={18} />
                +421 904 473 111
              </a>
            </div>
          </div>
        </section>

        {/* Variants */}
        <section id="variants" className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="space-y-16 lg:space-y-24">
              {variants.map((v, i) => (
                <div
                  key={v.name}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream">
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div>
                    <div className="text-eyebrow text-gold">{v.tag}</div>
                    <h3 className="mt-3 text-display-3 font-bold text-brown">
                      {v.name}
                    </h3>
                    <p className="mt-5 text-mutedbrand leading-relaxed">
                      {v.description}
                    </p>
                    <Link
                      href="#contact"
                      className="mt-8 inline-flex items-center gap-2 py-2 text-gold font-semibold text-sm hover:gap-3 transition-all"
                    >
                      Angebot anfordern
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature list */}
        <section className="py-24 lg:py-32 bg-cream/50">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="text-eyebrow text-gold mb-4">Štandardná výbava</div>
              <h2 className="text-display-2 font-bold text-brown">
                Bis ins kleinste Detail durchdacht
              </h2>
              <p className="mt-6 text-mutedbrand leading-relaxed">
                Jede Pergola von WoodSteel durchläuft denselben Prozess in fünf Schritten — vom
                persönlichen Aufmaß bis zur Endmontage durch unser Team.
              </p>
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

        {/* Pergola realizations */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <SectionHeader
              eyebrow="Pergola-Projekte"
              title="Unsere Pergolen bei echten Kunden"
              subtitle="Aus Aluminium und Holz, in der Stadt wie auf dem Land."
            />
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {pergolaProjects.map((r) => (
                <article
                  key={r.image}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream"
                >
                  <Image
                    src={r.image}
                    alt={r.location ? `${r.category} — ${r.location}` : r.category}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/85 via-brown/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="text-eyebrow text-gold/90">{r.category}</div>
                    {r.location && (
                      <div className="font-display font-semibold text-lg mt-1">
                        {r.location}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Process />
        <Reviews />
        <Faq items={pergolaFaqs} eyebrow="FAQ" title="Fragen zu Pergolen" />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ProductStickyCTA productName="Pergola" />
    </>
  );
}
