import { expect, test } from "@jest/globals";
import { Trip } from "@/models/trip";
import { Place } from "@/models/place";
import { Coordinates } from "@/models/coordinates";
import { TZDate } from "@date-fns/tz";

const getTrip = (options?: Partial<Trip>) => {
  return new Trip({
    uuid: "",
    id: 1,
    name: "My trip",
    createdAt: new TZDate(),
    updatedAt: new TZDate(),
    ...options,
  });
};

const getPlace = (options?: Partial<Place>) => {
  return new Place({
    name: "Place",
    description: "Description",
    coordinates: new Coordinates(0, 0),
    date: new TZDate(),
    stories: [],
    ...options,
  });
};

test("[Trip] Should create a named trip with a starting location", () => {
  const trip = getTrip();

  expect(trip.name).toBe("My trip");
});

test("[Trip] Should add a location to the trip", () => {
  const trip = getTrip();
  expect(trip.places.length).toBe(0);

  trip.addPlace(getPlace({ name: "Location 1" }));

  expect(trip.places.length).toBe(1);
  expect(trip.places[0].name).toBe("Location 1");
});

test("[Trip] Should calculate the total distance between locations", () => {
  const trip = getTrip();

  trip.addPlace(
    getPlace({
      coordinates: new Coordinates(5, 10),
    }),
  );
  trip.addPlace(
    getPlace({
      coordinates: new Coordinates(15, 20),
    }),
  );

  expect(trip.totalDistance).toBeCloseTo(1559536, -1);
});

test("[Trip] Should calculate the total duration between locations", () => {
  const trip = getTrip();

  const dates = [
    new TZDate("2024-11-26"),
    new TZDate("2024-11-27"),
    new TZDate("2024-11-29"),
  ];

  dates.forEach((date) => {
    trip.addPlace(getPlace({ date }));
  });

  const duration = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

  expect(trip.totalDuration).toBe(duration);
});

test("[Trip] Should insert the place at the right index", () => {
  const trip = getTrip();

  const places: [TZDate, string][] = [
    [new TZDate("2024-11-26"), "1"],
    [new TZDate("2024-11-24"), "2"],
    [new TZDate("2024-11-22"), "3"],
    [new TZDate("2024-11-23"), "4"],
  ];

  places.forEach(([date, name]) => {
    trip.addPlace(getPlace({ name, date }));
  });

  expect(trip.places[0].name).toBe("3");
  expect(trip.places[1].name).toBe("4");
  expect(trip.places[2].name).toBe("2");
  expect(trip.places[3].name).toBe("1");
});

test("[Trip] Should create a trip from the ORM schema", () => {
  const trip = Trip.fromORM({
    id: 1,
    name: "My trip",
    uuid: "uuid",
    createdAt: new TZDate("2024-11-26"),
    updatedAt: new TZDate("2024-11-26"),
    startDateOverride: null,
    endDateOverride: null,
  });

  expect(trip.name).toBe("My trip");
});

test("[Trip] Should return the trip start and end date", () => {
  const trip = getTrip();

  const places: [TZDate, string][] = [
    [new TZDate("2024-11-24"), "Location 1"],
    [new TZDate("2024-11-26"), "Location 2"],
  ];

  places.forEach(([date, name]) => {
    trip.addPlace(getPlace({ name, date }));
  });

  expect(trip.startDate).toEqual(new Date("2024-11-24"));
  expect(trip.endDate).toEqual(new Date("2024-11-26"));
});

test("[Trip] Should create a trip with start and end date overrides", () => {
  const trip = getTrip({
    startDateOverride: new TZDate("2024-11-26"),
    endDateOverride: new TZDate("2024-11-27"),
  });

  const places: [TZDate, string][] = [
    [new TZDate("2024-11-26"), "Location 1"],
    [new TZDate("2024-11-24"), "Location 2"],
  ];

  places.forEach(([date, name]) => {
    trip.addPlace(getPlace({ name, date }));
  });

  expect(trip.startDate).toEqual(new Date("2024-11-26"));
  expect(trip.endDate).toEqual(new Date("2024-11-27"));
});
