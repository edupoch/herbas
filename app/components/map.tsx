import { Place } from "./place";

export class Map {
  public places: (Place | null)[][];

  constructor(places: (Place | null)[][]) {
    this.places = places;
  }
}
