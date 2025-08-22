-- 1st created this table then added html attribute and made url and html both optional.


-- Create the proper table with user association
CREATE TABLE violations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  url text not null,
  result jsonb not null,
  violations_count integer default 0,
  score decimal(5,2),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
ALTER TABLE violations ENABLE ROW LEVEL SECURITY;

-- Create policies to ensure users only see their own data
CREATE POLICY "Users can view their own violations" ON violations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own violations" ON violations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own violations" ON violations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own violations" ON violations
  FOR DELETE USING (auth.uid() = user_id);




-- Add html column to your existing table
ALTER TABLE violations ADD COLUMN html text;

-- Make both url and html optional (one of them will be filled)
ALTER TABLE violations ALTER COLUMN url DROP NOT NULL;
