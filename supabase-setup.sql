-- شغّل هذا الملف مرة واحدة في Supabase ← SQL Editor
create table if not exists admins   (email text primary key);
create table if not exists teachers (user_id uuid primary key, email text, created_at timestamptz default now(), last_seen timestamptz default now());
create table if not exists user_data(user_id uuid primary key, data jsonb, updated_at timestamptz default now());
create table if not exists events   (id bigserial primary key, user_id uuid, kind text, activity_id bigint, created_at timestamptz default now());
create table if not exists feedback (id bigserial primary key, kind text, body text, email text, created_at timestamptz default now());
create table if not exists activities(id bigserial primary key, data jsonb, published boolean default true, created_at timestamptz default now());

alter table admins enable row level security;  alter table teachers enable row level security;
alter table user_data enable row level security; alter table events enable row level security;
alter table feedback enable row level security;  alter table activities enable row level security;

create or replace function is_admin() returns boolean language sql stable as
$$ select exists(select 1 from admins where email = (auth.jwt() ->> 'email')) $$;

create policy "admin reads self"   on admins   for select using (email = (auth.jwt() ->> 'email'));
create policy "teacher own"        on teachers for all    using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "admin reads all t"  on teachers for select using (is_admin());
create policy "data own"           on user_data for all   using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "events insert own"  on events   for insert with check (auth.uid() = user_id);
create policy "events admin read"  on events   for select using (is_admin());
create policy "feedback anyone"    on feedback for insert with check (true);
create policy "feedback admin"     on feedback for select using (is_admin());
create policy "feedback admin del" on feedback for delete using (is_admin());
create policy "acts public read"   on activities for select using (published or is_admin());
create policy "acts admin write"   on activities for all using (is_admin()) with check (is_admin());

-- أضف بريدك كمدير (غيّر البريد):
-- insert into admins(email) values ('your@email.com');
