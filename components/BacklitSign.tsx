/**
 * Podsvietený nápis WOODSTEEL na stene showroomu.
 *
 * Päť vrstiev toho istého slova leží presne na sebe: tri rozostrené biele
 * (rozptyl svetla do steny) + hrana písmen + zlaté čelo. Vďaka tomu je to
 * živý prvok, nie obrázok — na retina displejoch ostáva ostrý a pri načítaní
 * sa rozsvieti. Štýly sú v `app/globals.css` pod prefixom `ws-sign-`.
 */
export function BacklitSign() {
  return (
    <div className="ws-sign" aria-hidden>
      <div className="ws-sign-vignette" />
      <div className="ws-sign-mark">
        <div className="ws-sign-layer ws-sign-layer--bloom">
          <span className="ws-sign-bloom">WOODSTEEL</span>
        </div>
        <div className="ws-sign-layer ws-sign-layer--wide">
          <span className="ws-sign-wide">WOODSTEEL</span>
        </div>
        <div className="ws-sign-layer ws-sign-layer--tight">
          <span className="ws-sign-tight">WOODSTEEL</span>
        </div>
        <div className="ws-sign-layer ws-sign-layer--edge">
          <span className="ws-sign-edge">WOODSTEEL</span>
        </div>
        <div className="ws-sign-face">WOODSTEEL</div>
      </div>
    </div>
  );
}
