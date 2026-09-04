import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { categories } from "@/lib/data";

export function Categories() {
  return (
    <section id="categories" className="py-16 sm:py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader
          eyebrow="Unser Angebot"
          title="Drei Kategorien für Ihren perfekten Außenbereich"
          subtitle="Jede Lösung planen wir genau für Ihr Haus — Aufmaß, Visualisierung, Fertigung und Montage aus einer Hand."
        />

        <div className="mt-10 sm:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="group relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[3/4.5] rounded-2xl lg:rounded-3xl overflow-hidden bg-cream"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown/95 via-brown/40 to-transparent" />

              <div className="absolute inset-0 p-6 sm:p-7 lg:p-10 flex flex-col justify-end text-white">
                <h3 className="text-2xl sm:text-display-3 font-bold text-white">{c.name}</h3>
                <p className="mt-2 sm:mt-3 text-cream/90 text-sm sm:text-base leading-relaxed line-clamp-3 max-w-md">
                  {c.description}
                </p>
                <span className="mt-5 sm:mt-6 inline-flex items-center gap-2 text-gold font-semibold text-sm group-hover:gap-3 transition-all">
                  Kategorie ansehen
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
