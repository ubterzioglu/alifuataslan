import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Yazı Bulunamadı",
      description: "İstenen yazı bulunamadı.",
    };
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || undefined,
    alternates: {
      canonical: post.canonical_url || `/yazilar/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || undefined,
      publishedTime: post.published_at || post.created_at,
      authors: [post.author_name],
      images: post.og_image_url || post.featured_image_url ? [{ url: post.og_image_url || (post.featured_image_url as string) }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || undefined,
      images: post.og_image_url || post.featured_image_url ? [post.og_image_url || (post.featured_image_url as string)] : [],
    },
  };
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-gold)]">{post.categories?.name}</p>
        <h1 className="mt-3 font-[var(--font-serif)] text-3xl leading-tight text-[var(--color-navy)] md:text-4xl">{post.title}</h1>
        {post.excerpt && <p className="mt-4 text-base leading-8 text-[var(--color-slate)]">{post.excerpt}</p>}
        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <time dateTime={post.published_at || post.created_at}>{formatDate(post.published_at || post.created_at)}</time>
          <span aria-hidden="true">{"\u2022"}</span>
          <span>{post.author_name}</span>
          {post.reading_time && (
            <>
              <span aria-hidden="true">{"\u2022"}</span>
              <span>{post.reading_time}</span>
            </>
          )}
        </div>
        {post.featured_image_url && (
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-100">
            <img src={post.featured_image_url} alt={post.title} className="w-full object-cover" />
          </div>
        )}
      </header>

      <section className="prose-content mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-[15px] text-[var(--color-slate)] shadow-sm md:p-8">
        <div className="whitespace-pre-wrap">{post.content}</div>

        {post.disclaimer_enabled && (
          <>
            <h2 className="mt-12 font-[var(--font-serif)] text-xl font-semibold text-[var(--color-navy)]">Yasal Uyarı</h2>
            <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
              <p>
                Bu yazı eğitsel niteliktedir. Sitede yer alan içerikler, yorumlar ve analizler kesinlikle yatırım tavsiyesi niteliği taşımaz. Finansal kararlar kişisel risk profili ve bireysel koşullar dikkate alınarak verilmelidir.
              </p>
            </div>
          </>
        )}
      </section>
    </article>
  );
}