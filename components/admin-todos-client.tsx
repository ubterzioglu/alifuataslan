"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin-layout";
import { createContentTodo, updateContentTodo, deleteContentTodo, type ContentTodo } from "@/lib/supabase";

type Props = {
  initialTodos: ContentTodo[];
};

const priorityLabels = {
  high: "Yuksek",
  medium: "Orta",
  low: "Dusuk",
};

const statusLabels = {
  pending: "Bekliyor",
  in_progress: "Yapiliyor",
  completed: "Tamamlandi",
  cancelled: "Iptal",
};

export function ContentTodosClient({ initialTodos }: Props) {
  const [todos, setTodos] = useState(initialTodos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const todo = await createContentTodo({
        title: newTodoTitle,
        description: null,
        priority: "medium",
        status: "pending",
        related_post_id: null,
        due_date: null,
      });

      setTodos([todo, ...todos]);
      setNewTodoTitle("");
    } catch (err) {
      setError("Görev eklenirken hata olustu.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: ContentTodo["status"]) => {
    try {
      const updated = await updateContentTodo(id, { status });
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      alert("Durum guncellenemedi.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Görevi silmek istediginize emin misiniz?")) return;
    try {
      await deleteContentTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      alert("Görev silinemedi.");
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-serif)] text-2xl font-bold text-[var(--color-navy)]">İçerik Görevleri</h1>
          <p className="mt-1 text-sm text-slate-500">Blog operasyonlari icin todo listesi</p>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      <form onSubmit={handleCreate} className="mt-6 flex gap-3">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Yeni İçerik fikri veya Görev ekle..."
          className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-[var(--color-navy)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[var(--color-navy)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--color-navy)]/90 disabled:opacity-50"
        >
          Ekle
        </button>
      </form>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="w-8 px-4 py-3"></th>
              <th className="px-4 py-3 font-medium text-slate-600">Görev</th>
              <th className="px-4 py-3 font-medium text-slate-600">Durum</th>
              <th className="px-4 py-3 font-medium text-slate-600">Oncelik</th>
              <th className="px-4 py-3 font-medium text-slate-600">İlişkili Yazı</th>
              <th className="px-4 py-3 font-medium text-slate-600">Islemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {todos.map((todo) => (
              <tr key={todo.id} className={`hover:bg-slate-50 ${todo.status === "completed" ? "bg-slate-50 opacity-60" : ""}`}>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={todo.status === "completed"}
                    onChange={(e) => handleStatusChange(todo.id, e.target.checked ? "completed" : "pending")}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                </td>
                <td className={`px-4 py-3 font-medium ${todo.status === "completed" ? "text-slate-400 line-through" : "text-[var(--color-navy)]"}`}>
                  {todo.title}
                  {todo.description && (
                    <p className="mt-1 text-xs font-normal text-slate-500 line-clamp-1">{todo.description}</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={todo.status}
                    onChange={(e) => handleStatusChange(todo.id, e.target.value as any)}
                    className="rounded-md border-slate-200 text-xs focus:ring-0"
                  >
                    {Object.entries(statusLabels).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 ${
                    todo.priority === 'high' ? 'bg-red-100 text-red-700' :
                    todo.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {priorityLabels[todo.priority]}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  {todo.related_post ? (
                    <Link href={`/admin/posts/${todo.related_post.id}/edit`} className="hover:text-[var(--color-navy)] hover:underline">
                      {todo.related_post.title}
                    </Link>
                  ) : "-"}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
            {todos.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  Henuz bir Görev eklenmemis.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
