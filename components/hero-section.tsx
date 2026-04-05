import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-12 pt-8 md:grid-cols-2 md:items-center md:gap-10 md:pb-20 md:pt-14">
      <div>
        <p className="inline-flex items-center rounded-full border border-[var(--color-gold)]/40 bg-[#f9f6f1] px-3 py-1 text-xs font-semibold tracking-wide text-[var(--color-navy)]">
          Egitim ve Analiz Odakli Finans Platformu
        </p>
        <h1 className="mt-5 font-[var(--font-serif)] text-4xl leading-tight text-[var(--color-navy)] md:text-5xl">
          Finansal Gunluk
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-slate)] md:text-lg">
          Borsa, piyasa dinamikleri, finans tarihi ve bilanco okuma disiplinini sade bir dille ele alan, bilgi paylasimi odakli bir kisisel finans blogu.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#son-yazilar"
            className="focus-ring inline-flex rounded-md bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-[var(--color-navy)] transition hover:brightness-95"
          >
            Yazilari Incele
          </Link>
          <Link
            href="/hakkimda"
            className="focus-ring inline-flex rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] transition hover:bg-slate-50"
          >
            Hakkimda
          </Link>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[var(--color-surface)] p-3 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1a33]/10 via-transparent to-[#b08d57]/20" aria-hidden="true" />
        <Image
          src="/images/hero-desk.svg"
          alt="Finansal Gunluk calisma masasi konsepti"
          width={720}
          height={540}
          priority
          className="h-auto w-full rounded-xl object-cover"
        />
      </div>
    </section>
  );
}
