export abstract class BaseOptions {
  height: number;
  textColor: string;
  fontFamily: string;

  constructor(height: number) {
    this.height = height;
    this.textColor = "#ffffff";
    this.fontFamily = "Segoe UI";
  }
}
