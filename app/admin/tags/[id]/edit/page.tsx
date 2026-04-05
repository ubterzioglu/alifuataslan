import { notFound } from "next/navigation";
import { getTags } from "@/lib/supabase";
import { TagFormClient } from "@/components/admin-tag-form-client";

export const dynamic = "force-dynamic";

type EditTagPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTagPage({ params }: EditTagPageProps) {
  const { id } = await params;
  
  // Burada Supabase'den ID'ye gore cekmemiz lazim, simdilik pratik cozum:
  const tags = await getTags();
  const tag = tags.find(t => t.id.toString() === id);

  if (!tag) {
    notFound();
  }

  return <TagFormClient tag={tag} />;
}
