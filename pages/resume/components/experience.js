import { colors, spacing, type } from "../../../lib/theme";
import styled from "react-emotion";

function Role(props) {
  const { name, dates } = props;

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "row",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <div className="role-name">{name}</div>
      <div className="role-dates">
        <em>
          {dates[0]} to {dates[1]}
        </em>
      </div>
    </div>
  );
}

const Hr = styled.hr`
  outline: none;
  border: none;
  height: 1px;
  background: #d9d9d9;
  width: 20px;
  margin-left: 0;
`;

const Container = styled.div({
  display: "flex",
  flexDirection: "row",
  position: "relative",
  borderLeft: "3px solid #666",
  ":before": {
    content: '""',
    position: "absolute",
    left: "-1px",
    top: 0,
    transform: "translate(-50%)",
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: "#666",
  },
  ":last-child:after": {
    content: '""',
    position: "absolute",
    left: "-1px",
    bottom: "0",
    transform: "translate(-50%)",
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: "#666",
  },
});

const Content = styled.div`
  transform: translateY(-6px);
  padding-bottom: ${spacing(4)};
  padding-left: ${spacing(4)};
  position: relative;
`;

const SiteLink = styled.a`
  font-weight: normal;
  color: inherit;
  display: block;
  text-decoration: none;
`;

function Highlight(props) {
  const { text } = props;

  return <p>{text}</p>;
}

export default function Experience(props) {
  const { color, name, logo, site, roles, dates, highlights } = props;

  return (
    <Container>
      <Content>
        <header css={{ paddingBottom: spacing(1) }}>
          <h2 css={{ margin: 0 }} style={{ color }}>
            <SiteLink className="site-link" href={site}>
              {name}
            </SiteLink>
          </h2>
          <small>
            {dates[0]} to {dates[1]}
          </small>
        </header>
        <Hr />
        <div
          css={{ marginBottom: spacing(3), marginTop: spacing(1) }}
          className="roles"
        >
          {roles.map(role => (
            <p
              key={role.title}
              css={{ marginBottom: "5px", marginTop: "5px" }}
              className="role"
            >
              <strong>{role.title}</strong>&nbsp;<span>
                ({role.dates[0]} to {role.dates[1]})
              </span>
            </p>
          ))}
        </div>
        <p css={{ marginBottom: spacing(3), marginTop: spacing(1) }}>
          <em>{highlights.join(", ")}</em>
        </p>
      </Content>
    </Container>
  );
}
