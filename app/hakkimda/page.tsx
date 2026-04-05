import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about-page-content";

export const metadata: Metadata = {
  title: "Hakkımda",
description:
    "Ali Fuat Aslan'ın finansal vizyonu, eğitim odaklı yaklaşımı ve Finansal Günlük platformunun amacı.",
  alternates: { canonical: "/hakkimda" },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
