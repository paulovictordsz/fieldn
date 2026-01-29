-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- WORKSPACES
-- High-level container for teams
create table workspaces (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  owner_id uuid references auth.users(id) not null,
  created_at timestamp with time zone default now()
);

-- Access policies for Workspaces
alter table workspaces enable row level security;
create policy "Users can view workspaces they own" on workspaces
  for select using (auth.uid() = owner_id);
create policy "Users can insert workspaces" on workspaces
  for insert with check (auth.uid() = owner_id);


-- PROJECTS
-- Research studies / initiatives
create table projects (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references workspaces(id) on delete cascade not null,
  name text not null,
  description text,
  status text default 'planning', -- planning, in_progress, completed, archived
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Access policies for Projects
alter table projects enable row level security;
create policy "Users can view projects in their workspaces" on projects
  for select using (
    exists (select 1 from workspaces w where w.id = projects.workspace_id and w.owner_id = auth.uid())
  );
create policy "Users can insert projects in their workspaces" on projects
  for insert with check (
    exists (select 1 from workspaces w where w.id = projects.workspace_id and w.owner_id = auth.uid())
  );


-- FILES
-- Raw data (video, audio, docs)
create table files (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  name text not null,
  storage_path text not null, -- Path in Supabase Storage bucket
  media_type text, -- video/mp4, audio/mp3, application/pdf
  duration_seconds integer,
  transcript_json jsonb, -- Structured transcript: [{start, end, speaker, text}]
  status text default 'processing', -- processing, ready, error
  created_at timestamp with time zone default now()
);

alter table files enable row level security;
create policy "Users can access files via project ownership" on files
  using (
    exists (select 1 from projects p 
            join workspaces w on w.id = p.workspace_id 
            where p.id = files.project_id and w.owner_id = auth.uid())
  );


-- TAGS
-- Categorization labels
create table tags (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  name text not null,
  color text default 'blue',
  created_at timestamp with time zone default now()
);

alter table tags enable row level security;
create policy "Users can manage tags via project" on tags
  using (
    exists (select 1 from projects p 
            join workspaces w on w.id = p.workspace_id 
            where p.id = tags.project_id and w.owner_id = auth.uid())
  );


-- HIGHLIGHTS
-- Selected snippets from files
create table highlights (
  id uuid default gen_random_uuid() primary key,
  file_id uuid references files(id) on delete cascade not null,
  start_time float, -- seconds
  end_time float,
  text_content text, -- The actual text snippet
  note text, -- User annotation
  created_at timestamp with time zone default now()
);

alter table highlights enable row level security;
create policy "Users can manage highlights via file" on highlights
  using (
    exists (select 1 from files f
            join projects p on p.id = f.project_id
            join workspaces w on w.id = p.workspace_id
            where f.id = highlights.file_id and w.owner_id = auth.uid())
  );


-- HIGHLIGHT_TAGS
-- Many-to-many relationship
create table highlight_tags (
  highlight_id uuid references highlights(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (highlight_id, tag_id)
);

alter table highlight_tags enable row level security;
-- Simplified RLS: if you can see the highlight, you can tag it
create policy "Users can manage highlight tags" on highlight_tags
  using (
    exists (select 1 from highlights h
            join files f on f.id = h.file_id
            join projects p on p.id = f.project_id
            join workspaces w on w.id = p.workspace_id
            where h.id = highlight_tags.highlight_id and w.owner_id = auth.uid())
  );


-- INSIGHTS
-- Synthesized findings
create table insights (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  title text not null,
  content text, -- Rich text / HTML / Markdown
  status text default 'draft',
  impact_level text default 'medium', -- low, medium, high
  created_at timestamp with time zone default now()
);

alter table insights enable row level security;
create policy "Users can manage insights via project" on insights
  using (
    exists (select 1 from projects p 
            join workspaces w on w.id = p.workspace_id 
            where p.id = insights.project_id and w.owner_id = auth.uid())
  );

-- STORAGE BUCKET setup (You must do this in Storage UI too usually, but SQL can help if using standard buckets)
insert into storage.buckets (id, name, public) 
values ('uploads', 'uploads', true)
on conflict (id) do nothing;

create policy "Authenticated users can upload" on storage.objects
  for insert with check (
    bucket_id = 'uploads' and auth.role() = 'authenticated'
  );

create policy "Authenticated users can view" on storage.objects
  for select using (
    bucket_id = 'uploads' and auth.role() = 'authenticated'
  );
