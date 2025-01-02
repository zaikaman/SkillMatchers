create type match_status as enum ('pending', 'accepted', 'rejected');

create table matches (
  id uuid default uuid_generate_v4() primary key,
  job_id uuid references jobs(id) on delete cascade not null,
  worker_id uuid references profiles(id) on delete cascade not null,
  employer_id uuid references profiles(id) on delete cascade not null,
  employer_status match_status default 'pending' not null,
  worker_status match_status default 'pending' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(job_id, worker_id)
);

-- Add RLS policies
alter table matches enable row level security;

-- Employers can see matches for their jobs
create policy "Employers can see their job matches"
  on matches for select
  using (employer_id = auth.uid());

-- Workers can see their own matches
create policy "Workers can see their own matches"
  on matches for select
  using (worker_id = auth.uid());

-- Function to update updated_at
create trigger handle_updated_at before update on matches
  for each row execute procedure moddatetime (updated_at); 