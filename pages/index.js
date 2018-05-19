import { hydrate } from "react-emotion";
import Main from "components/layout/main";
import Link from "next/link";
import { A, Box } from "components/ui/blocks";
import { spacing, type, breakpoint, colors } from "../lib/theme";
import SmallHeader from "components/ui/small-header";
import posts from "./posts";
import styled from "react-emotion";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

const Headline = styled.p({
  fontSize: type(2),
  lineHeight: "1.5",
  marginBottom: spacing(5),
  [`@media only screen and (min-width: ${breakpoint(1)})`]: {
    fontSize: type(1),
  },
});

const Time = styled.time`
  display: block;
  color: ${colors.muted};
  font-size: ${type(4)};
`;

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

export default () => {
  return (
    <Main>
      <Headline>
        Hi, I'm <strong>Nick Ball</strong>, a web developer currently focusing
        on the front end. I enjoy minimal user interfaces, functional
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
      </Headline>

      <SmallHeader>Posts</SmallHeader>
      {posts.posts.map(post => <Post key={post.id} {...post} />)}
    </Main>
  );
};
