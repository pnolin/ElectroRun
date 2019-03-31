const mainWindow = window.require("electron").remote.getCurrentWindow();
const { dialog } = window.require("electron").remote;
const fs = window.require("fs");

import React, { Component } from "react";

import { Stopwatch } from "ts-stopwatch";
import { Timer } from "./components/timer";
import { Title } from "./components/title";
import { Segments } from "./components/segments";
import { SegmentsEditor } from "./components/segmentsEditor";
import { TimerState } from "./models/timerState";
import { Run } from "./models/run";
import { Segment as SegmentModel } from "./models/segment";
import { RunDto } from "./models/dtos/runDto";
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
  currentRunFilename?: string;
};

class App extends Component<{}, AppState> {
  private dragging = false;
  private mouseX = 0;
  private mouseY = 0;
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
      <div
        id="electro-run"
        onMouseDownCapture={this.handleMouseDown}
        onMouseMoveCapture={this.handleMouseMove}
        onMouseUpCapture={this.handleMouseUp}
        onMouseLeave={this.handleMouseUp}
      >
        <ContextMenuTrigger id="timer-context-menu" holdToDisplay={-1}>
          {this.state.run && (
            <Title
              gameName={this.state.run.gameName}
              runCategory={this.state.run.runCategory}
            />
          )}
          {this.state.run && <Segments segments={this.state.run.segments} />}
          <Timer time={this.state.elapsedTime} />
        </ContextMenuTrigger>

        <ContextMenu id="timer-context-menu">
          <MenuItem onClick={this.openSegmentsEditor}>
            Create New Splits
          </MenuItem>
          <MenuItem onClick={this.saveSplits} disabled={!this.state.run}>
            Save Splits
          </MenuItem>
          <MenuItem onClick={this.saveSplitsAs} disabled={!this.state.run}>
            Save Splits As
          </MenuItem>
          <MenuItem onClick={this.loadSplits}>Load Splits</MenuItem>
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

  private handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.button === 0) {
      this.dragging = true;
      this.mouseX = event.pageX;
      this.mouseY = event.pageY;
    }
  };

  private handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (event.button === 0 && this.dragging) {
      var xLocation = event.screenX - this.mouseX;
      var yLocation = event.screenY - this.mouseY;

      mainWindow.setPosition(xLocation, yLocation);
    }
  };

  private handleMouseUp = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.button === 0) {
      this.dragging = false;
    }
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

  private saveSplits = () => {
    const filename = this.state.currentRunFilename;

    if (filename) {
      this.saveSplitsToFile(filename);
    } else {
      this.saveSplitsAs();
    }
  };

  private saveSplitsAs = () => {
    const filters = this.getSplitsFileDialogFilters();

    const options = {
      title: "Save As",
      filters
    };
    dialog.showSaveDialog(null, options, (filename?: string) => {
      if (filename) {
        this.saveSplitsToFile(filename);
        this.setState({ currentRunFilename: filename });
      }
    });
  };

  private saveSplitsToFile = (filename: string) => {
    fs.writeFileSync(filename, JSON.stringify(this.state.run), null);
  };

  private loadSplits = () => {
    const filters = this.getSplitsFileDialogFilters();

    const options = {
      filters
    };

    dialog.showOpenDialog(null, options, (filePaths?: string[]) => {
      if (filePaths) {
        const filename = filePaths[0];
        const fileContent = fs.readFileSync(filename);
        this.setState({ run: this.parseRunFromFile(fileContent) });
        this.setState({ currentRunFilename: filename });
      }
    });
  };

  private getSplitsFileDialogFilters = () => {
    const filters = new Array<FileDialogFilter>();
    filters.push({ name: "ElectroRun Splits", extensions: ["ess"] });

    return filters;
  };

  private parseRunFromFile = (fileContent: string) => {
    const run = new Run();
    const parsedContent = JSON.parse(fileContent) as RunDto;

    run.gameName = parsedContent.gameName!;
    run.runCategory = parsedContent.runCategory!;
    run.segments = parsedContent.segments!.map(segmentDto => {
      const segment = new SegmentModel();
      segment.name = segmentDto.name!;
      segment.splitTime = segmentDto.splitTime;

      return segment;
    });

    return run;
  };
}

export default App;
