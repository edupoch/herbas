import { Herb } from "./herb";

export class Goal {
  public name: string;
  public description: string;
  public herbs: Herb[] = [];
  public completed: boolean = false;

  constructor(name: string, description: string, herbs: Herb[] = []) {
    this.name = name;
    this.description = description;
    this.herbs = herbs;
  }
}
