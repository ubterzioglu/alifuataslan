"use client";

import { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import styles from "./preview.module.css";

type TodoStatus = "DONE" | "REVISION" | "ON HOLD";
type TodoOwner = "UBT" | "AFA";

type TodoItem = {
  id: number;
  section: string | null;
  task: string | null;
  status: string | null;
  owner: string | null;
  note: string | null;
  sort_order: number | null;
};

type StatusTone = "muted" | "error";

type DraftTodo = {
  section: string;
  task: string;
  status: TodoStatus;
  owner: TodoOwner;
  note: string;
};

const STATUS_OPTIONS: TodoStatus[] = ["DONE", "REVISION", "ON HOLD"];
const OWNER_OPTIONS: TodoOwner[] = ["UBT", "AFA"];

const sourceMessage = `Barış bey merhabalar
Alan Adı: www.alifuataslan.com
Site Başlığı: FİNANSAL GÜNLÜK

Bu panel, web sitesi içerik taleplerini görev bazlı takip etmek için hazırlanmıştır.`;

function normalizeStatus(status: string | null | undefined): TodoStatus {
  const s = String(status || "").toUpperCase();
  if (s.includes("YAPILDI") || s === "DONE") return "DONE";
  if (s.includes("BEKL") || s === "ON HOLD") return "ON HOLD";
  if (s.includes("YAPILMADI") || s === "REVISION") return "REVISION";
  return "REVISION";
}

function normalizeOwner(owner: string | null | undefined): TodoOwner {
  return owner === "AFA" ? "AFA" : "UBT";
}

function stripSectionNumber(section: string | null | undefined): string {
  return String(section || "").replace(/^\s*\d+\.\s*/, "").trim();
}

function statusClass(status: TodoStatus): string {
  if (status === "DONE") return styles.statusDone;
  if (status === "ON HOLD") return styles.statusHold;
  return styles.statusRevision;
}

export default function PreviewHtmlPage() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState("Supabase bağlantısı test ediliyor...");
  const [statusTone, setStatusTone] = useState<StatusTone>("muted");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<DraftTodo | null>(null);
  const [newDraft, setNewDraft] = useState<DraftTodo>({
    section: "",
    task: "",
    status: "REVISION",
    owner: "UBT",
    note: "",
  });

  const statusClassName = useMemo(() => (statusTone === "error" ? styles.error : styles.muted), [statusTone]);

  async function loadTodos() {
    setLoading(true);

    const { data, error } = await supabase
      .from("todo_items")
      .select("id,section,task,status,owner,note,sort_order")
      .order("sort_order", { ascending: true });

    if (error) {
      setTodos([]);
      setStatusTone("error");
      setStatusText(`Supabase bağlantısı başarısız: ${error.message}`);
      setLoading(false);
      return;
    }

    const rows = (data || []) as TodoItem[];
    setTodos(rows);
    setStatusTone("muted");

    if (rows.length === 0) {
      setStatusText("Supabase bağlantısı başarılı, ancak tablo boş.");
    } else {
      setStatusText(`Supabase bağlantısı başarılı. ${rows.length} kayıt yüklendi.`);
    }

    setLoading(false);
  }

  useEffect(() => {
    void loadTodos();
  }, []);

  function startEdit(item: TodoItem) {
    setEditingId(item.id);
    setDraft({
      section: stripSectionNumber(item.section),
      task: item.task || "",
      status: normalizeStatus(item.status),
      owner: normalizeOwner(item.owner),
      note: item.note || "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft(null);
  }

  async function saveEdit(id: number) {
    if (!draft) return;

    const task = draft.task.trim();
    if (!task) {
      setStatusTone("error");
      setStatusText("İstenen alanı boş olamaz.");
      return;
    }

    const payload = {
      section: draft.section.trim(),
      task,
      status: draft.status,
      owner: draft.owner,
      note: draft.note.trim(),
    };

    const { data, error } = await supabase
      .from("todo_items")
      .update(payload)
      .eq("id", id)
      .select("id,section,task,status,owner,note,sort_order")
      .single();

    if (error) {
      setStatusTone("error");
      setStatusText(`Güncelleme hatası: ${error.message}`);
      return;
    }

    const updated = data as TodoItem;
    setTodos((prev) => prev.map((item) => (item.id === id ? updated : item)));
    setEditingId(null);
    setDraft(null);
    setStatusTone("muted");
    setStatusText("Kayıt güncellendi.");
  }

  async function deleteRow(id: number) {
    const confirmed = window.confirm("Bu satırı silmek istediğine emin misin?");
    if (!confirmed) return;

    const { error } = await supabase.from("todo_items").delete().eq("id", id);

    if (error) {
      setStatusTone("error");
      setStatusText(`Silme hatası: ${error.message}`);
      return;
    }

    setTodos((prev) => prev.filter((item) => item.id !== id));
    setStatusTone("muted");
    setStatusText("Kayıt silindi.");

    if (editingId === id) {
      setEditingId(null);
      setDraft(null);
    }
  }
  async function createTodo() {
    const task = newDraft.task.trim();
    if (!task) {
      setStatusTone("error");
      setStatusText("Yeni kayit icin Istenen alani zorunludur.");
      return;
    }

    const maxSortOrder = todos.reduce((max, item) => {
      const current = typeof item.sort_order === "number" ? item.sort_order : 0;
      return current > max ? current : max;
    }, 0);

    const payload = {
      section: newDraft.section.trim() || null,
      task,
      status: newDraft.status,
      owner: newDraft.owner,
      note: newDraft.note.trim() || null,
      sort_order: maxSortOrder + 1,
    };

    const { data, error } = await supabase
      .from("todo_items")
      .insert(payload)
      .select("id,section,task,status,owner,note,sort_order")
      .single();

    if (error) {
      setStatusTone("error");
      setStatusText(`Ekleme hatasi: ${error.message}`);
      return;
    }

    setTodos((prev) => [...prev, data as TodoItem]);
    setNewDraft({
      section: "",
      task: "",
      status: "REVISION",
      owner: "UBT",
      note: "",
    });
    setStatusTone("muted");
    setStatusText("Yeni kayit eklendi.");
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>FİNANSAL GÜNLÜK</h1>
          <p>Todo listesi durum güncellemesi</p>
        </div>

        <section className={styles.section}>
          <h2>Todo Listesi</h2>
          <div className={styles.addPanel}>
            <input
              className={styles.cellInput}
              placeholder="Bolum"
              value={newDraft.section}
              onChange={(e) => setNewDraft((prev) => ({ ...prev, section: e.target.value }))}
            />
            <input
              className={styles.cellInput}
              placeholder="Istenen"
              value={newDraft.task}
              onChange={(e) => setNewDraft((prev) => ({ ...prev, task: e.target.value }))}
            />
            <select
              className={styles.cellSelect}
              value={newDraft.status}
              onChange={(e) => setNewDraft((prev) => ({ ...prev, status: e.target.value as TodoStatus }))}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <select
              className={styles.cellSelect}
              value={newDraft.owner}
              onChange={(e) => setNewDraft((prev) => ({ ...prev, owner: e.target.value as TodoOwner }))}
            >
              {OWNER_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <input
              className={styles.cellInput}
              placeholder="Not"
              value={newDraft.note}
              onChange={(e) => setNewDraft((prev) => ({ ...prev, note: e.target.value }))}
            />
            <button className={`${styles.actionBtn} ${styles.actionSave}`} onClick={() => void createTodo()}>
              Yeni Ekle
            </button>
          </div>

          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th className={styles.wSection}>Bölüm</th>
                  <th className={styles.wTask}>İstenen</th>
                  <th className={styles.wStatus}>Durum</th>
                  <th className={styles.wOwner}>Kim yapacak?</th>
                  <th className={styles.wNote}>Not</th>
                  <th className={styles.wActions}>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6}>Yükleniyor...</td>
                  </tr>
                ) : todos.length === 0 ? (
                  <tr>
                    <td colSpan={6}>Kayıt bulunamadı.</td>
                  </tr>
                ) : (
                  todos.map((item) => {
                    const itemStatus = normalizeStatus(item.status);
                    const isEditing = editingId === item.id;

                    if (isEditing && draft) {
                      return (
                        <tr key={item.id}>
                          <td>
                            <input
                              className={styles.cellInput}
                              value={draft.section}
                              onChange={(e) => setDraft((prev) => (prev ? { ...prev, section: e.target.value } : prev))}
                            />
                          </td>
                          <td>
                            <input
                              className={styles.cellInput}
                              value={draft.task}
                              onChange={(e) => setDraft((prev) => (prev ? { ...prev, task: e.target.value } : prev))}
                            />
                          </td>
                          <td>
                            <select
                              className={styles.cellSelect}
                              value={draft.status}
                              onChange={(e) =>
                                setDraft((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        status: e.target.value as TodoStatus,
                                      }
                                    : prev,
                                )
                              }
                            >
                              {STATUS_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select
                              className={styles.cellSelect}
                              value={draft.owner}
                              onChange={(e) =>
                                setDraft((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        owner: e.target.value as TodoOwner,
                                      }
                                    : prev,
                                )
                              }
                            >
                              {OWNER_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input
                              className={styles.cellInput}
                              value={draft.note}
                              onChange={(e) => setDraft((prev) => (prev ? { ...prev, note: e.target.value } : prev))}
                            />
                          </td>
                          <td>
                            <button className={`${styles.actionBtn} ${styles.actionSave}`} onClick={() => void saveEdit(item.id)}>
                              Kaydet
                            </button>
                            <button className={`${styles.actionBtn} ${styles.actionCancel}`} onClick={cancelEdit}>
                              İptal
                            </button>
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={item.id}>
                        <td>{stripSectionNumber(item.section || "-") || "-"}</td>
                        <td>{item.task || "-"}</td>
                        <td>
                          <span className={`${styles.statusPill} ${statusClass(itemStatus)}`}>{itemStatus}</span>
                        </td>
                        <td>{item.owner || "UBT"}</td>
                        <td>{item.note || "-"}</td>
                        <td>
                          <button
                            className={`${styles.actionBtn} ${styles.actionEdit} ${styles.iconOnly}`}
                            onClick={() => startEdit(item)}
                            title="Düzenle"
                            aria-label="Düzenle"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            className={`${styles.actionBtn} ${styles.actionDelete} ${styles.iconOnly}`}
                            onClick={() => void deleteRow(item.id)}
                            title="Sil"
                            aria-label="Sil"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <p className={statusClassName}>{statusText}</p>
        </section>

        <section className={styles.section}>
          <h2>Kaynak Mesaj</h2>
          <p className={styles.sourceNote}>İstenenler bu mesaj kaynak alınarak belirlenmiştir.</p>
          <details className={styles.accordion}>
            <summary>Kaynak Mesajı Görüntüle</summary>
            <div className={styles.accordionContent}>
              <pre className={styles.rawMessage}>{sourceMessage}</pre>
            </div>
          </details>
        </section>
      </div>
    </main>
  );
}
