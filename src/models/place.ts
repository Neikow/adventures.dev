import { Coordinates } from "@/models/coordinates";
import { Story } from "@/models/story";

export class Place {
  constructor(
    public name: string,
    public description: string,
    public stories: Story[],
    public coordinates: Coordinates,
    public date: Date,
  ) {}
}
