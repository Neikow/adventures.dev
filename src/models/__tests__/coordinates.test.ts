import { Coordinates } from "@/models/coordinates";

test("[Coordinates] Should calculate the distance between two coordinates", () => {
  const coordinates1 = new Coordinates(48.8575, 2.3514);
  const coordinates2 = new Coordinates(51.5072, 0.1276);

  expect(coordinates1.distanceTo(coordinates2)).toBeCloseTo(334447, -1);
});

test("[Coordinates] Should format correctly", () => {
  const coordinates = new Coordinates(48.85753, 2.35144);

  expect(coordinates.format()).toBe("48.8575° N, 2.3514° E");
});
