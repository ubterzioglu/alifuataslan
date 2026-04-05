"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/admin-layout";
import { updatePost, type Category, type Tag, type Post } from "@/lib/supabase";

type Props = {
  post: Post;
  categories: Category[];
  tags: Tag[];
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\u011f/g, "g")
    .replace(/\u00fc/g, "u")
    .replace(/\u015f/g, "s")
    .replace(/\u0131/g, "i")
    .replace(/\u00f6/g, "o")
    .replace(/\u00e7/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function calculateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} dk`;
}

export function EditPostClient({ post, categories, tags }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    content: post.content ?? "",
    featured_image_url: post.featured_image_url ?? "",
    status: post.status,
    featured: post.featured,
    category_id: post.category_id?.toString() ?? "",
    author_name: post.author_name,
    reading_time: post.reading_time ?? "",
    seo_title: post.seo_title ?? "",
    seo_description: post.seo_description ?? "",
    canonical_url: post.canonical_url ?? "",
    og_image_url: post.og_image_url ?? "",
    disclaimer_enabled: post.disclaimer_enabled,
    selectedTags: post.tags?.map((t) => t.id) || [],
  });

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug === "" || prev.slug === generateSlug(prev.title) ? generateSlug(title) : prev.slug,
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
      reading_time: calculateReadingTime(content),
    }));
  };

  const handleTagToggle = (tagId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tagId)
        ? prev.selectedTags.filter((id) => id !== tagId)
        : [...prev.selectedTags, tagId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updatePost(post.id, {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt || null,
        content: formData.content || null,
        featured_image_url: formData.featured_image_url || null,
        status: formData.status,
        featured: formData.featured,
        category_id: formData.category_id ? Number(formData.category_id) : null,
        author_name: formData.author_name,
        reading_time: formData.reading_time || null,
        seo_title: formData.seo_title || null,
        seo_description: formData.seo_description || null,
        canonical_url: formData.canonical_url || null,
        og_image_url: formData.og_image_url || null,
        disclaimer_enabled: formData.disclaimer_enabled,
        published_at: formData.status === "published" && post.status !== "published" ? new Date().toISOString() : post.published_at,
      }, formData.selectedTags);

      router.push("/admin/posts");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata olustu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-serif)] text-2xl font-bold text-[var(--color-navy)]">Yaziyi Duzenle</h1>
          <Link
            href="/admin/posts"
            className="mt-2 inline-block text-sm text-slate-500 hover:text-[var(--color-navy)]"
          >
            &larr; Yazilar Listesine Don
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Baslik *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--color-navy)] focus:outline-none"
                  placeholder="Yazi basligi"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  required
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--color-navy)] focus:outline-none"
                  placeholder="yazi-slug"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Ozet</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  rows={2}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--color-navy)] focus:outline-none"
                  placeholder="Kisa ozet"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Icerik *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  rows={20}
                  required
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-sm focus:border-[var(--color-navy)] focus:outline-none"
                  placeholder="Yazi icerigi..."
                />
                {formData.reading_time && (
                  <p className="mt-1 text-xs text-slate-500">Tahmini okuma suresi: {formData.reading_time}</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 font-medium text-slate-700">Gorsel</h2>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Kapak Gorseli URL</label>
              <input
                type="url"
                value={formData.featured_image_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, featured_image_url: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--color-navy)] focus:outline-none"
                placeholder="/images/example.jpg"
              />
              {formData.featured_image_url && (
                <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
                  <img src={formData.featured_image_url} alt="Onizleme" className="max-h-48 w-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 font-medium text-slate-700">SEO</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">SEO Basligi</label>
                <input
                  type="text"
                  value={formData.seo_title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, seo_title: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--color-navy)] focus:outline-none"
                  placeholder="Bos birakilirsa otomatik uretilir"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">SEO Aciklamasi</label>
                <textarea
                  value={formData.seo_description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, seo_description: e.target.value }))}
                  rows={2}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--color-navy)] focus:outline-none"
                  placeholder="Bos birakilirsa otomatik uretilir"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Canonical URL</label>
                <input
                  type="url"
                  value={formData.canonical_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, canonical_url: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--color-navy)] focus:outline-none"
                  placeholder="https://..."
                />
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">OG Gorseli</label>
                <input
                  type="url"
                  value={formData.og_image_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, og_image_url: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--color-navy)] focus:outline-none"
                  placeholder="Bos birakilirsa kapak gorseli kullanilir"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 font-medium text-slate-700">Yayin Ayarlari</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Durum</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as typeof formData.status }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--color-navy)] focus:outline-none"
                >
                  <option value="draft">Taslak</option>
                  <option value="review">Inceleme</option>
                  <option value="scheduled">Planli</option>
                  <option value="published">Yayinlandi</option>
                  <option value="archived">Arsivlendi</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Kategori</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category_id: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--color-navy)] focus:outline-none"
                >
                  <option value="">Seciniz</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Etiketler</label>
                <div className="max-h-40 space-y-2 overflow-y-auto rounded-lg border border-slate-200 p-2">
                  {tags.map((tag) => (
                    <label key={tag.id} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={formData.selectedTags.includes(tag.id)}
                        onChange={() => handleTagToggle(tag.id)}
                        className="rounded"
                      />
                      <span>{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="featured" className="text-sm text-slate-700">
                  One Cikan Yazi
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="disclaimer"
                  checked={formData.disclaimer_enabled}
                  onChange={(e) => setFormData((prev) => ({ ...prev, disclaimer_enabled: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="disclaimer" className="text-sm text-slate-700">
                  Yasal Uyari Goster
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-[var(--color-navy)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-navy)]/90 disabled:opacity-50"
            >
              {loading ? "Kaydediliyor..." : "Guncelle"}
            </button>
            <Link
              href="/admin/posts"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Iptal
            </Link>
          </div>
          
          {post.status === "published" && (
            <div className="mt-4">
              <Link
                href={`/yazilar/${post.slug}`}
                target="_blank"
                className="flex w-full items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Sitede Goruntule &#x2197;
              </Link>
            </div>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
