import React from "react";

import "../styles/timer.css";

type TimerProps = {
  time: number;
};

export const Timer = (props: TimerProps) => {
  return <div id="timer">{getFormattedTime(props.time)}</div>;
};

const getFormattedTime = (elapsedTime: number) => {
  const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const totalSeconds = hours * 3660 + minutes * 60 + seconds;
  const remaining = elapsedTime - totalSeconds * 1000;

  const secondsText = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const minutesText = minutes < 10 ? `0${minutes}` : `${minutes}`;

  if (totalSeconds < 60) {
    return `${seconds}.${remaining}`;
  } else if (totalSeconds < 3600) {
    return `${minutes}:${secondsText}.${remaining}`;
  }

  return `${hours}:${minutesText}:${secondsText}.${remaining}`;
};
