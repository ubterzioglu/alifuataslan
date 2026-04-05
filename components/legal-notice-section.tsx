export function LegalNoticeSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="font-[var(--font-serif)] text-3xl text-[var(--color-navy)] md:text-4xl">Yasal Uyari</h1>
        <p className="mt-4 rounded-lg border border-[#e7d8bf] bg-[#fbf7ef] p-4 text-sm leading-7 text-[var(--color-navy)]">
          Bu platformda yer alan tum icerikler egitim ve genel bilgilendirme amaciyla sunulmaktadir. Herhangi bir yatirim tavsiyesi, alim-satim onerisi veya portfoy yonetimi hizmeti niteliginde degildir.
        </p>

        <div className="prose-content mt-6 text-[15px] text-[var(--color-slate)]">
          <h2 className="font-[var(--font-serif)] text-2xl">Kapsam ve Sorumluluk Siniri</h2>
          <p>
            Iceriklerde yer alan analizler, finansal okuryazarligi desteklemek amaciyla hazirlanir. Yatirim kararlarinin tum hukuki ve mali sorumlulugu, karari veren kisilere aittir.
          </p>

          <h2 className="font-[var(--font-serif)] text-2xl">Yatirim Tavsiyesi Olmama Beyani</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Icerikler, kisiye ozel risk-getiri profili dikkate alinarak hazirlanmaz.</li>
            <li>Belirli bir sermaye piyasasi aracina yonelik al-sat yonlendirmesi icermez.</li>
            <li>Paylasimlar, profesyonel yatirim danismanligi hizmetinin yerine gecmez.</li>
          </ul>

          <h2 className="font-[var(--font-serif)] text-2xl">Veri ve Guncellik</h2>
          <p>
            Finansal veriler zamanla degisebilir. Bu nedenle iceriklerin yayin tarihini ve guncel kosullari dikkate alarak degerlendirme yapilmasi onerilir.
          </p>
        </div>
      </div>
    </section>
  );
}
