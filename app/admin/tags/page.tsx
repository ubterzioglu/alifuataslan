import type { Metadata } from "next";
import { getTags } from "@/lib/supabase";
import { TagsClient } from "@/components/admin-tags-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Etiketler",
};

export default async function TagsPage() {
  const tags = await getTags();
  return <TagsClient initialTags={tags} />;
}
