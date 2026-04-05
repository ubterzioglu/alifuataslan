import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative mx-auto mt-[25px] max-w-6xl overflow-hidden rounded-3xl px-4 pb-12 pt-8 md:pb-20 md:pt-14">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/herobackground.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[var(--color-navy)]/55" aria-hidden="true" />

      <div className="relative z-10 md:pr-48 lg:pr-56">
        <p className="inline-flex items-center rounded-full border border-white/45 bg-white/10 px-3 py-1 text-xs font-bold tracking-wide text-white">
          {"Eğitim ve Analiz Odaklı Finans Platformu"}
        </p>
        <h1 className="mt-5 font-[var(--font-serif)] text-4xl font-bold leading-tight text-white md:text-5xl">
          {"Finansal Günlük"}
        </h1>
        <p className="mt-5 max-w-[46ch] text-base font-semibold leading-7 text-white md:text-lg">{`Borsa, piyasa dinamikleri, finans tarihi ve\n bilanço okuma disiplinini sade bir dille ele alan,\n bilgi paylaşımı odaklı bir kişisel finans bloğu.`}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#son-yazilar"
            className="focus-ring inline-flex rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[var(--color-navy)] transition hover:bg-slate-50"
          >
            {"Yazıları İncele"}
          </Link>
          <Link
            href="/hakkimda"
            className="focus-ring inline-flex rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[var(--color-navy)] transition hover:bg-slate-50"
          >
            {"Hakkımda"}
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute right-14 top-1/2 z-10 hidden -translate-y-1/2 md:block lg:right-20">
        <div className="overflow-hidden rounded-full border border-white/50 bg-white/15 p-3 shadow-[0_26px_58px_rgba(0,0,0,0.52)] backdrop-blur-sm">
          <Image
            src="/images/logo.png"
            alt={"Finansal Günlük logo"}
            width={220}
            height={220}
            className="h-[180px] w-[180px] rounded-full object-cover lg:h-[220px] lg:w-[220px]"
            priority
          />
        </div>
      </div>
    </section>
  );
}

