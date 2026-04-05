import { latestPosts } from "@/data/posts";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";

export function LatestPosts() {
  return (
    <section id="son-yazilar" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-12 md:pb-16">
      <SectionHeading
        title="Son Yazilar"
        description="Kronolojik sirada yayinlanan guncel icerikler."
        href="/yazilar"
        actionLabel="Tum Yazilar"
      />
      <div className="grid gap-5">
        {latestPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
