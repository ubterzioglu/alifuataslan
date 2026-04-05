import { getFeaturedPosts } from "@/lib/supabase";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";

export async function FeaturedPosts() {
  const posts = await getFeaturedPosts();

  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 pb-12 md:pt-8 md:pb-16">
      <SectionHeading
        title="Öne Çıkan Yazılar"
        description="Manşet niteliğindeki eğitsel analizler ve dikkatle seçilmiş içerikler."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} compact />
        ))}
      </div>
    </section>
  );
}