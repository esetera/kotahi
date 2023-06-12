DROP TABLE IF EXISTS flax_pages;

CREATE TABLE cms_pages (
  id UUID NOT NULL DEFAULT public.gen_random_uuid(),
  shortcode TEXT NOT NULL,
  title VARCHAR NOT NULL,
  status VARCHAR NOT NULL DEFAULT 'draft',
  content TEXT,
  meta JSONB,
  creator_id UUID REFERENCES users(id),
  published TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  edited TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
);
