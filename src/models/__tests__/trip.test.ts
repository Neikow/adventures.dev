import { expect, test } from "@jest/globals";
import { Trip } from "@/models/trip";
import { Place } from "@/models/place";
import { Coordinates } from "@/models/coordinates";

test("[Trip] Should create a named trip with a starting location", () => {
  const trip = new Trip(1, "My trip", "uuid");

  expect(trip.name).toBe("My trip");
});

test("[Trip] Should add a location to the trip", () => {
  const trip = new Trip(1, "My trip", "uuid");
  expect(trip.places.length).toBe(0);

  trip.addLocation(
    new Place("Location 1", "", [], new Coordinates(0, 0), new Date()),
  );

  expect(trip.places.length).toBe(1);
  expect(trip.places[0].name).toBe("Location 1");
});

test("[Trip] Should calculate the total distance between locations", () => {
  const trip = new Trip(1, "My trip", "uuid");

  trip.addLocation(new Place("", "", [], new Coordinates(5, 10), new Date()));
  trip.addLocation(new Place("", "", [], new Coordinates(15, 20), new Date()));

  expect(trip.totalDistance).toBeCloseTo(1559536, -1);
});

test("[Trip] Should calculate the total duration between locations", () => {
  const trip = new Trip(1, "My trip", "uuid");

  const dates = [
    new Date("2024-11-26"),
    new Date("2024-11-27"),
    new Date("2024-11-29"),
  ];

  dates.forEach((date) => {
    trip.addLocation(new Place("", "", [], new Coordinates(0, 0), date));
  });

  const duration = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

  expect(trip.totalDuration).toBe(duration);
});

test("[Trip] Should insert the place at the right index", () => {
  const trip = new Trip(1, "My trip", "uuid");

  const places: [Date, string][] = [
    [new Date("2024-11-26"), "Location 1"],
    [new Date("2024-11-24"), "Location 2"],
    [new Date("2024-11-22"), "Location 3"],
    [new Date("2024-11-23"), "Location 4"],
  ];

  places.forEach(([date, name]) => {
    trip.addLocation(new Place(name, "", [], new Coordinates(0, 0), date));
  });

  expect(trip.places[0].name).toBe("Location 3");
  expect(trip.places[1].name).toBe("Location 4");
  expect(trip.places[2].name).toBe("Location 2");
  expect(trip.places[3].name).toBe("Location 1");
});

test("[Trip] Should create a trip from the ORM schema", () => {
  const trip = Trip.fromORM({
    id: 1,
    name: "My trip",
    uuid: "uuid",
  });

  expect(trip.name).toBe("My trip");
});

test("[Trip] Should return the trip start and end date", () => {
  const trip = new Trip(1, "My trip", "uuid");

  const places: [Date, string][] = [
    [new Date("2024-11-24"), "Location 1"],
    [new Date("2024-11-26"), "Location 2"],
  ];

  places.forEach(([date, name]) => {
    trip.addLocation(new Place(name, "", [], new Coordinates(0, 0), date));
  });

  expect(trip.startDate).toEqual(new Date("2024-11-24"));
  expect(trip.endDate).toEqual(new Date("2024-11-26"));
});

test("[Trip] Should create a trip with start and end date overrides", () => {
  const trip = new Trip(
    1,
    "My trip",
    "uuid",
    new Date("2024-11-26"),
    new Date("2024-11-27"),
  );

  const places: [Date, string][] = [
    [new Date("2024-11-26"), "Location 1"],
    [new Date("2024-11-24"), "Location 2"],
  ];

  places.forEach(([date, name]) => {
    trip.addLocation(new Place(name, "", [], new Coordinates(0, 0), date));
  });

  expect(trip.startDate).toEqual(new Date("2024-11-26"));
  expect(trip.endDate).toEqual(new Date("2024-11-27"));
});
