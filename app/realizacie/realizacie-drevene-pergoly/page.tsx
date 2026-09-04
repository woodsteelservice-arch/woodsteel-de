import type { Metadata } from "next";
import { RealizationsSubpage } from "@/components/RealizationsSubpage";

export const metadata: Metadata = {
  title: "Referenzen - Holz-Pergolen - WoodSteel",
  description: "Unsere fertigen Holz-Pergolen — von Einfamilienhäusern in der ganzen Slowakei.",
  alternates: { canonical: "https://woodsteel.sk/realizacie/realizacie-drevene-pergoly/" },
};

export default function Page() {
  return (
    <RealizationsSubpage
      title={<>Referenzen — <span className="text-gold">Holz-Pergolen</span>.</>}
      subtitle="Konstruktionen aus Brettschichtholz von Einfamilienhäusern in der ganzen Slowakei."
      filter={(c) => c.toLowerCase().includes("holz-pergola")}
    />
  );
}
