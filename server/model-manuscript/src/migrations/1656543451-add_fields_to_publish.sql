ALTER TABLE manuscripts ADD fields_to_publish JSONB DEFAULT '[]'::JSONB; -- JSON rather than a postgres array, since Objection expects JSON for arrays
UPDATE manuscripts SET fields_to_publish = '[]'::JSONB;
ALTER TABLE manuscripts ALTER COLUMN fields_to_publish SET NOT NULL;
