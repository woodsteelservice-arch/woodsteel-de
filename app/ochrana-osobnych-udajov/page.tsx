import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Datenschutz - WoodSteel",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten nach Art. 13 DSGVO — Verantwortlicher, Zweck, Umfang, Speicherdauer und Rechte der betroffenen Person.",
  alternates: { canonical: "https://woodsteel.sk/ochrana-osobnych-udajov/" },
};

/** Prevádzkovateľ podľa výpisu z obchodného registra — text prevzatý z woodsteel.sk. */
const operator = [
  ["Unternehmen", "Woodsteel SK s.r.o."],
  ["Sitz", "Priehon 112/37, 972 05 Sebedražie, Slowakische Republik"],
  ["Reg.-Nr. (IČO)", "53594126"],
  ["Steuernummer (DIČ)", "2121454324"],
  ["USt-IdNr.", "SK2121454324"],
  ["IBAN", "SK88 0900 0000 0052 0828 1887"],
];

const purposes = [
  "Kontaktaufnahme mit Interessenten zwecks Angebot",
  "Vertragsabschluss",
  "Archivierungs- und Steuerpflichten",
];

const rights = [
  "vom Verantwortlichen Auskunft über die personenbezogenen Daten sowie deren Berichtigung oder Löschung bzw. Einschränkung der Verarbeitung zu verlangen und der Verarbeitung zu widersprechen,",
  "jederzeit Informationen zur Verarbeitung der personenbezogenen Daten im gesetzlichen Umfang zu verlangen,",
  "die den Kunden betreffenden personenbezogenen Daten zu einem anderen Verantwortlichen zu übertragen,",
  "keiner ausschließlich auf automatisierter Verarbeitung beruhenden Entscheidung, einschließlich Profiling, unterworfen zu werden,",
  "sich mit jedem Anliegen oder jeder Beschwerde an die Aufsichtsbehörde zu wenden — das Amt für den Schutz personenbezogener Daten der Slowakischen Republik oder die zuständige Datenschutzbehörde im Land Ihres Wohnsitzes.",
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="font-display text-xl lg:text-2xl font-bold text-brown">{title}</h2>
      <div className="mt-3 space-y-3 text-mutedbrand leading-relaxed">{children}</div>
    </section>
  );
}

export default function OchranaOsobnychUdajovPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-32 lg:pt-40 pb-12 bg-cream/40">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
            <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
              <Link href="/" className="hover:text-brown">WoodSteel</Link>
              <span className="opacity-50">/</span>
              <span className="text-mutedbrand">Datenschutz</span>
            </div>
            <h1 className="text-display-1 font-extrabold text-brown">
              <span className="text-gold">Datenschutz.</span>
            </h1>
            <p className="mt-5 text-mutedbrand text-base lg:text-lg max-w-2xl mx-auto">
              Im Sinne von Art. 13 der Verordnung (EU) 2016/679 des Europäischen Parlaments und des Rates,
              der Datenschutz-Grundverordnung („DSGVO“).
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-5 lg:px-8">
            <Section title="Verantwortlicher">
              <p>Verantwortlicher ist das Unternehmen:</p>
              <dl className="rounded-2xl border border-cream bg-cream/30 p-5 lg:p-6 space-y-2">
                {operator.map(([label, value]) => (
                  <div key={label} className="flex flex-col sm:flex-row sm:gap-3">
                    <dt className="sm:w-40 shrink-0 text-sm font-semibold text-brown">{label}</dt>
                    <dd className="text-brown">{value}</dd>
                  </div>
                ))}
              </dl>
              <p>
                Personenbezogene Daten können für den Verantwortlichen auch weitere Auftragsverarbeiter
                verarbeiten, insbesondere Anbieter der Software, in der die Kundendaten geführt werden,
                sowie weitere Anbieter von Verarbeitungssoftware, Diensten und Anwendungen,
                die der Verantwortliche derzeit nutzt oder nicht nutzt.
              </p>
            </Section>

            <Section title="Zweck der Verarbeitung">
              <ul className="space-y-2">
                {purposes.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Welche Daten wir speichern">
              <p>
                Vor- und Nachname, Adresse des ständigen oder vorübergehenden Wohnsitzes, Geburtsnummer,
                Geburtsdatum, Staatsangehörigkeit, Art und Nummer des Ausweisdokuments, sofern der Kunde
                eine natürliche Person oder Vertreter eines Kunden – einer juristischen Person – ist;
                bei einer natürlichen Person als Unternehmer zusätzlich die Anschrift des Geschäftssitzes,
                die Bezeichnung des Registers oder einer anderen Evidenz, in der die Person eingetragen ist,
                sowie die Eintragungsnummer.
              </p>
            </Section>

            <Section title="Speicherdauer">
              <p>
                Kontaktdaten im Umfang von Name, E-Mail-Adresse und Telefonnummer werden 3 Jahre lang
                verarbeitet, sofern kein Vertrag zustande gekommen ist.
              </p>
              <p>
                Kam ein Vertrag zustande, werden die personenbezogenen Daten des Kunden vom Verantwortlichen
                10 Jahre ab Vertragsabschluss verarbeitet.
              </p>
            </Section>

            <Section title="Hinweis zur Freiwilligkeit">
              <p>
                Die Angabe personenbezogener Daten ist freiwillig. In dem Umfang, in dem der
                Verantwortliche jedoch verpflichtet ist, Kundendaten zu erheben, zu verarbeiten und
                aufzubewahren, ist die Angabe bestimmter Daten Voraussetzung für die Erbringung der
                Leistungen. Diese Pflichtangaben sind: sämtliche Vor- und Nachnamen, Geburtsnummer,
                ständiger oder anderer Wohnsitz und Staatsangehörigkeit; handelt es sich um eine
                natürliche Person als Unternehmer, zusätzlich Firmenname, unterscheidender Zusatz oder
                sonstige Bezeichnung, Geschäftssitz und Identifikationsnummer, Art und Nummer des
                Ausweisdokuments, ausstellender Staat bzw. ausstellende Behörde sowie dessen Gültigkeitsdauer.
              </p>
              <p>
                Die Angabe der übrigen personenbezogenen Daten liegt ausschließlich im Ermessen des Kunden;
                der Verantwortliche macht den Verkauf von Waren oder die Erbringung von Leistungen nicht
                von diesen Angaben abhängig.
              </p>
            </Section>

            <Section title="Rechte der betroffenen Person">
              <p>
                Der Kunde bestätigt, dass er ordnungsgemäß über den Umfang der verarbeiteten
                personenbezogenen Daten und den Zweck der Verarbeitung informiert wurde sowie über sein Recht:
              </p>
              <ul className="space-y-2">
                {rights.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Kontakt">
              <p>
                Bei Fragen zur Verarbeitung personenbezogener Daten wenden Sie sich an{" "}
                <a href="mailto:info@wswintergarten.de" className="text-gold underline">info@wswintergarten.de</a>.
              </p>
            </Section>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
