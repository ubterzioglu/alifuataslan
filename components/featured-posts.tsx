import { featuredPosts } from "@/data/posts";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";

export function FeaturedPosts() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
      <SectionHeading
        title="One Cikan Yazilar"
        description="Manset niteligindeki egitsel analizler ve dikkatle secilmis icerikler."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {featuredPosts.map((post) => (
          <PostCard key={post.slug} post={post} compact />
        ))}
      </div>
    </section>
  );
}
