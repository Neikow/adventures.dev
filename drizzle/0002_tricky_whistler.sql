CREATE TABLE IF NOT EXISTS "trip" (
	"id" text PRIMARY KEY NOT NULL,
	"uid" varchar(21),
	"name" varchar(127),
	CONSTRAINT "trip_uid_unique" UNIQUE("uid")
);
