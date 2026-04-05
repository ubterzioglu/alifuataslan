"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin-layout";
import { deleteTag, type Tag } from "@/lib/supabase";

type Props = {
  initialTags: Tag[];
};

export function TagsClient({ initialTags }: Props) {
  const [tags, setTags] = useState(initialTags);

  async function handleDelete(id: number) {
    if (!confirm("Bu etiketi silmek istediginizden emin misiniz?")) return;
    
    try {
      await deleteTag(id);
      setTags(tags.filter((t) => t.id !== id));
    } catch (error) {
      alert("Etiket silinirken bir hata olustu.");
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-serif)] text-2xl font-bold text-[var(--color-navy)]">Etiketler</h1>
          <p className="mt-1 text-sm text-slate-500">Toplam {tags.length} etiket</p>
        </div>
        <Link
          href="/admin/tags/new"
          className="rounded-lg bg-[var(--color-navy)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-navy)]/90"
        >
          Yeni Etiket
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-600">Ad</th>
              <th className="px-4 py-3 font-medium text-slate-600">Slug</th>
              <th className="px-4 py-3 font-medium text-slate-600">Islemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tags.map((tag) => (
              <tr key={tag.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-[var(--color-navy)]">{tag.name}</td>
                <td className="px-4 py-3 text-slate-600">{tag.slug}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/tags/${tag.id}/edit`}
                      className="text-slate-500 hover:text-[var(--color-navy)]"
                    >
                      Duzenle
                    </Link>
                    <button
                      onClick={() => handleDelete(tag.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
