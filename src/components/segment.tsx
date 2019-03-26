import React from "react";

import { Segment as SegmentModel } from "../models/segment";
import { elapsedTimeToString } from "../utils/timeFormat";

type SegmentProps = {
  segment: SegmentModel;
};

const Segment = (props: SegmentProps) => {
  return (
    <div className="segment">
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
