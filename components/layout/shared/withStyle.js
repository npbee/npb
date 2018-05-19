import React, { Component } from "react";
import { hydrate, injectGlobal } from "react-emotion";
import { ThemeProvider } from "emotion-theming";
import theme from "components/ui/theme";
import globalStyle from "./style";

const withStyle = ComposedComponent => {
  class HOC extends Component {
    componentWillMount() {
      if (typeof window !== "undefined") {
        hydrate(window.__NEXT_DATA__.ids);
      }
      injectGlobal`${globalStyle}`;
    }

    render() {
      return (
        <ThemeProvider theme={theme}>
          <ComposedComponent {...this.props} />
        </ThemeProvider>
      );
    }
  }

  return HOC;
};

export default withStyle;
