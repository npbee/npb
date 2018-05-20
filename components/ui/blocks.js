import * as theme from "./theme";
import styled from "react-emotion";
import tag from "clean-tag";

export const A = styled.a({
  color: theme.get("colors.primary"),
});

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

export const Time = styled.time({
  color: theme.get("colors.muted"),
  fontSize: theme.fontSize(5),
  textTransform: "uppercase",
  letterSpacing: "0.1em",
});

export const H1 = styled.h1({
  letterSpacing: "0.05em",
  fontSize: theme.fontSize(1),
  textTransform: "uppercase",
});

export const H2 = styled(H1.withComponent("h2"))({
  fontSize: theme.fontSize(2),
});

export const H3 = styled(H1.withComponent("h3"))({
  fontSize: theme.fontSize(3),
});

export const P = styled.p({
  fontSize: theme.fontSize(3),
  lineHeight: theme.get("lineHeights.body"),
});

export const Ul = styled.ul({
  fontSize: theme.fontSize(3),
  lineHeight: theme.get("lineHeights.body"),
});

export const Img = styled.img({
  maxWidth: "100%",
  borderRadius: theme.get("radii.1"),
  borderColor: theme.get("colors.muted"),
});

export const Blockquote = styled.blockquote({
  fontSize: theme.fontSize(2),
  color: theme.get("colors.muted"),
  marginLeft: 0,
  paddingLeft: theme.space(4),
  borderLeftWidth: "0.25rem",
  borderLeftStyle: "solid",
  borderColor: theme.get("colors.grey"),
});
