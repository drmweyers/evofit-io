interface PostBodyProps {
  html: string;
}

export default function PostBody({ html }: PostBodyProps) {
  return (
    <article
      className="prose prose-lg prose-invert max-w-none
        prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-white prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-white/90
        prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2 prose-h4:text-white/80
        prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-5
        prose-a:text-[var(--color-brand-accent)] prose-a:no-underline hover:prose-a:underline prose-a:font-medium
        prose-strong:text-white prose-strong:font-semibold
        prose-em:text-white/70
        prose-blockquote:border-l-[var(--color-brand-accent)] prose-blockquote:bg-white/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:text-white/70
        prose-code:text-[var(--color-brand-accent)] prose-code:bg-white/10 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
        prose-li:text-white/80 prose-li:marker:text-[var(--color-brand-accent)]
        prose-ol:text-white/80
        prose-ul:text-white/80
        prose-hr:border-white/10
        prose-img:rounded-xl prose-img:shadow-lg
        prose-table:text-white/80
        prose-th:text-white prose-th:border-white/20
        prose-td:border-white/10"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
