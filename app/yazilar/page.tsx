import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { getPublishedPosts } from "@/lib/supabase";
import { PostCard } from "@/components/post-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yazılar",
  description:
    "Piyasa yorumları, finans tarihi, bilanço analizi ve yatırım psikolojisi odaklı eğitsel blog yazıları.",
  alternates: { canonical: "/yazilar" },
};

export default async function BlogListPage() {
  const orderedPosts = await getPublishedPosts();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <SectionHeading
        title="Tüm Yazılar"
        description="Finansal okuryazarlık, analiz metodolojisi ve piyasa tarihi ekseninde yayınlanan içerikler."
      />
      <div className="grid gap-5">
        {orderedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}