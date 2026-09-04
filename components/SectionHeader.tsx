import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  invert?: boolean;
}

export function SectionHeader({ eyebrow, title, subtitle, align = "center", invert = false }: Props) {
  return (
    <div className={cn(
      "max-w-3xl",
      align === "center" ? "mx-auto text-center" : "text-left"
    )}>
      {eyebrow && (
        <div className={cn("text-eyebrow mb-4 inline-flex items-center gap-2", invert ? "text-gold" : "text-gold")}>
          <span className={cn("w-8 h-px", invert ? "bg-gold/60" : "bg-gold/60")} />
          {eyebrow}
        </div>
      )}
      <h2 className={cn(
        "text-display-2 font-bold",
        invert ? "text-white" : "text-brown"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-4 text-base lg:text-lg leading-relaxed",
          invert ? "text-cream/80" : "text-mutedbrand"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
