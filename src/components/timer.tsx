import React from "react";

import { BaseComponent, BaseComponentProps } from "./baseComponent";
import { elapsedTimeToString } from "../utils/timeFormat";

import "../styles/timer.css";

interface TimerProps extends BaseComponentProps {
  time: number;
}

export class Timer extends BaseComponent<TimerProps, {}> {
  constructor(props: TimerProps) {
    super(props);
  }

  public render = () => {
    const style = this.getStyle();

    return (
      <div id="timer" style={style}>
        {elapsedTimeToString(this.props.time)}
      </div>
    );
  };
}
