alter table public.todo_items
  drop constraint if exists todo_items_status_check;

alter table public.todo_items
  add constraint todo_items_status_check
  check (status in ('yapıldı','yapılmadı','bekliyor'));

update public.todo_items
set status = 'bekliyor'
where task in (
  'Header’da çalışma masası temalı görsel',
  'Yazı kartları tasarımı',
  'Hero alanının nihai düzeni',
  'Instagram linki netleştirme'
);