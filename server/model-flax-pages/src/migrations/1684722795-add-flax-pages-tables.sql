CREATE TABLE flax_pages (
  id UUID PRIMARY KEY,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated TIMESTAMP WITH TIME ZONE,
  creator_id UUID REFERENCES users(id),
  content JSONB
  sequence_index INTEGER NOT NULL
);
