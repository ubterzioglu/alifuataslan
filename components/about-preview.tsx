import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export function AboutPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
      <SectionHeading title="Mini Hakkımda" />
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <h3 className="font-[var(--font-serif)] text-2xl text-[var(--color-navy)]">Ali Fuat Aslan</h3>
        <p className="mt-4 max-w-3xl text-[15px] leading-8 text-[var(--color-slate)]">
          Finansal Günlük, piyasaları daha sağlıklı okumak isteyenler için eğitsel ve analitik bir kaynak olma hedefiyle hazırlanmıştır. İçeriklerde temel odak; disiplinli düşünce, finansal okuryazarlık ve uzun vadeli bakış açısıdır.
        </p>
        <Link
          href="/hakkimda"
          className="focus-ring mt-6 inline-flex text-sm font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
        >
          Detaylı bilgi için Hakkımda sayfası
        </Link>
      </div>
    </section>
  );
}
