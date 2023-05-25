CREATE TABLE flax_pages (
  id UUID NOT NULL DEFAULT public.gen_random_uuid(),
  title TEXT,
  content JSONB,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated TIMESTAMP WITH TIME ZONE
);