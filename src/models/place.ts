import { Coordinates } from "@/models/coordinates";
import { Story } from "@/models/story";
import { TZDate } from "@date-fns/tz";
import { Duration } from "date-fns";

export class Place {
  public name: string;
  public description: string;
  public stories: Story[];
  public coordinates: Coordinates;
  public date: TZDate;
  public stayDuration?: Duration;

  constructor(options: {
    name: string;
    description: string;
    coordinates: Coordinates;
    date: TZDate;
    stories?: Story[];
    stayDuration?: Duration;
  }) {
    this.name = options.name;
    this.description = options.description;
    this.stories = options.stories ?? [];
    this.coordinates = options.coordinates;
    this.date = options.date;
    this.stayDuration = options.stayDuration;
  }
}
