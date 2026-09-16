import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { FinalCTA } from "@/components/FinalCTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { generalFaqs, pergolaFaqs, zimnaZahradaFaqs, zasklenieFaqs } from "@/lib/faqs";
import { JsonLd, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Häufige Fragen - WS Wintergarten",
  description:
    "Antworten auf die häufigsten Fragen zu Pergolen, Wintergärten und Terrassenverglasung — Termine, Garantie und Ablauf der Montage.",
  alternates: { canonical: "https://woodsteel.sk/faq/" },
};

export default function FaqPage() {
  const all = [...generalFaqs, ...pergolaFaqs, ...zimnaZahradaFaqs, ...zasklenieFaqs];
  // Unique by question
  const unique = Array.from(new Map(all.map((q) => [q.question, q])).values());

  return (
    <>
      <JsonLd data={faqSchema(unique)} />
      <Header />
      <main className="flex-1">
        <section className="pt-32 lg:pt-40 pb-12 bg-cream/40">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
            <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
              <Link href="/" className="hover:text-brown">WS Wintergarten</Link>
              <span className="opacity-50">/</span>
              <span className="text-mutedbrand">FAQ</span>
            </div>
            <h1 className="text-display-1 font-extrabold text-brown">
              Häufig gestellte Fragen.
            </h1>
            <p className="mt-5 text-mutedbrand text-base lg:text-lg max-w-2xl mx-auto">
              Kurze Antworten auf das, was am häufigsten gefragt wird. Fehlt etwas?
              <Link href="/kontakt" className="text-gold hover:underline ml-1">
                Schreiben Sie uns.
              </Link>
            </p>
          </div>
        </section>

        <Faq items={generalFaqs} eyebrow="Allgemein" title="Allgemeine Fragen" />
        <Faq items={pergolaFaqs.slice(0, 4)} eyebrow="Pergolen" title="Fragen zu Pergolen" />
        <Faq items={zimnaZahradaFaqs.slice(0, 4)} eyebrow="Wintergärten" title="Fragen zu Wintergärten" />
        <Faq items={zasklenieFaqs.slice(0, 3)} eyebrow="Verglasung" title="Fragen zur Terrassenverglasung" />

        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
