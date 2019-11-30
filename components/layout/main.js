import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function MainLayout({ children, layout }) {
  return (
    <>
      <header>
        <Avatar />
      </header>
      <main className={layout}>
        <Head>
          <link
            rel="icon"
            type="image/png"
            href="static/favicon/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="static/favicon/android-chrome-192x192.png"
            sizes="192x192"
          />
          <link
            rel="icon"
            type="image/png"
            href="static/favicon/favicon-96x96.png"
            sizes="96x96"
          />
          <link
            rel="icon"
            type="image/png"
            href="static/favicon/favicon-16x16.png"
            sizes="16x16"
          />
          <title>Nick Ball</title>
          <meta name="viewport" content="width=device-width" />
        </Head>

        {children}
      </main>
      <Footer />
    </>
  );
}

function Avatar() {
  return (
    <Link href="/">
      <a className="avatar">
        <img src="/static/avatar.jpeg" alt="avatar" />
        <h1>Nick Ball</h1>
      </a>
    </Link>
  );
}

function Footer() {
  return (
    <footer>
      <a
        href="https://github.com/npbee"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
      >
        GitHub
      </a>
    </footer>
  );
}
