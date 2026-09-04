import type { NextConfig } from "next";
import { blogPosts } from "./lib/blog";

const nextConfig: NextConfig = {
  // Indexované URL na woodsteel.sk končia lomkou (všetkých 36 z crawlu).
  // Bez tohto by ich Next presmerovával na tvar bez lomky — proti vlastným
  // kanonickým adresám, ktoré lomku majú.
  trailingSlash: true,

  // No remote image patterns required — all assets are now self-hosted in /public.
  // (Previously fetched from woodsteel.sk/wp-content; downloaded for cutover safety.)

  // SEO migration: redirect old /clanky/[slug]/ URLs to new root /[slug]/
  // (prod woodsteel.sk articles live at root URL — we match that structure)
  async redirects() {
    return blogPosts.map((p) => ({
      source: `/clanky/${p.slug}`,
      destination: `/${p.slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
