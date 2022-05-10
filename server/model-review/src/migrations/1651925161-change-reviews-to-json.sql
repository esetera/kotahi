ALTER TABLE reviews RENAME TO reviews_old;
ALTER TABLE reviews_old DROP CONSTRAINT reviews_pkey CASCADE;
ALTER TABLE reviews_old DROP CONSTRAINT reviews_manuscript_id_fkey;

CREATE TABLE reviews (
    id uuid NOT NULL,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp with time zone,
    is_decision boolean DEFAULT false,
    user_id uuid,
    manuscript_id uuid,
    type text NOT NULL,
    is_hidden_from_author boolean,
    is_hidden_reviewer_name boolean,
    can_be_published_publicly boolean,
    json_data JSONB
);
ALTER TABLE reviews ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
ALTER TABLE reviews ADD CONSTRAINT reviews_manuscript_id_fkey FOREIGN KEY (manuscript_id)
  REFERENCES manuscripts(id) ON DELETE CASCADE;

INSERT INTO reviews (
  SELECT r.id, r.created, r.updated, r.is_decision,
    r.user_id, r.manuscript_id, r.type, r.is_hidden_from_author,
    r.is_hidden_reviewer_name, r.can_be_published_publicly,
    CASE
    WHEN r.is_decision THEN
      json_build_object(
        'comment', d.content,
        'files', (SELECT json_agg(x) FROM (
          SELECT id FROM files WHERE object_id = r.id and tags ? 'decision'
        ) x),
        'verdict', r.recommendation
      )::JSONB 
    ELSE
      json_build_object(
        'comment', c.content,
        'files', (SELECT json_agg(y) FROM (
          SELECT id FROM files WHERE object_id = r.id and tags ? 'review'
        ) y),
        'confidentialComment', conf_c.content,
        'confidentialFiles', (SELECT json_agg(z) FROM (
          SELECT id FROM files WHERE object_id = r.id and tags ? 'confidential'
        ) z),
        'verdict', r.recommendation
      )::JSONB 
    END
      as json_data
  FROM reviews_old r
  LEFT JOIN review_comments c ON (c.review_id = r.id AND c.type = 'review')
  LEFT JOIN review_comments conf_c ON (conf_c.review_id = r.id AND conf_c.type = 'confidential')
  LEFT JOIN review_comments d ON (d.review_id = r.id AND d.type = 'decision')
);
