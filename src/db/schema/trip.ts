import {
  date,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { generateUUID, UUID_LENGTH } from "@/lib/uuidGeneration";

export const MAX_TRIP_NAME_LENGTH = 127;

export const trips = pgTable("trip", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  uuid: varchar("uid", {
    length: UUID_LENGTH,
  })
    .unique()
    .notNull()
    .$defaultFn(generateUUID),
  name: varchar("name", {
    length: MAX_TRIP_NAME_LENGTH,
  }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  startDateOverride: date("start_date_override"),
  endDateOverride: date("end_date_override"),
});
