import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, ArrowRight, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinalCTA } from "@/components/FinalCTA";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleToc } from "@/components/ArticleToc";
import { pripravObsah, faqZClanku } from "@/lib/article-toc";
import { ReadingProgress, ArticleShare } from "@/components/ArticleExtras";
import { JsonLd, faqSchema } from "@/lib/schema";
import { Sparkles } from "lucide-react";
import { blogPosts, getBlogPost, formatDate, readingMinutes, autorClanku } from "@/lib/blog";
import { prodMeta } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const seo = prodMeta(`/${slug}/`);
  return {
    title: seo?.title || `${post.title} — WS Wintergarten`,
    description: seo?.meta_description || post.excerpt,
    alternates: { canonical: `https://wswintergarten.de/${slug}/` },
    openGraph: {
      title: seo?.title || post.title,
      description: seo?.meta_description || post.excerpt,
      type: "article",
      images: seo?.og_image ? [seo.og_image] : [post.image],
    },
  };
}

export default async function ArticleAtRoot({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // Nadpisom doplníme kotvy a vytiahneme z nich osnovu — robí sa to na serveri.
  const { html: telo, obsah } = post.contentHtml
    ? pripravObsah(post.contentHtml)
    : { html: "", obsah: [] };
  const minuty = readingMinutes(post);
  const autor = autorClanku(post);
  // Zhrnutie do rámčeka: vlastné, inak perex — každý článok ho tak má.
  const shrnuti = post.summary ?? post.excerpt;
  // Časté otázky z tela článku → štruktúrované dáta pre Google.
  const faq = post.contentHtml ? faqZClanku(post.contentHtml) : [];

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <ReadingProgress />
      {faq.length > 0 && <JsonLd data={faqSchema(faq)} />}
      <Header overlay />
      <main className="flex-1">
        <section className="relative min-h-[55svh] flex items-end overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/95 via-brown/55 to-brown/20" />
          <div className="relative z-10 max-w-4xl mx-auto w-full px-5 lg:px-8 pb-14 pt-32">
            <Link
              href="/clanky"
              className="inline-flex items-center gap-2 text-xs text-eyebrow text-gold mb-5 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> Alle Beiträge
            </Link>
            <div className="text-eyebrow text-cream/80 mb-3">{post.category}</div>
            <h1 className="text-display-2 font-extrabold text-white">{post.title}</h1>
            {/* Autor článku — tvár značky dáva textu dôveryhodnosť. */}
            <div className="mt-7 flex items-center gap-3.5">
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/50">
                <Image
                  src={autor.foto}
                  alt={autor.jmeno}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <div className="text-sm">
                <div className="font-semibold text-white">{autor.jmeno}</div>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-cream/70 text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={12} />
                    {formatDate(post.date)}
                  </span>
                  <span className="h-3 w-px bg-cream/25" />
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} />
                    {minuty} Min. Lesezeit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <article className="py-16 lg:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_230px] lg:gap-14">
            <div className="min-w-0 max-w-2xl lg:order-1">
            {/* Zhrnutie — čitateľ hneď vie, o čom článok je. */}
            <div className="mb-10 rounded-2xl border-l-4 border-gold bg-cream/40 px-6 py-5">
              <div className="mb-2 inline-flex items-center gap-2 text-eyebrow text-gold">
                <Sparkles size={13} />
                Das Wichtigste in Kürze
              </div>
              <p className="font-display text-[17px] leading-relaxed text-brown">
                {shrnuti}
              </p>
            </div>

            <div className="mb-10 border-b border-brown/[0.07] pb-6">
              <ArticleShare title={post.title} />
            </div>

            {post.contentHtml ? (
              <ArticleBody html={telo} />
            ) : (
              <p className="text-mutedbrand">
                Der Beitrag entsteht gerade. Sehen Sie sich in der Zwischenzeit{" "}
                <Link href="/realizacie" className="text-gold underline">
                  unsere Referenzen
                </Link>{" "}
                an oder{" "}
                <Link href="/kontakt" className="text-gold underline">
                  kontaktieren Sie uns
                </Link>
                .
              </p>
            )}

            <div className="mt-12 pt-10 border-t border-cream">
              <ArticleShare title={post.title} />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <Link
                href="/clanky"
                className="inline-flex items-center gap-2 text-mutedbrand hover:text-gold font-semibold text-sm"
              >
                <ArrowLeft size={14} />
                Alle Beiträge
              </Link>
              <Link
                href="/akcna-cenova-ponuka"
                className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-hover text-brown hover:text-white font-semibold text-sm rounded-full transition-all"
              >
                Angebot anfordern <ArrowRight size={14} />
              </Link>
            </div>
            </div>

            {/* h-full: bez neho má sticky rodiča vysokého presne ako on sám
                a nemá sa kam posúvať — obsah by stál na mieste. */}
            <div className="lg:order-2 h-full">
              <ArticleToc obsah={obsah} />
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="py-16 lg:py-20 bg-cream/40">
            <div className="max-w-7xl mx-auto px-5 lg:px-8">
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-brown mb-10">
                Weitere Beiträge aus {post.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
                {related.map((p) => (
                  <Link key={p.slug} href={`/${p.slug}`} className="group">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream mb-4">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width:768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-display font-bold text-lg text-brown group-hover:text-gold transition-colors leading-tight">
                      {p.title}
                    </h3>
                    <div className="mt-3 inline-flex items-center gap-2 text-xs text-mutedbrand">
                      <Calendar size={12} />
                      {formatDate(p.date)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
