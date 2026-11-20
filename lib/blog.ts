import seoExport from "./seo-export.json";
import { artikelGlasHtml } from "./artikel-glas";
import { artikelNutzungHtml } from "./artikel-nutzung";
import { artikelAblaufHtml } from "./artikel-ablauf";
import { artikelMaterialHtml } from "./artikel-material";
import { artikelVerschattungHtml } from "./artikel-verschattung";
import { artikelVisualisierungHtml } from "./artikel-visualisierung";
import { artikelPreisHtml } from "./artikel-preis";
import { artikelCarportHtml } from "./artikel-carport";
import { artikelHerbstHtml } from "./artikel-herbst";

/** Autoren der Beiträge — Name, Rolle und rundes Porträt. */
export const autori = {
  "denis-nemec":    { jmeno: "Denis Nemec",    role: "Gründer",                  foto: "/images/autor-denis-nemec.jpg" },
  "peter-kurilla":  { jmeno: "Peter Kurilla",  role: "Leiter Vertrieb",          foto: "/images/autor-peter-kurilla.jpg" },
  "branislav-kmec": { jmeno: "Branislav Kmec", role: "Gründer",                  foto: "/images/autor-branislav-kmec.jpg" },
  "viktor-farda":   { jmeno: "Viktor Farda",   role: "Senior Vertriebsmanager",  foto: "/images/autor-viktor-farda.jpg" },
} as const;

export type AutorId = keyof typeof autori;

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  /** Zusammenfassung im Kasten über dem Beitrag. Fehlt sie, wird `excerpt` verwendet. */
  summary?: string;
  /** Wer den Beitrag geschrieben hat. Fehlt die Angabe, steht Denis Nemec. */
  author?: AutorId;
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

function enrich(post: Omit<BlogPost, "contentLength"> & { contentLength?: number }): BlogPost {
  const entry = seoMap.get(post.slug);
  return {
    ...post,
    // Eigenes HTML hat Vorrang — hier geschriebene Beiträge stehen nicht im SEO-Export.
    contentHtml: post.contentHtml ?? entry?.content_html,
    contentLength: post.contentLength ?? entry?.content_text_length,
  };
}

