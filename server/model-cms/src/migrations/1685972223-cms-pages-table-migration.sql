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

INSERT INTO "public"."cms_pages" ("id", "shortcode", "title", "status", "content", "meta", "creator_id", "created", "updated", "published", "edited") VALUES
('0f1b67ac-f0b1-487a-94bc-ca3dc92e2761', 'about_us', 'About us', 'published', '<p class="paragraph">This is updated</p><p class="paragraph">See <a href="/contactus/" rel="" target="blank">contact us page</a></p>', '{"url": "/aboutus/", "menu": true, "order": 1}', '7670b4b8-47cf-4a24-a2ed-228a477ff9cd', '2023-06-05 14:08:17.947243+00', '2023-06-12 13:44:58.206+00', '2023-06-12 13:44:58.188+00', '2023-06-12 13:44:52.486+00'),
('0f1b67ac-f0b1-487a-94bc-ca3dc92e2771', 'contact_us', 'Contact us', 'published', '<p class="paragraph"><strong>This is updated</strong></p>', '{"url": "/contactus/", "menu": true, "order": 2}', '7670b4b8-47cf-4a24-a2ed-228a477ff9cd', '2023-06-05 14:08:17.947243+00', '2023-06-12 13:45:15.719+00', '2023-06-12 13:45:15.711+00', '2023-06-12 13:45:15.573+00');