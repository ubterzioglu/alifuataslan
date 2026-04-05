import type { Metadata } from "next";
import { getContentTodos } from "@/lib/supabase";
import { ContentTodosClient } from "@/components/admin-todos-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "İçerik Görevleri",
};

export default async function ContentTodosPage() {
  const todos = await getContentTodos();
  return <ContentTodosClient initialTodos={todos} />;
}
