import Link from "next/link";

export function AboutPageContent() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
        <h1 className="font-[var(--font-serif)] text-3xl text-[var(--color-navy)] md:text-4xl">Hakkimda</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-slate)] md:text-base">
          Finansal Gunluk, Ali Fuat Aslan'in bilgi paylasimi odakli kisisel finans platformudur. Amac, yatirim dunyasini daha anlasilir ve disiplinli bir cercevede yorumlayabilmek icin egitsel bir kaynak sunmaktir.
        </p>

        <div className="prose-content mt-8 text-[15px] text-[var(--color-slate)]">
          <h2 className="font-[var(--font-serif)] text-2xl">Ben Kimim?</h2>
          <p>
            Finansal okuryazarligi guclendirmeye odaklanan, analiz disiplini ve uzun vadeli dusunce yaklasimini merkeze alan bir icerik ureticisiyim.
          </p>

          <h2 className="font-[var(--font-serif)] text-2xl">Finansal Bakis Acim</h2>
          <p>
            Kisa vadeli gundem etkilerinden bagimsiz, veri temelli ve metodik bir yaklasim benimsiyorum. Iceriklerimde sansasyon yerine kavramsal netligi one cikariyorum.
          </p>

          <h2 className="font-[var(--font-serif)] text-2xl">Bu Platformun Amaci</h2>
          <p>
            Yatirim tavsiyesi vermeden; piyasa, finans tarihi, bilanco analizi ve psikoloji basliklarinda egitsel deger ureten bir bilgi merkezi olusturmak.
          </p>

          <h2 className="font-[var(--font-serif)] text-2xl">Neler Paylasiyorum?</h2>
          <p>
            Piyasa yorumlari, analiz okulu notlari, finans tarihinden dersler ve yatirim davranisini gelistirmeye yonelik dusunce cerceveleri.
          </p>
        </div>

        <Link href="/" className="focus-ring mt-7 inline-flex text-sm font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline">
          Ana sayfaya don
        </Link>
      </div>
    </section>
  );
}
