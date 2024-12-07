import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { generateUUID, UUID_LENGTH } from "@/lib/uuidGeneration";

export const MAX_TRIP_NAME_LENGTH = 127;

export const trips = pgTable("trip", {
  id: text("id").primaryKey(),
  uuid: varchar("uid", {
    length: UUID_LENGTH,
  })
    .unique()
    .$defaultFn(generateUUID),
  name: varchar("name", {
    length: MAX_TRIP_NAME_LENGTH,
  }),
});
