export class Herb {
  public name: string;
  public ignorantName: string;
  public medicalProperties: string;
  public magicalProperties: string;

  constructor(
    name: string,
    ignorantName: string,
    medicalProperties: string,
    magicalProperties: string
  ) {
    this.name = name;
    this.ignorantName = ignorantName;
    this.medicalProperties = medicalProperties;
    this.magicalProperties = magicalProperties;
  }
}
