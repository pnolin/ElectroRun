import React from "react";

import { BaseComponent, BaseComponentProps } from "./baseComponent";
import { Segment as SegmentModel } from "../models/segment";
import { SegmentsOptions } from "../models/options/segmentsOptions";
import { SplittedSegment } from "./splittedSegment";
import { UnsplittedSegment } from "./unsplittedSegment";

import "../styles/segment.css";

interface SegmentsProps extends BaseComponentProps {
  runSegments: SegmentModel[];
  comparedSegments: SegmentModel[];
  options: SegmentsOptions;
  currentSegmentIndex: number;
}

export class Segments extends BaseComponent<SegmentsProps, {}> {
  constructor(props: SegmentsProps) {
    super(props);
  }

  public render = () => {
    const segments = this.props.comparedSegments.map((segment, index) => {
      const runSegment = this.props.runSegments[index];
      if (runSegment.splitTime) {
        return (
          <SplittedSegment
            key={index}
            splittedSegment={runSegment}
            comparedAgainst={segment}
            options={this.props.options.segmentOptions}
          />
        );
      } else {
        return (
          <UnsplittedSegment
            key={index}
            comparedAgainst={segment}
            options={this.props.options.segmentOptions}
            isCurrentSegment={this.props.currentSegmentIndex === index}
          />
        );
      }
    });

    return <div>{segments}</div>;
  };
}
