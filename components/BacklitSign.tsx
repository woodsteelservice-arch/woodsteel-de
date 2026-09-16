/**
 * Stena showroomu po zotmení — pozadie hero sekcie na stránke „Über uns".
 *
 * Pôvodne tu bol podsvietený nápis WOODSTEEL (päť vrstiev toho istého slova
 * na sebe). Po prechode na značku WS Wintergarten je stena zámerne prázdna —
 * ostáva len hnedý nádych, svetelná kaluž, zrno omietky a vinetácia.
 * Štýly vrstiev nápisu (`ws-sign-mark`, `ws-sign-face`…) sú v
 * `app/globals.css` ponechané, keby na stenu mal neskôr prísť nový nápis.
 */
export function BacklitSign() {
  return (
    <div className="ws-sign" aria-hidden>
      <div className="ws-sign-vignette" />
    </div>
  );
}
