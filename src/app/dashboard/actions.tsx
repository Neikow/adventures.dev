"use server";

import { db } from "@/db";
import { trips } from "@/db/schema/trip";
import { desc } from "drizzle-orm";

export async function getTrips(offset: number, limit: number) {
  const result = await db
    .select()
    .from(trips)
    .orderBy(desc(trips.id))
    .offset(offset)
    .limit(limit);

  return {
    hasMore: result.length === limit,
    items: result,
  };
}
