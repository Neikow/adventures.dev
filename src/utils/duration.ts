import { add, Duration, intervalToDuration } from "date-fns";

export const addDurations = (duration1: Duration, duration2: Duration) => {
  const baseDate = new Date(0);
  return intervalToDuration({
    start: baseDate,
    end: add(add(baseDate, duration1), duration2),
  });
};
