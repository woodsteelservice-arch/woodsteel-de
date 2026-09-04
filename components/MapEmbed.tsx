import Link from "next/link";
import { Navigation } from "lucide-react";

interface Props {
  title?: string;
  height?: string;
}

// Approximate location for Showroom Rovinka (placeholder coordinates — replace with exact)
const SHOWROOM_COORDS = { lat: 48.1689, lng: 17.2731 };
const GOOGLE_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=Rovinka%2C%20Slovakia`;
const EMBED_URL = `https://www.google.com/maps?q=Rovinka%2C%20Slovakia&z=14&output=embed`;

export function MapEmbed({ title = "Showroom Rovinka", height = "400px" }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden border border-cream relative bg-cream">
      <iframe
        src={EMBED_URL}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full block"
        style={{ height, border: 0 }}
        allowFullScreen
      />
      <Link
        href={GOOGLE_DIRECTIONS}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gold text-brown hover:text-white text-sm font-semibold rounded-full shadow-[0_4px_16px_rgba(63,34,17,0.15)] transition-colors"
      >
        <Navigation size={14} />
        Route planen
      </Link>
    </div>
  );
}
