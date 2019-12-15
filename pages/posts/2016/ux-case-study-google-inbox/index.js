import React from "react";
import Head from "next/head";
import Post from "../../../../components/layout/post";
import Content from "./content.md";

export default function CaseStudyGoogleInbox() {
  return (
    <div>
      <Head>
        <script src="https://production-assets.codepen.io/assets/embed/ei.js" />
      </Head>
      <Post
        date="February 27, 2016"
        Content={Content}
        title="UX Case Study - Google Inbox"
        description="Deep dive into the Google Inbox email animation"
      />
    </div>
  );
}
