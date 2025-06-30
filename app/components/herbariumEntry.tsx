export class HerbariumEntry {
  public identifiedName: boolean = false;
  public identifiedMedicalProperties: boolean = false;
  public identifiedMagicalProperties: boolean = false;

  public clonar(): HerbariumEntry {
    const entry = new HerbariumEntry();
    entry.identifiedName = this.identifiedName;
    entry.identifiedMedicalProperties = this.identifiedMedicalProperties;
    entry.identifiedMagicalProperties = this.identifiedMagicalProperties;
    return entry;
  }
}
