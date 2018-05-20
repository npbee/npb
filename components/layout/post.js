import React from "react";
import Main from "./main";
import {
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
          h1: H1,
          h2: H2,
          h3: H3,
          p: P,
          ul: Ul,
          hr: Hr,
          img: Img,
          blockquote: Blockquote,
        }}
      />
    </Main>
  );
}
