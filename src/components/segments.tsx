import React from "react";

import { BaseComponent, BaseComponentProps } from "./baseComponent";
import { Segment as SegmentModel } from "../models/segment";
import { SegmentsOptions } from "../models/options/segmentsOptions";
import Segment from "../components/segment";

import "../styles/segment.css";

interface SegmentsProps extends BaseComponentProps {
  segments: SegmentModel[];
  comparedSegemnts: SegmentModel[];
  options: SegmentsOptions;
  currentSegmentIndex: number;
}

export class Segments extends BaseComponent<SegmentsProps, {}> {
  constructor(props: SegmentsProps) {
    super(props);
  }

  public render = () => {
    const segments = this.props.segments.map((segment, index) => (
      <Segment
        segment={segment}
        comparedAgainst={this.props.comparedSegemnts[index]}
        key={index}
        options={this.props.options.segmentOptions}
        isCurrentSegment={this.props.currentSegmentIndex === index}
        splitted={this.props.currentSegmentIndex > index}
      />
    ));

    return <div>{segments}</div>;
  };
}
