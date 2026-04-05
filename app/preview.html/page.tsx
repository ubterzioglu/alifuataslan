"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./preview.module.css";
import { Pencil, Trash2 } from "lucide-react";

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
Site Basligi: FINANSAL GÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œNLÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œK
1. PROJENIN AMACI VE VIZYONU
Kisisel markami (Ali Fuat Aslan) finans camiasinda konumlandirmak; borsa, piyasa analizleri, finans tarihi ve yatirim araÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§lari ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼zerine bilgilendirici iÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§erikler paylasmak. Site bir "Egitim ve Analiz Platformu" kimliginde olacak, kesinlikle hisse sinyali veya al-sat tavsiyesi vermeyecektir.
2. GÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œRSEL TASARIM VE RENK PALETI
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Konsept: Tuncay Tursucu (https://tuncaytursucu.com/) tarzinda beyaz agirlikli, ferah, sade ve yazi odakli bir yapi.
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Ana Renk: Kurumsal Lacivert (Header arka plani ve ana basliklar iÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§in).
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Vurgu Rengi: Antik Altin) (Logo, butonlar ve aktif sekmeler iÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§in).
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Yazi Renkleri: GÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶vde metinlerinde Antrasit/Siyah arka planda Saf Beyaz
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Header GÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶rseli: ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œst kisimda Finansal GÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼nlÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼k diye yazinin olacagi kisimda; sik bir ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§alisma masasini simgeleyen (fincan, kitap, kalem iÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§eren) profesyonel ve hafif bulanik bir arka plan gÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶rseli kullanilacaktir.
3. SITE MIMARISI VE MENÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ YAPISI
ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œst menÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ (Navigation Bar) su 5 ana basliktan olusacaktir:
1. Ana Sayfa: Son analizlerin ve yazilarin kronolojik akisi.
2. Hakkimda: ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œzgeÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§mis, finansal vizyon ve yatirim bakis aÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§isi.
3. Iletisim: E-posta adresi ve sosyal medya (X, LinkedIn, Instagram) linkleri.
4. Yasal Uyari: Tuncay TursucuÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢nun "Uyari" sayfasi referans alinarak hazirlanan, sorumluluk reddi metni.
5. Egitimler: BaslangiÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ta tanitim sayfasi, ileride "LMS" (Egitim YÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶netim Sistemi) altyapisina dÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼stÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼rÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼lecek alan.
6. ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œNE ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¡IKAN YAZILAR (MANSET ALANI) sayfanin sag kisminda belirtilebilir 3 veya 4 adet yazinin paylasilmasi
7. SON YAZILAR (ANA AKIS) sitenin orta kisminda tarih belirtilerek son 5 yazinin paylasilmasi
4. IÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¡ERIK KATEGORILERI (BLOG YAPISI)
Yazilar asagidaki etiket/kategori sistemiyle tasnif edilecektir:
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Piyasa Yorumlari: Borsa ve gÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ncel makro bakis.
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Analiz Okulu: Teknik ve temel analiz egitim yazilari.
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Finans Tarihi: GeÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§mis krizler ve piyasa olaylarinin analizi.
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Yatirim AraÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§lari: Borsa, Fon, Bono, Eurobond ve BES ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼zerine rehber iÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§erikler.
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ BilanÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§o Analizi: Sirket finansallarinin yorumlanmasi.
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Strateji & Psikoloji: Yatirimci disiplini ve portfÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶y yÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶netimi.

5. ILETISIM VE SOSYAL MEDYA BILGILERI
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ E-posta: aslanalifuat1@gmail.com
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ LinkedIn: https://www.linkedin.com/in/ali-fuat-aslan-00459229a/
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Diger Sosyal Medyalar: X (Twitter) ikonu iÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§in yer ayrilmalidir. Su an da kullanmamaktayim ama bir hesap aÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§acagim

Pazartesi gÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼zerinde konusacagimiz web sitesi iÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§in IÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§erigi mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼mkÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼n oldugunca dÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼zenli bir sekilde toparlamaya ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§alistim; ancak teknik dokunuslar, tasarim ayarlamalari ve profesyonel yorumlar konusunda isin ehli olarak sizin tecrÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼benize gÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼veniyorum. Konseptin bu taslakla birlikte zihninizde net bir sekilde canlanacagini umuyorum. Pazartesi gÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ detaylari netlestirmek ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼zere gÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶rÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼smek dilegiyle.
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
      setStatusText(`Supabase baglantisi basarili. ${rows.length} kayit yÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼klendi.`);
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
      setStatusText(`GÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ncelleme hatasi: ${error.message}`);
      return;
    }

    const updated = data as TodoItem;
    setTodos((prev) => prev.map((item) => (item.id === id ? updated : item)));
    setEditingId(null);
    setDraft(null);
    setStatusTone("muted");
    setStatusText("Kayit gÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ncellendi.");
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
          <h1>FINANSAL GÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œNLÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œK</h1>
          <p>Todo listesi durum gÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ncellemesi</p>
        </div>

        <section className={styles.section}>
          <h2>Todo Listesi</h2>

          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th className={styles.wSection}>BÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶lÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼m</th>
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
                    <td colSpan={6}>YÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼kleniyor...</td>
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
                          <button className={`${styles.actionBtn} ${styles.actionEdit} ${styles.iconOnly}`} onClick={() => startEdit(item)} title={"D\u00fczenle"} aria-label={"D\u00fczenle"}>
                            <Pencil size={14} />
                          </button>
                          <button className={`${styles.actionBtn} ${styles.actionDelete} ${styles.iconOnly}`} onClick={() => void deleteRow(item.id)} title="Sil" aria-label="Sil">
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
          <p className={styles.sourceNote}>Istenenler bu mesaj kaynak alinarak belirlenmistir.</p>
          <details className={styles.accordion}>
            <summary>Kaynak Mesaji GÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶rÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ntÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼le</summary>
            <div className={styles.accordionContent}>
              <pre className={styles.rawMessage}>{sourceMessage}</pre>
            </div>
          </details>
        </section>
      </div>
    </main>
  );
}
