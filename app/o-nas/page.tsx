import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { BacklitSign } from "@/components/BacklitSign";
import { Footer } from "@/components/Footer";
import { FinalCTA } from "@/components/FinalCTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Team } from "@/components/Team";
import { CoverageMap } from "@/components/CoverageMap";
import { CounterStat } from "@/components/CounterStat";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { stats } from "@/lib/data";

export const metadata: Metadata = {
  title: "Über uns - WoodSteel",
  description:
    "Eigene Fertigung und Montage in der Slowakei seit 2021. Ein Team, das den Auftrag von der Planung bis zur Übergabe begleitet.",
  alternates: { canonical: "https://woodsteel.sk/o-nas/" },
};

const values = [
  {
    title: "Eigene Fertigung",
    description:
      "Kein Subunternehmer zwischen uns und Ihnen. Die Konstruktionen fertigen wir in der eigenen Werkstatt in der Slowakei — von der Schraube bis zur finalen Oberfläche.",
  },
  {
    title: "Eigenes Montageteam",
    description:
      "Dieselben Leute, die bei Ihnen das Aufmaß gemacht haben, kommen auch, um die Pergola oder den Wintergarten zu bauen. Keine Überraschungen, ein verantwortliches Team.",
  },
  {
    title: "Alles aus einer Hand",
    description:
      "Vom ersten Termin über Visualisierung, Fertigung, Transport und Montage bis zum Service. Sie bereiten den Platz vor, den Rest übernehmen wir.",
  },
  {
    title: "Sorgenfreiheit",
    description:
      "Der Angebotspreis ist der Rechnungspreis. Termine halten wir ein. Auf Reklamationen reagieren wir binnen 48 Stunden. Das ist die ganze Philosophie.",
  },
];

export default function ONasPage() {
  return (
    <>
      <Header overlay />
      <main className="flex-1">
        <section className="relative min-h-[60svh] flex items-end overflow-hidden">
          <BacklitSign />
          {/* Spodok stmavíme kvôli čitateľnosti nadpisu, hore necháme svietiť nápis */}
          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-brown/95 via-brown/25 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto w-full px-5 lg:px-8 pb-16 pt-32">
            <h1 className="text-display-1 font-extrabold text-white max-w-3xl">
              Wir geben dem Raum <span className="text-gold">eine neue Dimension</span>.
            </h1>
          </div>
        </section>

        {/* Brand story */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
            <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
              <span className="w-8 h-px bg-gold/60" /> Unsere Geschichte
            </div>
            <h2 className="text-display-2 font-bold text-brown">
              Wir begleiten den Prozess von&nbsp;A&nbsp;bis&nbsp;Z
            </h2>
            <p className="mt-7 text-lg text-charcoal leading-relaxed">
              WoodSteel ist ein slowakisches Unternehmen, das sich auf Außenkonstruktionen
              aus Holz und Aluminium spezialisiert hat — Pergolen, Wintergärten
              und Terrassenverglasungen. Unseren Kunden bieten wir umfassende Leistungen
              vom Entwurf bis zur fertigen Umsetzung.
            </p>
            <p className="mt-5 text-mutedbrand leading-relaxed">
              Wir arbeiten professionell, respektvoll und mit dem Anspruch an Lösungen
              nach Maß. Unsere Kunden kaufen bei uns nicht nur ein Stück Holz oder
              Stahl — sie kaufen sich sorgenfreie Ruhe auf der eigenen Terrasse.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="ws-sweep relative py-16 sm:py-20 overflow-hidden bg-gradient-to-br from-brown via-brown to-wood">
          {/* Pomaly plávajúce zlaté svetlo */}
          <div
            aria-hidden
            className="ws-drift pointer-events-none absolute -top-28 left-[15%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(203,171,88,0.20),transparent_70%)] blur-3xl"
          />
          <div
            aria-hidden
            className="ws-drift-slow pointer-events-none absolute -bottom-36 right-[12%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(203,171,88,0.13),transparent_70%)] blur-3xl"
          />
          {/* Vlasové zlaté linky na hranách pásu */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
          />
          {/* Svetlo, ktoré neustále putuje po hornej hrane */}
          <span
            aria-hidden
            className="ws-trace pointer-events-none absolute top-0 h-px w-[25%] bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_10px_rgba(203,171,88,0.8)]"
          />

          <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 110}>
                  <div
                    className={cn(
                      "group relative transition-transform duration-500 hover:-translate-y-1.5",
                      i % 2 === 1 && "border-l border-cream/10",
                      i === 2 && "lg:border-l lg:border-cream/10",
                      i >= 2 && "border-t border-cream/10 lg:border-t-0"
                    )}
                  >
                    <CounterStat value={s.value} label={s.label} invert />
                    {/* Zlatá linka, ktorá sa pri prejdení myšou roztiahne */}
                    <span
                      aria-hidden
                      className="absolute bottom-3 left-1/2 h-px w-8 -translate-x-1/2 bg-gold/30 transition-all duration-500 ease-out group-hover:w-16 group-hover:bg-gold group-hover:shadow-[0_0_10px_rgba(203,171,88,0.7)]"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CoverageMap />

        {/* Values */}
        <section className="py-24 lg:py-32 bg-cream/40">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <SectionHeader eyebrow="Unsere Werte" title="Vier Prinzipien, nach denen wir arbeiten" />
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-8 lg:p-10 border border-cream">
                  <h3 className="font-display font-bold text-xl text-brown">{v.title}</h3>
                  <p className="mt-4 text-mutedbrand leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team — zdieľaný komponent */}
        <Team bgClass="bg-white" />

        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
