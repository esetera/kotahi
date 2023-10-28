ALTER TABLE forms 
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT false;

UPDATE forms SET is_active = true WHERE purpose = category OR purpose = 'submit';

-- Move the 'purpose' field inside the 'structure' JSON column where it's more convenient
UPDATE forms SET structure = jsonb_set(structure, '{purpose}', to_jsonb(purpose));

ALTER TABLE forms
ALTER COLUMN purpose DROP NOT NULL; -- This column is deprecated
