import Link from 'next/link';

interface TagPillProps {
  tag: string;
}

export default function TagPill({ tag }: TagPillProps) {
  return (
    <Link
      href={`/blog/tag/${tag}`}
      className="inline-block rounded-full border border-[var(--color-brand-accent)]/30 bg-[var(--color-brand-accent)]/10 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent)]/20 transition-colors"
    >
      {tag}
    </Link>
  );
}
