import { AdminLayout } from "@/components/admin-layout";
import { NewPostClient } from "@/components/admin-new-post-client";
import { getCategories, getTags } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const categories = await getCategories();
  const tags = await getTags();

  return <NewPostClient categories={categories} tags={tags} />;
}
