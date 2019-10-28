import React, { Component } from "react";
import { hydrate, injectGlobal } from "react-emotion";
import globalStyle from "./style";

const withStyle = ComposedComponent => {
  class HOC extends Component {
    UNSAFE_componentWillMount() {
      if (typeof window !== "undefined") {
        hydrate(window.__NEXT_DATA__.ids);
      }
      // injectGlobal`${globalStyle}`;
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return HOC;
};

export default withStyle;
