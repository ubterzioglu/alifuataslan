import type { Metadata } from "next";
import { getCategories } from "@/lib/supabase";
import { CategoriesClient } from "@/components/admin-categories-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kategoriler",
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  return <CategoriesClient initialCategories={categories} />;
}
