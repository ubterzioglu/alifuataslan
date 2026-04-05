import { getFeaturedPosts } from "@/lib/supabase";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";

export async function FeaturedPosts() {
  const posts = await getFeaturedPosts();

  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 pb-12 md:pt-8 md:pb-16">
      <SectionHeading
        title={"\u00d6ne \u00c7\u0131kan Yaz\u0131lar"}
        description={"Man\u015fet niteli\u011findeki e\u011fitsel analizler ve dikkatle se\u00e7ilmi\u015f i\u00e7erikler."}
      />
      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} compact />
        ))}
      </div>
    </section>
  );
}