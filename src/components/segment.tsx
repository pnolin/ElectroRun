import React from "react";

import { BaseComponent, BaseComponentProps } from "./baseComponent";
import { Segment as SegmentModel } from "../models/segment";
import { SegmentOptions } from "../models/options/segmentOptions";
import { elapsedTimeToString } from "../utils/timeFormat";

interface SegmentProps extends BaseComponentProps {
  segment: SegmentModel;
  options: SegmentOptions;
  isCurrentSegment: boolean;
}

export class Segment extends BaseComponent<SegmentProps, {}> {
  constructor(props: SegmentProps) {
    super(props);
  }

  public render = () => {
    const style = this.getMyStyle();
    return (
      <div className="segment" style={style}>
        <span>{`${this.props.segment.name}`}</span>
        <span>{`${
          this.props.segment.splitTime
            ? elapsedTimeToString(this.props.segment.splitTime)
            : "-"
        }`}</span>
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
}

export default Segment;
