import React from "react";

import { elapsedTimeToString } from "../utils/timeFormat";

import "../styles/timer.css";

type TimerProps = {
  time: number;
};

export const Timer = (props: TimerProps) => {
  return <div id="timer">{elapsedTimeToString(props.time)}</div>;
};
