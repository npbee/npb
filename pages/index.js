import React from "react";
import { hydrate } from "react-emotion";
import Main from "components/layout/main";
import Link from "next/link";
import { Time } from "components/ui/blocks";
import * as theme from "components/ui/theme";
import SmallHeader from "components/ui/small-header";
import posts from "./posts";
import styled from "react-emotion";

const jobBrandColor = "#00A5D5";

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
    <li>
      <Link href={href}>
        <a href={href}>{title}</a>
      </Link>
      <p>{date}</p>
      <style jsx>{`
        a {
          color: var(--primary-color);
          font-size: var(--s1);
          margin-bottom: var(--s-3);
          display: block;
        }
        p {
          margin: 0;
        }
        li {
          margin-bottom: var(--s1);
        }
      `}</style>
    </li>
  );
}

export default function Home() {
  return (
    <Main>
      <p>
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
        </BrandA>
        .
      </p>

      <h2>Posts</h2>
      <ul>
        {posts.posts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </ul>
      <style jsx>{`
        p {
          font-size: var(--s2);
          max-width: 60ch;
          margin-bottom: var(--s4);
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        h2 {
          font-size: var(--s0);
          font-weight: 600;
          letter-spacing: 0.05em;
        }
      `}</style>
    </Main>
  );
}
