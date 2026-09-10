// Real assets reused from existing WoodSteel sites (prod + dev media library).

export const team = [
  {
    name: "Branislav Kmec",
    role: "Gründer",
    photo: "/images/BranoKmecBG.png",
    quote:
      "Meine Vision ist es, uns weiterzuentwickeln, mit den Trends Schritt zu halten und dabei einen menschlichen, kundennahen Umgang zu bewahren.",
  },
  {
    name: "Denis Nemec",
    role: "Gründer",
    photo: "/images/DenisNemecBG.png",
    quote:
      "Meine Priorität ist es, dass wir als Unternehmen unseren Kunden den höchstmöglichen Wert liefern.",
  },
  {
    name: "Peter Kurilla",
    role: "Leiter der Vertriebsabteilung",
    photo: "/images/PeterKurillaBG.png",
    quote: "In dieser Branche bin ich bereits seit mehr als 5 Jahren tätig.",
  },
  {
    name: "Viktor Farda",
    role: "Senior Vertriebsmanager",
    photo: "/images/ViktorFardaBG.png",
    quote:
      "Ich arbeite als Senior Vertriebsmanager mit langjähriger Erfahrung.",
  },
];

// `location` je voliteľná — pri fotkách, kde obec zatiaľ nemáme doplnenú,
// karta zobrazí len kategóriu namiesto prázdneho riadka.
export const realizations: {
  location?: string;
  category: string;
  image: string;
}[] = [
  {
    category: "Aluminium-Pergola",
    image:
      "/images/hlinikova-pergola-BA-Vrakuna.jpeg",
  },
  {
    category: "Wintergarten",
    image:
      "/images/zimna-zahrada-hamuliakovo.jpeg",
  },
  {
    category: "Aluminium-Pergola",
    image:
      "/images/hlinikova-pergola-senec.jpeg",
  },
  {
    category: "Terrassenverglasung",
    image:
      "/images/zimna-zahrada-rovinka.jpeg",
  },
  {
    category: "Wintergarten",
    image:
      "/images/zimna-zahrada-dunajska-luzna.jpeg",
  },
  {
    category: "Aluminium-Pergola",
    image:
      "/images/hlinikova-pergola-trencin.jpeg",
  },
  {
    category: "Wintergarten",
    image:
      "/images/zimna-zahrada-kittse.jpeg",
  },
  {
    category: "Wintergarten",
    image:
      "/images/zimna-zahrada-podunajske-biskupice.jpeg",
  },
  {
    category: "Aluminium-Pergola",
    image:
      "/images/zimna-zahrada-horne-janiky-1.jpeg",
  },
  // Drevené realizácie prevzaté z woodsteel.sk — konštrukcia je skutočne
  // drevená, preto majú vlastnú kategóriu a nemiešajú sa s hliníkovými.
  {
    category: "Holz-Wintergarten",
    image:
      "/images/drevena-zimna-zahrada2.jpg",
  },
  {
    category: "Holz-Wintergarten",
    image:
      "/images/drevena-zimna-zahrada3.jpg",
  },
  {
    category: "Holz-Wintergarten",
    image:
      "/images/drevena-zimna-zahrada4.jpg",
  },
  {
    category: "Holz-Wintergarten",
    image:
      "/images/drevena-zimna-zahrada5.jpg",
  },
  // Ďalšie hliníkové pergoly prevzaté z woodsteel.sk
  {
    category: "Aluminium-Pergola",
    image:
      "/images/hlinikova-pergola2.jpg",
  },
  {
    category: "Aluminium-Pergola",
    image:
      "/images/hlinikova-pergola3.jpg",
  },
  {
    category: "Aluminium-Pergola",
    image:
      "/images/hlinikova-pergola4.jpg",
  },
  {
    category: "Aluminium-Pergola",
    image:
      "/images/hlinikova-pergola5.jpg",
  },
  // Prístrešky na auto — vlastné fotografie zákazníka
  {
    category: "Carport",
    image:
      "/images/pristresok-na-auto-2.jpg",
  },
  {
    category: "Carport",
    image:
      "/images/pristresok-na-auto-3.jpg",
  },
  {
    category: "Carport",
    image:
      "/images/pristresok-na-auto-4.jpg",
  },
];

