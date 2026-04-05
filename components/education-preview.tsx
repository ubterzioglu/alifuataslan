import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export function EducationPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
      <div className="rounded-2xl border border-[#d9c4a1] bg-gradient-to-r from-[#fffaf2] to-white p-7 md:p-10">
        <SectionHeading
          title="Eğitimler"
          description="Yakında burada finansal eğitim içerikleri yer alacak. Yapı, gelecekte LMS mimarisine dönüşecek şekilde planlanmıştır."
        />
        <div className="grid gap-3 pb-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Temel Analiz",
            "Teknik Analiz",
            "Bilanço Okuma",
            "Yatırım Psikolojisi",
            "Piyasa Tarihi",
            "Portföy Disiplini",
          ].map((item) => (
            <div key={item} className="rounded-lg border border-[#e8dcc8] bg-white p-4">
              <p className="text-sm font-semibold text-[var(--color-navy)]">{item}</p>
              <span className="mt-2 inline-flex rounded-full bg-[#f6efe3] px-2.5 py-1 text-xs font-medium text-[#8b6d3f]">
                Yakinda
              </span>
            </div>
          ))}
        </div>
        <Link
          href="/egitimler"
          className="focus-ring inline-flex rounded-md bg-[var(--color-navy)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
        >
          Eğitimler Sayfasını İncele
        </Link>
      </div>
    </section>
  );
}
