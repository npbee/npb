import React from "react";
import { hydrate } from "react-emotion";
import Main from "components/layout/main";
import Link from "next/link";
import { A, Box, Time, Text } from "components/ui/blocks";
import SmallHeader from "components/ui/small-header";
import posts from "./posts";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

function Post({ id, date, title }) {
  const year = new Date(date).getFullYear();
  const href = `/posts/${year}/${id}`;

  return (
    <Box mb={4}>
      <Link href={href} prefetch>
        <A href={href} color="primary" fontSize={3} mb={1} display="block">
          {title}
        </A>
      </Link>
      <Time>{date}</Time>
    </Box>
  );
}

const jobBrandColor = "#00A5D5";

export default function Home() {
  return (
    <Main>
      <Text fontSize={[4, 5]} lineHeight={1.5} mb={5} mt={0}>
        Hi, I&apos;m <strong>Nick Ball</strong>, a web developer currently
        focusing on the front end. I enjoy minimal user interfaces, functional
        programming, and typography. I work as a{" "}
        <strong>front-end engineer</strong>
        &nbsp;at{" "}
        <A
          color={jobBrandColor}
          css={{ color: jobBrandColor }}
          target="_blank"
          rel="noopener"
          className="job"
          href="https://www.hellosign.com"
        >
          HelloSign
        </A>.
      </Text>

      <SmallHeader>Posts</SmallHeader>
      {posts.posts.map(post => <Post key={post.id} {...post} />)}
    </Main>
  );
}
