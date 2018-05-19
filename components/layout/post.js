import Main from "./main";
import { spacing, colors, type } from "../../lib/theme";
import styled from "react-emotion";

const Time = styled.time`
  color: ${colors.muted};
  display: block;
  margin-top: 3rem;
  text-transform: uppercase;
  font-size: ${type(6)};
  letter-spacing: 0.1em;
`;

const Content = styled.div({
  p: {
    fontSize: "1.4rem",
    lineHeight: "1.625",
  },
  ul: {
    fontSize: "1.4rem",
    lineHeight: "1.625",
  },
  hr: {
    marginTop: spacing(4),
    marginBottom: spacing(4),
    border: "none",
    height: "1px",
    backgroundColor: colors.grey,
  },
  img: {
    maxWidth: "100%",
    border: `1px solid ${colors.muted}`,
    borderRadius: "3px",
  },
  blockquote: {
    marginLeft: 0,
    marginTop: 0,
    paddingLeft: spacing(4),
    borderLeft: `0.25rem solid ${colors.grey}`,
    color: colors.muted,
    fontSize: type(3),
  },
  h1: {
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginTop: "5px",
  },
  h2: {
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontSize: "1.4rem",
    marginTop: "3rem",
  },
  h3: {
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontSize: "1.4rem",
    marginTop: "3rem",
  },
  h4: {
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontSize: "1.4rem",
    marginTop: "3rem",
  },
  h5: {
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontSize: "1.4rem",
    marginTop: "3rem",
  },
  h6: {
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontSize: "1.4rem",
    marginTop: "3rem",
  },
});

export default function({ children, date, raw }) {
  return (
    <Main post>
      <Time>{date}</Time>
      <Content className="post-content">{children}</Content>
    </Main>
  );
}
