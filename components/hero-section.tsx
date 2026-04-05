import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-4 pb-12 pt-8 md:pb-20 md:pt-14">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/herobackground.png')" }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <p className="inline-flex items-center rounded-full border border-[var(--color-gold)]/40 bg-[#f9f6f1] px-3 py-1 text-xs font-semibold tracking-wide text-[var(--color-navy)]">
          {"E\u011fitim ve Analiz Odakl\u0131 Finans Platformu"}
        </p>
        <h1 className="mt-5 font-[var(--font-serif)] text-4xl leading-tight text-[var(--color-navy)] md:text-5xl">
          {"Finansal G\u00fcnl\u00fck"}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-slate)] md:text-lg">
          {"Borsa, piyasa dinamikleri, finans tarihi ve bilan\u00e7o okuma disiplinini sade bir dille ele alan, bilgi payla\u015f\u0131m\u0131 odakl\u0131 bir ki\u015fisel finans blo\u011fu."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#son-yazilar"
            className="focus-ring inline-flex rounded-md bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-[var(--color-navy)] transition hover:brightness-95"
          >
            {"Yaz\u0131lar\u0131 \u0130ncele"}
          </Link>
          <Link
            href="/hakkimda"
            className="focus-ring inline-flex rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[var(--color-navy)] transition hover:bg-slate-50"
          >
            {"Hakk\u0131mda"}
          </Link>
        </div>
      </div>
    </section>
  );
}