import { TimeFormatOptions } from "./timeFormatOptions";

export abstract class BaseOptions {
  height: number;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  timeFormatOptions?: TimeFormatOptions;

  constructor(height: number) {
    this.height = height;
    this.backgroundColor = "#000000";
    this.textColor = "#ffffff";
    this.fontFamily = "Segoe UI";
  }
}
