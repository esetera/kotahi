ALTER TABLE email_templates 
  DROP CONSTRAINT IF EXISTS fk_group_id,
  ADD CONSTRAINT email_templates_group_id_fkey FOREIGN KEY (group_id) REFERENCES groups (id);