// Real metadata extracted from prod woodsteel.sk crawl (36 URLs).
// Used to preserve title tags + descriptions for SEO continuity during migration.

import seoExport from "./seo-export.json";

export type SeoEntry = {
  url: string;
  path: string;
  title: string | null;
  meta_description: string | null;
  canonical: string | null;
  og_image: string | null;
  h1: string | null;
  schema_count: number;
  content_html?: string;
  content_text_length?: number;
  content_text_preview?: string;
};

const entries = seoExport as SeoEntry[];

/** Get prod metadata for a given path (with or without trailing slash) */
export function prodMeta(path: string): SeoEntry | undefined {
  const norm = path.endsWith("/") ? path : path + "/";
  return entries.find((e) => e.path === norm);
}

/** Convenient title fallback in Next.js metadata format */
export function prodTitle(path: string, fallback: string): string {
  return prodMeta(path)?.title || fallback;
}

export const allSeoEntries = entries;
