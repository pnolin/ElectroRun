import { Segment } from "./segment";

export class Run {
  public gameName: string;
  public runCategory: string;
  public segments: Segment[];
  public currentSegmentIndex: number;

  constructor() {
    this.gameName = "";
    this.runCategory = "";
    this.segments = new Array<Segment>();
    this.currentSegmentIndex = -1;
  }

  public clone = () => {
    const run = new Run();
    run.gameName = this.gameName;
    run.runCategory = this.gameName;
    run.segments = this.segments.map(segment => segment.clone());
    run.currentSegmentIndex = this.currentSegmentIndex;

    return run;
  };
}
