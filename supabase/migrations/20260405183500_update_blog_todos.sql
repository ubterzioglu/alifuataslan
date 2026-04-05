-- Eski mock data notunu guncelle
UPDATE public.todo_items
SET note = 'Supabase entegrasyonu tamamlandi, tamamen dinamik hale getirildi.'
WHERE task ILIKE '%Blog liste%';

-- Yeni yapilan Admin ve Blog islemlerini todo listesine "Yapildi" (DONE) olarak ekle
INSERT INTO public.todo_items (task, status, owner, note, sort_order)
VALUES
  ('Admin Panel - Blog Yonetimi (Ekle/Duzenle/Sil)', 'DONE', 'UBT', 'Yazilar icin CRUD islemleri Supabase ile tamamlandi.', 9),
  ('Admin Panel - Kategori ve Etiket Yonetimi', 'DONE', 'UBT', 'Kategori ve etiket CRUD islemleri tamamlandi.', 10),
  ('Admin Panel - Icerik Planlama (Blog Todo) Modulu', 'DONE', 'UBT', 'content_todos tablosu ve admin arayuzu eklendi.', 11);
