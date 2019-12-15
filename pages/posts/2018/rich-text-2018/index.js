import React from "react";
import Post from "../../../../components/layout/post";
import Content from "./content.md";

export default function RichText2018() {
  return (
    <Post
      date="July 4th, 2018"
      title="Rich Text on the Web in 2018"
      description="Thoughts on building a rich text editor"
      Content={Content}
    />
  );
}
