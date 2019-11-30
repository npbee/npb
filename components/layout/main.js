import * as React from "react";
import Link from "next/link";
import Head from "next/head";

import "../../styles/main.css";

export default function Layout(props) {
  const { layout, ...rest } = props;
  return (
    <div className="text-gray-800 h-full flex flex-col">
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
      <header className="container mx-auto p-4">
        <nav>
          <Link href="/">
            <a className="flex items-center hover:text-pink-600 trans">
              <img
                className="trans rounded-full border border-gray-400 p-1 mr-2 w-16 hover:border-pink-600"
                src="/static/avatar.jpeg"
                alt="Photo of Nick Ball"
              />
              <p className="font-medium text-sm tracking-wider">Nick Ball</p>
            </a>
          </Link>
        </nav>
      </header>
      <main
        {...rest}
        className={`container mx-auto p-4 mb-8 flex-1 ${layout}`}
      />
      <footer className="w-full container mx-auto p-4 relative">
        <hr
          className="w-8 absolute top-0 h-1 border-none bg-gray-400"
          style={{ height: 2 }}
        />
        <a
          className="text-sm text-gray-600 tracking-wide hover:text-red-500"
          href="https://github.com/npbee"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
