const { dialog } = window.require("electron").remote;

import React, { Component, createRef, RefObject } from "react";

import { Stopwatch } from "ts-stopwatch";
import { Timer } from "./components/timer";
import { Segments } from "./components/segments";
import { SegmentsEditor } from "./components/segmentsEditor";
import { TimerState } from "./models/timerState";
import { Run } from "./models/run";
import { FileDialogFilter } from "./models/fileDialogFilter";

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Popup from "reactjs-popup";

import "./styles/contextMenu.css";

declare global {
  interface Window {
    require: (id: string) => any;
  }
}

type AppState = {
  elapsedTime: number;
  state: TimerState;
  segmentsEditorOpen: boolean;
  run?: Run;
};

class App extends Component<{}, AppState> {
  private stopwatch = new Stopwatch();
  private interval: NodeJS.Timeout;

  constructor(props: {}) {
    super(props);
    this.state = {
      elapsedTime: this.stopwatch.getTime(),
      state: TimerState.STOPPED,
      segmentsEditorOpen: false
    };
    this.intervalHandler = this.intervalHandler.bind(this);
    this.interval = setInterval(this.intervalHandler, 1);
  }

  componentWillMount = () => {
    document.addEventListener("keydown", this.handleKeyDown);
  };

  render = () => {
    return (
      <div>
        <ContextMenuTrigger id="timer-context-menu">
          {this.state.run && <Segments segments={this.state.run.segments} />}
          <Timer time={this.state.elapsedTime} />
        </ContextMenuTrigger>

        <ContextMenu id="timer-context-menu">
          <MenuItem onClick={this.openSegmentsEditor}>
            Create New Splits
          </MenuItem>
          <MenuItem onClick={this.saveSplitsAs} disabled={!this.state.run}>
            Save Splits As
          </MenuItem>
        </ContextMenu>

        <Popup
          open={this.state.segmentsEditorOpen}
          closeOnDocumentClick={false}
        >
          <SegmentsEditor
            onSave={this.onSegmentsEditorSave}
            onCancel={this.onSegmentsEditorCancel}
          />
        </Popup>
      </div>
    );
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
    document.removeEventListener("keydown", this.handleKeyDown);
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 32) {
      this.start();
    }
  };

  private intervalHandler = () => {
    if (this.state.state === TimerState.RUNNING) {
      this.setState({ elapsedTime: this.stopwatch.getTime() });
    }
  };

  private start = () => {
    this.stopwatch.start();
    this.setState({ state: TimerState.RUNNING });
  };

  private openSegmentsEditor = () => {
    this.setState({ segmentsEditorOpen: true });
  };

  private onSegmentsEditorSave = (run: Run) => {
    this.setState({ run, segmentsEditorOpen: false });
  };

  private onSegmentsEditorCancel = () => {
    this.setState({ segmentsEditorOpen: false });
  };

  private saveSplitsAs = () => {
    const filters = new Array<FileDialogFilter>();
    filters.push({ name: "ElectroRun Splits", extensions: ["ess"] });

    const options = {
      title: "Save As",
      filters
    };
    dialog.showSaveDialog(null, options);
  };
}

export default App;
