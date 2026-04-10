import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

function pageHref(basePath: string, page: number): string {
  return page === 1 ? basePath : `${basePath}?page=${page}`;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between mt-8">
      {isFirst ? (
        <span
          aria-disabled="true"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-400 cursor-not-allowed text-sm"
        >
          ← Previous
        </span>
      ) : (
        <Link
          href={pageHref(basePath, currentPage - 1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-sky-300 hover:text-sky-600 transition-colors text-sm"
        >
          ← Previous
        </Link>
      )}

      <span className="text-sm text-slate-500">
        Page {currentPage} of {totalPages}
      </span>

      {isLast ? (
        <span
          aria-disabled="true"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-400 cursor-not-allowed text-sm"
        >
          Next →
        </span>
      ) : (
        <Link
          href={pageHref(basePath, currentPage + 1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-sky-300 hover:text-sky-600 transition-colors text-sm"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
