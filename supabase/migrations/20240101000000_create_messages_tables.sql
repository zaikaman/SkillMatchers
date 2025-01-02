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