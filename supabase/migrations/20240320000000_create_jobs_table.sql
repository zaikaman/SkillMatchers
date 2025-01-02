-- Create jobs table
create table public.jobs (
  id uuid default gen_random_uuid() primary key,
  employer_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  requirements jsonb,
  salary_range jsonb,
  location text,
  work_type text check (work_type in ('remote', 'hybrid', 'onsite')),
  status text check (status in ('draft', 'published', 'closed')) default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.jobs enable row level security;

-- Create policies
create policy "Public jobs are viewable by everyone"
  on public.jobs for select
  using ( true );

create policy "Employers can insert their own jobs"
  on public.jobs for insert
  with check ( auth.uid() = employer_id );

create policy "Employers can update their own jobs"
  on public.jobs for update
  using ( auth.uid() = employer_id );

create policy "Employers can delete their own jobs"
  on public.jobs for delete
  using ( auth.uid() = employer_id );

-- Create function to update updated_at timestamp
create trigger handle_updated_at before update on public.jobs
  for each row execute procedure moddatetime (updated_at); 