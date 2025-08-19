-- Script để migrate database mới
-- Chạy các migration theo thứ tự

-- 1. Tạo bảng profiles
-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role text check (role in ('worker', 'employer')),
  full_name text,
  avatar_url text,
  bio text,
  experience text,
  availability text,
  languages text[],
  skills text[],
  has_completed_onboarding boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Create function to handle user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

-- Create trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Tạo bảng jobs
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

-- 3. Tạo bảng matches
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

-- 4. Tạo bảng conversations và messages
-- Create conversations table
create table public.conversations (
  id uuid default gen_random_uuid() primary key,
  user_1_id uuid not null references auth.users(id) on delete cascade,
  user_2_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint conversations_users_check check (user_1_id < user_2_id)
);

-- Create messages table
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  receiver_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  read boolean default false not null
);

-- Create indexes
create index conversations_user_1_id_idx on public.conversations(user_1_id);
create index conversations_user_2_id_idx on public.conversations(user_2_id);
create index messages_conversation_id_idx on public.messages(conversation_id);
create index messages_sender_id_idx on public.messages(sender_id);
create index messages_receiver_id_idx on public.messages(receiver_id);
create index messages_created_at_idx on public.messages(created_at);

-- Create RLS policies
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- Conversations policies
create policy "Users can view their own conversations"
  on public.conversations for select
  using (auth.uid() = user_1_id or auth.uid() = user_2_id);

create policy "Users can create conversations"
  on public.conversations for insert
  with check (auth.uid() = user_1_id or auth.uid() = user_2_id);

create policy "Users can update their own conversations"
  on public.conversations for update
  using (auth.uid() = user_1_id or auth.uid() = user_2_id);

-- Messages policies
create policy "Users can view messages in their conversations"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations
      where id = messages.conversation_id
      and (user_1_id = auth.uid() or user_2_id = auth.uid())
    )
  );

create policy "Users can insert messages in their conversations"
  on public.messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.conversations
      where id = conversation_id
      and (user_1_id = auth.uid() or user_2_id = auth.uid())
    )
  );

create policy "Users can update messages they sent"
  on public.messages for update
  using (auth.uid() = sender_id);

-- Create function to update conversation updated_at
create or replace function public.handle_new_message()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update public.conversations
  set updated_at = new.created_at
  where id = new.conversation_id;
  return new;
end;
$$;

-- Create trigger to update conversation updated_at
create trigger on_new_message
  after insert on public.messages
  for each row execute procedure public.handle_new_message();
