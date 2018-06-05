import React from "react";
import Head from "next/head";
import Avatar from "./shared/avatar";
import Footer from "./shared/footer";
import * as theme from "components/ui/theme";
import withStyle from "./shared/withStyle";
import styled from "react-emotion";

const Main = styled.main(
  {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.space(3),
    maxWidth: 800,
    width: "100%",
  },
  props => ({
    maxWidth: props.post ? 700 : 900,
  })
);

const Content = styled.div({ flex: 1 });

export default withStyle(({ children, post }) => {
  return (
    <Main post={post}>
      <Head>
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
        <title>Nick Ball</title>
        <meta name="viewport" content="width=device-width" />
      </Head>

      <Avatar />
      <Content>{children}</Content>
      <Footer />
    </Main>
  );
});
