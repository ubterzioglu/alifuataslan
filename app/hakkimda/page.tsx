import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about-page-content";

export const metadata: Metadata = {
  title: "Hakkimda",
  description:
    "Ali Fuat Aslan'in finansal vizyonu, egitim odakli yaklasimi ve Finansal Gunluk platformunun amaci.",
  alternates: { canonical: "/hakkimda" },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