// Skutočné recenzie zákazníkov zo slovenského Googlu — pre nemeckú verziu
// preložené. Obsah ani vyznenie neupravujeme, mení sa len jazyk.
// `location` a `time` sú voliteľné, karta ich zobrazí, len ak sú vyplnené.
export const reviews: {
  name: string;
  text: string;
  location?: string;
  time?: string;
}[] = [
  {
    name: "Alena C.",
    text: "Den Wintergarten können wir wärmstens empfehlen. Er übertrifft die Erwartungen 👌 Wenn Sie ihn schon im Frühling nutzen möchten, zögern Sie nicht und bestellen Sie jetzt. Besonderer Dank gilt Herrn Kurilla für den ausgesprochen professionellen Umgang mit dem Kunden 👍",
  },
  {
    name: "Naďa G.",
    text: "Wir haben lange überlegt, welche Firma wir wählen, und ich bin überaus froh, dass ich mich für Woodsteel entschieden habe. Unglaublich nettes und hilfsbereites Personal mit prompter Kommunikation und professionellem Auftreten. Den Wintergarten haben sie sogar vor dem Termin fertiggestellt, was uns noch mehr gefreut hat. Von uns eine klare Empfehlung. :)",
  },
  {
    name: "Radka Š.",
    text: "Ich kann es nur empfehlen: hervorragende Kommunikation von Anfang bis Ende, fachlich und professionell, präzise Arbeit und hohe Qualität. Um den Kunden wird sich gekümmert. Das Ergebnis lohnt sich wirklich.",
  },
  {
    name: "Veronika H.",
    text: "Die Firma hat bei uns eine Aluminium-Pergola montiert. Vom ersten Kontakt an perfekte und verständliche Kommunikation, schnelle Lieferung, und die Montage verlief problemlos in wenigen Stunden. Perfekte Arbeit, danke :)",
  },
  {
    name: "Roman Z.",
    text: "Wir haben von ihnen die Terrassenverglasung. Perfekte Kommunikation mit dem Vertriebsmitarbeiter, professionelles Aufmaß und Montage. Ich kann es nur empfehlen. 👍",
  },
  {
    name: "Tomáš M.",
    text: "Ich bekam die Empfehlung von einem zufriedenen Nachbarn und kann sie ebenfalls nur weitergeben. Mir wurden alle Details erklärt, die ich klären wollte. Die Umsetzung selbst dauerte einen einzigen Arbeitstag. Eine Erfahrung, die eine Bewertung verdient. Ich empfehle sie gerne weiter.",
  },
];

export const categories = [
  {
    slug: "pergoly",
    name: "Pergolen",
    description:
      "Aluminium-Pergolen mit modernem Design oder klassische Holzkonstruktionen aus Brettschichtholz. Vorbereitet für eine spätere Verglasung.",
    image:
      "/images/hlinikova-pergola-senec.jpeg",
  },
  {
    slug: "zimne-zahrady",
    name: "Wintergärten",
    description:
      "Ein vollwertiger Wohnbereich, unabhängig vom Wetter. Isolierverglasung und Schiebesysteme, die sich mühelos öffnen lassen.",
    image:
      "/images/zimna-zahrada-rovinka.jpeg",
  },
  {
    slug: "zasklenie-teras",
    name: "Terrassenverglasung",
    description:
      "Aus der offenen Terrasse wird in den kühleren Monaten ein geschützter Raum. Voll verschiebbar — im Sommer offen, im Winter geschlossen.",
    image:
      "/images/zimna-zahrada-horne-janiky.jpeg",
  },
];

// `meta` = krátky časový alebo vecný údaj ku kroku
export const process = [
  { n: "01", title: "Anfrage", meta: "Binnen einer Stunde", description: "Sie rufen an oder schreiben uns." },
  { n: "02", title: "Vor-Ort-Termin", meta: "Kostenlos", description: "Wir kommen und messen auf." },
  { n: "03", title: "Angebot", meta: "Binnen 48 Stunden", description: "Ein Angebot nach Maß." },
  { n: "04", title: "Fertigung", meta: "Eigene Werkstatt", description: "Wir fertigen in der Slowakei." },
  { n: "05", title: "Montage", meta: "Schlüsselfertig", description: "Wir bauen auf und übergeben." },
];

// Číslo je vždy prvé — pás ho zobrazuje veľké a odpočítava od nuly,
// popis pod ním musí na číslo nadväzovať.
// Poradie sleduje to, čo zákazníka pri rozhodovaní zaujíma najviac:
// koľko toho postavíme → akú istotu dostane → kam všade chodíme →
// ako rýchlo sa ozveme. Posledný údaj vedie priamo k dopytu.
export const stats = [
  { value: "250+", label: "Projekte pro Jahr" },
  { value: "5+", label: "Jahre Garantie" },
  { value: "5", label: "Länder" },
  { value: "48h", label: "Bis zum Angebot" },
];

// `match` = cesty, pri ktorých sa položka označí ako aktívna (prefixová zhoda).
// Ak chýba, použije sa `href`.
export const navigation = [
  {
    label: "Produkte",
    href: "/pergoly",
    match: ["/pergoly", "/zimne-zahrady", "/zasklenie-teras"],
    // Dve úrovne — kategória a jej prevedenia, rovnako ako na woodsteel.sk
    submenu: [
      {
        label: "Pergolen",
        href: "/pergoly",
        items: [
          { label: "Aluminium-Pergolen", href: "/pergoly/hlinikove-pergoly" },
          { label: "Holz-Pergolen", href: "/pergoly/drevene-pergoly" },
          { label: "Carports", href: "/pergoly/pristresky-na-auto" },
        ],
      },
      {
        label: "Wintergärten",
        href: "/zimne-zahrady",
        items: [
          { label: "Aluminium-Wintergärten", href: "/zimne-zahrady/hlinikove-zimne-zahrady" },
          { label: "Holz-Wintergärten", href: "/zimne-zahrady/drevene-zimne-zahrady" },
        ],
      },
      {
        label: "Terrassenverglasung",
        href: "/zasklenie-teras",
        items: [
          { label: "Verglasung mit Rahmen", href: "/zasklenie-teras/ramove-zasklenie" },
          { label: "Rahmenlose Verglasung", href: "/zasklenie-teras/bezramove-zasklenie" },
        ],
      },
    ],
  },
  { label: "Referenzen", href: "/realizacie" },
  { label: "Ratgeber", href: "/clanky" },
  { label: "Über uns", href: "/o-nas" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
];
