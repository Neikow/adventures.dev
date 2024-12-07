import { Place } from "@/models/place";
import { trips } from "@/db/schema/trip";
import { TZDate } from "@date-fns/tz";

export type TripSchema = typeof trips.$inferSelect;

export class Trip {
  public places: Place[] = [];
  public id: number;
  public name: string;
  public uuid: string;

  public readonly createdAt?: TZDate;
  public readonly updatedAt?: TZDate;

  public startDateOverride?: TZDate;
  public endDateOverride?: TZDate;

  constructor(options: {
    id: number;
    name: string;
    uuid: string;
    createdAt?: TZDate;
    updatedAt?: TZDate;
    startDateOverride?: TZDate;
    endDateOverride?: TZDate;
  }) {
    this.places = [];
    this.id = options.id;
    this.name = options.name;
    this.uuid = options.uuid;
    this.startDateOverride = options.startDateOverride;
    this.endDateOverride = options.endDateOverride;
    this.createdAt = options.createdAt;
    this.updatedAt = options.updatedAt;
  }

  addPlace(newPlace: Place) {
    const insertIndex = this.places.findIndex(
      (place) => newPlace.date < place.date,
    );

    if (insertIndex === -1) {
      this.places.push(newPlace);
    } else {
      this.places.splice(insertIndex, 0, newPlace);
    }
  }

  get totalDistance() {
    let distance: number = 0;
    for (let i = 0; i < this.places.length - 1; i++) {
      const [co1, co2] = [
        this.places[i].coordinates,
        this.places[i + 1].coordinates,
      ];
      distance += co1.distanceTo(co2);
    }
    return distance;
  }

  get totalDuration() {
    let duration: number = 0;
    for (let i = 0; i < this.places.length - 1; i++) {
      const [date1, date2] = [this.places[i].date, this.places[i + 1].date];
      duration += Math.abs(date1.getTime() - date2.getTime());
    }
    return duration;
  }

  get startDate() {
    return this.startDateOverride ?? this.places[0].date;
  }

  get endDate() {
    return this.endDateOverride ?? this.places[this.places.length - 1].date;
  }

  static fromORM(schema: TripSchema) {
    return new Trip({
      id: schema.id,
      name: schema.name,
      uuid: schema.uuid,
      createdAt: new TZDate(schema.createdAt),
      updatedAt: new TZDate(schema.updatedAt),
      startDateOverride: schema.startDateOverride
        ? new TZDate(schema.startDateOverride)
        : undefined,
      endDateOverride: schema.endDateOverride
        ? new TZDate(schema.endDateOverride)
        : undefined,
    });
  }
}
