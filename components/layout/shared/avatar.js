import React from "react";
import Link from "next/link";

export default function Avatar() {
  return (
    <Link href="/">
      <a className="avatar">
        <img src="/static/avatar.jpeg" />
        <h1>Nick Ball</h1>
        <style jsx>
          {`
            a {
              display: flex;
              align-items: center;
              color: var(--grey-900);
              text-decoration: none;
            }
            h1 {
              font-size: var(--s0);
              font-weight: 500;
              letter-spacing: 0.03em;
            }
            img {
              align-self: center;
              border-radius: 100%;
              width: 65px;
              margin-right: var(--s0);
            }
          `}
        </style>
      </a>
    </Link>
  );
}
