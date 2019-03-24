import React from "react";

import { Segment } from "../models/segment";

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
          />
          <input
            type="number"
            id="segment-split-time"
            name="segment-split-time"
            value={segment.splitTime}
          />
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
          />
        </div>
        <div className="form-input">
          <label htmlFor="run-category">Run Category:</label>
          <input
            type="text"
            id="run-category"
            name="run-category"
            value={this.state.runCategory}
          />
        </div>
        <div className="segments-grid">
          <div className="segments-grid-header">
            <div className="segment-grid-header-title">Segment Name</div>
            <div className="segment-grid-header-title">Split Time</div>
          </div>
          {segments}
        </div>
      </form>
    );
  };
}
