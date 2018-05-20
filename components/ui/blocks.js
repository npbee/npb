import React from "react";
import {
  alignItems,
  borders,
  borderColor,
  borderRadius,
  color,
  display,
  flex,
  flexDirection,
  fontSize,
  fontWeight,
  justifyContent,
  letterSpacing,
  lineHeight,
  maxWidth,
  space,
  textAlign,
  width,
} from "styled-system";
import styled from "react-emotion";
import tag from "clean-tag";

export const Box = styled(tag)(
  alignItems,
  borders,
  borderColor,
  borderRadius,
  color,
  display,
  flex,
  flexDirection,
  fontSize,
  fontWeight,
  justifyContent,
  lineHeight,
  letterSpacing,
  maxWidth,
  space,
  textAlign,
  width
);

export const Text = props => <Box is="p" {...props} />;

export const Flex = props => <Box display="flex" {...props} />;

export const A = props => <Box is="a" {...props} />;

export const Hr = styled(tag.hr)(
  {
    display: "flex",
    alignItems: "center",
    outline: "none",
    border: "none",
    height: "1px",
    background: "#d9d9d9",
    width: "100%",
    marginleft: "auto",
    transition: "width 300ms, background-color 300ms",
  },
  props => ({
    width: props.small ? "20px" : "100%",
    marginLeft: props.small && 0,
  })
);

export const Time = props => (
  <Text
    {...props}
    is="time"
    color="muted"
    fontSize={1}
    css={{ textTransform: "uppercase" }}
    letterSpacing="0.1em"
  />
);
