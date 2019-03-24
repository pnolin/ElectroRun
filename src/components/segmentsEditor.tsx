import React from "react";

import { Segment } from "../models/segment";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faTimes);

import "../styles/segmentsEditor.css";

type SegmentsEditorState = {
  gameName: string;
  runCategory: string;
  segments: Segment[];
};

export class SegmentsEditor extends React.Component<{}, SegmentsEditorState> {
  constructor(props: {}) {
    super(props);

    const segments = new Array<Segment>();
    segments.push(new Segment());

    this.state = {
      gameName: "",
      runCategory: "",
      segments
    };
  }

  public render = () => {
    const segments = this.state.segments.map((segment, index) => {
      return (
        <div key={index}>
          <input
            type="text"
            id="segment-name"
            name="segment-name"
            value={segment.name}
            onChange={this.handleSegmentNameChange(index)}
          />
          <input
            type="number"
            id="segment-split-time"
            name="segment-split-time"
            value={segment.splitTime}
          />
          {index > 0 && (
            <span onClick={this.deleteSegment(index)}>
              <FontAwesomeIcon icon="times" />
            </span>
          )}
        </div>
      );
    });

    return (
      <form name="segments-editor-form">
        <div className="form-input">
          <label htmlFor="game-name">Game Name:</label>
          <input
            type="text"
            id="game-name"
            name="game-name"
            value={this.state.gameName}
            onChange={this.handleGameNameChange}
          />
        </div>
        <div className="form-input">
          <label htmlFor="run-category">Run Category:</label>
          <input
            type="text"
            id="run-category"
            name="run-category"
            value={this.state.runCategory}
            onChange={this.handleRunCategoryChange}
          />
        </div>
        <div className="segments-grid">
          <div className="segments-grid-header">
            <div className="segment-grid-header-title">Segment Name</div>
            <div className="segment-grid-header-title">Split Time</div>
          </div>
          <div className="segments-grid-segments">{segments}</div>
          <button onClick={this.addSegment}>Add Segment</button>
        </div>
      </form>
    );
  };

  private handleGameNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ gameName: event.target.value });
  };

  private handleRunCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ runCategory: event.target.value });
  };

  private handleSegmentNameChange = (index: number) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const segments = this.state.segments.map(segment =>
        Object.assign({}, segment)
      );
      segments[index].name = event.target.value;
      this.setState({ segments });
    };
  };

  private addSegment = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    this.setState({ segments: this.state.segments.concat(new Segment()) });
  };

  private deleteSegment = (index: number) => {
    return (_: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const segments = this.state.segments.filter(
        (_, stateIndex) => stateIndex !== index
      );
      this.setState({ segments });
    };
  };
}
