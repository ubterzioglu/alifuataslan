import type { Metadata } from "next";
import { ContactCard } from "@/components/contact-card";

export const metadata: Metadata = {
  title: "İletişim",
description:
    "Finansal Günlük ile profesyonel iletişim, iş birliği ve konuşma daveti talepleri için iletişim bilgileri.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  return <ContactCard />;
}
