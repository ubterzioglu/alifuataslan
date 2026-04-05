import type { Metadata } from "next";
import { LegalNoticeSection } from "@/components/legal-notice-section";

export const metadata: Metadata = {
  title: "Yasal Uyarı",
  description:
    "Sitedeki içeriklerin yatırım tavsiyesi niteliğinde olmadığına dair yasal bilgilendirme metni.",
  alternates: { canonical: "/yasal-uyari" },
};

export default function LegalNoticePage() {
  return <LegalNoticeSection />;
}