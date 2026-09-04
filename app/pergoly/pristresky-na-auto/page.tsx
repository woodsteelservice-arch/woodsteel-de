import type { Metadata } from "next";
import { ProductSubpage } from "@/components/ProductSubpage";

export const metadata: Metadata = {
  title: "Carports - WoodSteel",
  description:
    "Aluminium-Carports nach Maß — am Haus verankert oder freistehend. Entwässerung verdeckt in der Konstruktion, eigene Fertigung.",
  alternates: { canonical: "https://woodsteel.sk/pergoly/pristresky-na-auto/" },
};

export default function PristreskyNaAutoPage() {
  return (
    <ProductSubpage
      breadcrumb={{ parentLabel: "Pergolen", parentHref: "/pergoly" }}
      hero={{
        eyebrow: "Carports",
        title: (
          <>
            Carports, die <span className="text-gold">dem Wetter standhalten</span>.
          </>
        ),
        subtitle:
          "Eine Konstruktion nach Maß, die Ihr Auto vor Sonne, Schnee und Hagel schützt. Mit Entwässerung, die direkt in den Profilen verborgen ist.",
        image:
          "/images/IMG_5562.jpg",
      }}
      intro={{
        title: "Ein Carport, das Schnee und Wind trotzt",
        body:
          "Jedes Carport planen wir nach Schneelastzone und Windlast am Bauort — nicht nach Katalog. Die Aluminiumausführung ist schlank und wartungsfrei; das Carport kann am Haus verankert oder freistehend sein.",
      }}
      features={[
        "Am Haus verankert oder freistehend",
        "Pulverbeschichtete Aluminiumoberfläche",
        "Vorbereitet für eine spätere Verglasung",
        "Integrierte LED-Beleuchtung als Option",
        "Möglichkeit für Sonnenschutz (Screen-Rollos)",
        "In die Konstruktion integrierte Rinne",
        "Wahl zwischen Standard- und Premium-Dacheindeckung",
        "5+ Jahre Garantie",
      ]}
      realizationFilter={(c) => c.toLowerCase().includes("carport")}
      stickyName="Carport"
    />
  );
}
