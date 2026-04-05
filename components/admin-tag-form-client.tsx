"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/admin-layout";
import { createTag, updateTag, type Tag } from "@/lib/supabase";

type Props = {
  tag?: Tag;
};

export function TagFormClient({ tag }: Props) {
  const router = useRouter();
  const isEditing = !!tag;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: tag?.name || "",
    slug: tag?.slug || "",
  });

  const handleNameChange = (name: string) => {
    const generateSlug = (text: string) => {
      return text
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
    };

    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug === "" || prev.slug === generateSlug(prev.name) ? generateSlug(name) : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing && tag) {
        await updateTag(tag.id, {
          name: formData.name,
          slug: formData.slug,
        });
      } else {
        await createTag({
          name: formData.name,
          slug: formData.slug,
        });
      }

      router.push("/admin/tags");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata olustu");
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-[var(--font-serif)] text-2xl font-bold text-[var(--color-navy)]">
          {isEditing ? "Etiket Duzenle" : "Yeni Etiket"}
        </h1>
        <Link href="/admin/tags" className="mt-2 inline-block text-sm text-slate-500 hover:text-[var(--color-navy)]">
          &larr; Etiketlere Don
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 rounded-xl border border-slate-200 bg-white p-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Etiket Adi *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--color-navy)] focus:outline-none"
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
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[var(--color-navy)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-navy)]/90 disabled:opacity-50"
          >
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </button>
          <Link
            href="/admin/tags"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Iptal
          </Link>
        </div>
      </form>
    </AdminLayout>
  );
}
