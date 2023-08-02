CREATE TABLE notification_digest (
  id UUID PRIMARY KEY,
  created TIMESTAMPTZ NOT NULL,
  updated TIMESTAMPTZ,
  time TIMESTAMPTZ NOT NULL,
  max_notification_time TIMESTAMPTZ NOT NULL,
  path_string TEXT,
  header TEXT,
  content TEXT,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_is_mentioned BOOLEAN DEFAULT false,
  option TEXT,
  actioned BOOLEAN DEFAULT false
);
