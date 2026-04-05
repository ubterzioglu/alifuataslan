alter table public.todo_items
  drop constraint if exists todo_items_status_check;

update public.todo_items
set status = case
  when status in ('yapıldı','Yapıldı','DONE') then 'DONE'
  when status in ('bekliyor','Bekliyor','ON HOLD') then 'ON HOLD'
  when status in ('yapılmadı','Yapılmadı') then 'REVISION'
  when status = 'REVISION' then 'REVISION'
  else 'REVISION'
end;

alter table public.todo_items
  add constraint todo_items_status_check
  check (status in ('DONE','REVISION','ON HOLD'));

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='todo_items' and policyname='Allow anon update todo_items'
  ) then
    create policy "Allow anon update todo_items"
      on public.todo_items
      for update
      to anon
      using (true)
      with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='todo_items' and policyname='Allow anon delete todo_items'
  ) then
    create policy "Allow anon delete todo_items"
      on public.todo_items
      for delete
      to anon
      using (true);
  end if;
end $$;