import type { Metadata } from "next";
import { ProductSubpage } from "@/components/ProductSubpage";
import { pergolaFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Holz-Pergolen - WS Wintergarten",
  description:
    "Holz-Pergolen nach Maß aus Brettschichtholz. Natürliche Wärme, Formstabilität und Vorbereitung für eine spätere Verglasung. Eigene Fertigung.",
  alternates: { canonical: "https://woodsteel.sk/pergoly/drevene-pergoly/" },
};

export default function DrevenePergolyPage() {
  return (
    <ProductSubpage
      breadcrumb={{ parentLabel: "Pergolen", parentHref: "/pergoly" }}
      hero={{
        eyebrow: "Holz-Pergolen",
        title: (
          <>
            Holz-Pergolen mit <span className="text-gold">klassischem Charakter</span>.
          </>
        ),
        subtitle:
          "Ein natürliches Material, das dem Raum Wärme gibt und mit der Zeit Patina ansetzt. Es passt zur traditionellen Fassade ebenso wie zum Neubau.",
        image:
          "/images/drevena-pergola-hero.jpg",
      }}
      intro={{
        title: "Naturholz, das hält",
        body:
          "Wir verwenden Brettschichtholz — eine verleimte Konstruktion, die weder reißt noch sich verzieht und ihre Form auch nach Jahren behält. Die Oberflächenbehandlung schützt sie vor Sonne und Feuchtigkeit, so altert die Pergola langsam und schön.",
      }}
      features={[
        "Brettschichtholz, das weder reißt noch sich verzieht",
        "Oberflächenschutz gegen Sonne und Feuchtigkeit",
        "Integrierte Entwässerung der Konstruktion",
        "Vorbereitet für eine spätere Verglasung",
        "Optional LED-Beleuchtung und seitliche Screen-Rollos",
        "Wahl zwischen Standard- und Premium-Dacheindeckung",
        "5+ Jahre Garantie",
      ]}
      realizationFilter={(c) => c.toLowerCase().includes("holz-pergola")}
      faqs={pergolaFaqs.slice(0, 5)}
      stickyName="Holz-Pergola"
    />
  );
}
