import type { Metadata } from "next";
import { ContactCard } from "@/components/contact-card";

export const metadata: Metadata = {
  title: "Iletisim",
  description:
    "Finansal Gunluk ile profesyonel iletisim, is birligi ve konusma daveti talepleri icin iletisim bilgileri.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  return <ContactCard />;
}
