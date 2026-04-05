import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { posts } from "@/data/posts";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: "Yazilar",
  description:
    "Piyasa yorumlari, finans tarihi, bilanco analizi ve yatirim psikolojisi odakli egitsel blog yazilari.",
  alternates: { canonical: "/yazilar" },
};

export default function BlogListPage() {
  const orderedPosts = [...posts].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );

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
