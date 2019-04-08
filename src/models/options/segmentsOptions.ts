import { SegmentOptions } from "./segmentOptions";

export class SegmentsOptions {
  public segmentOptions: SegmentOptions;

  constructor() {
    this.segmentOptions = new SegmentOptions(30);
  }
}
