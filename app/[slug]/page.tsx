import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FinalCTA } from "@/components/FinalCTA";
import { ArticleBody } from "@/components/ArticleBody";
import { blogPosts, getBlogPost, formatDate } from "@/lib/blog";
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
  // Titulok aj popis berieme z nemeckých dát článku — v `seo-export.json` sú
  // slovenské texty z crawlu woodsteel.sk a v záložke prehliadača by svietilo
  // staré „WoodSteel.sk".
  return {
    title: `${post.title} - WS Wintergarten`,
    description: post.excerpt,
    alternates: { canonical: `https://woodsteel.sk/${slug}/` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
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

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
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
            <div className="mt-5 inline-flex items-center gap-2 text-cream/75 text-sm">
              <Calendar size={14} />
              {formatDate(post.date)}
            </div>
          </div>
        </section>

        <article className="py-16 lg:py-24 bg-white">
          <div className="max-w-2xl mx-auto px-5 lg:px-8">
            {post.contentHtml ? (
              <ArticleBody html={post.contentHtml} />
            ) : (
              <p className="text-mutedbrand">
                Der Beitrag wird gerade vorbereitet. Sehen Sie sich inzwischen{" "}
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

            <div className="mt-12 pt-10 border-t border-cream flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
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
        </article>

        {related.length > 0 && (
          <section className="py-16 lg:py-20 bg-cream/40">
            <div className="max-w-7xl mx-auto px-5 lg:px-8">
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-brown mb-10">
                Weitere Beiträge aus der Kategorie {post.category}
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
      <WhatsAppButton />
    </>
  );
}
