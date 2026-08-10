-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  selected_date date,
  selected_time text,
  service text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: anon can INSERT only (no SELECT, UPDATE, DELETE)
--CREATE POLICY "anon_insert_contact_messages"
  --ON contact_messages
 -- FOR INSERT
--  TO anon
  --WITH CHECK (true);

-- Migration for existing tables: add new columns if missing
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS selected_date date;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS selected_time text;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS service text;

-- Optional: index on created_at for sorting in Supabase Table Editor
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx
  ON contact_messages (created_at DESC);
