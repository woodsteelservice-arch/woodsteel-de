import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { blogPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Ratgeber - WS Wintergarten",
  description:
    "Tipps und Anleitungen zu Pergolen, Wintergärten und Terrassenverglasung — von der Verankerung bis zur Pflege.",
  alternates: { canonical: "https://woodsteel.sk/clanky/" },
};

export default function ClankyPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-32 lg:pt-40 pb-12 bg-cream/40">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
            <div className="text-eyebrow text-gold mb-4 inline-flex items-center gap-2">
              <Link href="/" className="hover:text-brown">WS Wintergarten</Link>
              <span className="opacity-50">/</span>
              <span className="text-mutedbrand">Ratgeber</span>
            </div>
            <h1 className="text-display-1 font-extrabold text-brown">
              Inspiration und <span className="text-gold">praktische Tipps.</span>
            </h1>
            <p className="mt-6 text-mutedbrand text-base lg:text-lg max-w-2xl mx-auto">
              Tipps aus der Praxis, Pflegeanleitungen und Entscheidungshilfen —
              alles, was Sie vor dem Kauf einer Außenkonstruktion wissen sollten.
            </p>
          </div>
        </section>

        {/* Featured */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <Link
              href={`/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <div className="text-eyebrow text-gold mb-3">{featured.category} · Neueste</div>
                <h2 className="text-display-2 font-bold text-brown group-hover:text-gold transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-5 text-mutedbrand leading-relaxed">{featured.excerpt}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-gold font-semibold text-sm">
                  <Calendar size={14} />
                  {formatDate(featured.date)}
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Rest */}
        <section className="pb-24 lg:pb-32 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${post.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream mb-5">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-eyebrow text-gold mb-2">{post.category}</div>
                  <h3 className="font-display font-bold text-xl text-brown group-hover:text-gold transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-mutedbrand leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs text-mutedbrand">
                    <Calendar size={12} />
                    {formatDate(post.date)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
