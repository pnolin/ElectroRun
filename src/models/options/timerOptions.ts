import { BaseOptions } from "./baseOptions";
import { TimeFormatOptions } from "./timeFormatOptions";
import { DecimalPlaces } from "./decimalPlaces";

export class TimerOptions extends BaseOptions {
  constructor(height: number) {
    super(height);
    this.timeFormatOptions = new TimeFormatOptions(DecimalPlaces.HUNDREDTH);
  }
}
