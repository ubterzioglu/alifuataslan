import type { Metadata } from "next";
import { EducationPageContent } from "@/components/education-page-content";

export const metadata: Metadata = {
  title: "Eğitimler",
description:
    "Yakında yayınlanacak finans eğitimleri: temel analiz, teknik analiz, bilanço okuma ve yatırım psikolojisi.",
  alternates: { canonical: "/egitimler" },
};

export default function EducationPage() {
  return <EducationPageContent />;
}
