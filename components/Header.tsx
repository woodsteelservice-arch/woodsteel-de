"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation } from "@/lib/data";

/** Odstráni #hash a koncové lomítko, aby sa dali porovnávať cesty. */
function normalize(href: string) {
  const path = href.split("#")[0];
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

function isActive(pathname: string, href: string, match?: string[]) {
  const targets = (match ?? [href]).map(normalize).filter(Boolean);
  return targets.some(
    (t) => t !== "/" && (pathname === t || pathname.startsWith(`${t}/`))
  );
}

type HeaderProps = {
  /**
   * `true` pre stránky s tmavým celoplošným hero — menu splýva s obrázkom
   * a zosvetlí sa až po scrollnutí. Default `false` = vždy čitateľná
   * svetlá lišta (bezpečné pre stránky so svetlým pozadím).
   */
  overlay?: boolean;
};

export function Header({ overlay = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Priehľadné menu iba nad tmavým hero, kým používateľ neodscrolluje.
  const transparent = overlay && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent"
          : "bg-white/92 backdrop-blur-xl border-b border-cream/70 shadow-[0_4px_24px_rgba(63,34,17,0.08)]"
      )}
    >
      {/* Scrim: drží biely text čitateľný aj nad svetlými miestami fotky */}
      {transparent && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brown/70 via-brown/30 to-transparent"
        />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 h-14 sm:h-16 lg:h-20 flex items-center justify-between gap-4 sm:gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center group shrink-0" aria-label="WoodSteel — Startseite">
          <Image
            src="/logo/woodsteel-logo.png"
            alt="WoodSteel"
            width={336}
            height={200}
            priority
            className={cn(
              "h-8 sm:h-10 lg:h-12 w-auto transition-[filter] duration-300",
              transparent ? "[filter:brightness(0)_invert(1)_drop-shadow(0_1px_3px_rgba(0,0,0,0.45))]" : ""
            )}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navigation.map((item) => {
            const active = isActive(pathname, item.href, item.match);
            return (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative text-sm font-medium transition-colors inline-flex items-center gap-1 py-1",
                    active
                      ? transparent
                        ? "text-gold"
                        : "text-gold"
                      : transparent
                        ? "text-white hover:text-gold [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]"
                        : "text-charcoal hover:text-gold"
                  )}
                >
                  {item.label}
                  {item.submenu && (
                    <ChevronDown size={14} className="opacity-60 transition-transform group-hover:rotate-180" />
                  )}
                  {/* Podčiarknutie aktívnej sekcie */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-gold transition-all duration-300",
                      active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-60"
                    )}
                  />
                </Link>

                {item.submenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="flex gap-8 rounded-2xl border border-cream bg-white px-7 py-6 shadow-[0_20px_50px_rgba(63,34,17,0.14)]">
                      {item.submenu.map((group) => {
                        const groupActive = isActive(pathname, group.href);
                        return (
                          <div key={group.href} className="min-w-[190px]">
                            <Link
                              href={group.href}
                              aria-current={groupActive ? "page" : undefined}
                              className={cn(
                                "block font-display font-bold text-[0.95rem] transition-colors",
                                groupActive ? "text-gold" : "text-brown hover:text-gold"
                              )}
                            >
                              {group.label}
                            </Link>
                            <span
                              aria-hidden
                              className="mt-2.5 mb-1 block h-px w-8 bg-gold/40"
                            />
                            {group.items.length > 0 && (
                              <ul className="mt-2 space-y-0.5">
                                {group.items.map((s) => {
                                  const subActive = isActive(pathname, s.href);
                                  return (
                                    <li key={s.href}>
                                      <Link
                                        href={s.href}
                                        aria-current={subActive ? "page" : undefined}
                                        className={cn(
                                          "block rounded-lg px-2 -mx-2 py-1.5 text-sm transition-colors",
                                          subActive
                                            ? "bg-cream/60 text-gold font-semibold"
                                            : "text-mutedbrand hover:bg-cream/50 hover:text-brown"
                                        )}
                                      >
                                        {s.label}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right side: phone + CTA */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+421904473111"
            className={cn(
              "hidden xl:inline-flex items-center gap-2 text-sm font-medium transition-colors",
              transparent
                ? "text-white hover:text-gold [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]"
                : "text-charcoal hover:text-gold"
            )}
          >
            <Phone size={16} />
            +421 904 473 111
          </a>
          {/* Trvalo zvýraznené CTA — viditeľné na každej šírke aj v oboch stavoch lišty */}
          <span className="relative inline-flex shrink-0">
            {/* Prstenec, ktorý sa ticho rozpína — udržuje tlačidlo na očiach */}
            <span
              aria-hidden
              className="ws-cta-halo pointer-events-none absolute inset-0 rounded-full ring-2 ring-gold"
            />
            <Link
              href="#contact"
              className={cn(
                "ws-cta group relative inline-flex items-center gap-2 rounded-full",
                "px-4 sm:px-6 py-2.5 sm:py-3",
                "bg-gradient-to-br from-gold via-gold to-gold-hover",
                "text-brown text-xs sm:text-sm font-bold tracking-[0.01em]",
                "ring-1 ring-white/40 hover:ring-white/70",
                "transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.04]"
              )}
            >
              <span className="hidden sm:inline">Angebot anfordern</span>
              <span className="sm:hidden">Angebot</span>
              <ArrowRight
                size={15}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </span>
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "lg:hidden p-2 transition-colors",
              transparent ? "text-white" : "text-charcoal"
            )}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-cream max-h-[calc(100svh-3.5rem)] overflow-y-auto">
          <nav className="max-w-7xl mx-auto px-5 py-6 flex flex-col gap-1">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href, item.match);
              return (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors",
                      active
                        ? "bg-cream/60 text-gold font-semibold"
                        : "text-charcoal hover:text-gold"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "h-5 w-0.5 rounded-full transition-colors",
                        active ? "bg-gold" : "bg-transparent"
                      )}
                    />
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <div className="pl-5 pb-3 flex flex-col gap-3">
                      {item.submenu.map((group) => {
                        const groupActive = isActive(pathname, group.href);
                        return (
                          <div key={group.href}>
                            <Link
                              href={group.href}
                              onClick={() => setOpen(false)}
                              aria-current={groupActive ? "page" : undefined}
                              className={cn(
                                "block rounded-lg px-3 py-2.5 font-display font-bold text-[0.95rem] transition-colors",
                                groupActive ? "text-gold" : "text-brown hover:text-gold"
                              )}
                            >
                              {group.label}
                            </Link>
                            {group.items.length > 0 && (
                              <div className="ml-3 border-l border-cream pl-3 flex flex-col">
                                {group.items.map((s) => {
                                  const subActive = isActive(pathname, s.href);
                                  return (
                                    <Link
                                      key={s.href}
                                      href={s.href}
                                      onClick={() => setOpen(false)}
                                      aria-current={subActive ? "page" : undefined}
                                      className={cn(
                                        "px-3 py-2.5 text-sm transition-colors",
                                        subActive
                                          ? "text-gold font-semibold"
                                          : "text-mutedbrand hover:text-gold"
                                      )}
                                    >
                                      {s.label}
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <a
              href="tel:+421904473111"
              className="flex items-center gap-2 mt-4 px-3 py-3 text-base font-medium text-charcoal border-t border-cream"
            >
              <Phone size={18} className="text-gold" />
              +421 904 473 111
            </a>
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 mx-3 inline-flex justify-center items-center px-5 py-3 bg-gold text-brown font-semibold rounded-full"
            >
              Angebot anfordern
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
