import { BaseOptions } from "./baseOptions";
import { TimeFormatOptions } from "./timeFormatOptions";
import { DecimalPlaces } from "./decimalPlaces";

export class SegmentOptions extends BaseOptions {
  public currentSegmentBackgroundColor: string;

  constructor(height: number) {
    super(height);
    this.currentSegmentBackgroundColor = "#153574";
    this.timeFormatOptions = new TimeFormatOptions(DecimalPlaces.NONE);
  }
}
