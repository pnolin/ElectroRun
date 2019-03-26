import React from "react";

import { Segment as SegmentModel } from "../models/segment";
import Segment from "../components/segment";

import "../styles/segment.css";

type SegmentsProps = {
  segments: SegmentModel[];
};

export class Segments extends React.Component<SegmentsProps, {}> {
  public render = () => {
    const segments = this.props.segments.map((segment, index) => (
      <Segment segment={segment} key={index} />
    ));

    return <div>{segments}</div>;
  };
}
