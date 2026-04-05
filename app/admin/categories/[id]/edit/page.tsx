import { notFound } from "next/navigation";
import { getCategoryBySlug, getCategories } from "@/lib/supabase";
import { CategoryFormClient } from "@/components/admin-category-form-client";

export const dynamic = "force-dynamic";

type EditCategoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;
  
  // Burada Supabase'den ID'ye gore cekmemiz lazim, simdilik pratik cozum:
  const categories = await getCategories();
  const category = categories.find(c => c.id.toString() === id);

  if (!category) {
    notFound();
  }

  return <CategoryFormClient category={category} />;
}
