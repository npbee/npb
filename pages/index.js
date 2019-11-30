import React from "react";
import Main from "../components/layout/main";
import Link from "next/link";
import posts from "./posts";

const jobBrandColor = "#00A5D5";

const BrandLink = ({ children, ...rest }) => (
  <>
    <a {...rest}>{children}</a>
    <style jsx>{`
      a {
        color: ${jobBrandColor};
      }
    `}</style>
  </>
);

function Post({ id, date, title }) {
  const year = new Date(date).getFullYear();
  const href = `/posts/${year}/${id}`;

  return (
    <li>
      <Link href={href}>
        <a href={href}>{title}</a>
      </Link>
      <p>{date}</p>
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
        <BrandLink
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.hellosign.com"
        >
          HelloSign
        </BrandLink>
        .
      </p>

      <h2>Posts</h2>
      <ul>
        {posts.posts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </ul>
    </Main>
  );
}
