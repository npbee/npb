import React from "react";
import Post from "../../../../components/layout/post";
import Content from "./content.md";

export default function EleventyDatoCMSNetlify() {
  return (
    <Post
      date="December 21st, 2019"
      Content={Content}
      title="Eleventy + DatoCMS + Netlify"
      description="Building a static site with a headless CMS"
    />
  );
}
