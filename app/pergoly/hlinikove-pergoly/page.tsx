import type { Metadata } from "next";
import { ProductSubpage } from "@/components/ProductSubpage";
import { pergolaFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Aluminium-Pergolen - WoodSteel",
  description:
    "Aluminium-Pergolen nach Maß mit integrierter Rinne und Vorbereitung für eine spätere Verglasung. Witterungsbeständig, pflegeleicht, mit modernen Linien.",
  alternates: { canonical: "https://woodsteel.sk/pergoly/hlinikove-pergoly/" },
};

export default function HlinikovePergolyPage() {
  return (
    <ProductSubpage
      breadcrumb={{ parentLabel: "Pergolen", parentHref: "/pergoly" }}
      hero={{
        eyebrow: "Aluminium-Pergolen",
        title: (
          <>
            Aluminium-Pergola <span className="text-gold">nach Ihren Vorstellungen</span>.
          </>
        ),
        subtitle:
          "Witterungsbeständig, pflegeleicht und modern im Auftritt. Ein preislich zugängliches System mit integrierter Rinne und verschiedenen Möglichkeiten der Dacheindeckung.",
        image:
          "/images/hlinikova-pergola-senec.jpeg",
      }}
      intro={{
        title: "Eine Pergola, die mit Ihnen wächst",
        body:
          "Maße, Farbton und Dacheindeckung wählen wir passend zu Ihrem Haus. Jederzeit ergänzen Sie seitliche Screen-Rollos gegen Sonne und Wind — und später auch die Verglasung.",
      }}
      features={[
        "Pulverbeschichtete Aluminiumoberfläche",
        "Vorbereitet für eine spätere Verglasung",
        "Integrierte LED-Beleuchtung als Option",
        "Möglichkeit für Sonnenschutz (Screen-Rollos)",
        "In die Konstruktion integrierte Rinne",
        "Wahl zwischen Standard- und Premium-Dacheindeckung",
        "5+ Jahre Garantie",
      ]}
      realizationFilter={(c) => c.toLowerCase().includes("pergola")}
      faqs={pergolaFaqs.slice(0, 5)}
      stickyName="Aluminium-Pergola"
    />
  );
}
