import type { Metadata } from "next";
import { ProductSubpage } from "@/components/ProductSubpage";
import { zimnaZahradaFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Holz-Wintergärten - WS Wintergarten",
  description:
    "Holz-Wintergärten aus Brettschichtholz. Wärme und klassischer Charakter, 5+ Jahre Garantie, eigene Fertigung.",
  alternates: { canonical: "https://woodsteel.sk/zimne-zahrady/drevene-zimne-zahrady/" },
};

export default function DreveneZimneZahradyPage() {
  return (
    <ProductSubpage
      breadcrumb={{ parentLabel: "Wintergärten", parentHref: "/zimne-zahrady" }}
      hero={{
        eyebrow: "Holz-Wintergärten",
        title: (
          <>
            Holz-Wintergärten mit <span className="text-gold">natürlicher Wärme.</span>
          </>
        ),
        subtitle:
          "Holz bringt Wärme und Charakter in den Raum, wie sie sich nicht nachahmen lassen. Ein natürliches Material, das mit der Zeit nicht altert — es setzt lediglich Patina an und bleibt selbstverständlicher Teil des Hauses.",
        image:
          "/images/drevena-zimna-zahrada5.jpg",
      }}
      intro={{
        title: "Holz als Wohnmaterial",
        body:
          "Holz-Wintergärten bringen eine Wärme in den Innenraum, die Aluminium nie erreicht. Geeignet für Einfamilienhäuser mit Holz- oder Naturelementen. Bei richtiger Imprägnierung überdauert die Konstruktion Generationen.",
      }}
      features={[
        "Brettschichtholz (BSH)",
        "Schiebesysteme",
        "Vorbereitung für Heizung / Klimaanlage",
        "5+ Jahre Garantie",
        "Eigene Fertigung",
        "Imprägnierung gegen UV und Feuchtigkeit",
      ]}
      realizationFilter={(c) => c.toLowerCase().includes("holz-wintergarten")}
      faqs={zimnaZahradaFaqs.slice(0, 5)}
      stickyName="Holz-Wintergarten"
    />
  );
}
