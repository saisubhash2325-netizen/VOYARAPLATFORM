create extension if not exists "pgcrypto";

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz default now()
);

create table destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null, country text not null,
  description text, image_url text, created_at timestamptz default now()
);

create table hotels (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid references destinations on delete cascade,
  name text not null, description text, image_url text,
  price_per_night numeric(10,2) not null check (price_per_night >= 0),
  rating numeric(2,1) default 0, total_rooms int not null default 1,
  created_at timestamptz default now()
);

create table transport (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('flight','train','bus','cab')),
  origin text not null, destination text not null,
  departs_at timestamptz not null, price numeric(10,2) not null,
  seats_left int not null default 0
);

create table packages (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid references destinations on delete cascade,
  title text not null, description text, days int not null,
  price numeric(10,2) not null
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  kind text not null check (kind in ('hotel','transport','package')),
  hotel_id uuid references hotels, transport_id uuid references transport, package_id uuid references packages,
  check_in date, check_out date, guests int not null default 1,
  total_price numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','paid','refunded')),
  created_at timestamptz default now(),
  check (check_out is null or check_out > check_in)
);
create index on bookings (user_id);
create index on bookings (hotel_id, check_in, check_out);

-- helper: admin check
create function is_admin() returns boolean language sql stable security definer as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

-- auto-create profile on signup
create function handle_new_user() returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, full_name) values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();

-- atomic, overbooking-safe hotel booking (price computed server-side)
create function create_hotel_booking(p_hotel uuid, p_in date, p_out date, p_guests int)
returns bookings language plpgsql security definer as $$
declare h hotels; overlap int; nights int; b bookings;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  if p_out <= p_in then raise exception 'invalid dates'; end if;
  select * into h from hotels where id = p_hotel for update;
  if not found then raise exception 'hotel not found'; end if;
  select count(*) into overlap from bookings
    where hotel_id = p_hotel and status <> 'cancelled' and check_in < p_out and check_out > p_in;
  if overlap >= h.total_rooms then raise exception 'no rooms available'; end if;
  nights := p_out - p_in;
  insert into bookings (user_id, kind, hotel_id, check_in, check_out, guests, total_price)
    values (auth.uid(), 'hotel', p_hotel, p_in, p_out, p_guests, nights * h.price_per_night)
    returning * into b;
  return b;
end $$;

-- RLS
alter table profiles enable row level security;
alter table destinations enable row level security;
alter table hotels enable row level security;
alter table transport enable row level security;
alter table packages enable row level security;
alter table bookings enable row level security;

create policy "own profile" on profiles for select using (id = auth.uid() or is_admin());
create policy "public read" on destinations for select using (true);
create policy "public read" on hotels for select using (true);
create policy "public read" on transport for select using (true);
create policy "public read" on packages for select using (true);
create policy "admin write" on destinations for all using (is_admin()) with check (is_admin());
create policy "admin write" on hotels for all using (is_admin()) with check (is_admin());
create policy "admin write" on transport for all using (is_admin()) with check (is_admin());
create policy "admin write" on packages for all using (is_admin()) with check (is_admin());
create policy "own bookings read" on bookings for select using (user_id = auth.uid() or is_admin());
create policy "own bookings cancel" on bookings for update using (user_id = auth.uid() or is_admin());
