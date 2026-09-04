"use client";

import { Cookie } from "lucide-react";
import { openCookieSettings } from "@/components/CookieConsent";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="inline-flex items-center gap-2 px-5 py-3 bg-gold hover:bg-gold-hover text-brown hover:text-white font-semibold text-sm rounded-full transition-all"
    >
      <Cookie size={16} />
      Cookie-Einstellungen ändern
    </button>
  );
}
