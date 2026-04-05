export const siteConfig = {
  name: "Finansal Gunluk",
  title: "Finansal Gunluk | Piyasa Analizleri, Finans Tarihi ve Yatirim Egitimleri",
  description:
    "Ali Fuat Aslan'in borsa, finans tarihi, bilanco analizi ve yatirim psikolojisi odakli egitsel icerik platformu.",
  url: "https://www.alifuataslan.com",
  email: "aslanalifuat1@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/ali-fuat-aslan-00459229a/",
  },
} as const;

export const navItems = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkimda", href: "/hakkimda" },
  { label: "Iletisim", href: "/iletisim" },
  { label: "Yasal Uyari", href: "/yasal-uyari" },
  { label: "Egitimler", href: "/egitimler" },
] as const;
