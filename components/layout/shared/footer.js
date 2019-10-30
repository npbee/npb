import React from "react";

export default function FooterComponent() {
  return (
    <footer>
      <a
        href="https://github.com/npbee"
        target="_blank"
        rel="noopener"
        title="GitHub"
      >
        GitHub
      </a>
      <style jsx>{`
        footer {
          padding: var(--s0) var(--s3);
          border-top: 1px solid var(--grey-100);
        }
        a {
          color: var(--grey-500);
          font-size: var(--s-1);
        }
      `}</style>
    </footer>
  );
}
