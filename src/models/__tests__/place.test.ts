import { Place } from "../place";
import { Coordinates } from "@/models/coordinates";

test("[Place] Should create a Place with default parameters", () => {
  const place = new Place(
    "My place",
    "My description",
    [],
    new Coordinates(0, 0),
    new Date("2024-11-26"),
  );

  expect(place.name).toBe("My place");
  expect(place.description).toBe("My description");
  expect(place.coordinates).toStrictEqual(new Coordinates(0, 0));
  expect(place.date).toStrictEqual(new Date("2024-11-26"));
});
