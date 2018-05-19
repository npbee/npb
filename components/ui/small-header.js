import React from "react";

export default function SmallHeader({ tag = "h1", children }) {
  const Tag = tag;

  return (
    <Tag
      css={{
        textTransform: "uppercase",
        fontSize: "1rem",
        letterSpacing: "0.1em",
      }}
    >
      {children}
    </Tag>
  );
}
