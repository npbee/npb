import React from "react";
import Link from "next/link";
import * as theme from "components/ui/theme";

export default function Avatar() {
  return (
    <div css={{ marginBottom: theme.space(4) }}>
      <Link href="/">
        <a className="avatar">
          <img
            css={{ borderRadius: "100%", width: "65px" }}
            src="/static/avatar.jpeg"
          />
        </a>
      </Link>
    </div>
  );
}
