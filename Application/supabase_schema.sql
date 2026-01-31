-- Create profiles table to store user details
create table profiles (
  id uuid references auth.users not null,
  email text,
  full_name text,
  role text default 'patient',
  primary key (id)
);

-- Enable RLS for profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create appointments table
create table appointments (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  patient_id uuid references auth.users not null,
  patient_name text,
  date text,
  time text,
  symptoms text,
  status text default 'pending',
  tags text[], -- Array of strings
  prescription jsonb -- Store prescription object directly
);

-- Enable RLS for appointments
alter table appointments enable row level security;

-- Policy: Patients can see their own appointments
create policy "Patients can see own appointments"
  on appointments for select
  using ( auth.uid() = patient_id );

-- Policy: Patients can insert their own appointments
create policy "Patients can insert own appointments"
  on appointments for insert
  with check ( auth.uid() = patient_id );

-- Policy: Doctors (Admins) can see ALL appointments
-- Note: Replace 'admin@hospital.com' with your actual doctor email if different
create policy "Doctors can see all appointments"
  on appointments for select
  using ( auth.jwt() ->> 'email' = 'admin@hospital.com' );

-- Policy: Doctors can update ANY appointment
create policy "Doctors can update appointments"
  on appointments for update
  using ( auth.jwt() ->> 'email' = 'admin@hospital.com' );
