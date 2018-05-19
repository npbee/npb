import Head from "next/head";
import Footer from "./shared/footer";
import withStyle from "./shared/withStyle";
import { breakpoint, spacing } from "../../lib/theme";
import styled from "react-emotion";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  padding: ${spacing(3)};
  width: 100%;
  max-width: 700px;
  min-height: 100vh;
`;

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
