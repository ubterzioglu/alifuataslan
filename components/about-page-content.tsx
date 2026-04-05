import Image from "next/image";
import Link from "next/link";

export function AboutPageContent() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
        <div className="flex flex-col items-center">
          <div className="overflow-hidden rounded-full border-4 border-white shadow-[0_20px_48px_rgba(15,39,71,0.28)]">
            <Image
              src="/images/afa.jpg"
              alt="Ali Fuat Aslan"
              width={180}
              height={180}
              className="h-[150px] w-[150px] rounded-full object-cover md:h-[180px] md:w-[180px]"
              priority
            />
          </div>
          <p className="mt-4 font-[var(--font-serif)] text-2xl text-[var(--color-navy)]">Ali Fuat Aslan</p>
          <p className="mt-1 text-sm font-semibold text-[var(--color-slate)]">Finans Danışmanı</p>
        </div>

        <h1 className="mt-8 font-[var(--font-serif)] text-3xl text-[var(--color-navy)] md:text-4xl">Hakkımda</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-slate)] md:text-base">
          Finans sektöründe Nakit Hisse Uzmanı olarak deneyim kazanmış; hisse senetlerinin yanı sıra diğer sermaye piyasası
          araçları konusunda da bilgi sahibi ve bu ürünlerin satış süreçlerinde aktif rol almış bir profesyonelim. Son 2 yıldır
          finansal alanlarda eğitim veriyor, aynı zamanda kendimi sürekli geliştirerek bilgi ve yetkinliklerimi artırmaya devam
          ediyorum.
        </p>

        <div className="prose-content mt-8 text-[15px] text-[var(--color-slate)]">
          <h2 className="font-[var(--font-serif)] text-2xl">İletişim</h2>
          <p>LinkedIn: www.linkedin.com/in/ali-fuat-aslan-00459229a</p>
          <p>E-posta: aslanalifuat1@gmail.com</p>
          <p>Telefon: 0542-821-19-72</p>

          <h2 className="font-[var(--font-serif)] text-2xl">İş Deneyimi</h2>
          <p className="font-semibold">Osmanlı Yatırım Menkul Değerler</p>
          <p>Müşteri Temsilcisi Yardımcısı ve Nakit Hisse Uzmanı</p>
          <p>Ocak 2024 - Şubat 2026, Ankara</p>
          <p>
            Kurum içi çalışanlara ve yatırımcılara yönelik finansal okuryazarlık ve sistem kullanımı konularında eğitimler
            düzenlemek.
          </p>
          <p>
            Aktif satış ve ikna teknikleri kullanarak kuruma yeni nitelikli yatırımcılar kazandırmak ve portföy büyümesine katkı
            sağlamak.
          </p>
          <p>Yatırımcı portföylerini analiz ederek piyasa koşullarına uygun bilgilendirmeler sağlamak.</p>
          <p>Müşterilerin hisse senedi ve nakit işlemlerinin operasyonel takibini ve yönetimini gerçekleştirmek.</p>

          <h2 className="font-[var(--font-serif)] text-2xl">Eğitim Geçmişi</h2>
          <p className="font-semibold">Ankara Hacı Bayram Veli Üniversitesi</p>
          <p>İktisadi ve İdari Bilimler Fakültesi - Maliye</p>
          <p>Ekim 2023 Mezuniyet</p>
          <p>Diploma Notu: 2.68 / 4</p>

          <p className="mt-4 font-semibold">Özel Ankara Biltek Anadolu Lisesi</p>
          <p>Haziran 2017 Mezuniyet</p>
          <p>Diploma Notu: 74,93 / 100</p>

          <h2 className="font-[var(--font-serif)] text-2xl">Sertifikalar ve Lisanslar</h2>
          <p>SEGEM Teknik Personel Yeterlilik Lisansı</p>
          <p>Bireysel Emeklilik Aracılığı Lisansı (e-BEAS)</p>
          <p>Sermaye Piyasası Faaliyetleri Düzey 1 Lisansı</p>
          <p>Finansal Okuryazarlık Eğitimi Sertifikası - TOBB Ekonomi ve Teknoloji Üniversitesi</p>
          <p>Bilgisayarlı Ön Muhasebe Sertifikası - Hitit Eğitim</p>

          <h2 className="font-[var(--font-serif)] text-2xl">İlgili Beceriler ve Aktiviteler</h2>
          <p>MS Office Programları</p>
          <p>İlk Yardım ve Acil Bakım</p>
          <p>Finansal Piyasa Analizi (Teknik ve Temel)</p>
          <p>Fon, Bono, Tahvil, Eurobond, Bireysel Emeklilik</p>
          <p>Ekonomi / Piyasa Analizi</p>
          <p>Satış Stratejileri</p>
          <p>Eğitim Verme</p>
          <p>Doğa Yürüyüşü, Basketbol, Lego Koleksiyonerliği, Tiyatro</p>
        </div>

        <Link href="/" className="focus-ring mt-7 inline-flex text-sm font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline">
          Ana sayfaya dön
        </Link>
      </div>
    </section>
  );
}
