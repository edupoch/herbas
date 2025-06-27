import { Herb } from "./herb";

export class Goal {
  public name: string;
  public herbs: Herb[] = [];
  public completed: boolean = false;

  constructor(name: string, herbs: Herb[] = []) {
    this.name = name;
    this.herbs = herbs;
  }
}
