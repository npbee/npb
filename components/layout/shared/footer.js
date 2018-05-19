import { breakpoint, spacing } from "../../../lib/theme";
import Link from "next/link";
import styled from "react-emotion";

const Footer = styled.footer({
  "&:hover > hr": {
    backgroundColor: "#ca3939",
  },
  "&:hover > a": {
    color: "#333",
  },
});

const Hr = styled.hr({
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

const Content = styled.div({
  display: "flex",
  paddingTop: spacing(2),
  paddingBottom: spacing(2),
  justifyContent: "space-between",
});

const A = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    color: #999;
    text-decoration: none;
    margin-right: ${spacing(2)}
    cursor: pointer;
    transition: color 300ms;
`;

export default function FooterComponent() {
  return (
    <Footer>
      <Hr />
      <Content>
        <A
          href="https://github.com/npbee"
          target="_blank"
          rel="noopener"
          title="GitHub"
        >
          GitHub
        </A>
      </Content>
    </Footer>
  );
}
