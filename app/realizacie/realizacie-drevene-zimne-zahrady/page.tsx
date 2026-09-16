import type { Metadata } from "next";
import { RealizationsSubpage } from "@/components/RealizationsSubpage";

export const metadata: Metadata = {
  title: "Referenzen - Holz-Wintergärten - WS Wintergarten",
  description: "Unsere fertigen Holz-Wintergärten — Konstruktionen aus Brettschichtholz.",
  alternates: { canonical: "https://woodsteel.sk/realizacie/realizacie-drevene-zimne-zahrady/" },
};

export default function Page() {
  return (
    <RealizationsSubpage
      title={<>Referenzen — <span className="text-gold">Holz-Wintergärten</span>.</>}
      subtitle="Wintergärten aus Brettschichtholz, die Wärme und Charakter in echte Zuhause gebracht haben."
      filter={(c) => c.toLowerCase().includes("holz-wintergarten")}
    />
  );
}
