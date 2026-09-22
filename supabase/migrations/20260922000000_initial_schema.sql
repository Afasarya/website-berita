create extension if not exists pgcrypto;

create type public.user_role as enum ('user', 'admin');
create type public.article_status as enum ('pending', 'published', 'rejected');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  avatar_url text,
  role public.user_role not null default 'user',
  created_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 15 and 120),
  slug text not null unique,
  content text not null check (char_length(content) >= 200),
  thumbnail_url text not null,
  category_id uuid not null references public.categories(id) on delete restrict,
  author_id uuid not null references public.profiles(id) on delete restrict,
  status public.article_status not null default 'pending',
  rejection_reason text,
  is_featured boolean not null default false,
  source_note text,
  submitted_at timestamptz not null default now(),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index articles_status_published_at_idx on public.articles(status, published_at desc);
create index articles_category_id_idx on public.articles(category_id);
create index articles_title_search_idx on public.articles using gin (to_tsvector('simple', title));
create index articles_content_search_idx on public.articles using gin (to_tsvector('simple', content));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', 'Pengguna Baru'));
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
create trigger articles_updated_at before update on public.articles for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.articles enable row level security;

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create policy "profiles are public read" on public.profiles for select using (true);
create policy "users update own profile" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "categories public read" on public.categories for select using (true);
create policy "admins manage categories" on public.categories for all using (public.is_admin()) with check (public.is_admin());
create policy "published articles public read" on public.articles for select using (status = 'published' or author_id = auth.uid() or public.is_admin());
create policy "authenticated users create articles" on public.articles for insert with check (auth.uid() = author_id and ((public.is_admin()) or status = 'pending'));
create policy "authors and admins update articles" on public.articles for update using (author_id = auth.uid() or public.is_admin()) with check (public.is_admin() or (author_id = auth.uid() and status in ('pending', 'rejected')));
create policy "authors and admins delete articles" on public.articles for delete using (public.is_admin() or (author_id = auth.uid() and status in ('pending', 'rejected')));

insert into storage.buckets (id, name, public) values ('article-images', 'article-images', true) on conflict (id) do nothing;
create policy "public article images read" on storage.objects for select using (bucket_id = 'article-images');
create policy "authenticated article image upload" on storage.objects for insert to authenticated with check (bucket_id = 'article-images' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "owners delete article images" on storage.objects for delete to authenticated using (bucket_id = 'article-images' and (storage.foldername(name))[1] = auth.uid()::text);
