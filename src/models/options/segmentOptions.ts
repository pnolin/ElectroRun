import { BaseOptions } from "./baseOptions";

export class SegmentOptions extends BaseOptions {
  public currentSegmentBackgroundColor: string;

  constructor(height: number) {
    super(height);
    this.currentSegmentBackgroundColor = "#153574";
  }
}
