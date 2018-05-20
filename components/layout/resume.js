import React from "react";
import Head from "next/head";
import withStyle from "./shared/withStyle";
import { Box } from "components/ui/blocks";

const Main = props => (
  <Box
    {...props}
    is="main"
    display="flex"
    flexDirection="column"
    mx="auto"
    p={3}
    w={1}
    maxWidth={700}
    css={{ minHeight: "100vh" }}
  />
);

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
