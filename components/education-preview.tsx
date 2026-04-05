import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export function EducationPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
      <div className="rounded-2xl border border-[#d9c4a1] bg-gradient-to-r from-[#fffaf2] to-white p-7 shadow-[0_8px_20px_rgba(15,23,42,0.08)] md:p-10">
        <SectionHeading
          title="Egitimler"
          description="Yakinda burada finansal egitim içerikleri yer alacak. Yapi, gelecekte LMS mimarisine dönüsecek sekilde planlanmistir."
        />
        <div className="grid gap-3 pb-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Temel Analiz",
            "Teknik Analiz",
            "Bilanço Okuma",
            "Yatirim Psikolojisi",
            "Piyasa Tarihi",
            "Portföy Disiplini",
          ].map((item) => (
            <div key={item} className="rounded-lg border border-[#e8dcc8] bg-white p-4 shadow-[0_3px_10px_rgba(15,23,42,0.06)]">
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
          Egitimler Sayfasini Incele
        </Link>
      </div>
    </section>
  );
}
