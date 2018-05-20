import React from "react";
import Head from "next/head";
import withStyle from "./shared/withStyle";
import * as theme from "components/ui/theme";
import styled from "react-emotion";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",
  marginLeft: "auto",
  marginRight: "auto",
  padding: theme.space(3),
  width: "100%",
  maxWidth: 700,
  minHeight: "100vh",
});

export default withStyle(({ children }) => {
  return (
    <Main>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="//cloud.typography.com/7821852/748866/css/fonts.css"
        />
        <link
          rel="icon"
          type="image/png"
          href="static/favicon/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="static/favicon/android-chrome-192x192.png"
          sizes="192x192"
        />
        <link
          rel="icon"
          type="image/png"
          href="static/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="static/favicon/favicon-16x16.png"
          sizes="16x16"
        />
      </Head>

      <div css={{ flex: 1 }}>{children}</div>
    </Main>
  );
});
