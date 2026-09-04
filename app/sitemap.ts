import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";

const BASE = "https://woodsteel.sk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/pergoly/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/pergoly/drevene-pergoly/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/pergoly/hlinikove-pergoly/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/pergoly/pristresky-na-auto/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/zimne-zahrady/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/zimne-zahrady/drevene-zimne-zahrady/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/zimne-zahrady/hlinikove-zimne-zahrady/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/zasklenie-teras/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/zasklenie-teras/ramove-zasklenie/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/zasklenie-teras/bezramove-zasklenie/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/realizacie/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/realizacie/realizacie-drevene-pergoly/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/realizacie/realizacie-hlinikove-pergoly/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/realizacie/realizacie-drevene-zimne-zahrady/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/realizacie/realizacie-hlinikove-zimne-zahrady/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/realizacie/realizacie-pristresky-na-auto/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/o-nas/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/kontakt/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/clanky/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/akcna-cenova-ponuka/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/na-stiahnutie/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/faq/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/ochrana-osobnych-udajov/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/cookies/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const articles: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/${p.slug}/`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...articles];
}
