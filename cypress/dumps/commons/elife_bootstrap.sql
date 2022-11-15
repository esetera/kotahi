CREATE SCHEMA pgboss;


ALTER SCHEMA pgboss OWNER TO kotahidev;

DROP TABLE IF EXISTS "pgboss"."archive";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

DROP TYPE IF EXISTS "pgboss"."job_state" CASCADE;
CREATE TYPE "pgboss"."job_state" AS ENUM ('created', 'retry', 'active', 'completed', 'expired', 'cancelled', 'failed');

-- Table Definition
CREATE TABLE "pgboss"."archive" (
    "id" uuid NOT NULL,
    "name" text NOT NULL,
    "priority" int4 NOT NULL,
    "data" jsonb,
    "state" "pgboss"."job_state" NOT NULL,
    "retrylimit" int4 NOT NULL,
    "retrycount" int4 NOT NULL,
    "retrydelay" int4 NOT NULL,
    "retrybackoff" bool NOT NULL,
    "startafter" timestamptz NOT NULL,
    "startedon" timestamptz,
    "singletonkey" text,
    "singletonon" timestamp,
    "expirein" interval NOT NULL,
    "createdon" timestamptz NOT NULL,
    "completedon" timestamptz,
    "keepuntil" timestamptz NOT NULL,
    "on_complete" bool NOT NULL,
    "archivedon" timestamptz NOT NULL DEFAULT now()
);

DROP TABLE IF EXISTS "pgboss"."job";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

DROP TYPE IF EXISTS "pgboss"."job_state" CASCADE;
CREATE TYPE "pgboss"."job_state" AS ENUM ('created', 'retry', 'active', 'completed', 'expired', 'cancelled', 'failed');

-- Table Definition
CREATE TABLE "pgboss"."job" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "priority" int4 NOT NULL DEFAULT 0,
    "data" jsonb,
    "state" "pgboss"."job_state" NOT NULL DEFAULT 'created'::pgboss.job_state,
    "retrylimit" int4 NOT NULL DEFAULT 0,
    "retrycount" int4 NOT NULL DEFAULT 0,
    "retrydelay" int4 NOT NULL DEFAULT 0,
    "retrybackoff" bool NOT NULL DEFAULT false,
    "startafter" timestamptz NOT NULL DEFAULT now(),
    "startedon" timestamptz,
    "singletonkey" text,
    "singletonon" timestamp,
    "expirein" interval NOT NULL DEFAULT '00:15:00'::interval,
    "createdon" timestamptz NOT NULL DEFAULT now(),
    "completedon" timestamptz,
    "keepuntil" timestamptz NOT NULL DEFAULT (now() + '30 days'::interval),
    "on_complete" bool NOT NULL DEFAULT true,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "pgboss"."schedule";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "pgboss"."schedule" (
    "name" text NOT NULL,
    "cron" text NOT NULL,
    "timezone" text,
    "data" jsonb,
    "options" jsonb,
    "created_on" timestamptz NOT NULL DEFAULT now(),
    "updated_on" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("name")
);

DROP TABLE IF EXISTS "pgboss"."version";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "pgboss"."version" (
    "version" int4 NOT NULL,
    "maintained_on" timestamptz,
    "cron_on" timestamptz,
    PRIMARY KEY ("version")
);

