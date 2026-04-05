import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "@/data/posts";
import { formatDate } from "@/lib/utils";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Yazi Bulunamadi",
      description: "Istenen yazi bulunamadi.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/yazilar/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.coverImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-gold)]">{post.category}</p>
        <h1 className="mt-3 font-[var(--font-serif)] text-3xl leading-tight text-[var(--color-navy)] md:text-4xl">{post.title}</h1>
        <p className="mt-4 text-base leading-8 text-[var(--color-slate)]">{post.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">•</span>
          <span>{post.author}</span>
          <span aria-hidden="true">•</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      <section className="prose-content mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-[15px] text-[var(--color-slate)] shadow-sm md:p-8">
        <p>{post.content}</p>
        <h2 className="font-[var(--font-serif)] text-2xl">Not</h2>
        <p>
          Bu yazi egitsel niteliktedir. Finansal kararlar kisisel risk profili ve bireysel kosullar dikkate alinarak verilmelidir.
        </p>
      </section>
    </article>
  );
}
