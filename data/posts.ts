export type PostCategory =
  | "Piyasa Yorumlari"
  | "Analiz Okulu"
  | "Finans Tarihi"
  | "Yatirim Araclari"
  | "Bilanco Analizi"
  | "Strateji & Psikoloji";

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: PostCategory;
  tags: string[];
  featured: boolean;
  publishedAt: string;
  author: string;
  readingTime: string;
  coverImage: string;
};

export const categories: PostCategory[] = [
  "Piyasa Yorumlari",
  "Analiz Okulu",
  "Finans Tarihi",
  "Yatirim Araclari",
  "Bilanco Analizi",
  "Strateji & Psikoloji",
];

export const posts: BlogPost[] = [
  {
    title: "Piyasalarda Belirsizlik Donemlerinde Yatirimci Psikolojisi",
    slug: "belirsizlik-donemlerinde-yatirimci-psikolojisi",
    excerpt:
      "Volatil dönemlerde duygusal kararlarin onune gecmek icin uygulanabilir bir dusunce cercevesi.",
    content:
      "Belirsizlik donemleri, yatirimcilarin hem risk algisini hem de karar alma hizini etkiler. Bu yazida, davranissal finans literaturundeki temel kavramlar isigi altinda panik ve asiri ozguven tuzaklarini ele aliyoruz. Icerik egitsel amaclidir ve herhangi bir yatirim tavsiyesi icermez.",
    category: "Strateji & Psikoloji",
    tags: ["psikoloji", "risk yonetimi", "davranissal finans"],
    featured: true,
    publishedAt: "2026-03-20",
    author: "Ali Fuat Aslan",
    readingTime: "7 dk",
    coverImage: "/images/hero-desk.svg",
  },
  {
    title: "Teknik Analizde Trend Okuma Disiplini",
    slug: "teknik-analizde-trend-okuma-disiplini",
    excerpt:
      "Trend kavramini sade bir sistematikle yorumlamak ve gereksiz islem yogunlugunu azaltmak.",
    content:
      "Trend analizi, fiyat hareketlerini baglam icinde okumayi gerektirir. Bu yazida trendin gucu, zaman dilimi secimi ve teyit mekanizmalari gibi temel basliklari egitsel bir perspektifle ozetliyoruz.",
    category: "Analiz Okulu",
    tags: ["teknik analiz", "trend", "egitim"],
    featured: true,
    publishedAt: "2026-03-14",
    author: "Ali Fuat Aslan",
    readingTime: "6 dk",
    coverImage: "/images/hero-desk.svg",
  },
  {
    title: "Finans Tarihinden Ogrenilecek 5 Buyuk Kriz Dersi",
    slug: "finans-tarihinden-5-buyuk-kriz-dersi",
    excerpt:
      "Gecmis krizlerden bugune tasinabilecek risk, likidite ve psikoloji dersleri.",
    content:
      "Finansal krizler tekrar eden davranis kaliplari ve yapisal kirilganliklar uzerinden okunabilir. Bu icerikte, tarihsel ornekler uzerinden uzun vadeli dusunce disiplinine odaklaniyoruz.",
    category: "Finans Tarihi",
    tags: ["kriz", "tarih", "risk"],
    featured: true,
    publishedAt: "2026-03-09",
    author: "Ali Fuat Aslan",
    readingTime: "8 dk",
    coverImage: "/images/hero-desk.svg",
  },
  {
    title: "Eurobond Nedir ve Nasil Degerlendirilir?",
    slug: "eurobond-nedir-ve-nasil-degerlendirilir",
    excerpt:
      "Eurobond enstrumanlarinin temel yapisi, getiri dinamikleri ve risk boyutlari.",
    content:
      "Eurobondlar, doviz bazli borclanma araclari olarak farkli risk-getiri profilleri sunar. Bu yazida vade, kupon, ihraçci riski ve faiz iliskisi gibi ana basliklara odaklaniyoruz.",
    category: "Yatirim Araclari",
    tags: ["eurobond", "sabit getirili", "finans okuryazarligi"],
    featured: false,
    publishedAt: "2026-03-03",
    author: "Ali Fuat Aslan",
    readingTime: "5 dk",
    coverImage: "/images/hero-desk.svg",
  },
  {
    title: "Bilanco Okurken Ilk Bakilmasi Gereken Kalemler",
    slug: "bilanco-okurken-ilk-bakilmasi-gereken-kalemler",
    excerpt:
      "Gelir tablosu, nakit akisi ve bilanco iliskisini sade bir okuma sirasiyla ele aliyoruz.",
    content:
      "Bilanco analizi yalnizca oran hesaplamak degildir; is modelini anlamayi gerektirir. Bu yazida likidite, borcluluk ve karlilik ekseninde pratik bir okuma cercevesi sunuyoruz.",
    category: "Bilanco Analizi",
    tags: ["bilanco", "finansal tablolar", "temel analiz"],
    featured: false,
    publishedAt: "2026-02-26",
    author: "Ali Fuat Aslan",
    readingTime: "9 dk",
    coverImage: "/images/hero-desk.svg",
  },
  {
    title: "Piyasa Notlari: Makro Gosterge Okumasi Neden Onemli?",
    slug: "piyasa-notlari-makro-gosterge-okumasi",
    excerpt:
      "Faiz, enflasyon ve buyume verilerinin piyasa beklentilerini nasil sekillendirdigine dair bir cerceve.",
    content:
      "Makro veriler, sirket performansini dolayli olarak etkileyen temel sinyalleri barindirir. Bu icerikte veri takvimi disiplinini ve yorumlama tuzaklarini degerlendiriyoruz.",
    category: "Piyasa Yorumlari",
    tags: ["makro", "enflasyon", "faiz"],
    featured: false,
    publishedAt: "2026-02-19",
    author: "Ali Fuat Aslan",
    readingTime: "6 dk",
    coverImage: "/images/hero-desk.svg",
  },
];

export const featuredPosts = posts.filter((post) => post.featured).slice(0, 4);
export const latestPosts = [...posts]
  .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
  .slice(0, 5);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}
