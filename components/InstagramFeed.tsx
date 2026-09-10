import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "./SectionHeader";

function Instagram({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

const INSTAGRAM_HANDLE = "@ws_wintergarten";
const INSTAGRAM_URL = "https://www.instagram.com/ws_wintergarten/";

// Visual mock of the latest 8 posts. In production this should be replaced with
// a live feed via Instagram Basic Display API or a service like Behold.so / Curator.io.
// Currently uses real WoodSteel project photos as visual placeholders.
const posts = [
  "/images/hlinikova-pergola-BA-Vrakuna.jpeg",
  "/images/zimna-zahrada-hamuliakovo.jpeg",
  "/images/hlinikova-pergola-senec.jpeg",
  "/images/zimna-zahrada-rovinka.jpeg",
  "/images/hlinikova-pergola-trencin.jpeg",
  "/images/zimna-zahrada-kittse.jpeg",
  "/images/zimna-zahrada-dunajska-luzna.jpeg",
  "/images/zimna-zahrada-horne-janiky-1.jpeg",
];

export function InstagramFeed() {
  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
            <Instagram size={14} />
            Instagram
          </div>
          <h2 className="text-display-2 font-bold text-brown">
            Folgen Sie uns auf{" "}
            <Link
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              {INSTAGRAM_HANDLE}
            </Link>
          </h2>
          <p className="mt-4 text-mutedbrand">
            Neues aus der Werkstatt, Einblicke in Montagen und Inspiration aus fertigen Projekten.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {posts.map((src, i) => (
            <Link
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-cream"
            >
              <Image
                src={src}
                alt={`Instagram post ${i + 1}`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/60 transition-colors flex items-center justify-center">
                <Instagram
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-brown/15 hover:border-gold text-brown hover:text-gold font-semibold text-sm rounded-full transition-colors"
          >
            <Instagram size={16} />
            {INSTAGRAM_HANDLE} folgen
          </Link>
        </div>
      </div>
    </section>
  );
}
