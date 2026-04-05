"use client";

import { useEffect, useMemo, useState } from "react";
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

const sourceMessage = `Baris bey merhabalar
Alan Adi: www.alifuataslan.com
Site Basligi: FINANSAL GÜNLÜK
1. PROJENIN AMACI VE VIZYONU
Kisisel markami (Ali Fuat Aslan) finans camiasinda konumlandirmak; borsa, piyasa analizleri, finans tarihi ve yatirim araçlari üzerine bilgilendirici içerikler paylasmak. Site bir "Egitim ve Analiz Platformu" kimliginde olacak, kesinlikle hisse sinyali veya al-sat tavsiyesi vermeyecektir.
2. GÖRSEL TASARIM VE RENK PALETI
• Konsept: Tuncay Tursucu (https://tuncaytursucu.com/) tarzinda beyaz agirlikli, ferah, sade ve yazi odakli bir yapi.
• Ana Renk: Kurumsal Lacivert (Header arka plani ve ana basliklar için).
• Vurgu Rengi: Antik Altin) (Logo, butonlar ve aktif sekmeler için).
• Yazi Renkleri: Gövde metinlerinde Antrasit/Siyah arka planda Saf Beyaz
• Header Görseli: Üst kisimda Finansal Günlük diye yazinin olacagi kisimda; sik bir çalisma masasini simgeleyen (fincan, kitap, kalem içeren) profesyonel ve hafif bulanik bir arka plan görseli kullanilacaktir.
3. SITE MIMARISI VE MENÜ YAPISI
Üst menü (Navigation Bar) su 5 ana basliktan olusacaktir:
1. Ana Sayfa: Son analizlerin ve yazilarin kronolojik akisi.
2. Hakkimda: Özgeçmis, finansal vizyon ve yatirim bakis açisi.
3. Iletisim: E-posta adresi ve sosyal medya (X, LinkedIn, Instagram) linkleri.
4. Yasal Uyari: Tuncay Tursucu’nun "Uyari" sayfasi referans alinarak hazirlanan, sorumluluk reddi metni.
5. Egitimler: Baslangiçta tanitim sayfasi, ileride "LMS" (Egitim Yönetim Sistemi) altyapisina dönüstürülecek alan.
6. ÖNE ÇIKAN YAZILAR (MANSET ALANI) sayfanin sag kisminda belirtilebilir 3 veya 4 adet yazinin paylasilmasi
7. SON YAZILAR (ANA AKIS) sitenin orta kisminda tarih belirtilerek son 5 yazinin paylasilmasi
4. IÇERIK KATEGORILERI (BLOG YAPISI)
Yazilar asagidaki etiket/kategori sistemiyle tasnif edilecektir:
• Piyasa Yorumlari: Borsa ve güncel makro bakis.
• Analiz Okulu: Teknik ve temel analiz egitim yazilari.
• Finans Tarihi: Geçmis krizler ve piyasa olaylarinin analizi.
• Yatirim Araçlari: Borsa, Fon, Bono, Eurobond ve BES üzerine rehber içerikler.
• Bilanço Analizi: Sirket finansallarinin yorumlanmasi.
• Strateji & Psikoloji: Yatirimci disiplini ve portföy yönetimi.

5. ILETISIM VE SOSYAL MEDYA BILGILERI
• E-posta: aslanalifuat1@gmail.com
• LinkedIn: https://www.linkedin.com/in/ali-fuat-aslan-00459229a/
• Diger Sosyal Medyalar: X (Twitter) ikonu için yer ayrilmalidir. Su an da kullanmamaktayim ama bir hesap açacagim

Pazartesi günü üzerinde konusacagimiz web sitesi için Içerigi mümkün oldugunca düzenli bir sekilde toparlamaya çalistim; ancak teknik dokunuslar, tasarim ayarlamalari ve profesyonel yorumlar konusunda isin ehli olarak sizin tecrübenize güveniyorum. Konseptin bu taslakla birlikte zihninizde net bir sekilde canlanacagini umuyorum. Pazartesi günü detaylari netlestirmek üzere görüsmek dilegiyle.
Simdiden elinize saglik`;

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
  const [statusText, setStatusText] = useState("Supabase baglantisi test ediliyor...");
  const [statusTone, setStatusTone] = useState<StatusTone>("muted");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<DraftTodo | null>(null);

  const statusClassName = useMemo(
    () => (statusTone === "error" ? styles.error : styles.muted),
    [statusTone],
  );

  async function loadTodos() {
    setLoading(true);

    const { data, error } = await supabase
      .from("todo_items")
      .select("id,section,task,status,owner,note,sort_order")
      .order("sort_order", { ascending: true });

    if (error) {
      setTodos([]);
      setStatusTone("error");
      setStatusText(`Supabase baglantisi basarisiz: ${error.message}`);
      setLoading(false);
      return;
    }

    const rows = (data || []) as TodoItem[];
    setTodos(rows);
    setStatusTone("muted");

    if (rows.length === 0) {
      setStatusText("Supabase baglantisi basarili, ancak tablo bos.");
    } else {
      setStatusText(`Supabase baglantisi basarili. ${rows.length} kayit yüklendi.`);
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
      setStatusText("Istenen alani bos olamaz.");
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
      setStatusText(`Güncelleme hatasi: ${error.message}`);
      return;
    }

    const updated = data as TodoItem;
    setTodos((prev) => prev.map((item) => (item.id === id ? updated : item)));
    setEditingId(null);
    setDraft(null);
    setStatusTone("muted");
    setStatusText("Kayit güncellendi.");
  }

  async function deleteRow(id: number) {
    const confirmed = window.confirm("Bu satiri silmek istedigine emin misin?");
    if (!confirmed) return;

    const { error } = await supabase.from("todo_items").delete().eq("id", id);

    if (error) {
      setStatusTone("error");
      setStatusText(`Silme hatasi: ${error.message}`);
      return;
    }

    setTodos((prev) => prev.filter((item) => item.id !== id));
    setStatusTone("muted");
    setStatusText("Kayit silindi.");

    if (editingId === id) {
      setEditingId(null);
      setDraft(null);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>FINANSAL GÜNLÜK</h1>
          <p>Todo listesi durum güncellemesi</p>
        </div>

        <section className={styles.section}>
          <h2>Todo Listesi</h2>

          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th className={styles.wSection}>Bölüm</th>
                  <th className={styles.wTask}>Istenen</th>
                  <th className={styles.wStatus}>Durum</th>
                  <th className={styles.wOwner}>Kim yapacak?</th>
                  <th className={styles.wNote}>Not</th>
                  <th className={styles.wActions}>Islem</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6}>Yükleniyor...</td>
                  </tr>
                ) : todos.length === 0 ? (
                  <tr>
                    <td colSpan={6}>Kayit bulunamadi.</td>
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
                              Iptal
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
                          <button className={`${styles.actionBtn} ${styles.actionEdit}`} onClick={() => startEdit(item)}>
                            Düzenle
                          </button>
                          <button className={`${styles.actionBtn} ${styles.actionDelete}`} onClick={() => void deleteRow(item.id)}>
                            Sil
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
          <p className={styles.sourceNote}>Istenenler bu mesaj kaynak alinarak belirlenmistir.</p>
          <details className={styles.accordion}>
            <summary>Kaynak Mesaji Görüntüle</summary>
            <div className={styles.accordionContent}>
              <pre className={styles.rawMessage}>{sourceMessage}</pre>
            </div>
          </details>
        </section>
      </div>
    </main>
  );
}
