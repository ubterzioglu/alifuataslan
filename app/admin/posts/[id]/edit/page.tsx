import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/admin-layout";
import { EditPostClient } from "@/components/admin-edit-post-client";
import { getPostById, getCategories, getTags, getAllPosts } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ id: post.id.toString() }));
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPostById(Number(id));

  if (!post) {
    notFound();
  }

  const categories = await getCategories();
  const tags = await getTags();

  return <EditPostClient post={post} categories={categories} tags={tags} />;
}
