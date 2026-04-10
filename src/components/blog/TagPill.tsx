import Link from 'next/link';

interface TagPillProps {
  tag: string;
}

export default function TagPill({ tag }: TagPillProps) {
  return (
    <Link
      href={`/blog/tag/${tag}`}
      className="inline-block rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700 hover:bg-sky-100 transition-colors"
    >
      {tag}
    </Link>
  );
}
