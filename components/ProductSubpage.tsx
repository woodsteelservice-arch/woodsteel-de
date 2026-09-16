import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { FinalCTA } from "@/components/FinalCTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Faq } from "@/components/Faq";
import { ProductStickyCTA } from "@/components/ProductStickyCTA";
import { SectionHeader } from "@/components/SectionHeader";
import { realizations } from "@/lib/data";
import type { FaqItem } from "@/components/Faq";

interface Props {
  breadcrumb: { parentLabel: string; parentHref: string };
  hero: {
    eyebrow: string;
    title: React.ReactNode;
    subtitle: string;
    image: string;
  };
  intro: { title: string; body: string };
  features: string[];
  realizationFilter: (cat: string) => boolean;
  faqs?: FaqItem[];
  stickyName: string;
}

export function ProductSubpage({ breadcrumb, hero, intro, features, realizationFilter, faqs, stickyName }: Props) {
  const projects = realizations.filter((r) => realizationFilter(r.category));

  return (
    <>
      <Header overlay />
      <main className="flex-1">
        <section className="relative min-h-[70svh] sm:min-h-[80svh] flex items-end overflow-hidden">
          <Image src={hero.image} alt={typeof hero.title === "string" ? hero.title : hero.eyebrow} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/95 via-brown/60 to-brown/20" />
          <div className="relative z-10 max-w-7xl mx-auto w-full px-5 lg:px-8 pb-16 pt-32 lg:pb-24 lg:pt-40">
            <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
              <Link href="/" className="hover:text-white transition-colors">WoodSteel</Link>
              <span>/</span>
              <Link href={breadcrumb.parentHref} className="hover:text-white transition-colors">{breadcrumb.parentLabel}</Link>
              <span>/</span>
              <span className="text-white">{hero.eyebrow}</span>
            </div>
            <h1 className="text-display-1 font-extrabold text-white max-w-3xl">{hero.title}</h1>
            <p className="mt-6 text-cream/90 text-lg max-w-2xl leading-relaxed">{hero.subtitle}</p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/akcna-cenova-ponuka" className="inline-flex justify-center items-center gap-2 px-7 py-4 bg-gold hover:bg-gold-hover text-brown hover:text-white font-semibold rounded-full transition-all shadow-[0_8px_24px_rgba(203,171,88,0.4)] hover:-translate-y-0.5">
                Angebot anfordern <ArrowRight size={18} />
              </Link>
              <a href="mailto:info@wswintergarten.de" className="inline-flex justify-center items-center gap-2 px-7 py-4 border-2 border-white/40 hover:border-white text-white font-semibold rounded-full transition-colors">
                <Mail size={18} /> info@wswintergarten.de
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-32 bg-cream/40">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="text-eyebrow text-gold mb-4">Detaily</div>
              <h2 className="text-display-2 font-bold text-brown">{intro.title}</h2>
              <p className="mt-6 text-mutedbrand leading-relaxed">{intro.body}</p>
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

        {projects.length > 0 && (
          <section className="py-16 sm:py-20 lg:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-5 lg:px-8">
              <SectionHeader eyebrow="Referenzen" title="Echte Projekte aus dieser Kategorie" />
              <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {projects.map((r) => (
                  <article key={r.image} className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream">
                    <Image src={r.image} alt={r.location ? `${r.category} — ${r.location}` : r.category} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
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
        )}

        <Process />
        <Reviews />
        {faqs && faqs.length > 0 && <Faq items={faqs} eyebrow="FAQ" title={`Fragen zu ${hero.eyebrow}`} />}
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ProductStickyCTA productName={stickyName} />
    </>
  );
}
