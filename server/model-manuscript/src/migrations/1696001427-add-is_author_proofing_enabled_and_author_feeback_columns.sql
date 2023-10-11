ALTER TABLE manuscripts ADD COLUMN is_author_proofing_enabled BOOLEAN DEFAULT false;
ALTER TABLE manuscripts ADD COLUMN author_feedback JSONB;