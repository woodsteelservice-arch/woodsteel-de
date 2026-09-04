import type { Metadata } from "next";
import { RealizationsSubpage } from "@/components/RealizationsSubpage";

export const metadata: Metadata = {
  title: "Referenzen - Aluminium-Pergolen - WoodSteel",
  description: "Unsere fertigen Aluminium-Pergolen nach Maß aus der ganzen Slowakei.",
  alternates: { canonical: "https://woodsteel.sk/realizacie/realizacie-hlinikove-pergoly/" },
};

export default function Page() {
  return (
    <RealizationsSubpage
      title={<>Referenzen — <span className="text-gold">Aluminium-Pergolen</span>.</>}
      subtitle="Aluminium-Pergolen nach Maß aus Bratislava, Senec, Trenčín und weiteren Orten."
      filter={(c) => c.toLowerCase().includes("aluminium-pergola")}
    />
  );
}
