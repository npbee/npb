import React from "react";
import Main from "./main";

export default function Post({ date, Content }) {
  return (
    <Main layout="post">
      <div>{date}</div>
      <article>
        <Content />
      </article>
    </Main>
  );
}
