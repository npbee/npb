import React from "react";
import Main from "./main";
import {
  A,
  InlineCode,
  Time,
  Hr,
  H1,
  H2,
  H3,
  P,
  Ul,
  Img,
  Blockquote,
} from "components/ui/blocks";

export default function Post({ date, Content }) {
  return (
    <Main post>
      <Time>{date}</Time>
      <Content
        components={{
          h1: function PostH1(props) {
            return <H1 {...props} css={{ marginTop: 0 }} />;
          },
          h2: H2,
          h3: H3,
          p: P,
          ul: Ul,
          hr: Hr,
          img: Img,
          blockquote: Blockquote,
          a: A,
          inlineCode: InlineCode,
        }}
      />
    </Main>
  );
}
