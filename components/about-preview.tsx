import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export function AboutPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
      <SectionHeading title="Mini Hakkimda" />
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_8px_20px_rgba(15,23,42,0.09)] md:p-10">
        <h3 className="font-[var(--font-serif)] text-2xl text-[var(--color-navy)]">Ali Fuat Aslan</h3>
        <p className="mt-4 max-w-3xl text-[15px] leading-8 text-[var(--color-slate)]">
          Finansal Günlük, piyasalari daha saglikli okumak isteyenler için egitsel ve analitik bir kaynak olma hedefiyle hazirlanmistir. Içeriklerde temel odak; disiplinli düsünce, finansal okuryazarlik ve uzun vadeli bakis açisidir.
        </p>
        <Link
          href="/hakkimda"
          className="focus-ring mt-6 inline-flex text-sm font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
        >
          Detayli bilgi için Hakkimda sayfasi
        </Link>
      </div>
    </section>
  );
}
