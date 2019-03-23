import React, { Component } from "react";
import { Stopwatch } from "ts-stopwatch";
import { Timer } from "./components/timer";

type AppState = {
  elapsedTime: number;
};

class App extends Component<{}, AppState> {
  private stopwatch = new Stopwatch();
  private interval: NodeJS.Timeout;

  constructor({}) {
    super({});
    this.state = {
      elapsedTime: this.stopwatch.getTime()
    };
    this.interval = setInterval(
      () => this.setState({ elapsedTime: this.stopwatch.getTime() }),
      1
    );
  }

  componentWillMount = () => {
    document.addEventListener("keydown", this.handleKeyDown);
  };

  render = () => {
    return (
      <div>
        <Timer time={this.state.elapsedTime} />
      </div>
    );
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 32) {
      this.start();
    }
  };

  private start = () => {
    this.stopwatch.start();
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
