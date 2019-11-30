import React from "react";
import Link from "next/link";
import posts from "./posts";
import Page from "../components/layout/main";

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
    <li className="mb-4">
      <Link href={href}>
        <a className="text-xl text-pink-600 hover:underline" href={href}>
          {title}
        </a>
      </Link>
      <p className="text-sm">{date}</p>
    </li>
  );
}

export default function Home() {
  return (
    <Page>
      <p className="text-gray-700 text-2xl md:text-3xl mb-16 leading-relaxed">
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

      <h2 className="text-gray-700 mb-2 uppercase text-sm font-semibold tracking-wider">
        Posts
      </h2>
      <ul>
        {posts.posts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </ul>
    </Page>
  );
}
