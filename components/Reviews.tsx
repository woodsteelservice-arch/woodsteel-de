import { Star } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { reviews } from "@/lib/data";

export function Reviews() {
  // Bez recenzií sekciu vôbec nevykresľujeme — na web nepatria vymyslené
  // referencie. Po doplnení skutočných textov do `reviews` sa objaví sama.
  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="py-16 sm:py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader
          eyebrow="Kundenbewertungen"
          title="Stimmen von Menschen, die sich für uns entschieden haben"
          subtitle="Echte Erfahrungen aus abgeschlossenen Projekten. Ohne Beschönigung."
        />

        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {reviews.map((r) => (
            <article
              key={r.name}
              className="relative bg-white rounded-2xl p-6 sm:p-7 border border-cream shadow-[0_4px_20px_rgba(63,34,17,0.05)] hover:shadow-[0_16px_40px_rgba(63,34,17,0.1)] hover:-translate-y-1 transition-all flex flex-col"
            >
              <div className="flex gap-0.5 mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#cbab58] text-[#cbab58]" />
                ))}
              </div>
              <p className="text-charcoal italic leading-relaxed text-[15px] flex-1">
                „{r.text}"
              </p>
              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-cream/80">
                <div className="font-display font-bold text-brown">{r.name}</div>
                {(r.location || r.time) && (
                  <div className="text-xs text-mutedbrand mt-0.5">
                    {[r.location, r.time].filter(Boolean).join(" · ")}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 text-center">
          <div className="flex flex-wrap justify-center items-center gap-3 font-display">
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-[#cbab58] text-[#cbab58]" />
              ))}
            </span>
            <span className="text-brown font-bold text-lg">4.8 / 5</span>
            <span className="text-mutedbrand text-sm">auf Basis von Google-Bewertungen</span>
          </div>
          <a
            href="https://www.google.com/search?q=Woodsteel+SK+recenzie"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-brown/15 hover:border-gold text-brown hover:text-gold text-sm font-semibold rounded-full transition-colors"
          >
            Bewertung auf Google schreiben →
          </a>
        </div>
      </div>
    </section>
  );
}
