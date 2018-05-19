import React from "react";
import { Flex, A, Hr } from "components/ui/blocks";
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
      <Flex justifyContent="space-between" py={2}>
        <A
          color="muted"
          href="https://github.com/npbee"
          target="_blank"
          rel="noopener"
          title="GitHub"
        >
          GitHub
        </A>
      </Flex>
    </Footer>
  );
}
