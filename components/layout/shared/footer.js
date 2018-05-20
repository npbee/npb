import React from "react";
import { A, Hr } from "components/ui/blocks";
import * as theme from "components/ui/theme";
import styled from "react-emotion";

const Footer = styled.footer({
  "&:hover > hr": {
    backgroundColor: "#ca3939",
  },
  "&:hover > a": {
    color: "#333",
  },
});

export default function FooterComponent() {
  return (
    <Footer>
      <Hr />
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: theme.space(2),
          paddingBottom: theme.space(2),
        }}
      >
        <A
          href="https://github.com/npbee"
          target="_blank"
          rel="noopener"
          title="GitHub"
          css={{ color: theme.get("colors.muted") }}
        >
          GitHub
        </A>
      </div>
    </Footer>
  );
}