export const blogPosts: BlogPost[] = [
  enrich({
    slug: "carport-oder-garage",
    title: "Carport oder Garage? Was sich für Sie lohnt",
    date: "2026-11-22",
    image: "/images/pristresok-na-auto-hero.jpg",
    author: "viktor-farda",
    excerpt:
      "Die Garage löst Sicherheit und Stauraum, der Carport löst das Wetter. Was ein Carport wirklich leistet, was nicht, wie groß er sein muss und was bei der Planung am häufigsten vergessen wird.",
    summary:
      "Wenn Sie das Auto nicht gegen Diebstahl schützen und in der Garage nichts abstellen müssen, bringt ein Carport den größten Teil des Nutzens zu einem Bruchteil der Kosten. Er löst zuverlässig Schnee, Reif in Frostnächten, UV-Strahlung auf dem Lack und Hitze im Innenraum; er löst nicht Diebstahl, Stauraum und seitlich eingetriebenen Regen. Planen Sie das Maß für den Umgang mit dem Auto, nicht für seine Länge — mit Reserve für offene Türen und Fahrradträger und mit vorab geklärter Höhe. Am häufigsten vergessen werden Wasserablauf, tragfähiger Untergrund für die Fundamente, die Auslegung auf die Schneelastzone und Leerrohre für Licht oder Wallbox. Ob eine Baugenehmigung nötig ist, richtet sich nach der Landesbauordnung und dem Bebauungsplan.",
    category: "Pergolen",
    contentHtml: artikelCarportHtml,
  }),
  enrich({
    slug: "was-kostet-eine-pergola-oder-ein-wintergarten",
    title: "Was den Preis einer Pergola und eines Wintergartens wirklich bestimmt",
    date: "2026-11-21",
    image: "/images/co-ovplyvnuje-cenu.jpg",
    author: "peter-kurilla",
    excerpt:
      "Zwei Pergolen mit derselben Fläche können doppelt so weit auseinanderliegen. Den Unterschied macht nicht die Marge, sondern Spannweite, Dach und Verglasung. Wo sich Sparen lohnt — und wo nicht.",
    summary:
      "Den Preis bestimmt nicht der Quadratmeter, sondern die Entscheidungen bei der Planung. Am stärksten wirkt die Verglasung, dann die Spannweite (eine zusätzliche Stütze ist viel günstiger als ein stärkerer Träger), der Dachtyp und der Aufwand für Verankerung und Fundament — die Position, die Angebote am häufigsten verschweigen. Material und Farbe entscheiden weniger als erwartet. Sinnvoll sparen Sie mit einer Stütze statt größerer Spannweite, mit einem festen Dach und mit später ergänztem Zubehör bei vorbereiteten Leerrohren; nicht sparen sollten Sie an der Auslegung auf Schneelast, am Verbundglas im Dach, an den Beschlägen der Schiebeelemente und an der Verankerung. Deshalb nennen wir den Preis erst nach dem Aufmaß — innerhalb von 24 Stunden.",
    category: "Allgemein",
    contentHtml: artikelPreisHtml,
  }),
  enrich({
    slug: "pergola-am-eigenen-haus-vorstellen",
    title: "Wie Sie sich Pergola oder Wintergarten am eigenen Haus vorstellen",
    date: "2026-11-20",
    image: "/images/ukazka-po.jpg",
    author: "denis-nemec",
    excerpt:
      "Eine Pergola kann man nicht umtauschen — sie steht zwanzig Jahre am Haus. Drei Wege, das Ergebnis schon vor dem Bau zu sehen, und eine Sache, die keiner davon ersetzt.",
    summary:
      "Eine Vorstellung von der künftigen Konstruktion bekommen Sie auf drei Wegen: über Fotos fertiger Projekte (sofort, aber ohne Ihr Haus), über eine Visualisierung in das Foto Ihres Hauses (unter einer Minute, kostenlos, Farben direkt nebeneinander vergleichbar) oder über einen Entwurf vom Architekten (Wochen und mehrere Hundert bis Tausend Euro, sinnvoll bei Neubauten und ungewöhnlichen Aufgaben). Alle drei klären nur das Aussehen. Ob die Konstruktion an Ihrem Haus überhaupt geht, welche Maße passen und was es kostet, bestimmt erst das Aufmaß durch den Techniker — das ist keine Alternative zur Visualisierung, sondern die nächste Phase. Die Reihenfolge ist logisch: zuerst die Vorstellung, dann der Techniker.",
    category: "Allgemein",
    contentHtml: artikelVisualisierungHtml,
  }),
  enrich({
    slug: "verschattung-und-ueberhitzung-verglaster-raeume",
    title: "Warum sich ein verglaster Raum aufheizt — und was wirklich hilft",
    date: "2026-11-19",
    image: "/images/stineni-prehrivani.jpg",
    author: "viktor-farda",
    excerpt:
      "Gefragt wird, ob es im Wintergarten im Winter kalt wird. Gelöst werden muss später der Juli. Warum außenliegende Verschattung wirkt und innenliegende Jalousien nicht — und was vorab geplant werden muss.",
    summary:
      "Ein verglaster Raum heizt sich durch den Treibhauseffekt auf: Die Strahlung kommt durch das Glas hinein, die Wärme aber nicht mehr hinaus. Daraus folgt die Grundregel — die Sonne muss vor dem Glas gestoppt werden. Am wirksamsten sind außenliegende Screen-Markisen, bei Pergolen das Lamellendach; innenliegende Jalousien beseitigen die Blendung, nicht die Hitze. Sonnenschutzglas wirkt dauerhaft und ohne Bedienung, eignet sich aber eher als Ergänzung. Die halbe Lösung ist die Querlüftung, die bei der Planung festgelegt werden muss. Am anspruchsvollsten ist die Westorientierung — die tiefe Nachmittagssonne halten nur senkrechte Screens auf.",
    category: "Allgemein",
    contentHtml: artikelVerschattungHtml,
  }),
  enrich({
    slug: "aluminium-oder-holz-material-der-konstruktion",
    title: "Aluminium oder Holz? So wählen Sie das Material der Konstruktion",
    date: "2026-11-18",
    image: "/images/hlinik-nebo-drevo.jpg",
    author: "branislav-kmec",
    excerpt:
      "Aluminium verzieht sich nicht und braucht keine Pflege, Holz hat Wärme und passt zu manchen Häusern einfach besser. Worin sich beide in der Praxis unterscheiden — und warum wir bei Holz nie massive Kanthölzer verwenden.",
    summary:
      "Aluminium ist formstabil, farbstabil und schafft größere Spannweiten bei schlankerem Profil — es passt zu Neubauten und überall dorthin, wo Verglasung und Schiebeelemente geplant sind. Holz hat Wärme und Struktur und passt besser zu älteren oder ländlichen Häusern, verlangt aber nach einigen Jahren eine neue Lasur. Bei Holz verwenden wir ausschließlich Brettschichtholz und keine massiven Kanthölzer: Massivholz arbeitet, verzieht sich und reißt. Beide Materialien lassen sich kombinieren — am häufigsten als Tragwerk aus Holz mit Verglasung aus Aluminium.",
    category: "Allgemein",
    contentHtml: artikelMaterialHtml,
  }),
  enrich({
    slug: "ablauf-der-umsetzung-schritt-fuer-schritt",
    title: "So läuft die Umsetzung ab: vom ersten Anruf bis zur Übergabe",
    date: "2026-11-17",
    image: "/images/realizace-montaz.jpg",
    author: "peter-kurilla",
    excerpt:
      "Die häufigste Frage nach dem Angebot betrifft nicht den Preis, sondern den Ablauf. Sieben Schritte vom ersten Kontakt bis zur Übergabe, wie lange sie dauern und was sich am häufigsten verzögert.",
    summary:
      "Die Umsetzung hat sieben Schritte: erster Kontakt, kostenloses Aufmaß bei Ihnen zu Hause, Angebot innerhalb von 24 Stunden, Vertrag mit Anzahlung, Fertigung nach Maß, Montage und Übergabe mit Garantie. Das Aufmaß ist der entscheidende Termin — der Techniker beurteilt Fassadenzustand, Terrassengefälle, Wasserablauf sowie Schneelast- und Windzone, und erst danach entsteht die konkrete Lösung. Die Montage dauert bei einer Pergola meist einen Tag, beim Wintergarten zwei bis drei. Der längste und am schlechtesten planbare Abschnitt ist das Überlegen beim Angebot — rechnen Sie damit, wenn Sie einen festen Termin haben.",
    category: "Allgemein",
    contentHtml: artikelAblaufHtml,
  }),
  enrich({
    slug: "terrasse-im-herbst-und-winter-nutzen",
    title: "Eine Terrasse, die Sie auch im November nutzen",
    date: "2026-11-15",
    image: "/images/zimni-zahrada-podzim.jpg",
    author: "branislav-kmec",
    excerpt:
      "Im Juli kann man auch ohne Konstruktion draußen sitzen. Im November ist der Unterschied am größten — wenn Wind, Wärme und Licht geklärt sind. Was vorab geplant werden muss und was sich ergänzen lässt.",
    summary:
      "Nutzbar in der kalten Jahreshälfte machen eine überdachte Terrasse fünf Dinge: eine Überdachung mit ausreichendem Dachüberstand, seitlicher Windschutz (Screen oder Verglasung), ein Heizstrahler, der Menschen und nicht die Luft erwärmt, warmes dimmbares Licht und ein funktionierender Wasserablauf. Überdachung und Ablauf lassen sich nachträglich nicht herstellen, Heizung und Licht schon — wenn bei der Planung Leerrohre vorbereitet werden. Im Herbst kostet es eine Stunde, Rinnen zu reinigen, den Ablauf mit dem Schlauch zu testen, die Screens hochzufahren und das Glas zu putzen. Und wer im Mai unter der neuen Konstruktion sitzen will, fragt im November an, nicht im April.",
    category: "Allgemein",
    contentHtml: artikelHerbstHtml,
  }),
  enrich({
    slug: "wintergarten-den-man-taeglich-nutzt",
    title: "Ein Wintergarten, in den Sie sich täglich setzen",
    date: "2026-11-16",
    image: "/images/zimni-zahrada-rano.jpg",
    excerpt:
      "Morgenkaffee, Esstisch, Arbeitsplatz oder Platz für Pflanzen — Wintergärten werden am Ende anders genutzt als geplant. Und drei Dinge entscheiden, ob Sie täglich hineingehen.",
    summary:
      "Kunden richten sich einen Wintergarten wegen einer Vorstellung ein und nutzen ihn dann völlig anders — und mehr. Die häufigste Antwort ist der Morgenkaffee, denn hinter Glas setzen Sie sich auch im Januar hin. Viele stellen den Esstisch hinein und gehen ins alte Esszimmer kaum noch. Dazu kommen Arbeitsplatz, Überwinterung von Pflanzen, ein Ort für die Kinder bei Regen und Sport. Wintergärten, die wirklich genutzt werden, haben drei Dinge gemeinsam: einen klaren Zweck, bequeme Sitzmöglichkeiten und gelöste Verschattung und Beleuchtung.",
    category: "Wintergärten",
    contentHtml: artikelNutzungHtml,
  }),
  enrich({
    slug: "welches-glas-fuer-den-wintergarten",
    title: "Welches Glas für den Wintergarten: 2-fach, 3-fach und Sicherheitsglas in der Praxis",
    date: "2026-11-16",
    image: "/images/sklo-zimni-zahrada.jpg",
    excerpt:
      "Glas macht den größten Teil der Fläche und des Preises aus und lässt sich später nicht tauschen. Wie Sie zwischen Einfachglas, 2-fach und 3-fach entscheiden, warum ins Dach Verbundglas gehört und wie viel Schnee die Konstruktion tragen muss.",
    summary:
      "Die Verglasung ist beim Wintergarten die wichtigste und praktisch unumkehrbare Entscheidung. Einfachglas hält Regen und Wind draußen, Isolierglas mit 2 Scheiben (Ug um 1,1) ist der vernünftige Standard für die Nutzung von Frühling bis Herbst samt Zuheizen, 3-fach-Glas (Ug um 0,6) lohnt sich nur beim Anschluss an die Hausheizung — es ist schwerer und die Konstruktion muss von Anfang an dafür ausgelegt sein. Ins Dach gehört Verbund-Sicherheitsglas, weil die Scherben bei einem Bruch an der Folie bleiben. Gegen sommerliche Überhitzung hilft Sonnenschutzglas in Kombination mit außenliegender Verschattung. Und Glasdicke wie Profile bestimmt die Schneelastzone nach DIN EN 1991-1-3.",
    category: "Wintergärten",
    contentHtml: artikelGlasHtml,
  }),
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
    image: "/images/ako-vyuzit-pergolu-v2.jpg",
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
    image: "/images/vyuzitie-zimnej-zahrady-v2.jpg",
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
    image: "/images/zimna-zahrada-pergola-v2.jpg",
    excerpt: "Die Investition in den Außenbereich — ein Vergleich der zwei beliebtesten Lösungen nach Budget, Lage, Hausstil und geplanter Nutzung.",
    category: "Allgemein",
  }),
  enrich({
    slug: "premena-terasy-na-zimnu-zahradu",
    title: "Von der Terrasse zum Wintergarten",
    date: "2025-06-07",
    image: "/images/premena-terasy-v2.jpg",
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

/**
 * Geschätzte Lesezeit in Minuten.
 *
 * `contentLength` tragen ältere Beiträge aus dem SEO-Export; neuere bringen
 * das HTML direkt mit, daraus rechnen wir die Länge. 200 Wörter pro Minute
 * sind ein üblicher Durchschnitt.
 */
export function readingMinutes(post: BlogPost): number {
  const zeichen =
    post.contentLength ??
    (post.contentHtml ? post.contentHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").length : 0);
  if (!zeichen) return 3;
  return Math.max(2, Math.round(zeichen / 6 / 200));
}

/** Tatsächlich vorkommende Kategorien — nach Anzahl der Beiträge sortiert. */
export function blogKategorie(): { nazev: string; pocet: number }[] {
  const mapa = new Map<string, number>();
  for (const p of blogPosts) mapa.set(p.category, (mapa.get(p.category) ?? 0) + 1);
  return [...mapa.entries()]
    .map(([nazev, pocet]) => ({ nazev, pocet }))
    .sort((a, b) => b.pocet - a.pocet);
}

/** Autor des Beitrags — mit sinnvollem Standard für ältere Beiträge ohne Angabe. */
export function autorClanku(post: BlogPost) {
  return autori[post.author ?? "denis-nemec"];
}
