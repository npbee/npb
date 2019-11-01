import React from "react";
import Main from "./main";
import { Time } from "components/ui/blocks";

export default function Post({ date, Content }) {
  return (
    <Main layout="post">
      <Time>{date}</Time>
      <article>
        <Content />
      </article>
      <style jsx>{`
        max-width: 55ch;
        margin: auto;
      `}</style>
    </Main>
  );
}
