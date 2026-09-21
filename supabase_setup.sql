-- ============================================================
-- Uncle Laundry: Einmaliges Datenbank-Setup für Supabase
-- ============================================================
-- Anleitung: Im Supabase-Projekt links auf "SQL Editor" klicken,
-- "New query", diesen kompletten Text einfügen und auf "Run"
-- klicken. Das Skript kann gefahrlos mehrfach ausgeführt werden.
-- ============================================================

-- Profil je Kunde: wird automatisch bei der Registrierung angelegt
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  erstrabatt_verwendet boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Nutzer sieht eigenes Profil" on public.profiles;
create policy "Nutzer sieht eigenes Profil" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "Nutzer aktualisiert eigenes Profil" on public.profiles;
create policy "Nutzer aktualisiert eigenes Profil" on public.profiles
  for update using (auth.uid() = id);

-- Bestellungen
create table if not exists public.bestellungen (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'neu',
  saecke jsonb not null default '[]',
  spezialwaesche jsonb not null default '[]',
  hoechstgewicht_kg numeric not null default 0,
  hoechstbetrag_cent integer not null default 0,
  rabatt_cent integer not null default 0,
  name text,
  telefon text,
  email text,
  strasse text,
  zusatz text,
  plz text,
  ort text,
  abholdatum date,
  zeit_abholung text,
  zeit_rueckgabe text,
  hinweise text,
  foto_url text,
  created_at timestamptz not null default now()
);

alter table public.bestellungen enable row level security;

drop policy if exists "Nutzer legt eigene Bestellung an" on public.bestellungen;
create policy "Nutzer legt eigene Bestellung an" on public.bestellungen
  for insert with check (auth.uid() = user_id);

drop policy if exists "Nutzer sieht eigene Bestellungen" on public.bestellungen;
create policy "Nutzer sieht eigene Bestellungen" on public.bestellungen
  for select using (auth.uid() = user_id);

-- Bei jeder neuen Registrierung automatisch ein Profil anlegen
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name)
  values (new.id, new.raw_user_meta_data ->> 'name');
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Speicher für Fotos (z. B. von Flecken), pro Kunde in einem eigenen Unterordner
insert into storage.buckets (id, name, public)
values ('bestellfotos', 'bestellfotos', true)
on conflict (id) do nothing;

drop policy if exists "Nutzer lädt eigene Fotos hoch" on storage.objects;
create policy "Nutzer lädt eigene Fotos hoch" on storage.objects
  for insert with check (
    bucket_id = 'bestellfotos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Fotos sind lesbar" on storage.objects;
create policy "Fotos sind lesbar" on storage.objects
  for select using (bucket_id = 'bestellfotos');
