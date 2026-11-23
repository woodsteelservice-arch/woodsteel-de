import { initBotId } from "botid/client/core";

/**
 * Vercel BotID — prehliadač pripojí k týmto požiadavkám neviditeľný dôkaz,
 * že ich posiela človek. Server ho overí cez `checkBotId()`; skripty bez
 * prehliadača (curl, boti) neprejdú. Pozor: `trailingSlash: true`, preto
 * uvádzame cesty aj s lomkou na konci.
 */
initBotId({
  protect: [
    { path: "/api/vizualizacia/", method: "POST" },
    { path: "/api/vizualizacia", method: "POST" },
    { path: "/api/vizualizacia-lead/", method: "POST" },
    { path: "/api/vizualizacia-lead", method: "POST" },
  ],
});
