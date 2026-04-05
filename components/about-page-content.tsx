import Link from "next/link";

export function AboutPageContent() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
        <h1 className="font-[var(--font-serif)] text-3xl text-[var(--color-navy)] md:text-4xl">Hakk1mda</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-slate)] md:text-base">
          Finansal Gnlk, Ali Fuat Aslan'1n bilgi payla_1m1 odakl1 ki_isel finans platformudur. Ama, yat1r1m dnyas1n1 daha anla_1l1r ve disiplinli bir erevede yorumlayabilmek iin eitsel bir kaynak sunmakt1r.
        </p>

        <div className="prose-content mt-8 text-[15px] text-[var(--color-slate)]">
          <h2 className="font-[var(--font-serif)] text-2xl">Ben Kimim?</h2>
          <p>
            Finansal okuryazarl11 glendirmeye odaklanan, analiz disiplini ve uzun vadeli d_nce yakla_1m1n1 merkeze alan bir ierik reticisiyim.
          </p>

          <h2 className="font-[var(--font-serif)] text-2xl">Finansal Bak1_ A1m</h2>
          <p>
            K1sa vadeli gndem etkilerinden ba1ms1z, veri temelli ve metodik bir yakla_1m benimsiyorum. 0eriklerimde sansasyon yerine kavramsal netlii ne 1kar1yorum.
          </p>

          <h2 className="font-[var(--font-serif)] text-2xl">Bu Platformun Amac1</h2>
          <p>
            Yat1r1m tavsiyesi vermeden; piyasa, finans tarihi, bilano analizi ve psikoloji ba_l1klar1nda eitsel deer reten bir bilgi merkezi olu_turmak.
          </p>

          <h2 className="font-[var(--font-serif)] text-2xl">Neler Payla_1yorum?</h2>
          <p>
            Piyasa yorumlar1, analiz okulu notlar1, finans tarihinden dersler ve yat1r1m davran1_1n1 geli_tirmeye ynelik d_nce ereveleri.
          </p>
        </div>

        <Link href="/" className="focus-ring mt-7 inline-flex text-sm font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline">
          Ana sayfaya dn
        </Link>
      </div>
    </section>
  );
}
