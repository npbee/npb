import React from "react";
import Head from "next/head";
import Avatar from "./shared/avatar";
import Footer from "./shared/footer";

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
      <style jsx>{`
        header {
          padding: var(--s0) var(--s3);
        }

        header,
        main {
          padding-left: var(--s3);
          padding-right: var(--s3);
        }

        main {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
      `}</style>
      <style jsx global>
        {`
          :root {
            --ratio: 1.15;
            --s-7: calc(var(--s-6) / var(--ratio));
            --s-6: calc(var(--s-5) / var(--ratio));
            --s-5: calc(var(--s-4) / var(--ratio));
            --s-4: calc(var(--s-3) / var(--ratio));
            --s-3: calc(var(--s-2) / var(--ratio));
            --s-2: calc(var(--s-1) / var(--ratio));
            --s-1: calc(var(--s0) / var(--ratio));
            --s0: 1rem;
            --s1: calc(var(--s0) * var(--ratio));
            --s2: calc(var(--s1) * var(--ratio));
            --s3: calc(var(--s2) * var(--ratio));
            --s4: calc(var(--s3) * var(--ratio));
            --s5: calc(var(--s4) * var(--ratio));
            --s6: calc(var(--s5) * var(--ratio));
            --s7: calc(var(--s6) * var(--ratio));
            --s8: calc(var(--s7) * var(--ratio));
            --s8: calc(var(--s7) * var(--ratio));
            --s9: calc(var(--s8) * var(--ratio));
            --s10: calc(var(--s9) * var(--ratio));
            --s11: calc(var(--s10) * var(--ratio));
            --s12: calc(var(--s11) * var(--ratio));
            --primary-color: #ca3939;
            --grey-50: #f5f7fa;
            --grey-100: #e4e7eb;
            --grey-200: #cbd2d9;
            --grey-300: #9aa5b1;
            --grey-400: #7b8794;
            --grey-500: #616e7c;
            --grey-600: #52606d;
            --grey-700: #3e4c59;
            --grey-800: #323f4b;
            --grey-900: #1f2933;
          }

          html,
          body,
          #__next {
            height: 100%;
          }

          #__next {
            display: flex;
            flex-direction: column;
          }

          body {
            margin: 0;
            color: var(--grey-800);
            font-family: avenir next, avenir, -apple-system, BlinkMacSystemFont,
              "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto,
              noto, "segoe ui", arial, sans-serif;
          }

          strong {
            font-weight: 600;
          }
        `}
      </style>
    </>
  );
}
