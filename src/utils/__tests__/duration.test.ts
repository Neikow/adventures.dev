import { Duration } from "date-fns";
import { addDurations } from "@/utils/duration";

test("[addDurations] Should add two durations together", () => {
  const duration1: Duration = { days: 1, hours: 23, minutes: 59, seconds: 59 };
  const duration2: Duration = { days: 1, hours: 0, minutes: 0, seconds: 1 };

  expect(addDurations(duration1, duration2)).toStrictEqual({ days: 3 });
});
