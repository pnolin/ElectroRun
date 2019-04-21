import { DecimalPlaces } from "./decimalPlaces";

export class TimeFormatOptions {
  decimalPlaces: DecimalPlaces;

  constructor(decimalPlaces: DecimalPlaces) {
    this.decimalPlaces = decimalPlaces;
  }
}
