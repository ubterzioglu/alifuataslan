import Link from "next/link";

export function EducationPageContent() {
  const topics = [
    "Temel Analiz",
    "Teknik Analiz",
    "Bilanço Okuma",
    "Yatırım Psikolojisi",
    "Piyasa Tarihi",
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
        <h1 className="font-[var(--font-serif)] text-3xl text-[var(--color-navy)] md:text-4xl">Eğitimler</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-slate)] md:text-base">
          Finansal Günlük eğitim modülü yakında yayında olacak. İçerikler, teorik temelleri sade bir dille aktaran ve pratik düşünce disiplini kazandırmayı hedefleyen modüler bir yapıyla planlanmaktadır.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <div key={topic} className="rounded-xl border border-slate-200 bg-[var(--color-surface)] p-4">
              <p className="font-semibold text-[var(--color-navy)]">{topic}</p>
              <span className="mt-2 inline-flex rounded-full border border-[var(--color-gold)]/40 bg-[#fbf7ef] px-2.5 py-1 text-xs font-medium text-[#8b6d3f]">
                Yakinda
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-5">
          <p className="text-sm text-[var(--color-slate)]">Yeni eğitimleri e-posta ile duymak için yakında duyuru alanı eklenecektir.</p>
        </div>

        <Link href="/iletisim" className="focus-ring mt-6 inline-flex rounded-md bg-[var(--color-navy)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95">
          Haberdar Olmak İçin İletişime Geç
        </Link>
      </div>
    </section>
  );
}
