import type { Metadata } from "next";
import Link from "next/link";
import { AdminLayout } from "@/components/admin-layout";
import { getAllPosts, type Post } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Blog Yazilari",
};

const statusLabels: Record<string, string> = {
  draft: "Taslak",
  review: "Inceleme",
  scheduled: "Planli",
  published: "Yayinlandi",
  archived: "Arsivlendi",
};

const statusColors: Record<string, string> = {
  draft: "bg-slate-100 text-slate-700",
  review: "bg-amber-100 text-amber-700",
  scheduled: "bg-blue-100 text-blue-700",
  published: "bg-green-100 text-green-700",
  archived: "bg-red-100 text-red-700",
};

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-serif)] text-2xl font-bold text-[var(--color-navy)]">Blog Yazilari</h1>
          <p className="mt-1 text-sm text-slate-500">Toplam {posts.length} yazi</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-[var(--color-navy)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-navy)]/90"
        >
          Yeni Yazi
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-600">Baslik</th>
              <th className="px-4 py-3 font-medium text-slate-600">Kategori</th>
              <th className="px-4 py-3 font-medium text-slate-600">Durum</th>
              <th className="px-4 py-3 font-medium text-slate-600">Yayin Tarihi</th>
              <th className="px-4 py-3 font-medium text-slate-600">One Cikan</th>
              <th className="px-4 py-3 font-medium text-slate-600">Islemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((post: Post) => (
              <tr key={post.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="font-medium text-[var(--color-navy)] hover:underline"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-slate-400">{post.slug}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {post.categories?.name || "-"}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[post.status]}`}>
                    {statusLabels[post.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {post.published_at ? new Date(post.published_at).toLocaleDateString("tr-TR") : "-"}
                </td>
                <td className="px-4 py-3">
                  {post.featured ? (
                    <span className="text-[var(--color-gold)]">Evet</span>
                  ) : (
                    <span className="text-slate-400">Hayir</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-slate-500 hover:text-[var(--color-navy)]"
                    >
                      Duzenle
                    </Link>
                    {post.status === "published" && (
                      <Link
                        href={`/yazilar/${post.slug}`}
                        target="_blank"
                        className="text-slate-500 hover:text-[var(--color-gold)]"
                      >
                        Goruntule
                      </Link>
                    )}
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
