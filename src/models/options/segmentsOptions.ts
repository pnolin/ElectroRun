import { SegmentOptions } from "./segmentOptions";
import { BaseOptions } from "./baseOptions";

export class SegmentsOptions extends BaseOptions {
  public segmentOptions: SegmentOptions;

  constructor() {
    super(0);
    this.segmentOptions = new SegmentOptions(30);
  }
}
