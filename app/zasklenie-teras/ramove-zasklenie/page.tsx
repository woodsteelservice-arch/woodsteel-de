import type { Metadata } from "next";
import { GlazingSystemPage } from "@/components/GlazingSystemPage";

export const metadata: Metadata = {
  title: "Terrassenverglasung mit Rahmen - WoodSteel",
  description:
    "Aluminium-Schiebesystem mit Rahmen für die Terrassenverglasung. Einfach- oder Isolierverglasung, bis 2,7 Meter Höhe, gutes Preis-Leistungs-Verhältnis.",
  alternates: { canonical: "https://woodsteel.sk/zasklenie-teras/ramove-zasklenie/" },
};

export default function RamoveZasklenniePage() {
  return (
    <GlazingSystemPage
      tag="System mit Rahmen"
      name="Aluminium-Schiebesystem mit Rahmen"
      claim="Schützt Ihre Terrasse vor Wind und Regen."
      description="Das Schiebesystem mit Rahmen besteht aus hochwertigen Aluminiumprofilen, ergänzt durch Komponenten aus Edelstahl. Als Füllung verwenden wir Einfach- oder Isolierverglasung, mit der sich Räume bis zu einer Höhe von 2,7 Metern verglasen lassen. Wenn Sie ein gutes Preis-Leistungs-Verhältnis suchen, ist dieses System die ideale Wahl."
      features={[
        "schützt vor Lärm, Staub und schlechtem Wetter",
        "erschwert das gewaltsame Eindringen",
        "Sicherungen gegen das Aushebeln der Scheiben",
        "einfache Montage dank vormontiertem System",
        "leichte, schnelle Bedienung und Pflege",
        "freie Wahl der Flügelanzahl und Öffnungsart",
      ]}
      image="/images/zasklenie-ramovy-system.jpg"
    />
  );
}
