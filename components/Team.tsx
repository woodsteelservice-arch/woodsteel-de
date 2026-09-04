import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import { team } from "@/lib/data";

interface Props {
  /** Pozadie sekcie — homepage a stránka O nás ho majú odlišné */
  bgClass?: string;
}

export function Team({ bgClass = "bg-cream/50" }: Props) {
  return (
    <section id="team" className={cn("py-16 sm:py-20 lg:py-32", bgClass)}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader
          eyebrow="Unser Team"
          title="Die Menschen hinter Ihrem Bauvorhaben"
          subtitle="Über 25 Mitarbeiter, eigene Fertigung und Montage. Ein Team, das Sie von der ersten Anfrage bis zur Schlüsselübergabe begleitet."
        />

        <div className="mt-10 sm:mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 90} className="h-full">
              <article className="group relative h-full flex flex-col text-center bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(63,34,17,0.05)] transition-all duration-500 hover:shadow-[0_20px_48px_rgba(63,34,17,0.12)] hover:-translate-y-1.5">
                {/* Jemný zlatý rám, ktorý sa objaví pri prejdení myšou */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition-colors duration-500 group-hover:ring-gold/30"
                />

                <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 mx-auto">
                  {/* Prstenec, ktorý sa pri hoveri rozžiari do zlata */}
                  <span
                    aria-hidden
                    className="absolute -inset-1.5 rounded-full border border-cream transition-all duration-500 group-hover:border-gold/50 group-hover:scale-105"
                  />
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-cream ring-4 ring-cream transition-shadow duration-500 group-hover:ring-gold/15">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="(min-width: 1024px) 160px, 144px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                    />
                  </div>
                </div>

                <h3 className="mt-5 font-display font-bold text-lg text-brown">
                  {m.name}
                </h3>
                <div className="text-eyebrow text-gold mt-1">{m.role}</div>

                {/* Linka, ktorá sa pri hoveri roztiahne */}
                <span
                  aria-hidden
                  className="mt-4 mx-auto block h-px w-8 bg-gold/40 transition-all duration-500 group-hover:w-14 group-hover:bg-gold"
                />

                <p className="mt-4 text-sm italic text-mutedbrand leading-relaxed transition-colors duration-500 group-hover:text-brown/80">
                  &bdquo;{m.quote}&ldquo;
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
