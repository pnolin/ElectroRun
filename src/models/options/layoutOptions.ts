import { TimerOptions } from "./timerOptions";
import { SegmentsOptions } from "./segmentsOptions";
import { TitleOptions } from "./titleOptions";

export class LayoutOptions {
  public timerOptions: TimerOptions;
  public titleOptions: TitleOptions;
  public segmentsOptions: SegmentsOptions;

  constructor() {
    this.timerOptions = new TimerOptions(70);
    this.titleOptions = new TitleOptions(20);
    this.segmentsOptions = new SegmentsOptions();
  }
}
