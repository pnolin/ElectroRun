import React from "react";

import { BaseComponent, BaseComponentProps } from "./baseComponent";
import { Segment as SegmentModel } from "../models/segment";
import { SegmentOptions } from "../models/options/segmentOptions";
import { elapsedTimeToString } from "../utils/timeFormat";

interface SegmentProps extends BaseComponentProps {
  splittedSegment: SegmentModel;
  comparedAgainst: SegmentModel;
  options: SegmentOptions;
}

export class SplittedSegment extends BaseComponent<SegmentProps, {}> {
  private delta: number | null;
  private ahead: boolean;
  private sign: string;
  private style: any;
  private deltaStyle: any;

  constructor(props: SegmentProps) {
    super(props);

    this.delta = this.props.comparedAgainst.splitTime
      ? this.props.splittedSegment.splitTime! -
        this.props.comparedAgainst.splitTime
      : null;

    this.ahead = this.delta !== null && this.delta <= 0;
    this.sign = this.ahead ? "-" : "+";
    this.style = this.getStyle();
    this.deltaStyle = this.getDeltaStyle(this.ahead);
  }

  public render = () => {
    const deltaSpan = (
      <span style={this.deltaStyle}>
        {this.delta !== null
          ? `${this.sign}${elapsedTimeToString(
              Math.abs(this.delta),
              this.props.options.timeFormatOptions!
            )}`
          : ""}
      </span>
    );

    return (
      <div className="segment" style={this.style}>
        <div>{`${this.props.splittedSegment.name}`}</div>
        <div id="segment-times">
          {deltaSpan}
          <span>{`${
            this.props.splittedSegment.splitTime
              ? elapsedTimeToString(
                  this.props.splittedSegment.splitTime,
                  this.props.options.timeFormatOptions!
                )
              : "-"
          }`}</span>
        </div>
      </div>
    );
  };

  public getDeltaStyle = (ahead: boolean) => {
    if (ahead) {
      return {
        color: this.props.options.deltaColorOptions.aheadSavedTime
      };
    }

    return {
      color: this.props.options.deltaColorOptions.behindLostTime
    };
  };
}

export default SplittedSegment;
