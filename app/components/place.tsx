import { Herb } from "./herb";

export class Place {
  public name: string;
  public herbs: Herb[] = [];

  constructor(name: string, herbs: Herb[] = []) {
    this.name = name;
    this.herbs = herbs;
  }
}
