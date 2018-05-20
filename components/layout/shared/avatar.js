import React from "react";
import Link from "next/link";
import { Box } from "components/ui/blocks";

export default function Avatar() {
  return (
    <Box mb={4}>
      <Link href="/">
        <a className="avatar">
          <img
            css={{ borderRadius: "100%", width: "65px" }}
            src="/static/avatar.jpeg"
          />
        </a>
      </Link>
    </Box>
  );
}
