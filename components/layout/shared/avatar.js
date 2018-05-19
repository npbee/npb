import React from "react";
import Link from "next/link";

export default function Avatar() {
  return (
    <Link href="/">
      <a className="avatar">
        <img
          css={{ borderRadius: "100%", width: "65px" }}
          src="/static/avatar.jpeg"
        />
      </a>
    </Link>
  );
}
