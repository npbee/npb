import Head from "next/head";
import Post from "components/layout/post";
import Content from "./index.md";

export default function() {
  return (
    <div>
      <Head>
        <script src="https://production-assets.codepen.io/assets/embed/ei.js" />
      </Head>
      <Post date="February 27, 2016" raw>
        <Content />
      </Post>
    </div>
  );
}
