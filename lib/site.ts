export const siteConfig = {
  name: "Finansal Günlük",
  title: "Finansal Günlük | Piyasa Analizleri, Finans Tarihi ve Yatırım Eğitimleri",
  description:
    "Ali Fuat Aslan'ın borsa, finans tarihi, bilanço analizi ve yatırım psikolojisi odaklı eğitsel içerik platformu.",
  url: "https://www.alifuataslan.com",
  email: "aslanalifuat1@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/ali-fuat-aslan-00459229a/",
  },
} as const;

export const navItems = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımda", href: "/hakkimda" },
  { label: "İletişim", href: "/iletisim" },
  { label: "Yasal Uyarı", href: "/yasal-uyari" },
  { label: "Eğitimler", href: "/egitimler" },
] as const;
