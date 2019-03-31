import React from "react";

import { Segment as SegmentModel } from "../models/segment";
import { elapsedTimeToString } from "../utils/timeFormat";
import { SegmentOptions } from "../models/options/segmentOptions";

type SegmentProps = {
  segment: SegmentModel;
  options: SegmentOptions;
};

const Segment = (props: SegmentProps) => {
  const style = { height: props.options.height };
  return (
    <div className="segment" style={style}>
      <span>{`${props.segment.name}`}</span>
      <span>{`${
        props.segment.splitTime
          ? elapsedTimeToString(props.segment.splitTime)
          : "-"
      }`}</span>
    </div>
  );
};

export default Segment;
