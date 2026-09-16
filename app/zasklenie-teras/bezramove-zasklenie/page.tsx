import type { Metadata } from "next";
import { GlazingSystemPage } from "@/components/GlazingSystemPage";

export const metadata: Metadata = {
  title: "Rahmenlose Terrassenverglasung - WS Wintergarten",
  description:
    "Rahmenloses Schiebesystem für die Terrassenverglasung. Einfach-Sicherheitsglas, bis 3 Meter Höhe, minimalistischer Auftritt ohne sichtbare Rahmen.",
  alternates: { canonical: "https://woodsteel.sk/zasklenie-teras/bezramove-zasklenie/" },
};

export default function BezramoveZasklenniePage() {
  return (
    <GlazingSystemPage
      tag="System ohne Rahmen"
      name="Rahmenloses Schiebesystem"
      claim="Die Terrassenverglasung schützt vor Wind und Regen."
      description="Das rahmenlose Schiebesystem ist die Designlösung für anspruchsvollere Kunden, die einen modernen, minimalistischen Auftritt ohne sichtbare Rahmen suchen. Es nutzt Einfach-Sicherheitsglas, mit dem sich Räume bis zu einer Höhe von 3 Metern verglasen lassen. Es bietet nicht nur verlässlichen Schutz vor Wind, Regen, Schnee und Schmutz, sondern auch ein hochwertiges, edles Erscheinungsbild."
      features={[
        "sorgt für einen völlig freien Blick in den Garten",
        "erschwert das gewaltsame Eindringen",
        "Sicherungen gegen das Aushebeln der Scheiben",
        "leichte, schnelle Bedienung und Pflege",
        "freie Wahl der Flügelanzahl und Öffnungsart",
      ]}
      image="/images/zasklenie-bezramovy-system.jpg"
    />
  );
}
