/**
 * Renders the prod-extracted article body HTML with our brand styling applied.
 * Strips Divi-specific markup and applies Tailwind typography for premium reading experience.
 */
export function ArticleBody({ html }: { html: string }) {
  // Light sanitization — keep tags, strip on* event handlers + iframes from external sources
  const sanitized = html
    .replace(/\son\w+="[^"]*"/g, "")
    .replace(/<iframe(?![^>]*newdev\.woodsteel|youtube|vimeo)[^>]*>[\s\S]*?<\/iframe>/gi, "");

  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:font-display prose-headings:text-brown prose-headings:font-bold
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5
        prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
        prose-p:text-charcoal/90 prose-p:leading-[1.8] prose-p:text-[17px]
        prose-a:text-gold prose-a:no-underline hover:prose-a:underline
        prose-strong:text-brown
        prose-img:rounded-xl prose-img:shadow-[0_8px_24px_rgba(63,34,17,0.08)]
        prose-ul:my-6 prose-li:my-2
        prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:bg-cream/40 prose-blockquote:rounded-r-xl prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:font-display
      "
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
