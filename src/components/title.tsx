import React from "react";

import { TitleOptions } from "../models/options/titleOptions";

import "../styles/title.css";

type TitleProps = {
  gameName: string;
  runCategory: string;
  options: TitleOptions;
};

export const Title = (props: TitleProps) => {
  const style = {
    height: props.options.height,
    color: props.options.textColor
  };

  return (
    <div id="title" style={style}>
      <div>{props.gameName}</div>
      <div id="title-separator">{`-`}</div>
      <div>{props.runCategory}</div>
    </div>
  );
};
