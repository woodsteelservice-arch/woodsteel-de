import Script from "next/script";

/**
 * Tracking pixels preserved from existing woodsteel.sk WordPress.
 * Loads with consent mode v2 — analytics_storage / ad_storage default DENIED
 * until cookie banner sets them to granted.
 *
 * IDs preserved from existing newdev.woodsteel.sk WPCode injection:
 *   - GA4 measurement: G-TJYX8EZCE9
 *   - GTM container:   GTM-T9DK83FF
 *   - Meta Pixel:      832550835442654
 */
export function Analytics() {
  return (
    <>
      {/* Consent Mode v2 — default DENIED for EU compliance */}
      <Script id="consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'functionality_storage': 'denied',
            'personalization_storage': 'denied',
            'security_storage': 'granted',
            'wait_for_update': 500,
          });
        `}
      </Script>

      {/* GA4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-TJYX8EZCE9"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', 'G-TJYX8EZCE9', { anonymize_ip: true });
        `}
      </Script>

      {/* GTM */}
      <Script id="gtm-init" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-T9DK83FF');
        `}
      </Script>

      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
            t=b.createElement(e);t.async=!0;t.src=v;
            s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)
          }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '832550835442654');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
}

/** GTM noscript fallback — render directly inside <body>. */
export function GtmNoscript() {
  return (
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-T9DK83FF"
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
