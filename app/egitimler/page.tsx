import type { Metadata } from "next";
import { EducationPageContent } from "@/components/education-page-content";

export const metadata: Metadata = {
  title: "Egitimler",
  description:
    "Yakinda yayinlanacak finans egitimleri: temel analiz, teknik analiz, bilanco okuma ve yatirim psikolojisi.",
  alternates: { canonical: "/egitimler" },
};

export default function EducationPage() {
  return <EducationPageContent />;
}
