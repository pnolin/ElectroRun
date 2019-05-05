import React from "react";

import { BaseComponent, BaseComponentProps } from "./baseComponent";
import { Segment as SegmentModel } from "../models/segment";
import { SegmentOptions } from "../models/options/segmentOptions";
import { elapsedTimeToString } from "../utils/timeFormat";

interface SegmentProps extends BaseComponentProps {
  segment: SegmentModel;
  comparedAgainst: SegmentModel;
  options: SegmentOptions;
  isCurrentSegment: boolean;
  splitted: boolean;
}

export class Segment extends BaseComponent<SegmentProps, {}> {
  constructor(props: SegmentProps) {
    super(props);
  }

  public render = () => {
    const style = this.getMyStyle();

    const ahead =
      this.props.segment.splitTime && this.props.comparedAgainst.splitTime
        ? this.props.segment.splitTime <= this.props.comparedAgainst.splitTime
        : null;

    const sign = ahead !== null ? (ahead ? "-" : "+") : "";
    const deltaStyle = ahead !== null ? this.getDeltaStyle(ahead) : {};
    const delta =
      this.props.segment.splitTime && this.props.comparedAgainst.splitTime
        ? elapsedTimeToString(
            Math.abs(
              this.props.segment.splitTime -
                this.props.comparedAgainst.splitTime
            ),
            this.props.options.timeFormatOptions!
          )
        : null;

    const deltaSpan = (
      <span style={deltaStyle}>
        {delta && this.props.splitted ? `${sign}${delta}` : ""}
      </span>
    );

    return (
      <div className="segment" style={style}>
        <div>{`${this.props.segment.name}`}</div>
        <div id="segment-times">
          {deltaSpan}
          <span>{`${
            this.props.segment.splitTime
              ? elapsedTimeToString(
                  this.props.segment.splitTime,
                  this.props.options.timeFormatOptions!
                )
              : "-"
          }`}</span>
        </div>
      </div>
    );
  };

  public getMyStyle = () => {
    const style = this.getStyle();
    style.backgroundColor = this.props.isCurrentSegment
      ? this.props.options.currentSegmentBackgroundColor
      : style.backgroundColor;

    return style;
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

export default Segment;
