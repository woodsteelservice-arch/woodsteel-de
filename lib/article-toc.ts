/**
 * Obsah článku (table of contents).
 *
 * Telá článkov sú hotové HTML — staršie z exportu pôvodného webu, novšie písané
 * priamo u nás. Nadpisy v nich nemajú `id`, takže ich tu dopĺňame a zároveň
 * z nich skladáme osnovu. Robí sa to na serveri, klient dostane hotové dáta.
 */

export type TocPolozka = {
  id: string;
  text: string;
  uroven: 2 | 3;
};

/** „Na co si dát pozor" → „na-co-si-dat-pozor" */
function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "sekce"
  );
}

/** Odstráni značky a prepíše základné entity — nadpis môže obsahovať <strong>. */
function cistyText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&bdquo;|&ldquo;|&rdquo;/g, "„")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Doplní `id` do h2/h3 a vráti osnovu.
 *
 * Ak nadpis už `id` má (niektoré exportované články ho majú), rešpektujeme ho,
 * aby sa nerozbili existujúce odkazy. Duplicitné slugy dostanú poradové číslo.
 */
export function pripravObsah(html: string): { html: string; obsah: TocPolozka[] } {
  const obsah: TocPolozka[] = [];
  const pouzite = new Map<string, number>();

  const novyHtml = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (cele, uroven: string, atributy: string, vnutro: string) => {
      const text = cistyText(vnutro);
      if (!text) return cele;

      const existujuce = /\sid=["']([^"']+)["']/i.exec(atributy)?.[1];
      let id = existujuce ?? slugify(text);

      if (!existujuce) {
        const kolko = pouzite.get(id) ?? 0;
        pouzite.set(id, kolko + 1);
        if (kolko > 0) id = `${id}-${kolko + 1}`;
      }

      obsah.push({ id, text, uroven: uroven === "2" ? 2 : 3 });

      const atributyBezId = atributy.replace(/\sid=["'][^"']*["']/i, "");
      // scroll-mt drží nadpis pod lepkavou hlavičkou, keď sa naň skočí z obsahu
      return `<h${uroven} id="${id}" class="scroll-mt-28 lg:scroll-mt-32"${atributyBezId}>${vnutro}</h${uroven}>`;
    }
  );

  return { html: novyHtml, obsah };
}

/**
 * Vytiahne z článku sekciu s častými otázkami pre štruktúrované dáta.
 *
 * Hľadá nadpis h2 obsahujúci „Fragen" a berie h3 pod ním ako otázky,
 * text do najbližšieho ďalšieho nadpisu ako odpoveď. Google potom môže
 * článok zobraziť s rozbaliteľnými otázkami priamo vo výsledkoch.
 */
export function faqZClanku(html: string): { question: string; answer: string }[] {
  const start = /<h2[^>]*>(?:(?!<\/h2>)[\s\S])*Fragen[^<]*<\/h2>/i.exec(html);
  if (!start) return [];

  const zbytek = html.slice(start.index + start[0].length);
  const konec = /<h2[^>]*>/i.exec(zbytek);
  const usek = konec ? zbytek.slice(0, konec.index) : zbytek;

  const faq: { question: string; answer: string }[] = [];
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3[^>]*>|$)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(usek)) !== null) {
    const question = cistyText(m[1]);
    const answer = cistyText(m[2]);
    if (question && answer) faq.push({ question, answer });
  }
  return faq;
}
