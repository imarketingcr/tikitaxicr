-- ============================================================
-- TikiTaxi CR — Initial Schema
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ============================================================
-- TABLE: admin_users
-- ============================================================
create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- Admins can read their own record; service role has full access
create policy "Admin can read own record"
  on public.admin_users for select
  using (auth.uid() = id);

-- ============================================================
-- TABLE: clients
-- ============================================================
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null unique,
  phone text not null,
  country text not null,
  language_preference text not null check (language_preference in ('en', 'es')),
  contact_preference text not null check (contact_preference in ('email', 'whatsapp')),
  created_at timestamptz not null default now()
);

alter table public.clients enable row level security;

-- Public: insert only (booking form). No update/delete from public side.
create policy "Public can insert clients"
  on public.clients for insert
  with check (true);

-- Admins (authenticated users in admin_users) can read/update/delete all clients
create policy "Admins can select clients"
  on public.clients for select
  using (
    exists (
      select 1 from public.admin_users where id = auth.uid()
    )
  );

create policy "Admins can update clients"
  on public.clients for update
  using (
    exists (
      select 1 from public.admin_users where id = auth.uid()
    )
  );

create policy "Admins can delete clients"
  on public.clients for delete
  using (
    exists (
      select 1 from public.admin_users where id = auth.uid()
    )
  );

-- ============================================================
-- TABLE: appointments
-- ============================================================
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  scheduled_at timestamptz not null,
  duration_minutes integer not null default 60,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  places_of_interest text,
  special_requests text,
  airport_arrival_at timestamptz,
  airport_departure_at timestamptz,
  admin_notes text,
  created_at timestamptz not null default now()
);

alter table public.appointments enable row level security;

-- Public: insert only (booking form)
create policy "Public can insert appointments"
  on public.appointments for insert
  with check (true);

-- Public: select own appointments by client email join
-- (Used for conflict checking — limited to scheduled_at only via API)
-- Admins have full access
create policy "Admins can select appointments"
  on public.appointments for select
  using (
    exists (
      select 1 from public.admin_users where id = auth.uid()
    )
  );

create policy "Admins can update appointments"
  on public.appointments for update
  using (
    exists (
      select 1 from public.admin_users where id = auth.uid()
    )
  );

create policy "Admins can delete appointments"
  on public.appointments for delete
  using (
    exists (
      select 1 from public.admin_users where id = auth.uid()
    )
  );

-- Index for fast slot availability queries
create index if not exists appointments_scheduled_at_idx
  on public.appointments (scheduled_at)
  where status != 'cancelled';

-- ============================================================
-- FUNCTION: check slot availability (used from API via service role)
-- ============================================================
create or replace function public.is_slot_available(check_time timestamptz)
returns boolean
language sql
security definer
as $$
  select not exists (
    select 1 from public.appointments
    where
      status != 'cancelled'
      and scheduled_at = check_time
  );
$$;
