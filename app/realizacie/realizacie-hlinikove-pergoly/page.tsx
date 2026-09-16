import type { Metadata } from "next";
import { RealizationsSubpage } from "@/components/RealizationsSubpage";

export const metadata: Metadata = {
  title: "Referenzen - Aluminium-Pergolen - WS Wintergarten",
  description: "Unsere fertigen Aluminium-Pergolen nach Maß.",
  alternates: { canonical: "https://woodsteel.sk/realizacie/realizacie-hlinikove-pergoly/" },
};

export default function Page() {
  return (
    <RealizationsSubpage
      title={<>Referenzen — <span className="text-gold">Aluminium-Pergolen</span>.</>}
      subtitle="Aluminium-Pergolen nach Maß, geplant und gebaut von unserem Team."
      filter={(c) => c.toLowerCase().includes("aluminium-pergola")}
    />
  );
}
