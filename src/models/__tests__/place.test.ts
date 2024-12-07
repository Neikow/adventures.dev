import { Place } from "../place";
import { Coordinates } from "@/models/coordinates";
import { TZDate } from "@date-fns/tz";

test("[Place] Should create a Place with default parameters", () => {
  const place = new Place({
    name: "My place",
    description: "My description",
    coordinates: new Coordinates(0, 0),
    date: new TZDate("2024-11-26", "+00:00"),
  });

  expect(place.name).toBe("My place");
  expect(place.description).toBe("My description");
  expect(place.coordinates).toStrictEqual(new Coordinates(0, 0));
  expect(place.date).toStrictEqual(new TZDate("2024-11-26", "+00:00"));
});
