import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FinalCTA } from "@/components/FinalCTA";
import { realizations } from "@/lib/data";

interface Props {
  title: React.ReactNode;
  subtitle: string;
  filter: (cat: string) => boolean;
}

export function RealizationsSubpage({ title, subtitle, filter }: Props) {
  const projects = realizations.filter((r) => filter(r.category));

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-32 lg:pt-40 pb-12 bg-cream/40">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
            <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
              <Link href="/" className="hover:text-brown">WoodSteel</Link>
              <span className="opacity-50">/</span>
              <Link href="/realizacie" className="hover:text-brown">Referenzen</Link>
            </div>
            <h1 className="text-display-1 font-extrabold text-brown max-w-4xl mx-auto">
              {title}
            </h1>
            <p className="mt-6 text-mutedbrand text-base lg:text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {projects.map((r) => (
                  <article key={r.image} className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream">
                    <Image src={r.image} alt={r.location ? `${r.category} — ${r.location}` : r.category} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
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
            ) : (
              <div className="text-center py-12">
                <p className="text-mutedbrand">
                  Projekte dieser Kategorie bereiten wir noch auf.{" "}
                  <Link href="/realizacie" className="text-gold underline">
                    Alle ansehen →
                  </Link>
                </p>
              </div>
            )}
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
