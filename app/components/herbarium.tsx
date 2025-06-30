import { HerbariumEntry } from "./herbariumEntry";
import { Herb } from "./herb";

export class Herbarium {
  public entries: Record<string, HerbariumEntry> = {};

  public nameHerb = (herb: Herb): string => {
    if (this.entries[herb.name]) {
      return this.entries[herb.name].identifiedName
        ? herb.name
        : herb.ignorantName;
    }
    return herb.ignorantName;
  };

  public studyHerb = (herb: Herb): void => {
    if (!this.entries[herb.name]) {
      this.entries[herb.name] = new HerbariumEntry();
    }
    this.entries[herb.name].identifiedName = true;
  };
}
