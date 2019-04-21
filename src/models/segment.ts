export class Segment {
  public name: string;
  public splitTime?: number;

  constructor() {
    this.name = "";
    this.splitTime = undefined;
  }

  public clone = () => {
    const segment = new Segment();
    segment.name = this.name;
    segment.splitTime = this.splitTime;

    return segment;
  };
}
