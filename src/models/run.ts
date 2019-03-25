import { Segment } from "./segment";

export class Run {
  public gameName: string;
  public runCategory: string;
  public segments: Segment[];

  constructor() {
    this.gameName = "";
    this.runCategory = "";
    this.segments = new Array<Segment>();
  }
}
