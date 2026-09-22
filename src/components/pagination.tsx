import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
export function Pagination({
  page,
  totalPages,
  basePath,
  query = {},
}: {
  page: number;
  totalPages: number;
  basePath: string;
  query?: Record<string, string>;
}) {
  if (totalPages <= 1) return null;
  const href = (n: number) =>
    `${basePath}?${new URLSearchParams({ ...query, page: String(n) })}`;
  return (
    <nav className="pagination" aria-label="Halaman berita">
      {page > 1 ? (
        <Link href={href(page - 1)}>
          <ArrowLeft size={15} /> Sebelumnya
        </Link>
      ) : (
        <span />
      )}
      <span>
        Halaman {page} dari {totalPages}
      </span>
      {page < totalPages ? (
        <Link href={href(page + 1)}>
          Berikutnya <ArrowRight size={15} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
