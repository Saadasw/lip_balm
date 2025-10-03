-- Create products table for lip gel inventory
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10, 2) not null,
  image_url text,
  stock integer not null default 0,
  created_at timestamp with time zone default now()
);

-- Enable RLS for security
alter table public.products enable row level security;

-- Allow public read access (anyone can view products)
create policy "products_select_public"
  on public.products for select
  using (true);

-- For now, allow anyone to insert/update/delete (admin panel)
-- In production, you'd want to add authentication
create policy "products_insert_public"
  on public.products for insert
  with check (true);

create policy "products_update_public"
  on public.products for update
  using (true);

create policy "products_delete_public"
  on public.products for delete
  using (true);
