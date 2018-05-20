import React from "react";
import Main from "./main";
import { Time, Text, Hr, Box } from "components/ui/blocks";

const H1 = props => (
  <Text
    is="h1"
    letterSpacing="0.05em"
    fontSize={5}
    css={{ textTransform: "uppercase" }}
    {...props}
  />
);

const H2 = props => (
  <Text
    is="h2"
    css={{ textTransform: "uppercase" }}
    letterSpacing="0.05em"
    fontSize={4}
    {...props}
  />
);

const H3 = props => (
  <Text
    is="h3"
    css={{ textTransform: "uppercase" }}
    letterSpacing="0.05em"
    fontSize={3}
    {...props}
  />
);

const P = props => <Text fontSize={3} lineHeight="1.625" {...props} />;
const Ul = props => <Box is="ul" fontSize={3} lineHeight="1.625" {...props} />;

const Img = props => (
  <Box
    {...props}
    is="img"
    maxWidth="100%"
    borderRadius={1}
    borderColor="muted"
  />
);

const Blockquote = props => (
  <Box
    {...props}
    fontSize={2}
    color="muted"
    is="blockquote"
    ml={0}
    pl={4}
    borderLeft="0.25rem solid"
    borderColor="grey"
  />
);

export default function Post({ date, Content }) {
  return (
    <Main post>
      <Time>{date}</Time>
      <Content
        components={{
          h1: H1,
          h2: H2,
          h3: H3,
          p: P,
          ul: Ul,
          hr: Hr,
          img: Img,
          blockquote: Blockquote,
        }}
      />
    </Main>
  );
}
