import type { Metadata } from "next";
import { RealizationsSubpage } from "@/components/RealizationsSubpage";

export const metadata: Metadata = {
  title: "Referenzen - Holz-Pergolen - WS Wintergarten",
  description: "Unsere fertigen Holz-Pergolen für Einfamilienhäuser.",
  alternates: { canonical: "https://woodsteel.sk/realizacie/realizacie-drevene-pergoly/" },
};

export default function Page() {
  return (
    <RealizationsSubpage
      title={<>Referenzen — <span className="text-gold">Holz-Pergolen</span>.</>}
      subtitle="Konstruktionen aus Brettschichtholz für Einfamilienhäuser."
      filter={(c) => c.toLowerCase().includes("holz-pergola")}
    />
  );
}
