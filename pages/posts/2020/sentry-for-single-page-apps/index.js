import React from "react";
import Post from "../../../../components/layout/post";
import Content from "./content.md";

export default function EleventyDatoCMSNetlify() {
  return (
    <Post
      date="February 16, 2020"
      Content={Content}
      title="Sentry for Single-Page Apps"
      description="Effectivey using Sentry for single-page, JavaScript apps"
    />
  );
}
