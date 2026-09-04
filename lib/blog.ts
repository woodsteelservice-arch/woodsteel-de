import seoExport from "./seo-export.json";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  category: "Pergolen" | "Wintergärten" | "Verglasung" | "Allgemein";
  contentHtml?: string;
  contentLength?: number;
};

const PLACEHOLDER_IMG =
  "/images/zimna-zahrada-rovinka.jpeg";

type SeoEntry = {
  path: string;
  content_html?: string;
  content_text_length?: number;
};
const seoMap = new Map<string, SeoEntry>(
  (seoExport as SeoEntry[]).map((e) => [e.path.replace(/^\//, "").replace(/\/$/, ""), e])
);

function enrich(post: Omit<BlogPost, "contentHtml" | "contentLength">): BlogPost {
  const entry = seoMap.get(post.slug);
  return {
    ...post,
    contentHtml: entry?.content_html,
    contentLength: entry?.content_text_length,
  };
}

export const blogPosts: BlogPost[] = [
  enrich({
    slug: "ako-spravne-kotvit-pergolu-do-fasady-domu",
    title: "Pergola richtig an der Hausfassade verankern",
    date: "2026-03-03",
    image: "/images/ako-spravne-kotvit-pergolu.jpg",
    excerpt: "Die Pergola an der Hauswand zu befestigen wirkt einfach — doch das ausgeführte Detail entscheidet über Jahrzehnte störungsfreien Betriebs. Die häufigsten Fehler und wie Sie sie vermeiden.",
    category: "Pergolen",
  }),
  enrich({
    slug: "home-office-pod-pergolou-praca-na-cerstvom-vzduchu-bez-kompromisov",
    title: "Homeoffice unter der Pergola: Arbeiten an der frischen Luft ohne Kompromisse",
    date: "2026-03-03",
    image: "/images/home-office-pod-pergolou.jpg",
    excerpt: "Stabiles WLAN, Schatten, Schutz vor Sonne und Regen — die Pergola ist heute ein vollwertiger Arbeitsplatz im Freien. Praktische Tipps im Überblick.",
    category: "Pergolen",
  }),
  enrich({
    slug: "ako-vyuzit-pergolu-naplno-pocas-celeho-roka",
    title: "Die Pergola das ganze Jahr über voll nutzen",
    date: "2026-03-03",
    image: "/images/ako-vyuzit-pergolu.jpg",
    excerpt: "Seitliche Screen-Rollos, Infrarotstrahler, LED-Beleuchtung und Textilien — wenige Ergänzungen machen aus der Pergola statt eines Sommerextras einen ganzjährigen Lieblingsplatz.",
    category: "Pergolen",
  }),
  enrich({
    slug: "ako-zladit-pergolu-alebo-zimnu-zahradu",
    title: "Pergola oder Wintergarten passend zum Haus wählen",
    date: "2025-11-06",
    image: "/images/ako-zladit-zimnu-zahradu.jpg",
    excerpt: "Material, Farbe, Profilierung — die Wahl der Details entscheidet, ob die Konstruktion wie eine natürliche Fortsetzung des Hauses wirkt oder wie ein angeklebter Zusatz.",
    category: "Allgemein",
  }),
  enrich({
    slug: "ako-vyuzit-zimnu-zahradu",
    title: "Den Wintergarten voll ausschöpfen",
    date: "2025-11-06",
    image: "/images/vyuzitie-zimnej-zahrady.jpg",
    excerpt: "Wohnzimmer, Esszimmer, Pflanzenoase oder ein ganz neuer Wohnraum — die Nutzungsmöglichkeiten eines Wintergartens sind größer, als man denkt.",
    category: "Wintergärten",
  }),
  enrich({
    slug: "udrzba-hlinikovej-pergoly",
    title: "Pflege einer Aluminium-Pergola",
    date: "2025-11-06",
    image: "/images/udrzba-hlinikovej-pergoly.jpg",
    excerpt: "Aluminium ist wartungsfrei — doch ein paar einfache Handgriffe pro Jahr verlängern Lebensdauer und Optik Ihrer Pergola um Jahrzehnte.",
    category: "Pergolen",
  }),
  enrich({
    slug: "zimna-zahrada-alebo-pergola-co-je-vhodnejsie",
    title: "Wintergarten oder Pergola — was passt besser?",
    date: "2025-09-28",
    image: "/images/zimna-zahrada-pergola.jpg",
    excerpt: "Die Investition in den Außenbereich — ein Vergleich der zwei beliebtesten Lösungen nach Budget, Lage, Hausstil und geplanter Nutzung.",
    category: "Allgemein",
  }),
  enrich({
    slug: "premena-terasy-na-zimnu-zahradu",
    title: "Von der Terrasse zum Wintergarten",
    date: "2025-06-07",
    image: "/images/premena-terasy.jpg",
    excerpt: "Welche Möglichkeiten Sie haben, eine bestehende Terrasse in einen voll verschließbaren Wintergarten zu verwandeln — von der einfachen Verglasung bis zur kompletten Konstruktion.",
    category: "Wintergärten",
  }),
  enrich({
    slug: "zimna-zahrada-ako-investicia",
    title: "Der Wintergarten als Investition",
    date: "2025-06-07",
    image: "/images/zimna-zahrada-investicia.jpg",
    excerpt: "Wie steigt der Immobilienwert mit einem zusätzlichen Wintergarten? Ein Blick auf die Rendite aus mehreren Perspektiven.",
    category: "Wintergärten",
  }),
  enrich({
    slug: "zasklenie-terasy-a-jej-vyhody",
    title: "Terrassenverglasung und ihre Vorteile",
    date: "2025-04-14",
    image: "/images/zasklenie-terasy-blog.jpg",
    excerpt: "Schiebesysteme ermöglichen im Sommer eine offene Terrasse und im Winter einen geschlossenen Raum. Welche Systeme es gibt und welches passt.",
    category: "Verglasung",
  }),
  enrich({
    slug: "poistenie-zimnej-zahrady",
    title: "Wintergarten versichern — worauf Sie achten sollten",
    date: "2025-01-21",
    image: "/images/poistenie.jpg",
    excerpt: "Hagel, Sturm, Vandalismus — welche Risiken die übliche Gebäudeversicherung abdeckt und wann eine Zusatzversicherung nötig ist.",
    category: "Wintergärten",
  }),
  enrich({
    slug: "ako-si-vybrat-zimnu-zahradu",
    title: "Wie wählt man einen Wintergarten aus?",
    date: "2024-11-29",
    image: "/images/zimna-zahrada-blog.jpg",
    excerpt: "Aluminium oder Holz, ganzjährig oder saisonal, nach Maß oder Standard — eine Entscheidungshilfe nach Ihren Bedürfnissen und Ihrem Budget.",
    category: "Wintergärten",
  }),
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
