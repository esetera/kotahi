CREATE TABLE flax_pages (
  id UUID PRIMARY KEY,
  label TEXT,
  creator_id UUID REFERENCES users(id),
  content JSONB,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated TIMESTAMP WITH TIME ZONE
);