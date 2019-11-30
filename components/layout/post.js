import React from "react";
import Main from "./main";

export default function Post({ date, Content }) {
  return (
    <Main layout="post">
      <div className=" text-xs uppercase font-semibold text-gray-700 tracking-wider">
        {date}
      </div>
      <article>
        <Content />
      </article>
    </Main>
  );
}
