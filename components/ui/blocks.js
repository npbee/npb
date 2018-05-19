import {
  space,
  fontSize,
  color,
  width,
  display,
  flexDirection,
  alignItems,
  justifyContent,
} from "styled-system";
import styled from "react-emotion";
import tag from "clean-tag";

export const Box = styled(tag)(
  space,
  fontSize,
  width,
  color,
  display,
  flexDirection,
  alignItems,
  justifyContent
);

export const Flex = props => <Box display="flex" {...props} />;

export const A = styled(tag.a)(
  {
    cursor: "pointer",
  },
  display,
  space,
  fontSize,
  color
);

export const Hr = styled(tag.hr)({
  display: "flex",
  alignItems: "center",
  outline: "none",
  border: "none",
  height: "1px",
  background: "#d9d9d9",
  width: "100%",
  marginleft: "auto",
  transition: "width 300ms, background-color 300ms",
});

export default Box;
