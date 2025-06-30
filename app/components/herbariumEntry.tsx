import { Place } from "./place";

export class HerbariumEntry {
  public identifiedName: boolean = false;
  public identifiedMedicalProperties: boolean = false;
  public identifiedMagicalProperties: boolean = false;
  public placesFound: string[] = [];

  public addPlace(place: Place): void {
    if (!this.placesFound.includes(place.name)) {
      this.placesFound.push(place.name);
    }
  }

  public clone(): HerbariumEntry {
    const entry = new HerbariumEntry();
    entry.identifiedName = this.identifiedName;
    entry.identifiedMedicalProperties = this.identifiedMedicalProperties;
    entry.identifiedMagicalProperties = this.identifiedMagicalProperties;
    entry.placesFound = [...this.placesFound];
    return entry;
  }
}
