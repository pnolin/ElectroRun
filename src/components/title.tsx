import React from "react";

import { BaseComponent, BaseComponentProps } from "./baseComponent";

import "../styles/title.css";

interface TitleProps extends BaseComponentProps {
  gameName: string;
  runCategory: string;
}

export class Title extends BaseComponent<TitleProps, {}> {
  constructor(props: TitleProps) {
    super(props);
  }

  public render = () => {
    const style = this.getStyle();

    return (
      <div id="title" style={style}>
        <div>{this.props.gameName}</div>
        <div id="title-separator">{`-`}</div>
        <div>{this.props.runCategory}</div>
      </div>
    );
  };
}
