import React from "react";

import { BaseOptions } from "../models/options/baseOptions";

export interface BaseComponentProps {
  options: BaseOptions;
}

export class BaseComponent<
  P extends BaseComponentProps,
  S
> extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
  }

  protected getStyle = () => {
    return {
      height: this.props.options.height,
      backgroundColor: this.props.options.backgroundColor,
      color: this.props.options.textColor
    };
  };
}
