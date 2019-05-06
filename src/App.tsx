const mainWindow = window.require("electron").remote.getCurrentWindow();
const { dialog } = window.require("electron").remote;
const fs = window.require("fs");

import React, { Component } from "react";

import { Timer } from "./components/timer";
import { Title } from "./components/title";
import { Segments } from "./components/segments";
import { SegmentsEditor } from "./components/segmentsEditor";
import { TimerState } from "./models/timerState";
import { Run } from "./models/run";
import { Segment as SegmentModel } from "./models/segment";
import { RunDto } from "./models/dtos/runDto";
import { LayoutOptions } from "./models/options/layoutOptions";
import { FileDialogFilter } from "./models/fileDialogFilter";
import { Timer as TimerUtil } from "./utils/timer";

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
  currentComparison?: Run;
  currentRun: Run;
  layoutOptions: LayoutOptions;
  currentRunFilename?: string;
};

class App extends Component<{}, AppState> {
  private dragging = false;
  private mouseX = 0;
  private mouseY = 0;
  private timer = new TimerUtil();
  private interval: NodeJS.Timeout;
  private defaultWidth = 300;
  private gapForMenu = 100;

  constructor(props: {}) {
    super(props);
    this.state = {
      currentRun: new Run(),
      elapsedTime: 0,
      state: TimerState.STOPPED,
      segmentsEditorOpen: false,
      layoutOptions: new LayoutOptions()
    };

    this.intervalHandler = this.intervalHandler.bind(this);
    this.interval = setInterval(this.intervalHandler, 1);
  }

  componentWillMount = () => {
    document.addEventListener("keydown", this.handleKeyDown);
  };

  componentDidMount = () => {
    mainWindow.setSize(this.defaultWidth, this.getAppHeight());
  };

  render = () => {
    return (
      <div>
        <div
          onMouseDownCapture={this.handleMouseDown}
          onMouseMoveCapture={this.handleMouseMove}
          onMouseUpCapture={this.handleMouseUp}
          onMouseLeave={this.handleMouseUp}
        >
          <ContextMenuTrigger id="timer-context-menu" holdToDisplay={-1}>
            {this.state.currentComparison && (
              <Title
                gameName={this.state.currentComparison.gameName}
                runCategory={this.state.currentComparison.runCategory}
                options={this.state.layoutOptions.titleOptions}
              />
            )}
            {this.state.currentComparison && (
              <Segments
                currentRunTime={this.state.elapsedTime}
                runSegments={this.state.currentRun.segments}
                comparedSegments={this.state.currentComparison!.segments}
                options={this.state.layoutOptions.segmentsOptions}
                currentSegmentIndex={this.state.currentRun.currentSegmentIndex}
              />
            )}
            <Timer
              time={this.state.elapsedTime}
              options={this.state.layoutOptions.timerOptions}
            />
          </ContextMenuTrigger>
        </div>
        <ContextMenu id="timer-context-menu">
          <MenuItem onClick={this.openSegmentsEditor}>
            Create New Splits
          </MenuItem>
          <MenuItem
            onClick={this.saveSplits}
            disabled={!this.state.currentComparison}
          >
            Save Splits
          </MenuItem>
          <MenuItem
            onClick={this.saveSplitsAs}
            disabled={!this.state.currentComparison}
          >
            Save Splits As
          </MenuItem>
          <MenuItem onClick={this.loadSplits}>Load Splits</MenuItem>
        </ContextMenu>

        <Popup
          open={this.state.segmentsEditorOpen}
          closeOnDocumentClick={false}
          contentStyle={{ width: "initial" }}
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
      this.handleSplit();
    }
  };

  private intervalHandler = () => {
    if (this.state.state === TimerState.RUNNING) {
      this.setState({ elapsedTime: this.timer.getTime() });
    }
  };

  private handleSplit = () => {
    if (this.state.state === TimerState.STOPPED) {
      this.start();
      if (this.state.currentComparison) {
        this.updateCurrentRunSegmentIndex(0);
      }
    } else if (this.state.state === TimerState.RUNNING) {
      if (!this.state.currentComparison) {
        this.pause();
      } else {
        this.split();
      }
    } else if (this.state.state === TimerState.PAUSED) {
      if (!this.state.currentComparison) {
        this.reset();
      } else {
        this.start();
      }
    } else if (this.state.state === TimerState.FINISHED) {
      this.reset();
      this.updateCurrentRunSegmentIndex(-1);
    }
  };

  private start = () => {
    this.timer.start();
    this.setState({ state: TimerState.RUNNING });
  };

  private pause = () => {
    this.timer.pause();
    this.setState({ state: TimerState.PAUSED });
  };

  private split = () => {
    if (this.state.currentComparison) {
      this.timer.split();
      this.updateCurrentRunSegmentIndex(
        this.state.currentRun.currentSegmentIndex + 1
      );
      if (
        this.state.currentRun.currentSegmentIndex ===
        this.state.currentRun.segments.length
      ) {
        this.timer.pause();
        this.setState({ state: TimerState.FINISHED });
      }
    } else {
      throw new Error("Not supposed to call this function without a run!");
    }
  };

  private reset = () => {
    this.timer.reset();
    this.setState({
      state: TimerState.STOPPED,
      elapsedTime: this.timer.getTime()
    });
  };

  private updateCurrentRunSegmentIndex = (currentSegmentIndex: number) => {
    const currentRun = this.state.currentRun;
    const newRun = currentRun.clone();
    newRun.currentSegmentIndex = currentSegmentIndex;
    newRun.segments = this.createSegments(newRun);
    this.setState({ currentRun: newRun });
  };

  private createSegments = (run: Run) => {
    const splits = this.timer.getSplits();

    return run.segments.map((segment, index) => {
      if (index < splits.length) {
        const newSegment = segment.clone();
        newSegment.splitTime = splits[index].endTime;

        return newSegment;
      }

      return segment;
    });
  };

  private openSegmentsEditor = () => {
    mainWindow.setSize(500, 500);
    this.setState({ segmentsEditorOpen: true });
  };

  private onSegmentsEditorSave = (run: Run) => {
    const currentRun = run.clone();
    currentRun.segments.forEach(segment => (segment.splitTime = undefined));

    this.setState({
      currentComparison: run.clone(),
      currentRun,
      segmentsEditorOpen: false
    });
    this.onSegmentsEditorClosed();
  };

  private onSegmentsEditorCancel = () => {
    this.setState({ segmentsEditorOpen: false });
    this.onSegmentsEditorClosed();
  };

  private onSegmentsEditorClosed = () => {
    mainWindow.setSize(this.defaultWidth, this.getAppHeight());
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
    fs.writeFileSync(
      filename,
      JSON.stringify(this.state.currentComparison),
      null
    );
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
        const loadedRun = this.parseRunFromFile(fileContent);
        const currentRun = loadedRun.clone();
        currentRun.segments.forEach(segment => (segment.splitTime = undefined));

        this.setState({
          currentRunFilename: filename,
          currentComparison: loadedRun,
          currentRun
        });
        mainWindow.setSize(this.defaultWidth, this.getAppHeight());
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

  private getAppHeight = () => {
    let height = this.state.layoutOptions.timerOptions.height;

    if (this.state.currentComparison) {
      height += this.state.layoutOptions.titleOptions.height;
      height +=
        this.state.layoutOptions.segmentsOptions.segmentOptions.height *
        this.state.currentComparison.segments.length;
    }

    return height + this.gapForMenu;
  };
}

export default App;
