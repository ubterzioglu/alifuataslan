import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/section-heading";
import { PostCard } from "@/components/post-card";
import { getPostsByCategory, getCategoryBySlug, getCategories } from "@/lib/supabase";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Kategori Bulunamadı",
      description: "İstenen kategori bulunamadı.",
    };
  }

  return {
    title: `${category.seo_title || category.name}`,
    description: category.seo_description || category.description || undefined,
    alternates: {
      canonical: `/kategori/${category.slug}`,
    },
    openGraph: {
      type: "website",
      title: category.seo_title || category.name,
      description: category.seo_description || category.description || undefined,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(slug);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <SectionHeading
        title={category.name}
        description={category.description || "Bu kategoride eğitim odaklı yazılar yer alır."}
      />
      <div className="grid gap-5">
        {posts.length === 0 ? (
          <p className="text-center text-slate-500">Bu kategoride henüz yazı bulunamadı.</p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </section>
  );
}