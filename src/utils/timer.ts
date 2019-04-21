import { Stopwatch } from "ts-stopwatch";

export class Timer {
  private stopwatch: Stopwatch;

  constructor() {
    this.stopwatch = new Stopwatch();
  }

  public start = () => {
    this.stopwatch.start();
  };

  public pause = () => {
    this.stopwatch.stop();
  };

  public split = () => {
    this.stopwatch.slice();
  };

  public reset = () => {
    this.stopwatch.reset();
  };

  public getTime = () => {
    return this.stopwatch.getTime();
  };

  public getSplits = () => {
    return this.stopwatch.getCompletedSlices();
  };
}