INSERT INTO "pgboss"."job" ("id", "name", "priority", "data", "state", "retrylimit", "retrycount", "retrydelay", "retrybackoff", "startafter", "startedon", "singletonkey", "singletonon", "expirein", "createdon", "completedon", "keepuntil", "on_complete") VALUES
('1dc684c0-d2ac-11ec-9bad-d18b77d86d23', '__pgboss__cron', 0, NULL, 'created', 2, 0, 0, 'f', '2022-05-13 11:03:01.742784+00', NULL, NULL, '2022-05-13 11:03:00', '00:15:00', '2022-05-13 11:02:01.742784+00', NULL, '2022-05-13 11:04:01.742784+00', 'f'),
('1ff79590-d2ac-11ec-9bad-d18b77d86d23', '__pgboss__maintenance', 0, NULL, 'created', 0, 0, 0, 'f', '2022-05-13 11:04:05.421466+00', NULL, '__pgboss__maintenance', NULL, '00:15:00', '2022-05-13 11:02:05.421466+00', NULL, '2022-05-13 11:12:05.421466+00', 'f'),
('234dbae0-d2ab-11ec-9bad-d18b77d86d23', '__pgboss__cron', 0, NULL, 'completed', 2, 0, 0, 'f', '2022-05-13 10:56:01.52136+00', '2022-05-13 10:56:01.526769+00', NULL, '2022-05-13 10:56:00', '00:15:00', '2022-05-13 10:55:01.52136+00', '2022-05-13 10:56:01.545739+00', '2022-05-13 10:57:01.52136+00', 'f'),
('47148350-d2ab-11ec-9bad-d18b77d86d23', '__pgboss__cron', 0, NULL, 'completed', 2, 0, 0, 'f', '2022-05-13 10:57:01.542941+00', '2022-05-13 10:57:05.532135+00', NULL, '2022-05-13 10:57:00', '00:15:00', '2022-05-13 10:56:01.542941+00', '2022-05-13 10:57:05.54742+00', '2022-05-13 10:58:01.542941+00', 'f'),
('4962e020-d2ab-11ec-9bad-d18b77d86d23', '__pgboss__maintenance', 0, NULL, 'completed', 0, 0, 0, 'f', '2022-05-13 10:58:05.412445+00', '2022-05-13 10:59:05.359356+00', '__pgboss__maintenance', NULL, '00:15:00', '2022-05-13 10:56:05.412445+00', '2022-05-13 10:59:05.395813+00', '2022-05-13 11:06:05.412445+00', 'f'),
('6d271080-d2ab-11ec-9bad-d18b77d86d23', '__pgboss__cron', 0, NULL, 'completed', 2, 0, 0, 'f', '2022-05-13 10:58:01.41778+00', '2022-05-13 10:58:01.567218+00', NULL, '2022-05-13 10:58:00', '00:15:00', '2022-05-13 10:57:05.41778+00', '2022-05-13 10:58:01.61424+00', '2022-05-13 10:59:01.41778+00', 'f'),
('8ea4d350-d2ab-11ec-9bad-d18b77d86d23', '__pgboss__cron', 0, NULL, 'completed', 2, 0, 0, 'f', '2022-05-13 10:59:01.609956+00', '2022-05-13 10:59:01.62243+00', NULL, '2022-05-13 10:59:00', '00:15:00', '2022-05-13 10:58:01.609956+00', '2022-05-13 10:59:01.642694+00', '2022-05-13 11:00:01.609956+00', 'f'),
('b26cfb50-d2ab-11ec-9bad-d18b77d86d23', '__pgboss__cron', 0, NULL, 'completed', 2, 0, 0, 'f', '2022-05-13 11:00:01.639764+00', '2022-05-13 11:00:01.680066+00', NULL, '2022-05-13 11:00:00', '00:15:00', '2022-05-13 10:59:01.639764+00', '2022-05-13 11:00:01.710609+00', '2022-05-13 11:01:01.639764+00', 'f'),
('b4ab79a0-d2ab-11ec-9bad-d18b77d86d23', '__pgboss__maintenance', 0, NULL, 'completed', 0, 0, 0, 'f', '2022-05-13 11:01:05.407349+00', '2022-05-13 11:02:05.360268+00', '__pgboss__maintenance', NULL, '00:15:00', '2022-05-13 10:59:05.407349+00', '2022-05-13 11:02:05.397952+00', '2022-05-13 11:09:05.407349+00', 'f'),
('d63a7a80-d2ab-11ec-9bad-d18b77d86d23', '__pgboss__cron', 0, NULL, 'completed', 2, 0, 0, 'f', '2022-05-13 11:01:01.706942+00', '2022-05-13 11:01:05.704131+00', NULL, '2022-05-13 11:01:00', '00:15:00', '2022-05-13 11:00:01.706942+00', '2022-05-13 11:01:05.727876+00', '2022-05-13 11:02:01.706942+00', 'f'),
('de127e70-d2aa-11ec-9bad-d18b77d86d23', '__pgboss__maintenance', 0, NULL, 'completed', 0, 0, 0, 'f', '2022-05-13 10:53:05.373851+00', '2022-05-13 10:53:05.390018+00', '__pgboss__maintenance', NULL, '00:15:00', '2022-05-13 10:53:05.373851+00', '2022-05-13 10:53:05.454079+00', '2022-05-13 11:01:05.373851+00', 'f'),
('de193530-d2aa-11ec-9bad-d18b77d86d23', '__pgboss__cron', 0, NULL, 'completed', 2, 0, 0, 'f', '2022-05-13 10:53:05.43335+00', '2022-05-13 10:53:09.419799+00', NULL, '2022-05-13 10:53:00', '00:15:00', '2022-05-13 10:53:05.43335+00', '2022-05-13 10:53:09.462332+00', '2022-05-13 10:54:05.43335+00', 'f'),
('de20d650-d2aa-11ec-9bad-d18b77d86d23', '__pgboss__maintenance', 0, NULL, 'completed', 0, 0, 0, 'f', '2022-05-13 10:55:05.464524+00', '2022-05-13 10:56:05.387199+00', '__pgboss__maintenance', NULL, '00:15:00', '2022-05-13 10:53:05.464524+00', '2022-05-13 10:56:05.407392+00', '2022-05-13 11:03:05.464524+00', 'f'),
('e081a9b0-d2aa-11ec-9bad-d18b77d86d23', '__pgboss__cron', 0, NULL, 'completed', 2, 0, 0, 'f', '2022-05-13 10:54:01.454067+00', '2022-05-13 10:54:01.467355+00', NULL, '2022-05-13 10:54:00', '00:15:00', '2022-05-13 10:53:09.454067+00', '2022-05-13 10:54:01.485519+00', '2022-05-13 10:55:01.454067+00', 'f'),
('fc35af20-d2ab-11ec-9bad-d18b77d86d23', '__pgboss__cron', 0, NULL, 'completed', 2, 0, 0, 'f', '2022-05-13 11:02:01.429235+00', '2022-05-13 11:02:01.718187+00', NULL, '2022-05-13 11:02:00', '00:15:00', '2022-05-13 11:01:05.429235+00', '2022-05-13 11:02:01.747406+00', '2022-05-13 11:03:01.429235+00', 'f'),
('ff84cf90-d2aa-11ec-9bad-d18b77d86d23', '__pgboss__cron', 0, NULL, 'completed', 2, 0, 0, 'f', '2022-05-13 10:55:01.48296+00', '2022-05-13 10:55:01.485767+00', NULL, '2022-05-13 10:55:00', '00:15:00', '2022-05-13 10:54:01.48296+00', '2022-05-13 10:55:01.528093+00', '2022-05-13 10:56:01.48296+00', 'f');

