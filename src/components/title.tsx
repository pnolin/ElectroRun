import React from "react";

import "../styles/title.css";

type TitleProps = {
  gameName: string;
  runCategory: string;
};

export const Title = (props: TitleProps) => {
  return (
    <div id="title">
      <div>{props.gameName}</div>
      <div id="title-separator">{`-`}</div>
      <div>{props.runCategory}</div>
    </div>
  );
};
