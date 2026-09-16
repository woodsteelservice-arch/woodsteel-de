import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinalCTA } from "@/components/FinalCTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ProductStickyCTA } from "@/components/ProductStickyCTA";
import { Reveal } from "@/components/Reveal";

interface Props {
  /** Krátke označenie systému nad nadpisom, napr. „Rámový systém" */
  tag: string;
  name: string;
  claim: string;
  description: string;
  features: string[];
  image: string;
}

/**
 * Stránka jedného systému zasklenia terasy.
 *
 * Zámerne drží len jednu fotku a text k nej — bez realizácií, recenzií
 * a FAQ, ktoré má spoločná stránka /zasklenie-teras. Hlavička je preto
 * kompaktná a bez celoplošnej fotografie: predlohy systémov majú od
 * dodávateľa len ~600 px, na hero cez celú šírku by boli mäkké.
 */
export function GlazingSystemPage({ tag, name, claim, description, features, image }: Props) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-32 lg:pt-40 pb-12 lg:pb-16 bg-cream/40">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="text-eyebrow text-gold mb-4 inline-flex flex-wrap items-center gap-2">
              <Link href="/" className="hover:text-brown transition-colors">WoodSteel</Link>
              <span className="opacity-50">/</span>
              <Link href="/zasklenie-teras" className="hover:text-brown transition-colors">
                Terrassenverglasung
              </Link>
              <span className="opacity-50">/</span>
              <span className="text-mutedbrand">{tag}</span>
            </div>
            <h1 className="text-display-1 font-extrabold text-brown max-w-3xl">{name}</h1>
            <p className="mt-5 font-display italic text-lg lg:text-xl text-brown/80 max-w-2xl">
              {claim}
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <Reveal>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream">
                <Image
                  src={image}
                  alt={name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="text-eyebrow text-gold">{tag}</div>
              <p className="mt-5 text-mutedbrand text-base lg:text-lg leading-relaxed">
                {description}
              </p>

              <ul className="mt-9 space-y-3.5">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span className="text-charcoal text-sm lg:text-base leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/akcna-cenova-ponuka"
                  className="inline-flex justify-center items-center gap-2 px-7 py-4 bg-gold hover:bg-gold-hover text-brown hover:text-white font-semibold rounded-full transition-all shadow-[0_8px_24px_rgba(203,171,88,0.4)] hover:-translate-y-0.5"
                >
                  Naceniť zasklenie terasy <ArrowRight size={18} />
                </Link>
                <a
                  href="mailto:info@wswintergarten.de"
                  className="inline-flex justify-center items-center gap-2 px-7 py-4 border-2 border-brown/15 hover:border-gold text-brown hover:text-gold font-semibold rounded-full transition-colors"
                >
                  <Mail size={18} /> info@wswintergarten.de
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ProductStickyCTA productName={name} />
    </>
  );
}
