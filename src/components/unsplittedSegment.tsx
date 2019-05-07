import React from "react";

import { BaseComponent, BaseComponentProps } from "./baseComponent";
import { Segment as SegmentModel } from "../models/segment";
import { SegmentOptions } from "../models/options/segmentOptions";
import { elapsedTimeToString } from "../utils/timeFormat";

interface SegmentProps extends BaseComponentProps {
  currentRunTime: number;
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

    const delta =
      this.props.comparedAgainst.splitTime !== undefined
        ? this.props.currentRunTime - this.props.comparedAgainst.splitTime
        : undefined;

    const deltaSpan =
      delta !== undefined && delta > 0 ? (
        <span
          style={{ color: this.props.options.deltaColorOptions.behindLostTime }}
        >
          {`+${elapsedTimeToString(
            delta,
            this.props.options.timeFormatOptions!
          )}`}
        </span>
      ) : (
        <span />
      );

    return (
      <div className="segment" style={style}>
        <div>{`${this.props.comparedAgainst.name}`}</div>
        <div id="segment-times">
          {deltaSpan}
          <span>{`${
            this.props.comparedAgainst.splitTime !== undefined
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
