import { HerbariumEntry } from "./herbariumEntry";
import { Herb } from "./herb";

export class Herbarium {
  public entries: Record<string, HerbariumEntry> = {};

  public hasHerb = (herb: Herb): boolean => {
    return !!this.entries[herb.name];
  };

  public nameHerb = (herb: Herb): string => {
    if (this.entries[herb.name]) {
      return this.entries[herb.name].identifiedName
        ? herb.name
        : herb.ignorantName;
    }
    return herb.ignorantName;
  };

  public getMedicalProperties = (herb: Herb): string => {
    if (
      this.entries[herb.name] &&
      this.entries[herb.name].identifiedMedicalProperties
    ) {
      return herb.medicalProperties;
    }

    return "Descoñecidas";
  };

  public getMagicalProperties = (herb: Herb): string => {
    if (
      this.entries[herb.name] &&
      this.entries[herb.name].identifiedMagicalProperties
    ) {
      return herb.magicalProperties;
    }

    return "Descoñecidas";
  };

  public addHerb = (herb: Herb): void => {
    if (!this.entries[herb.name]) {
      this.entries[herb.name] = new HerbariumEntry();
    }
  };

  public studyHerb = (herb: Herb): void => {
    console.log(`Estudando a herba: ${herb.name}`);

    this.addHerb(herb);

    if (!this.entries[herb.name].identifiedName) {
      this.entries[herb.name].identifiedName = true;
    } else {
      if (!this.entries[herb.name].identifiedMedicalProperties) {
        this.entries[herb.name].identifiedMedicalProperties = true;
      } else {
        this.entries[herb.name].identifiedMagicalProperties = true;
      }
    }
  };

  public clonar = (): Herbarium => {
    const newHerbarium = new Herbarium();

    for (const herbName in this.entries) {
      if (Object.prototype.hasOwnProperty.call(this.entries, herbName)) {
        newHerbarium.entries[herbName] = this.entries[herbName].clonar();
      }
    }

    return newHerbarium;
  };
}