INSERT INTO "pgboss"."version" ("version", "maintained_on", "cron_on") VALUES
(16, '2022-05-13 11:02:05.394453+00', '2022-05-13 11:02:01.730816+00');

-- 
-- 
-- 

-- -------------------------------------------------------------
-- Generated with TablePlus 4.8.7(448)
-- Generation Time: 2022-09-15 11:50:16.5540
-- -------------------------------------------------------------

DROP TABLE IF EXISTS "public"."aliases";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."aliases" (
    "id" uuid NOT NULL,
    "created" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "name" text,
    "email" text,
    "aff" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."article_import_history";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."article_import_history" (
    "id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "date" timestamptz,
    "source_id" uuid NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."article_import_sources";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."article_import_sources" (
    "id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "server" text NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."channel_members";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."channel_members" (
    "id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "user_id" uuid NOT NULL,
    "channel_id" uuid NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."channels";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."channels" (
    "id" uuid NOT NULL,
    "manuscript_id" uuid,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "topic" text,
    "type" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."email_blacklist";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."email_blacklist" (
    "id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "email" text NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."entities";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."entities" (
    "id" uuid NOT NULL,
    "data" jsonb,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."files";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."files" (
    "id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "type" text NOT NULL,
    "name" text NOT NULL,
    "stored_objects" jsonb NOT NULL,
    "tags" jsonb DEFAULT '[]'::jsonb,
    "reference_id" uuid,
    "object_id" uuid,
    "alt" text,
    "upload_status" text,
    "caption" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."files_old";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."files_old" (
    "id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "object_type" text,
    "object_id" uuid,
    "label" text,
    "file_type" text NOT NULL,
    "filename" text NOT NULL,
    "url" text NOT NULL,
    "mime_type" text,
    "size" int4 NOT NULL,
    "type" text NOT NULL,
    "manuscript_id" uuid NOT NULL,
    "review_comment_id" uuid
);

DROP TABLE IF EXISTS "public"."files_old_2";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."files_old_2" (
    "id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "type" text NOT NULL,
    "name" text NOT NULL,
    "stored_objects" jsonb NOT NULL,
    "tags" jsonb,
    "reference_id" uuid,
    "object_id" uuid,
    "alt" text,
    "upload_status" text,
    "caption" text
);

DROP TABLE IF EXISTS "public"."forms";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."forms" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "type" text NOT NULL DEFAULT 'form'::text,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "purpose" text NOT NULL,
    "structure" jsonb NOT NULL,
    "category" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."identities";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."identities" (
    "id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "type" text NOT NULL,
    "identifier" text,
    "name" text,
    "aff" text,
    "oauth" jsonb,
    "is_default" bool,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."invitations";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

DROP TYPE IF EXISTS "public"."invitation_status";
CREATE TYPE "public"."invitation_status" AS ENUM ('UNANSWERED', 'ACCEPTED', 'REJECTED');
DROP TYPE IF EXISTS "public"."invitation_type";
CREATE TYPE "public"."invitation_type" AS ENUM ('AUTHOR', 'REVIEWER');
DROP TYPE IF EXISTS "public"."invitation_declined_reason_type";
CREATE TYPE "public"."invitation_declined_reason_type" AS ENUM ('UNAVAILABLE', 'TOPIC', 'CONFLICT_OF_INTEREST', 'OTHER', 'DO_NOT_CONTACT');

-- Table Definition
CREATE TABLE "public"."invitations" (
    "id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "manuscript_id" uuid NOT NULL,
    "purpose" text,
    "to_email" text NOT NULL,
    "status" "public"."invitation_status" NOT NULL,
    "invited_person_type" "public"."invitation_type" NOT NULL,
    "invited_person_name" text NOT NULL,
    "response_date" timestamptz,
    "response_comment" text,
    "declined_reason" "public"."invitation_declined_reason_type",
    "user_id" uuid,
    "sender_id" uuid NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."manuscripts";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS manuscripts_short_id_seq;

-- Table Definition
CREATE TABLE "public"."manuscripts" (
    "id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "parent_id" uuid,
    "submitter_id" uuid,
    "status" text,
    "decision" text,
    "authors" jsonb,
    "suggestions" jsonb,
    "meta" jsonb,
    "submission" jsonb,
    "published" timestamptz,
    "type" text NOT NULL,
    "evaluations_hypothesis_map" jsonb,
    "is_imported" bool,
    "import_source" uuid,
    "import_source_server" text,
    "short_id" int4 NOT NULL DEFAULT nextval('manuscripts_short_id_seq'::regclass),
    "submitted_date" timestamptz,
    "is_hidden" bool,
    "form_fields_to_publish" jsonb NOT NULL DEFAULT '[]'::jsonb,
    "doi" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."messages";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."messages" (
    "id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    "channel_id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "content" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."migrations";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."migrations" (
    "id" text NOT NULL,
    "run_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."review_comments";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."review_comments" (
    "id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "review_id" uuid,
    "user_id" uuid,
    "content" text,
    "comment_type" text,
    "type" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."reviews";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."reviews" (
    "id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "is_decision" bool DEFAULT false,
    "user_id" uuid,
    "manuscript_id" uuid,
    "type" text NOT NULL,
    "is_hidden_from_author" bool,
    "is_hidden_reviewer_name" bool,
    "can_be_published_publicly" bool,
    "json_data" jsonb,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."reviews_old";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."reviews_old" (
    "id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "recommendation" text,
    "is_decision" bool DEFAULT false,
    "user_id" uuid,
    "manuscript_id" uuid,
    "type" text NOT NULL,
    "is_hidden_from_author" bool,
    "is_hidden_reviewer_name" bool,
    "can_be_published_publicly" bool,
    "json_data" jsonb
);

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: kotahidev
--

DROP TABLE IF EXISTS public.tasks;

CREATE TABLE public.tasks (
  id UUID PRIMARY KEY,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated TIMESTAMP WITH TIME ZONE,
--  task_list_id uuid NOT NULL REFERENCES task_lists(id) ON DELETE CASCADE,
  manuscript_id uuid,
  title TEXT,
  assignee_user_id uuid,
  default_duration_days INTEGER,
  due_date TIMESTAMP WITH TIME ZONE,
  reminder_period_days INTEGER,
  status TEXT,
  sequence_index INTEGER NOT NULL
);

ALTER TABLE public.tasks OWNER TO kotahidev;

--
-- Name: task_alerts; Type: TABLE; Schema: public; Owner: kotahidev
--

DROP TABLE IF EXISTS public.task_alerts;

CREATE TABLE public.task_alerts (
  id UUID PRIMARY KEY,
  task_id uuid NOT NULL,
  user_id uuid NOT NULL,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.task_alerts OWNER TO kotahidev;


DROP TABLE IF EXISTS "public"."team_members";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."team_members" (
    "id" uuid NOT NULL,
    "created" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "status" varchar(255),
    "team_id" uuid,
    "user_id" uuid,
    "alias_id" uuid,
    "is_shared" bool,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."teams";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."teams" (
    "id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "name" text,
    "role" text NOT NULL,
    "members" jsonb,
    "owners" jsonb,
    "global" bool,
    "type" text NOT NULL,
    "object_id" uuid,
    "object_type" varchar(255),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."threaded_discussions";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."threaded_discussions" (
    "id" uuid NOT NULL,
    "created" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "manuscript_id" uuid NOT NULL,
    "threads" jsonb NOT NULL
);

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "id" uuid NOT NULL,
    "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" timestamptz,
    "admin" bool,
    "email" text,
    "username" text,
    "password_hash" text,
    "teams" jsonb,
    "password_reset_token" text,
    "password_reset_timestamp" timestamptz,
    "type" text NOT NULL,
    "profile_picture" text,
    "online" bool,
    "last_online" timestamptz,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."channels" ("id", "manuscript_id", "created", "updated", "topic", "type") VALUES
('9fd7774c-11e5-4802-804c-ab64aefd5080', NULL, '2022-09-15 06:17:37.142077+00', NULL, 'System-wide discussion', 'editorial');

INSERT INTO "public"."forms" ("id", "type", "created", "updated", "purpose", "structure", "category") VALUES
('9f27f699-56b2-4adc-b5c6-f179ff9a5380', 'Form', '2022-09-15 06:18:14.685+00', '2022-09-15 06:18:14.685+00', 'submit', '{"name": "eLife Submission Form", "children": [{"id": "bf66a4ed-427b-4329-b6f7-6c53eeec5ac6", "name": "submission.articleId", "title": "Article ID", "options": [], "validate": [{"id": "48179c76-55b3-41b8-b330-6115dcbd9b2a", "label": "Required", "value": "required"}], "component": "TextField"}, {"id": "1c2e9325-3fa8-41f3-8607-180eb8a25bb3", "name": "submission.DOI", "title": "DOI", "options": [], "validate": [{"id": "48109c76-55b3-41b8-b330-6115dcbd9b4a", "label": "Required", "value": "required"}], "component": "TextField", "placeholder": "Enter the manuscript''s DOI", "doiValidation": "true"}, { "id": "5a22ec26-3885-432c-8c80-b207a62a7b04", "name": "submission.articleURL", "title": "Article URL", "options": [], "validate": [{"id": "15c4e0f8-888e-4c83-b0c6-0f6250eea43a", "label": "Required", "value": "required"}], "component": "TextField", "doiValidation": "true"}, {"id": "b100e6a0-b00e-413c-823b-862351e9690f", "name": "submission.biorxivURL", "title": "bioRxiv article URL", "options": [], "validate": [{"id": "20708da4-7999-49c0-9881-d28f2ce9f825", "label": "Required", "value": "required"}], "component": "TextField"}, {"id": "ec5e5f89-282c-42e9-bde2-d35816152362", "name": "submission.description", "title": "Description", "options": [], "validate": [{"id": "7778fd1c-3e8f-42c8-8e42-71c33ea3daa2", "label": "Required", "value": "required"}], "component": "TextField"}, {"id": "12909732-e675-4270-bb3b-3b4d8d39dace", "name": "submission.review1", "title": "Review 1","component": "AbstractEditor", "placeholder": "Review 1", "doiValidation": "false"}, {"id": "a7cd4965-0741-4b11-aa07-5cf89165a551", "name": "submission.review1creator", "title": "Review 1 creator", "component": "TextField", "doiValidation": "false"}, {"id": "520615da-c193-4722-9509-3d849f3b6dc2", "name": "submission.review1date", "title": "Review 1 date", "component": "TextField", "placeholder": "review 1 date", "doiValidation": "false"}, {"id": "6285b767-66be-4e5f-aa36-b00ec2730177", "name": "submission.review2", "title": "Review 2", "component": "AbstractEditor", "placeholder": "Review 2", "doiValidation": "false"}, {"id": "2fa4f519-5342-4128-ab82-f5e10c4764ee", "name": "submission.review2creator", "title": "Review 2 creator", "component": "TextField", "doiValidation": "false"}, {"id": "ab864ade-bc8c-11eb-8529-0242ac130003", "name": "submission.review2date", "title": "Review 2 date", "component": "TextField", "placeholder": "review 2 date", "doiValidation": "false"}, {"id": "bc3dfe1f-ed4c-40bf-9dff-26dc45af260a", "name": "submission.review3", "title": "Review 3", "component": "AbstractEditor", "doiValidation": "false"}, {"id": "3fc01c57-62b2-422e-b5ae-1e76826050c8", "name": "submission.review3creator", "title": "Review 3 creator", "component": "TextField", "doiValidation": "false"}, {"id": "ab864dc2-bc8c-11eb-8529-0242ac130003", "name": "submission.review3date", "title": "Review 3 date", "component": "TextField", "placeholder": "review 3 date", "doiValidation": "false"}, {"id": "05867f53-ea10-4d3b-8220-48200b92cd4f", "name": "submission.summary", "title": "Summary", "component": "AbstractEditor", "doiValidation": "false"}, {"id": "0a64672c-0fc2-4e99-a023-d89240523a32", "name": "submission.summarycreator", "title": "Summary creator", "component": "TextField", "doiValidation": "false"}, {"id": "ab8654b6-bc8c-11eb-8529-0242ac130003", "name": "submission.summarydate", "title": "Summary date", "component": "TextField", "placeholder": "summary date", "doiValidation": "false"}], "haspopup": "false", "description": "<p>eLife Form</p>"}', 'submission'),
('d619d5ba-80e5-4ada-8983-87d1312e5250', 'Form', '2022-09-15 06:18:14.689+00', '2022-09-15 06:18:14.689+00', 'review', '{"name": "Review", "children": [{"id": "1880448f-827a-422a-8ed7-c00f8ce9ccae", "name": "comment", "title": "Comments to the Author", "validate": [{"id": "332253be-dc19-47a8-9bfb-c32fa3fc9b43", "label": "Required", "value": "required"}], "component": "AbstractEditor", "placeholder": "Enter your review..."}, {"id": "4e0ee4a6-57bc-4284-957a-f3e17ac4a24d", "name": "files", "title": " ", "component": "SupplementaryFiles", "shortDescription": "Files"}, {"id": "2a1eab32-3e78-49e1-b0e5-24104a39a06a", "name": "confidentialComment", "title": "Confidential comments to the editor (optional)", "component": "AbstractEditor", "placeholder": "Enter a confidential note to the editor (optional)...", "hideFromAuthors": "true", "shortDescription": "Confidential comments"}, {"id": "21b5de2c-10fd-48cb-a00a-ab2c96b1c242", "name": "confidentialFiles", "title": " ", "component": "SupplementaryFiles", "hideFromAuthors": "true", "shortDescription": "Confidential files"}, {"id": "257d6be0-0832-41fc-b6d2-b1f096342bc2", "name": "verdict", "title": "Recommendation", "inline": "true", "options": [{"id": "da8a08bd-d035-400e-856a-f2c6f8040c27", "label": "Accept", "value": "accept", "labelColor": "#048802"}, {"id": "da75afd9-aeac-4d24-8f5e-8ed00d233543", "label": "Revise", "value": "revise", "labelColor": "#ebc400"}, {"id": "a254f0c1-25e5-45bb-8a8e-8251d2c27f8c", "label": "Reject", "value": "reject", "labelColor": "#ea412e"}], "validate": [{"id": "d970099e-b05e-4fae-891f-1a81d6f46b65", "label": "Required", "value": "required"}], "component": "RadioGroup"}], "haspopup": "true", "popuptitle": "Confirm your review", "description": "<p class=\"paragraph\">By completing this review, you agree that you do not have any conflict of interests to declare. For any questions about what constitutes a conflict of interest, contact the administrator.</p>", "popupdescription": "<p class=\"paragraph\">By submitting this review, you agree that you do not have any conflict of interests to declare. For any questions about what constitutes a conflict of interest, contact the administrator.</p>"}', 'review'),
('da70ab01-43ca-4a04-80bb-5fb298dff5e5', 'Form', '2022-09-15 06:18:14.692+00', '2022-09-15 06:18:14.692+00', 'decision', '{"name": "Decision", "children": [{"id": "1600fcc9-ebf4-42f5-af97-c242ea04ae21", "name": "comment", "title": "Decision", "validate": [{"id": "39796769-23a9-4788-b1f3-78d08b59f97e", "label": "Required", "value": "required"}], "component": "AbstractEditor", "placeholder": "Write/paste your decision letter here, or upload it by dragging it onto the box below."}, {"id": "695a5b2f-a0d7-4b1e-a750-107bff5628bc", "name": "files", "title": " ", "component": "SupplementaryFiles", "shortDescription": "Files"}, {"id": "7423ad09-d01b-49bc-8c2e-807829b86653", "name": "verdict", "title": "Decision Status", "inline": "true", "options": [{"id": "78653e7a-32b3-4283-9a9e-36e79876da28", "label": "Accept", "value": "accept", "labelColor": "#048802"}, {"id": "44c2dad6-8316-42ed-a2b7-3f2e98d49823", "label": "Revise", "value": "revise", "labelColor": "#ebc400"}, {"id": "a8ae5a69-9f34-4e3c-b3d2-c6572ac2e225", "label": "Reject", "value": "reject", "labelColor": "#ea412e"}], "validate": [{"id": "4eb14d13-4d17-40d0-95a1-3e68e9397269", "label": "Required", "value": "required"}], "component": "RadioGroup"}], "haspopup": "false"}', 'decision');


INSERT INTO "public"."migrations" ("id", "run_at") VALUES
('1524494862-entities.sql', '2022-09-15 06:17:35.719777+00'),
('1542276313-initial-user-migration.sql', '2022-09-15 06:17:35.781242+00'),
('1560771823-add-unique-constraints-to-users.sql', '2022-09-15 06:17:35.816622+00'),
('1580908536-add-identities.sql', '2022-09-15 06:17:35.84161+00'),
('1581371297-migrate-users-to-identities.js', '2022-09-15 06:17:35.886623+00'),
('1581450834-manuscript.sql', '2022-09-15 06:17:35.932174+00'),
('1582930582-drop-fragments-and-collections.js', '2022-09-15 06:17:35.946867+00'),
('1585323910-add-channels.sql', '2022-09-15 06:17:35.988142+00'),
('1585344885-add-messages.sql', '2022-09-15 06:17:36.037151+00'),
('1585513226-add-profile-pic.sql', '2022-09-15 06:17:36.052101+00'),
('1592915682-change-identities-constraint.sql', '2022-09-15 06:17:36.088179+00'),
('1596830547-review.sql', '2022-09-15 06:17:36.126002+00'),
('1596830548-add-review-comments.sql', '2022-09-15 06:17:36.196998+00'),
('1596830548-initial-team-migration.sql', '2022-09-15 06:17:36.29182+00'),
('1596838897-files.sql', '2022-09-15 06:17:36.318901+00'),
('1616115191-add-first-login.sql', '2022-09-15 06:17:36.3603+00'),
('1616157398-remove-first-login-column.sql', '2022-09-15 06:17:36.410023+00'),
('1618365033-form.sql', '2022-09-15 06:17:36.437254+00'),
('1619180836-add_hypothesis_id.sql', '2022-09-15 06:17:36.471037+00'),
('1621499368-remove_hypothesis_id_column.sql', '2022-09-15 06:17:36.490921+00'),
('1621508277-evaluations_to_hypothesis_map.sql', '2022-09-15 06:17:36.501905+00'),
('1623224645-article-import-sources.sql', '2022-09-15 06:17:36.555308+00'),
('1623224655-article-import-history.sql', '2022-09-15 06:17:36.622128+00'),
('1623225900-add-import-columns.sql', '2022-09-15 06:17:36.647683+00'),
('1625223822-is-shared-team-member.sql', '2022-09-15 06:17:36.670814+00'),
('1625489571-add-is-hidden-from-author.sql', '2022-09-15 06:17:36.684192+00'),
('1625565801-add-is-hidden-reviewer-name.sql', '2022-09-15 06:17:36.711181+00'),
('1625653490-add-column-can-be-published-publicly.sql', '2022-09-15 06:17:36.730469+00'),
('1626669203-add-short_id.sql', '2022-09-15 06:17:36.895805+00'),
('1626669349-add_submitted_date.sql', '2022-09-15 06:17:36.931109+00'),
('1627646181-add-is-hidden-column.sql', '2022-09-15 06:17:36.945746+00'),
('1629434722-set_shortids_to_parent_value.sql', '2022-09-15 06:17:36.964238+00'),
('1629757873-index-created-and-published-dates.sql', '2022-09-15 06:17:36.978546+00'),
('1634271132-non-null-manuscript_id-and-other-fields.sql', '2022-09-15 06:17:37.002761+00'),
('1635472928-prefix_urls.sql', '2022-09-15 06:17:37.013148+00'),
('1638161107-prefix_urls_uploads.sql', '2022-09-15 06:17:37.031489+00'),
('1638227484-rename_existing_files_to_files_old.sql', '2022-09-15 06:17:37.0398+00'),
('1638256284-remove_constraint_files_pkey_in_files_old.sql', '2022-09-15 06:17:37.059799+00'),
('1638357830-init-file.js', '2022-09-15 06:17:37.116388+00'),
('1639635803224-update-username.sql', '2022-09-15 06:17:37.129587+00'),
('1644381481-add-system-wide-discussion.sql', '2022-09-15 06:17:37.145433+00'),
('1647493905-invitations.sql', '2022-09-15 06:17:37.184974+00'),
('1648006297-add-category.sql', '2022-09-15 06:17:37.195522+00'),
('1649295531-migrate-files-old-to-files.js', '2022-09-15 06:17:37.234764+00'),
('1649401731-convert-inline-base64-in-source-to-inline-file-urls.js', '2022-09-15 06:17:37.260283+00'),
('1650862339-add-meta-column.sql', '2022-09-15 06:17:37.274857+00'),
('1654835463-change-reviews-to-json.sql', '2022-09-15 06:17:37.509262+00'),
('1655290645-update-schema-invitations-table.sql', '2022-09-15 06:17:37.537381+00'),
('1655473487-create-blacklist-table.sql', '2022-09-15 06:17:37.554937+00'),
('1657794006-threaded-discussions.sql', '2022-09-15 06:17:37.577439+00'),
('1657794007-add_fields_to_publish.sql', '2022-09-15 06:17:37.630959+00'),
('1657798114-add-constraints.sql', '2022-09-15 06:17:37.664929+00'),
('1660913520-move-manuscript-to-generic-object.js', '2022-09-15 06:17:37.709414+00');

ALTER TABLE "public"."article_import_history" ADD FOREIGN KEY ("source_id") REFERENCES "public"."article_import_sources"("id");
ALTER TABLE "public"."channel_members" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;
ALTER TABLE "public"."channel_members" ADD FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id");
ALTER TABLE "public"."channels" ADD FOREIGN KEY ("manuscript_id") REFERENCES "public"."manuscripts"("id") ON DELETE CASCADE;
ALTER TABLE "public"."files_old" ADD FOREIGN KEY ("manuscript_id") REFERENCES "public"."manuscripts"("id") ON DELETE CASCADE;
ALTER TABLE "public"."files_old" ADD FOREIGN KEY ("review_comment_id") REFERENCES "public"."review_comments"("id") ON DELETE CASCADE;
ALTER TABLE "public"."identities" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;
ALTER TABLE "public"."invitations" ADD FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."invitations" ADD FOREIGN KEY ("manuscript_id") REFERENCES "public"."manuscripts"("id") ON DELETE CASCADE;
ALTER TABLE "public"."invitations" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."manuscripts" ADD FOREIGN KEY ("submitter_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."manuscripts" ADD FOREIGN KEY ("import_source") REFERENCES "public"."article_import_sources"("id");
ALTER TABLE "public"."messages" ADD FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE CASCADE;
ALTER TABLE "public"."messages" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;
ALTER TABLE "public"."review_comments" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL;
ALTER TABLE "public"."reviews" ADD FOREIGN KEY ("manuscript_id") REFERENCES "public"."manuscripts"("id") ON DELETE CASCADE;
ALTER TABLE "public"."team_members" ADD FOREIGN KEY ("alias_id") REFERENCES "public"."aliases"("id");
ALTER TABLE "public"."team_members" ADD FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."team_members" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;
ALTER TABLE "public"."threaded_discussions" ADD FOREIGN KEY ("manuscript_id") REFERENCES "public"."manuscripts"("id") ON DELETE CASCADE;

-- tasks and task_alerts

ALTER TABLE tasks ADD FOREIGN KEY (manuscript_id) REFERENCES manuscripts(id) ON DELETE CASCADE;
ALTER TABLE tasks ADD FOREIGN KEY (assignee_user_id) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE task_alerts ADD FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE;
ALTER TABLE task_alerts ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
CREATE INDEX tasks_manuscript_id_idx ON tasks (manuscript_id);
CREATE INDEX tasks_user_id_idx ON tasks (assignee_user_id);
CREATE UNIQUE INDEX task_alerts_alerts_task_id_user_id_uniq_idx ON task_alerts(task_id, user_id);
CREATE INDEX task_alerts_task_id_idx ON task_alerts (task_id);
CREATE INDEX task_alerts_user_id_idx ON task_alerts (user_id);

-- -------------------------------------------------------------
-- Autogenerated Dump Ends 
-- -------------------------------------------------------------

-- Add users to the tests
INSERT INTO "public"."users" ("id", "created", "updated", "admin", "email", "username", "password_hash", "teams", "password_reset_token", "password_reset_timestamp", "type", "profile_picture", "online", "last_online") VALUES
('5b861dfb-02df-4be1-bc67-41a21611f5e7', '2022-05-14 10:31:35.715+00', '2022-08-23 14:55:02.854+00', NULL, 'joanep@example.com' , 'joane441' , NULL, NULL, NULL, NULL, 'user', NULL, NULL, NULL),
('85e1300e-003c-4e96-987b-23812f902477', '2020-07-21 14:35:38.381+00', '2022-08-23 14:55:16.435+00', NULL, 'elaineb@example.com', 'elaine446', NULL, NULL, NULL, NULL, 'user', NULL, NULL, NULL),
('ba84de0d-d3d5-49e9-ae1b-e8a265789fbe', '2022-05-13 10:55:50.523+00', '2022-08-23 14:54:54.91+00' , NULL, 'emilyc@example.com' , 'emily016' , NULL, NULL, NULL, NULL, 'user', NULL, NULL, NULL),
('f9b1ed7f-f288-4c3f-898c-59e84b1c8e69', '2022-05-13 10:54:12.651+00', '2022-08-23 14:55:09.39+00' , 't' , 'sineads@example.com', 'sinead729', NULL, NULL, NULL, NULL, 'user', NULL, NULL, NULL),
('41d52254-a2b8-4ea4-9ded-bfbfe9671578', '2022-09-14 02:51:58.817+00', '2022-09-14 02:53:20.544+00', NULL, 'sherry@example.com' , 'sherry921', NULL, NULL, NULL, NULL, 'user', NULL, NULL, NULL),
('7f2fb549-51c0-49d5-844d-8a2fbbbbc0ad', '2022-09-14 02:50:09.737+00', '2022-09-14 02:50:25.118+00', NULL, 'gale@example.com'   , 'gale431'  , NULL, NULL, NULL, NULL, 'user', NULL, NULL, NULL),
('dcabc94f-eb6e-49bb-97d3-fc1a38f9408c', '2022-09-14 02:51:21.741+00', '2022-09-14 02:51:29.283+00', NULL, 'david@example.com'  , 'david254' , NULL, NULL, NULL, NULL, 'user', NULL, NULL, NULL);

INSERT INTO "public"."identities" ("id", "user_id", "created", "updated", "type", "identifier", "name", "aff", "oauth", "is_default") VALUES
('434461fc-18b5-43d8-bc46-bca88ea97c4c', '5b861dfb-02df-4be1-bc67-41a21611f5e7', '2022-07-29 05:15:21.654+00', '2022-07-29 05:15:21.624+00', 'orcid', '0000-0003-1838-2441', 'Joane Pilger'   , '', '{"accesstoken": "26fbc6b6-4421-40c5-ba07-d8c665f6704b", "refreshtoken": "4211bbf5-85ae-4980-833a-3f3deabcec6a"}', 't'),
('acfa1777-0aec-4fe1-bc16-92bb9d19e884', '85e1300e-003c-4e96-987b-23812f902477', '2020-07-21 14:35:38.384+00', '2020-07-21 14:35:39.358+00', 'orcid', '0000-0002-9429-4446', 'Elaine Barnes'  , '', '{"accessToken": "dcf07bc7-e59c-41b3-9ce0-924ac20aeeea", "refreshToken": "ae49d6a1-8e62-419d-8767-4a3ec22c1950"}', 't'),
('bdd063ba-1acc-4b92-80a5-f8711587aeea', 'ba84de0d-d3d5-49e9-ae1b-e8a265789fbe', '2022-05-13 10:55:50.525+00', '2022-05-13 10:55:50.525+00', 'orcid', '0000-0002-0564-2016', 'Emily Clay'     , '', '{"accessToken": "67cdb60a-7713-45df-8004-ca4ab38e9014", "refreshToken": "6c54414e-8b88-4814-84f9-f3067ad3078e"}', 't'),
('e462e79a-9fb4-45cb-a5b8-a2735a7aeb69', 'f9b1ed7f-f288-4c3f-898c-59e84b1c8e69', '2022-05-13 10:54:12.655+00', '2022-05-13 10:54:12.655+00', 'orcid', '0000-0002-5641-5729', 'Sinead Sullivan', '', '{"accessToken": "e85acf35-dcbf-45b1-9bc3-5efb80a95ca9", "refreshToken": "3bd13cb6-b0c5-42df-98da-c0037185d085"}', 't'),
('8628c9a0-210d-4e2b-9c30-4a03a742132d', '41d52254-a2b8-4ea4-9ded-bfbfe9671578', '2022-09-14 02:51:58.82+00' , '2022-09-14 02:51:58.82+00' , 'orcid', '0000-0002-7645-9921', 'Sherry Crofoot' , '', '{"accessToken": "1b6e59f2-276a-46f0-8198-b55e6ecf49d5", "refreshToken": "8fa0d45f-8e19-40e5-a93b-9088ed62f325"}', 't'),
('e6e55aff-37e7-448e-b1cc-d0052e990dc1', '7f2fb549-51c0-49d5-844d-8a2fbbbbc0ad', '2022-09-14 02:50:09.747+00', '2022-09-14 02:50:09.747+00', 'orcid', '0000-0001-5956-7341', 'Gale Davis'     , '', '{"accessToken": "1300952c-a4cc-4c44-ba23-df4295571689", "refreshToken": "f4ed08d1-930e-43f0-9463-0a45428d08f5"}', 't'),
('549e398c-58df-432d-97fd-cc02beb92b72', 'dcabc94f-eb6e-49bb-97d3-fc1a38f9408c', '2022-09-14 02:51:21.743+00', '2022-09-14 02:51:21.743+00', 'orcid', '0000-0002-9601-2254', 'David Miller'   , '', '{"accessToken": "a0829b38-4732-4f7c-961d-eac592dbfb07", "refreshToken": "581792f0-a925-4cdb-a491-a519af67273c"}', 't');
