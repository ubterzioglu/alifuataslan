import type { Metadata } from "next";
import { LegalNoticeSection } from "@/components/legal-notice-section";

export const metadata: Metadata = {
  title: "Yasal Uyari",
  description:
    "Sitedeki iceriklerin yatirim tavsiyesi niteliginde olmadigina dair yasal bilgilendirme metni.",
  alternates: { canonical: "/yasal-uyari" },
};

export default function LegalNoticePage() {
  return <LegalNoticeSection />;
}
