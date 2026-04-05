import Link from "next/link";
import type { BlogPost } from "@/data/posts";
import { formatDate } from "@/lib/utils";

type PostCardProps = {
  post: BlogPost;
  compact?: boolean;
};

export function PostCard({ post, compact = false }: PostCardProps) {
  return (
    <article className="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] transition hover:border-[var(--color-gold)]/60 hover:shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-gold)]">{post.category}</p>
      <h3 className="mt-2 font-[var(--font-serif)] text-xl leading-tight text-[var(--color-navy)]">
        <Link href={`/yazilar/${post.slug}`} className="focus-ring rounded-sm">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-6 text-[var(--color-slate)]">{post.excerpt}</p>
      <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span aria-hidden="true">•</span>
        <span>{post.readingTime}</span>
      </div>
      {!compact ? (
        <Link
          href={`/yazilar/${post.slug}`}
          className="focus-ring mt-5 inline-flex text-sm font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
        >
          Devamini Oku
        </Link>
      ) : null}
    </article>
  );
}
