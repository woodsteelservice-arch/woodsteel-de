// Schema.org structured data (JSON-LD) helpers.
// Rendered inline via <script type="application/ld+json" /> in pages.

export const SITE_URL = "https://woodsteel.sk";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "WoodSteel",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/ws-wintergarten-logo.png`,
  image: `${SITE_URL}/logo/ws-wintergarten-logo.png`,
  description:
    "Pergolen, Wintergärten und Terrassenverglasung nach Maß. Eigene Fertigung und Montage seit 2021.",
  email: "info@wswintergarten.de",
  priceRange: "€€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rovinka",
    addressRegion: "Senec",
    addressCountry: "SK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.1689,
    longitude: 17.2731,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: ["https://www.instagram.com/ws_wintergarten/"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "47",
    bestRating: "5",
    worstRating: "1",
  },
};

export function productSchema(opts: {
  name: string;
  description: string;
  image: string;
  priceFrom?: string;
  category?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    image: opts.image,
    brand: { "@type": "Brand", name: "WoodSteel" },
    category: opts.category,
  };
  if (opts.priceFrom) {
    schema.offers = {
      "@type": "AggregateOffer",
      lowPrice: opts.priceFrom.replace(/[^0-9]/g, ""),
      priceCurrency: "EUR",
      offerCount: "3",
      availability: "https://schema.org/InStock",
    };
  }
  return schema;
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
