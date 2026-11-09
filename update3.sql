-- Supabase SQL Editor mein poora paste karke Run karein.
-- Pehle chal chuka ho to bhi theek hai (dobara chalane se kuch nahi bigadta).

alter table products add column if not exists soldout bool default false;
alter table products add column if not exists badge text;

create table if not exists settings(k text primary key, v text);
alter table settings enable row level security;
drop policy if exists "sr" on settings; drop policy if exists "sw" on settings;
create policy "sr" on settings for select using (true);
create policy "sw" on settings for all to authenticated using (true) with check (true);

alter table orders add column if not exists marked bool default false;
alter table orders add column if not exists note text;
alter table orders add column if not exists discount int default 0;

create or replace function track_orders(p text)
returns table(id bigint,status text,created_at timestamptz,total int,titles text)
language sql security definer set search_path=public as $$
 select o.id,o.status,o.created_at,o.total,
  (select string_agg(i->>'title',', ') from jsonb_array_elements(o.items) i)
 from orders o
 where regexp_replace(o.phone,'\D','','g')=regexp_replace(p,'\D','','g')
 order by o.id desc limit 5 $$;
grant execute on function track_orders(text) to anon, authenticated;

create table if not exists reviews(id bigint generated always as identity primary key, product_id bigint, name text, stars int, body text, approved bool default false, created_at timestamptz default now());
alter table reviews enable row level security;
drop policy if exists rr on reviews; drop policy if exists ri on reviews; drop policy if exists rw on reviews;
create policy rr on reviews for select using (approved);
create policy ri on reviews for insert to anon, authenticated with check (approved=false and stars between 1 and 5 and length(body)<=500);
create policy rw on reviews for all to authenticated using (true) with check (true);

-- Coupon system hatane ke liye safai
drop function if exists check_coupon(text);
drop table if exists coupons;
alter table orders drop column if exists coupon;
