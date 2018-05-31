import React from "react";
import { hydrate } from "react-emotion";
import Main from "components/layout/main";
import Link from "next/link";
import { Time } from "components/ui/blocks";
import * as theme from "components/ui/theme";
import SmallHeader from "components/ui/small-header";
import posts from "./posts";
import styled from "react-emotion";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

const jobBrandColor = "#00A5D5";

const Headline = styled.p(
  {
    lineHeight: theme.get("lineHeights.body"),
    marginBottom: theme.space(5),
    marginTop: theme.space(0),
  },
  theme.mq({
    fontSize: [theme.fontSize(2), theme.fontSize(1)],
  })
);

const BigA = styled.a({
  color: theme.get("colors.primary"),
  fontSize: theme.fontSize(3),
  marginBottom: theme.space(1),
  display: "block",
});

const BrandA = styled.a({
  color: jobBrandColor,
});

function Post({ id, date, title }) {
  const year = new Date(date).getFullYear();
  const href = `/posts/${year}/${id}`;

  return (
    <div css={{ marginBottom: theme.space(4) }}>
      <Link href={href} prefetch>
        <BigA href={href}>{title}</BigA>
      </Link>
      <Time>{date}</Time>
    </div>
  );
}

export default function Home() {
  return (
    <Main>
      <Headline>
        Hi, I&apos;m <strong>Nick Ball</strong>, a web developer focused on the
        front end. I enjoy functional programming, design systems, and
        component-based architecture. I work as a{" "}
        <strong>front-end engineer</strong>
        &nbsp;at{" "}
        <BrandA
          target="_blank"
          rel="noopener"
          className="job"
          href="https://www.hellosign.com"
        >
          HelloSign
        </BrandA>.
      </Headline>

      <SmallHeader>Posts</SmallHeader>
      {posts.posts.map(post => <Post key={post.id} {...post} />)}
    </Main>
  );
}
