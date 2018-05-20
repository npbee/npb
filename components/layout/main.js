import React from "react";
import Head from "next/head";
import Avatar from "./shared/avatar";
import Footer from "./shared/footer";
import * as theme from "components/ui/theme";
import withStyle from "./shared/withStyle";
import styled from "react-emotion";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",
  maxWidth: 900,
  minHeight: "100vh",
  marginLeft: "auto",
  marginRight: "auto",
  padding: theme.space(3),
  width: "100%",
});

const Content = styled.div({ flex: 1 });

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
        <title>Nick Ball</title>
        <meta name="viewport" content="width=device-width" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

                ga('create', 'UA-46265154-1', 'auto');
                ga('send', 'pageview');
                `,
          }}
        />
      </Head>

      <Avatar />
      <Content>{children}</Content>
      <Footer />
    </Main>
  );
});
