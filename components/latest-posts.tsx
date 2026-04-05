import { getLatestPosts } from "@/lib/supabase";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";

export async function LatestPosts() {
  const posts = await getLatestPosts();

  return (
    <section id="son-yazilar" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-12 md:pb-16">
      <SectionHeading
        title="Son Yazilar"
        description="Kronolojik sirada yayinlanan guncel icerikler."
        href="/yazilar"
        actionLabel="Tum Yazilar"
      />
      <div className="grid gap-5">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
