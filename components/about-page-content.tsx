import Link from "next/link";

export function AboutPageContent() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
        <h1 className="font-[var(--font-serif)] text-3xl text-[var(--color-navy)] md:text-4xl">Hakkımda</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-slate)] md:text-base">
          Finansal Günlük, Ali Fuat Aslan'ın bilgi paylaşımı odaklı kişisel finans platformudur. Amaç, yatırım dünyasını daha
          anlaşılır ve disiplinli bir çerçevede yorumlayabilmek için eğitsel bir kaynak sunmaktır.
        </p>

        <div className="prose-content mt-8 text-[15px] text-[var(--color-slate)]">
          <h2 className="font-[var(--font-serif)] text-2xl">Ben Kimim?</h2>
          <p>
            Finansal okuryazarlığı güçlendirmeye odaklanan, analiz disiplini ve uzun vadeli düşünce yaklaşımını merkeze alan bir
            içerik üreticisiyim.
          </p>

          <h2 className="font-[var(--font-serif)] text-2xl">Finansal Bakış Açım</h2>
          <p>
            Kısa vadeli gündem etkilerinden bağımsız, veri temelli ve metodik bir yaklaşım benimsiyorum. İçeriklerimde sansasyon
            yerine kavramsal netliği öne çıkarıyorum.
          </p>

          <h2 className="font-[var(--font-serif)] text-2xl">Bu Platformun Amacı</h2>
          <p>
            Yatırım tavsiyesi vermeden; piyasa, finans tarihi, bilanço analizi ve psikoloji başlıklarında eğitsel değer üreten bir
            bilgi merkezi oluşturmak.
          </p>

          <h2 className="font-[var(--font-serif)] text-2xl">Neler Paylaşıyorum?</h2>
          <p>
            Piyasa yorumları, analiz okulu notları, finans tarihinden dersler ve yatırım davranışını geliştirmeye yönelik düşünce
            çerçeveleri.
          </p>
        </div>

        <Link href="/" className="focus-ring mt-7 inline-flex text-sm font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline">
          Ana sayfaya dön
        </Link>
      </div>
    </section>
  );
}
