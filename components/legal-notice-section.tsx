export function LegalNoticeSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="font-[var(--font-serif)] text-3xl text-[var(--color-navy)] md:text-4xl">Yasal Uyarı</h1>
        <p className="mt-4 rounded-lg border border-[#e7d8bf] bg-[#fbf7ef] p-4 text-sm leading-7 text-[var(--color-navy)]">
          Bu platformda yer alan tüm içerikler eğitim ve genel bilgilendirme amacıyla sunulmaktadır. Herhangi bir yatırım tavsiyesi, alım-satım önerisi veya portföy yönetimi hizmeti niteliğinde değildir.
        </p>

        <div className="prose-content mt-6 text-[15px] text-[var(--color-slate)]">
          <h2 className="font-[var(--font-serif)] text-2xl">Kapsam ve Sorumluluk Sınırı</h2>
          <p>
            İçeriklerde yer alan analizler, finansal okuryazarlığı desteklemek amacıyla hazırlanır. Yatırım kararlarının tüm hukuki ve mali sorumluluğu, kararı veren kişilere aittir.
          </p>

          <h2 className="font-[var(--font-serif)] text-2xl">Yatırım Tavsiyesi Olmama Beyanı</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>İçerikler, kişiye özel risk-getiri profili dikkate alınarak hazırlanmaz.</li>
            <li>Belirli bir sermaye piyasası aracına yönelik al-sat yönlendirmesi içermez.</li>
            <li>Paylaşımlar, profesyonel yatırım danışmanlığı hizmetinin yerine geçmez.</li>
          </ul>

          <h2 className="font-[var(--font-serif)] text-2xl">Veri ve Güncellik</h2>
          <p>
            Finansal veriler zamanla değişebilir. Bu nedenle içeriklerin yayın tarihini ve güncel koşulları dikkate alarak değerlendirme yapılması önerilir.
          </p>
        </div>
      </div>
    </section>
  );
}