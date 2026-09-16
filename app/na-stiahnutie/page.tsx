import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Download, Archive } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CatalogDownload } from "@/components/CatalogDownload";

export const metadata: Metadata = {
  title: "Downloads - WoodSteel",
  description: "PDF-Kataloge, Reklamationsformulare und Referenzdokumente zum Herunterladen.",
  alternates: { canonical: "https://woodsteel.sk/na-stiahnutie/" },
};

type Doc = {
  title: string;
  file: string;
  size: string;
  note: string;
  type: "pdf" | "docx";
};

const docs: Doc[] = [
  {
    title: "WoodSteel Katalog",
    file: "/download/woodsteel-katalog-de.pdf",
    size: "9,2 MB",
    note: "Vollständiger Produktkatalog — Pergolen, Wintergärten, Verglasung, Zubehör",
    type: "pdf",
  },
  {
    title: "Reklamationsformular (PDF)",
    file: "/download/reklamacny-formular.pdf",
    size: "41 KB",
    note: "Ausdrucken, ausfüllen und per Post oder E-Mail an info@wswintergarten.de senden",
    type: "pdf",
  },
  {
    title: "Reklamationsformular (Word)",
    file: "/download/reklamacny-formular.docx",
    size: "6 KB",
    note: "Bearbeitbare Fassung für Microsoft Word / Pages / Google Docs",
    type: "docx",
  },
];

const fileColor = {
  pdf: "text-rose-500 bg-rose-500/10",
  docx: "text-blue-500 bg-blue-500/10",
};

export default function NaStiahnutiePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-32 lg:pt-40 pb-12 bg-cream/40">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
            <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
              <Link href="/" className="hover:text-brown">WoodSteel</Link>
              <span className="opacity-50">/</span>
              <span className="text-mutedbrand">Na stiahnutie</span>
            </div>
            <h1 className="text-display-1 font-extrabold text-brown">
              Dokumenty <span className="text-gold">na stiahnutie.</span>
            </h1>
            <p className="mt-5 text-mutedbrand text-base lg:text-lg max-w-2xl mx-auto">
              Produktkatalog, Reklamationsformulare und Referenzdokumente.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-5 lg:px-8 space-y-4">
            {docs.map((d) => (
              <a
                key={d.file}
                href={d.file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-5 lg:p-6 bg-white border border-cream rounded-2xl hover:border-gold/40 hover:shadow-[0_8px_24px_rgba(63,34,17,0.06)] hover:-translate-y-0.5 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${fileColor[d.type]}`}>
                  {d.type === "pdf" ? <FileText size={20} /> : <Archive size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-brown">{d.title}</div>
                  <div className="text-xs text-mutedbrand mt-1">
                    {d.note} · {d.type.toUpperCase()} · {d.size}
                  </div>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-gold hover:bg-gold-hover text-brown hover:text-white font-semibold text-sm rounded-full transition-all">
                  <Download size={14} />
                  Herunterladen
                </span>
              </a>
            ))}
          </div>
        </section>

        <CatalogDownload />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
