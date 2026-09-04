import type { Metadata } from "next";
import { RealizationsSubpage } from "@/components/RealizationsSubpage";

export const metadata: Metadata = {
  title: "Referenzen - Aluminium-Wintergärten - WoodSteel",
  description: "Unsere fertigen Aluminium-Wintergärten — wartungsfreie Konstruktionen nach Maß.",
  alternates: { canonical: "https://woodsteel.sk/realizacie/realizacie-hlinikove-zimne-zahrady/" },
};

export default function Page() {
  return (
    <RealizationsSubpage
      title={<>Referenzen — <span className="text-gold">Aluminium-Wintergärten</span>.</>}
      subtitle="Schlanke Aluminiumprofile mit großen Glasflächen bei echten Kunden."
      filter={(c) => c.toLowerCase().includes("wintergarten") && !c.toLowerCase().includes("holz")}
    />
  );
}
