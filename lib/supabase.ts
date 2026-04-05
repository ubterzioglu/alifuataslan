import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PostStatus = "draft" | "review" | "scheduled" | "published" | "archived";

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
  created_at: string;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  status: PostStatus;
  featured: boolean;
  category_id: number | null;
  author_id: string | null;
  author_name: string;
  published_at: string | null;
  scheduled_at: string | null;
  reading_time: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_image_url: string | null;
  disclaimer_enabled: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category | null;
  tags?: Tag[];
};

export type PostInsert = Omit<Post, "id" | "created_at" | "updated_at" | "categories" | "tags">;
export type PostUpdate = Partial<PostInsert>;

export async function getPublishedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories(*), tags:post_tags(tags(*))")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;

  return data?.map((post) => ({
    ...post,
    tags: post.tags?.map((t: { tags: Tag }) => t.tags).filter(Boolean) || [],
  })) || [];
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories(*), tags:post_tags(tags(*))")
    .eq("status", "published")
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(4);

  if (error) throw error;

  return data?.map((post) => ({
    ...post,
    tags: post.tags?.map((t: { tags: Tag }) => t.tags).filter(Boolean) || [],
  })) || [];
}

export async function getLatestPosts(limit = 5): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories(*), tags:post_tags(tags(*))")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data?.map((post) => ({
    ...post,
    tags: post.tags?.map((t: { tags: Tag }) => t.tags).filter(Boolean) || [],
  })) || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories(*), tags:post_tags(tags(*))")
    .eq("slug", slug)
    .single();

  if (error) return null;

  return {
    ...data,
    tags: data.tags?.map((t: { tags: Tag }) => t.tags).filter(Boolean) || [],
  };
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories!inner(*), tags:post_tags(tags(*))")
    .eq("status", "published")
    .eq("categories.slug", categorySlug)
    .order("published_at", { ascending: false });

  if (error) throw error;

  return data?.map((post) => ({
    ...post,
    tags: post.tags?.map((t: { tags: Tag }) => t.tags).filter(Boolean) || [],
  })) || [];
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;
  return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .order("name");

  if (error) throw error;
  return data || [];
}

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories(*), tags:post_tags(tags(*))")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data?.map((post) => ({
    ...post,
    tags: post.tags?.map((t: { tags: Tag }) => t.tags).filter(Boolean) || [],
  })) || [];
}

export async function createPost(post: PostInsert, tagIds?: number[]): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .insert(post)
    .select()
    .single();

  if (error) throw error;

  if (tagIds && tagIds.length > 0 && data) {
    const postTags = tagIds.map((tagId) => ({ post_id: data.id, tag_id: tagId }));
    await supabase.from("post_tags").insert(postTags);
  }

  return data;
}

export async function updatePost(id: number, post: PostUpdate, tagIds?: number[]): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .update(post)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  if (tagIds !== undefined) {
    await supabase.from("post_tags").delete().eq("post_id", id);
    if (tagIds.length > 0) {
      const postTags = tagIds.map((tagId) => ({ post_id: id, tag_id: tagId }));
      await supabase.from("post_tags").insert(postTags);
    }
  }

  return data;
}

export async function deletePost(id: number): Promise<void> {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}

export async function createCategory(category: Omit<Category, "id" | "created_at" | "updated_at">): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .insert(category)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCategory(id: number, category: Partial<Omit<Category, "id" | "created_at" | "updated_at">>): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .update(category)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCategory(id: number): Promise<void> {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}

export async function createTag(tag: Omit<Tag, "id" | "created_at">): Promise<Tag> {
  const { data, error } = await supabase
    .from("tags")
    .insert(tag)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTag(id: number, tag: Partial<Omit<Tag, "id" | "created_at">>): Promise<Tag> {
  const { data, error } = await supabase
    .from("tags")
    .update(tag)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTag(id: number): Promise<void> {
  const { error } = await supabase.from("tags").delete().eq("id", id);
  if (error) throw error;
}

export type ContentTodoStatus = "pending" | "in_progress" | "completed" | "cancelled";
export type ContentTodoPriority = "low" | "medium" | "high";

export type ContentTodo = {
  id: number;
  title: string;
  description: string | null;
  priority: ContentTodoPriority;
  status: ContentTodoStatus;
  related_post_id: number | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  related_post?: { id: number; title: string } | null;
};

export async function getContentTodos(): Promise<ContentTodo[]> {
  const { data, error } = await supabase
    .from("content_todos")
    .select("*, related_post:posts(id, title)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createContentTodo(todo: Omit<ContentTodo, "id" | "created_at" | "updated_at" | "related_post">): Promise<ContentTodo> {
  const { data, error } = await supabase
    .from("content_todos")
    .insert(todo)
    .select("*, related_post:posts(id, title)")
    .single();

  if (error) throw error;
  return data;
}

export async function updateContentTodo(id: number, todo: Partial<Omit<ContentTodo, "id" | "created_at" | "updated_at" | "related_post">>): Promise<ContentTodo> {
  const { data, error } = await supabase
    .from("content_todos")
    .update(todo)
    .eq("id", id)
    .select("*, related_post:posts(id, title)")
    .single();

  if (error) throw error;
  return data;
}

export async function deleteContentTodo(id: number): Promise<void> {
  const { error } = await supabase.from("content_todos").delete().eq("id", id);
  if (error) throw error;
}
