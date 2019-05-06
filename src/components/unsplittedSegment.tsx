import React from "react";

import { BaseComponent, BaseComponentProps } from "./baseComponent";
import { Segment as SegmentModel } from "../models/segment";
import { SegmentOptions } from "../models/options/segmentOptions";
import { elapsedTimeToString } from "../utils/timeFormat";

interface SegmentProps extends BaseComponentProps {
  comparedAgainst: SegmentModel;
  options: SegmentOptions;
  isCurrentSegment: boolean;
}

export class UnsplittedSegment extends BaseComponent<SegmentProps, {}> {
  constructor(props: SegmentProps) {
    super(props);
  }

  public render = () => {
    const style = this.getMyStyle();

    return (
      <div className="segment" style={style}>
        <div>{`${this.props.comparedAgainst.name}`}</div>
        <div id="segment-times">
          <span id="on-going-delta" />
          <span>{`${
            this.props.comparedAgainst.splitTime
              ? elapsedTimeToString(
                  this.props.comparedAgainst.splitTime,
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

export default UnsplittedSegment;
