"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  productName: string;
}

export function ProductStickyCTA({ productName }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 inset-x-0 z-30 transition-transform duration-300 lg:hidden",
        show ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="bg-white border-t border-cream shadow-[0_-8px_24px_rgba(63,34,17,0.08)] px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] text-eyebrow text-mutedbrand">Angebot für</div>
          <div className="font-display font-bold text-brown text-sm truncate">
            {productName}
          </div>
        </div>
        <Link
          href="/akcna-cenova-ponuka"
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 bg-gold text-brown font-semibold text-sm rounded-full shadow-[0_4px_16px_rgba(203,171,88,0.45)]"
        >
          <Zap size={14} />
          Anfrage
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
