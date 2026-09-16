import type { Metadata } from "next";
import { RealizationsSubpage } from "@/components/RealizationsSubpage";

export const metadata: Metadata = {
  title: "Referenzen - Carports - WS Wintergarten",
  description: "Unsere fertigen Carports — Aluminiumkonstruktionen nach Maß.",
  alternates: { canonical: "https://woodsteel.sk/realizacie/realizacie-pristresky-na-auto/" },
};

export default function Page() {
  return (
    <RealizationsSubpage
      title={<>Referenzen — <span className="text-gold">Carports</span>.</>}
      subtitle="Carports für ein oder mehrere Fahrzeuge, gebaut von unserem Team."
      filter={(c) => c.toLowerCase().includes("carport")}
    />
  );
}
