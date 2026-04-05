alter table public.todo_items
  add column if not exists section text not null default '';

alter table public.todo_items
  drop constraint if exists todo_items_status_check;

alter table public.todo_items
  add constraint todo_items_status_check
  check (status in ('yapıldı','yapılmadı','bekliyor'));

delete from public.todo_items;

insert into public.todo_items (section, task, status, owner, note, sort_order)
values
('1. Proje Kimliği ve Genel Amaç','Alan adı: www.alifuataslan.com','yapıldı','UBT','Domain bilgisi netleştirildi.',1),
('1. Proje Kimliği ve Genel Amaç','Site başlığı: FİNANSAL GÜNLÜK','yapıldı','UBT','Marka adı kesinleşti.',2),
('1. Proje Kimliği ve Genel Amaç','Site kişisel marka ve finans odaklı bir yapı olacak','yapıldı','UBT','Konumlandırma net şekilde belirlendi.',3),
('1. Proje Kimliği ve Genel Amaç','Eğitim ve analiz platformu kimliğinde olacak','yapıldı','UBT','Temel vizyon tanımlandı.',4),
('1. Proje Kimliği ve Genel Amaç','Kesinlikle hisse sinyali / al-sat tavsiyesi vermeyecek','yapıldı','UBT','Yasal ve içerik dili açısından önemli karar.',5),

('2. Tasarım ve Görsel Dil','Beyaz ağırlıklı, ferah, sade ve yazı odaklı tasarım','yapıldı','UBT','Genel UI yönü netleşti.',6),
('2. Tasarım ve Görsel Dil','Tuncay Turşucu tarzında ama birebir kopya olmayan bir hissiyat','yapıldı','UBT','Referans olarak alındı, özgün yorumlanacak.',7),
('2. Tasarım ve Görsel Dil','Ana renk: kurumsal lacivert','yapıldı','UBT','Header ve başlıklarda kullanılacak.',8),
('2. Tasarım ve Görsel Dil','Vurgu rengi: antik altın','yapıldı','UBT','Logo, butonlar ve aktif sekmeler için.',9),
('2. Tasarım ve Görsel Dil','Gövde metinlerinde antrasit/siyah tonlar','yapıldı','UBT','Okunabilirlik için uygun.',10),
('2. Tasarım ve Görsel Dil','Header alanında çalışma masası temalı arka plan görseli','bekliyor','UBT','Görsel seçimi / üretimi yapılacak.',11),

('3. Menü ve Site Mimarisi','Üst menüde 5 ana başlık olacak','yapıldı','UBT','Menü yapısı belirlendi.',12),
('3. Menü ve Site Mimarisi','Ana Sayfa','yapıldı','UBT','Temel sayfa.',13),
('3. Menü ve Site Mimarisi','Hakkımda','yapıldı','UBT','Kişisel marka bölümü.',14),
('3. Menü ve Site Mimarisi','İletişim','yapıldı','UBT','İletişim bilgileri ve sosyal medya alanı.',15),
('3. Menü ve Site Mimarisi','Yasal Uyarı','yapıldı','UBT','Sorumluluk reddi için gerekli.',16),
('3. Menü ve Site Mimarisi','Eğitimler','yapıldı','UBT','İleride LMS altyapısına evrilecek.',17),

('4. Ana Sayfa İçeriği','Sağ tarafta 3 veya 4 adet öne çıkan yazı alanı','yapıldı','UBT','Manşet / featured posts alanı olacak.',18),
('4. Ana Sayfa İçeriği','Orta alanda son 5 yazının tarih ile listelenmesi','yapıldı','UBT','Ana akış bu yapıda olacak.',19),
('4. Ana Sayfa İçeriği','Yazı kartlarının tasarımı','bekliyor','UBT','UI aşamasında şekillenecek.',20),
('4. Ana Sayfa İçeriği','Hero alanının nihai düzeni','bekliyor','UBT','İlk taslakta netleştirilecek.',21),

('5. Blog Kategorileri','Piyasa Yorumları','yapıldı','UBT','Kategori tanımlandı.',22),
('5. Blog Kategorileri','Analiz Okulu','yapıldı','UBT','Kategori tanımlandı.',23),
('5. Blog Kategorileri','Finans Tarihi','yapıldı','UBT','Kategori tanımlandı.',24),
('5. Blog Kategorileri','Yatırım Araçları','yapıldı','UBT','Kategori tanımlandı.',25),
('5. Blog Kategorileri','Bilanço Analizi','yapıldı','UBT','Kategori tanımlandı.',26),
('5. Blog Kategorileri','Strateji & Psikoloji','yapıldı','UBT','Kategori tanımlandı.',27),

('6. Sayfa Bazlı İçerikler','Hakkımda sayfasında özgeçmiş ve finansal vizyon yer alacak','yapıldı','UBT','Sayfa içeriği tanımlandı.',28),
('6. Sayfa Bazlı İçerikler','İletişim sayfasında e-posta ve sosyal medya bağlantıları olacak','yapıldı','UBT','İletişim alanı belli.',29),
('6. Sayfa Bazlı İçerikler','Yasal Uyarı sayfası profesyonel sorumluluk reddi metni içerecek','yapıldı','UBT','Çok kritik sayfalardan biri.',30),
('6. Sayfa Bazlı İçerikler','Eğitimler sayfası başlangıçta tanıtım sayfası olacak','yapıldı','UBT','İleride LMS’ye dönüşecek yapı.',31),

('7. İletişim ve Sosyal Medya Bilgileri','E-posta: aslanalifuat1@gmail.com','yapıldı','UBT','İletişim bilgisi net.',32),
('7. İletişim ve Sosyal Medya Bilgileri','LinkedIn alanı eklenecek','yapıldı','UBT','Link paylaşıldı.',33),
('7. İletişim ve Sosyal Medya Bilgileri','X (Twitter) için yer ayrılacak','yapıldı','UBT','Şu an aktif değil, placeholder olabilir.',34),
('7. İletişim ve Sosyal Medya Bilgileri','Instagram linki netleştirilecek','bekliyor','UBT','Şimdilik alan ayrılabilir.',35),

('8. Teknik Beklentiler','Site hızlı açılacak bir yapıda geliştirilecek','yapıldı','UBT','Next.js / React yönü uygun.',36),
('8. Teknik Beklentiler','Mobil uyumlu olacak','yapıldı','UBT','Responsive yapı şart.',37),
('8. Teknik Beklentiler','SEO uyumlu olacak','yapıldı','UBT','Blog ve kişisel marka için önemli.',38),
('8. Teknik Beklentiler','İleride büyümeye uygun yapı kurulacak','yapıldı','UBT','CMS / LMS / admin panel potansiyeli düşünülüyor.',39);