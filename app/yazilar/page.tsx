import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { getPublishedPosts } from "@/lib/supabase";
import { PostCard } from "@/components/post-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yazilar",
  description:
    "Piyasa yorumlari, finans tarihi, bilanco analizi ve yatirim psikolojisi odakli egitsel blog yazilari.",
  alternates: { canonical: "/yazilar" },
};

export default async function BlogListPage() {
  const orderedPosts = await getPublishedPosts();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <SectionHeading
        title="Tum Yazilar"
        description="Finansal okuryazarlik, analiz metodolojisi ve piyasa tarihi ekseninde yayinlanan icerikler."
      />
      <div className="grid gap-5">
        {orderedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
