import type { Metadata } from "next";
import { ProductSubpage } from "@/components/ProductSubpage";
import { zimnaZahradaFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Aluminium-Wintergärten - WoodSteel",
  description:
    "Aluminium-Wintergärten nach Maß. Schiebesysteme, wartungsfreie pulverbeschichtete Konstruktion, 5+ Jahre Garantie.",
  alternates: { canonical: "https://woodsteel.sk/zimne-zahrady/hlinikove-zimne-zahrady/" },
};

export default function HlinikoveZimneZahradyPage() {
  return (
    <ProductSubpage
      breadcrumb={{ parentLabel: "Wintergärten", parentHref: "/zimne-zahrady" }}
      hero={{
        eyebrow: "Aluminium-Wintergärten",
        title: (
          <>
            Aluminium-Wintergärten. <span className="text-gold">Maximaler Ausblick.</span>
          </>
        ),
        subtitle:
          "Leichte Konstruktion und großzügige Verglasung, die maximal viel Licht hereinlässt. Klare Linien, die dem Ausblick nicht im Weg stehen, und ein Raum, der ganzjährig nutzbar ist — im Sommer wie mitten im Winter.",
        image:
          "/images/zimna-zahrada-hamuliakovo.jpeg",
      }}
      intro={{
        title: "Schönes Design, maximales Licht",
        body:
          "Ein Aluminium-Wintergarten bietet ein ideales Preis-Leistungs-Verhältnis — wir bauen ihn in saisonaler oder ganzjährig nutzbarer Ausführung, Sie wählen die Variante. Die Konstruktion ist wartungsfrei und hält mit der Pulverbeschichtung Jahrzehnte.",
      }}
      features={[
        "Pulverbeschichtete Aluminiumoberfläche",
        "Verglasung mit oder ohne Rahmen",
        "Schiebesysteme",
        "Integrierte LED-Beleuchtung als Option",
        "Möglichkeit für Sonnenschutz (Screen-Rollos)",
        "In die Konstruktion integrierte Rinne",
        "Wahl zwischen Standard- und Premium-Dacheindeckung",
        "Optional Heizung / Klimaanlage",
        "5+ Jahre Garantie",
        "Eigene Fertigung",
      ]}
      realizationFilter={(c) => c.toLowerCase().includes("wintergarten") && !c.toLowerCase().includes("holz")}
      faqs={zimnaZahradaFaqs.slice(0, 5)}
      stickyName="Aluminium-Wintergarten"
    />
  );
}
