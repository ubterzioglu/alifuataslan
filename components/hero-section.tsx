import Link from "next/link";

const heroButtonClass =
  "focus-ring inline-flex min-w-[190px] justify-center rounded-md px-5 py-3 text-sm font-semibold transition";

export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-4 pb-12 pt-8 md:pb-20 md:pt-14">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/herobackground.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 top-4 md:top-6 bg-white/75" aria-hidden="true" />

      <div className="relative z-10">
        <p className="inline-flex items-center rounded-full border border-[var(--color-gold)]/40 bg-[#f9f6f1] px-3 py-1 text-xs font-semibold tracking-wide text-[var(--color-navy)]">
          EÄŸitim ve Analiz OdaklÄ± Finans Platformu
        </p>
        <h1 className="mt-5 font-[var(--font-serif)] text-4xl leading-tight text-[var(--color-navy)] md:text-5xl">
          Finansal GÃ¼nlÃ¼k
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-slate)] md:text-lg">
          Borsa, piyasa dinamikleri, finans tarihi ve bilanÃ§o okuma disiplinini sade bir dille ele alan, bilgi paylaÅŸÄ±mÄ± odaklÄ± bir kiÅŸisel finans bloÄŸu.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#son-yazilar"
            className={`${heroButtonClass} bg-[var(--color-gold)] text-[var(--color-navy)] hover:brightness-95`}
          >
            Tatilimi Planla
          </Link>
          <Link
            href="/hakkimda"
            className={`${heroButtonClass} border border-slate-300 bg-white text-[var(--color-navy)] hover:bg-slate-50`}
          >
            Ben Yerlisiyim!
          </Link>
          <a
            href="https://wa.me/905000000000"
            target="_blank"
            rel="noreferrer"
            className={`${heroButtonClass} border border-slate-300 bg-white text-[var(--color-navy)] hover:bg-slate-50`}
          >
            WhatsApp TopluluÄŸu
          </a>
        </div>
      </div>
    </section>
  );
}