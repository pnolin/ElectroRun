import React from "react";

import { Segment as SegmentModel } from "../models/segment";
import Segment from "../components/segment";
import { SegmentsOptions } from "../models/options/segmentsOptions";

import "../styles/segment.css";

type SegmentsProps = {
  segments: SegmentModel[];
  options: SegmentsOptions;
};

export class Segments extends React.Component<SegmentsProps, {}> {
  public render = () => {
    const segments = this.props.segments.map((segment, index) => (
      <Segment
        segment={segment}
        key={index}
        options={this.props.options.segmentOptions}
      />
    ));

    return <div>{segments}</div>;
  };
}
