import React from "react";

import { elapsedTimeToString } from "../utils/timeFormat";
import { TimerOptions } from "../models/options/timerOptions";

import "../styles/timer.css";

type TimerProps = {
  time: number;
  options: TimerOptions;
};

export const Timer = (props: TimerProps) => {
  const style = { height: props.options.height };
  return (
    <div id="timer" style={style}>
      {elapsedTimeToString(props.time)}
    </div>
  );
};
