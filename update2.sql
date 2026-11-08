-- Supabase SQL Editor mein poora paste karke ek dafa Run karein
alter table products add column if not exists badge text;
alter table orders add column if not exists marked bool default false;
alter table orders add column if not exists note text;
alter table orders add column if not exists coupon text;
alter table orders add column if not exists discount int default 0;

create table if not exists coupons(code text primary key, off int default 0, pct int default 0, active bool default true);
alter table coupons enable row level security;
drop policy if exists cw on coupons;
create policy cw on coupons for all to authenticated using (true) with check (true);
create or replace function check_coupon(c text) returns table(off int,pct int)
language sql security definer set search_path=public as $$
 select off,pct from coupons where upper(code)=upper(c) and active limit 1 $$;
grant execute on function check_coupon(text) to anon, authenticated;

create table if not exists reviews(id bigint generated always as identity primary key, product_id bigint, name text, stars int, body text, approved bool default false, created_at timestamptz default now());
alter table reviews enable row level security;
drop policy if exists rr on reviews; drop policy if exists ri on reviews; drop policy if exists rw on reviews;
create policy rr on reviews for select using (approved);
create policy ri on reviews for insert to anon, authenticated with check (approved=false and stars between 1 and 5 and length(body)<=500);
create policy rw on reviews for all to authenticated using (true) with check (true);
