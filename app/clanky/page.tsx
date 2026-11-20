import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinalCTA } from "@/components/FinalCTA";
import { BlogIndex } from "@/components/BlogIndex";
import { blogPosts, blogKategorie, readingMinutes } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Ratgeber — WS Wintergarten",
  description:
    "Tipps und Anleitungen zu Pergolen, Wintergärten und Terrassenverglasung — von der Verankerung bis zur Pflege.",
  alternates: { canonical: "https://wswintergarten.de/clanky/" },
};

export default function RatgeberPage() {
  // Die Lesezeit rechnen wir auf dem Server — der Client bekommt fertige Zahlen.
  // Telá článkov do klientskeho komponentu neposielame — index ich nepotrebuje
  // a v payloade stránky by to boli stovky kilobajtov textu.
  const clanky = blogPosts.map(({ contentHtml: _html, contentLength: _len, ...p }) => ({
    ...p,
    minuty: readingMinutes({ ...p, contentHtml: _html, contentLength: _len }),
  }));
  const kategorie = blogKategorie();

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ── Hlavička ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-cream/40 pt-32 lg:pt-40 pb-14 lg:pb-16">
          {/* mäkká zlatá žiara za nadpisom */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[100px]"
            style={{ background: "radial-gradient(closest-side, rgba(203,171,88,0.20), transparent)" }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 text-center">
            <div className="text-eyebrow text-gold mb-5">
              <Link href="/" className="hover:text-brown transition-colors">WoodSteel</Link>
              <span className="opacity-50 mx-2">/</span>
              <span className="text-mutedbrand">Ratgeber</span>
            </div>

            <h1 className="text-display-1 font-extrabold text-brown">
              Inspiration und{" "}
              <span className="relative inline-block text-gold">
                praktische Tipps.
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent"
                />
              </span>
            </h1>

            <p className="mt-6 text-mutedbrand text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Erfahrungen aus der Praxis, Pflegeanleitungen und Entscheidungshilfen —
              alles, was Sie vor dem Kauf einer Außenkonstruktion wissen sollten.
            </p>

            <p className="mt-7 text-xs text-mutedbrand/80">
              {clanky.length} Beiträge
            </p>
          </div>
        </section>

        <BlogIndex clanky={clanky} kategorie={kategorie} />

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
