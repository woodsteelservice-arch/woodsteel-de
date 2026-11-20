/**
 * Zdieľané dáta pre AI vizualizáciu (klient aj API route) — nemecký web.
 *
 * Engine je prevzatý z woodsteel-pricing (`/api/visualize`), ale tento web je
 * verejný — negeneruje teda obchodník s prihlásením, ale návštevník. Preto je
 * ponuka zjednodušená (produkt + farba) a výstup zamknutý za kontaktné údaje.
 */

export type ProduktVizu = "pergola" | "zimni_zahrada" | "pristresek" | "zaskleni";

export const PRODUKTY: {
  kod: ProduktVizu;
  nazev: string;
  popis: string;
  /** Anglický opis do promptu pre model */
  en: string;
  /** Kľúčové slová názvov súborov v public/reference */
  refKeywords: string[];
}[] = [
  {
    kod: "pergola",
    nazev: "Aluminium-Pergola",
    popis: "Terrassendach auf schlanken Stützen",
    en: "aluminium terrace pergola (roof canopy on slim aluminium posts)",
    refKeywords: ["pergola"],
  },
  {
    kod: "zimni_zahrada",
    nazev: "Wintergarten",
    popis: "Voll verglaster Aluminium-Raum",
    en: "winter garden (fully glazed aluminium conservatory)",
    refKeywords: ["zimna", "zahrada"],
  },
  {
    kod: "zaskleni",
    nazev: "Terrassenverglasung",
    popis: "Schiebeverglasung einer bestehenden Terrasse",
    en: "terrace glazing system (sliding glass panels enclosing an existing covered terrace)",
    refKeywords: ["zimna", "zahrada"],
  },
  {
    kod: "pristresek",
    nazev: "Carport",
    popis: "Freistehender Carport für Ihr Auto",
    en: "freestanding aluminium carport (flat-roof car shelter on slim posts)",
    refKeywords: ["pergola"],
  },
];

export const FARBY: {
  kod: string;
  nazev: string;
  swatch: string;
  refKeyword?: string;
  /** Najčastejšie objednávané prevedenie — na webe dostane štítok. */
  oblibene?: boolean;
}[] = [
  { kod: "RAL 7016 — Anthrazit, matt", nazev: "Anthrazit", swatch: "#383E42", refKeyword: "antracit", oblibene: true },
  { kod: "PE 7016 TD — Anthrazit, strukturiert", nazev: "Anthrazit, strukturiert", swatch: "#44494C", refKeyword: "antracit" },
  { kod: "RAL 9010 — Weiß", nazev: "Weiß", swatch: "#F2F0EA", refKeyword: "biela" },
  { kod: "RAL 9006 — Silber metallic", nazev: "Silber", swatch: "#A7ABAD", refKeyword: "siva" },
  { kod: "P8017T — Dunkelbraun, strukturiert", nazev: "Dunkelbraun", swatch: "#4A352E", refKeyword: "tmavohneda" },
  { kod: "Brettschichtholz (BSH), transparente Lasur", nazev: "Holz", swatch: "#A9682F", refKeyword: "drevo" },
];

/** Bundesländer — für das Formular und für die Weiterleitung des Leads. */
export const KRAJE = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thüringen",
  "Österreich",
];

/** Prostredie/scéna, do ktorej sa konštrukcia zasadí, keď zákazník nenahrá fotku domu. */
export const PROSTREDI: { kod: string; nazev: string; en: string }[] = [
  {
    kod: "moderni",
    nazev: "Moderner Neubau",
    en: "a contemporary single-family house with white render, anthracite windows and a flat or low-pitched roof, on a tidy lawn terrace",
  },
  {
    kod: "klasicky",
    nazev: "Klassisches Einfamilienhaus",
    en: "a traditional Central-European family house with light plaster facade, pitched tiled roof and a paved terrace with a mature garden",
  },
  {
    kod: "bungalov",
    nazev: "Bungalow",
    en: "a single-storey bungalow with large sliding windows opening onto a paved garden terrace",
  },
];
