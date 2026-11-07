-- Supabase SQL Editor mein poora paste karke ek dafa Run karein
alter table products add column if not exists soldout bool default false;
create table if not exists settings(k text primary key, v text);
alter table settings enable row level security;
drop policy if exists "sr" on settings; drop policy if exists "sw" on settings;
create policy "sr" on settings for select using (true);
create policy "sw" on settings for all to authenticated using (true) with check (true);
create or replace function track_orders(p text)
returns table(id bigint,status text,created_at timestamptz,total int,titles text)
language sql security definer set search_path=public as $$
 select o.id,o.status,o.created_at,o.total,
  (select string_agg(i->>'title',', ') from jsonb_array_elements(o.items) i)
 from orders o
 where regexp_replace(o.phone,'\D','','g')=regexp_replace(p,'\D','','g')
 order by o.id desc limit 5 $$;
grant execute on function track_orders(text) to anon, authenticated;
