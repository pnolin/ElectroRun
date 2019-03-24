import React, { Component } from "react";

import { Stopwatch } from "ts-stopwatch";
import { Timer } from "./components/timer";
import { TimerState } from "./models/timerState";

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import "./styles/contextMenu.css";

type AppState = {
  elapsedTime: number;
  state: TimerState;
};

class App extends Component<{}, AppState> {
  private stopwatch = new Stopwatch();
  private interval: NodeJS.Timeout;

  constructor(props: {}) {
    super(props);
    this.state = {
      elapsedTime: this.stopwatch.getTime(),
      state: TimerState.STOPPED
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
          <Timer time={this.state.elapsedTime} />
        </ContextMenuTrigger>

        <ContextMenu id="timer-context-menu">
          <MenuItem data={{ foo: "test" }} onClick={this.start}>
            Create New Splits
          </MenuItem>
        </ContextMenu>
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

  private stop = () => {
    this.stopwatch.stop();
  };

  private reset = () => {
    this.stopwatch.reset();
  };

  private unsplit = () => {
    // TODO Le Unsplit
  };
}

export default App;
