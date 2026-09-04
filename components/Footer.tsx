import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

function SocialIcon({ type }: { type: "facebook" | "instagram" | "youtube" }) {
  const paths: Record<typeof type, React.ReactNode> = {
    facebook: (
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </>
    ),
    youtube: (
      <path d="M23 12s0-3.6-.46-5.32a2.78 2.78 0 0 0-1.94-1.94C18.88 4.27 12 4.27 12 4.27s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.94C1 8.4 1 12 1 12s0 3.6.46 5.32a2.78 2.78 0 0 0 1.94 1.94c1.72.47 8.6.47 8.6.47s6.88 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.94C23 15.6 23 12 23 12zM9.75 15.5v-7l6 3.5-6 3.5z" />
    ),
  };
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[type]}
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-brown text-cream pt-14 sm:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Image
              src="/logo/woodsteel-logo.png"
              alt="WoodSteel"
              width={336}
              height={200}
              className="h-10 sm:h-12 w-auto [filter:brightness(0)_invert(1)]"
            />
            <p className="mt-5 text-cream/70 text-sm leading-relaxed max-w-xs">
              Pergolen, Wintergärten und Terrassenverglasung nach Maß. Eigene
              Fertigung und Montage seit 2021.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/8 hover:bg-gold flex items-center justify-center transition-colors">
                <SocialIcon type="facebook" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/8 hover:bg-gold flex items-center justify-center transition-colors">
                <SocialIcon type="instagram" />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/8 hover:bg-gold flex items-center justify-center transition-colors">
                <SocialIcon type="youtube" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-eyebrow text-gold mb-5">Produkte</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/pergoly" className="hover:text-gold transition-colors">Pergolen</Link></li>
              <li><Link href="/zimne-zahrady" className="hover:text-gold transition-colors">Wintergärten</Link></li>
              <li><Link href="/zasklenie-teras" className="hover:text-gold transition-colors">Terrassenverglasung</Link></li>
              <li><Link href="/pergoly#carport" className="hover:text-gold transition-colors">Carports</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-eyebrow text-gold mb-5">Unternehmen</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#team" className="hover:text-gold transition-colors">Über uns</Link></li>
              <li><Link href="#realizations" className="hover:text-gold transition-colors">Referenzen</Link></li>
              <li><Link href="#process" className="hover:text-gold transition-colors">Ablauf</Link></li>
              <li><Link href="#reviews" className="hover:text-gold transition-colors">Bewertungen</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-eyebrow text-gold mb-5">Kontakt</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+421904473111" className="inline-flex items-center gap-2 py-2 hover:text-gold transition-colors">
                  <Phone size={14} className="text-gold" />
                  +421 904 473 111
                </a>
              </li>
              <li>
                <a href="mailto:info@woodsteel.sk" className="inline-flex items-center gap-2 py-2 hover:text-gold transition-colors">
                  <Mail size={14} className="text-gold" />
                  info@woodsteel.sk
                </a>
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin size={14} className="text-gold mt-1 shrink-0" />
                <span>Rovinka<br />Slowakische Republik</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-cream/55">
          <div>© {new Date().getFullYear()} WoodSteel. Alle Rechte vorbehalten.</div>
          <div className="flex gap-6">
            <Link href="/ochrana-osobnych-udajov" className="inline-block py-2 hover:text-gold transition-colors">Datenschutz</Link>
            <Link href="/cookies" className="inline-block py-2 hover:text-gold transition-colors">Cookies</Link>
          </div>
          <div className="font-mono text-[11px] tracking-wider px-2.5 py-1 rounded-md bg-white/8 text-gold/80">
            build: claude-code · v1
          </div>
        </div>
      </div>
    </footer>
  );
}
