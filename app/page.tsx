import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Categories } from "@/components/Categories";
import { Process } from "@/components/Process";
import { Realizations } from "@/components/Realizations";
import { Team } from "@/components/Team";
import { Reviews } from "@/components/Reviews";
import { InstagramFeed } from "@/components/InstagramFeed";
import { CatalogDownload } from "@/components/CatalogDownload";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PromoBanner } from "@/components/PromoBanner";
import { Faq } from "@/components/Faq";
import { generalFaqs } from "@/lib/faqs";
import { JsonLd, localBusinessSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "https://woodsteel.sk/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema(generalFaqs)} />
      <Header overlay />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Categories />
        <Process />
        <Realizations />
        <Team />
        <Reviews />
        <InstagramFeed />
        <CatalogDownload />
        <Faq items={generalFaqs.slice(0, 4)} compact help title="Häufige Fragen" eyebrow="FAQ" />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <PromoBanner />
    </>
  );
}
