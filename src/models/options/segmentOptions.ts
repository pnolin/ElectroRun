import { BaseOptions } from "./baseOptions";
import { TimeFormatOptions } from "./timeFormatOptions";
import { DecimalPlaces } from "./decimalPlaces";
import { DeltaColorOptions } from "./deltaColorOptions";

export class SegmentOptions extends BaseOptions {
  public currentSegmentBackgroundColor: string;
  public deltaColorOptions: DeltaColorOptions;

  constructor(height: number) {
    super(height);
    this.currentSegmentBackgroundColor = "#153574";
    this.timeFormatOptions = new TimeFormatOptions(DecimalPlaces.NONE);
    this.deltaColorOptions = new DeltaColorOptions();
    this.deltaColorOptions.behindLostTime = "#CC1200";
    this.deltaColorOptions.behindSavedTime = "#CC5C52";
    this.deltaColorOptions.aheadLostTime = "#52CC73";
    this.deltaColorOptions.aheadSavedTime = "#00CC36";
  }
}
