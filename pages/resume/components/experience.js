import React from "react";
import { Hr } from "components/ui/blocks";
import * as theme from "components/ui/theme";
import styled from "react-emotion";

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

const Content = styled.div({
  transform: "translateY(-6px)",
  position: "relative",
  paddingBottom: theme.space(4),
  paddingLeft: theme.space(4),
});

const Header = styled.header({
  paddingBottom: theme.space(1),
});

const CompanyHeader = styled.h2({
  margin: 0,
});

const CompanyLink = styled.a(props => ({
  color: props.color,
}));

export default function Experience(props) {
  const { color, name, site, roles, dates, highlights } = props;

  return (
    <Container>
      <Content>
        <Header>
          <CompanyHeader>
            <CompanyLink href={site} color={color}>
              {name}
            </CompanyLink>
          </CompanyHeader>
          <small>
            {dates[0]} to {dates[1]}
          </small>
        </Header>
        <Hr small />
        <div css={{ marginBottom: theme.space(3), marginTop: theme.space(1) }}>
          {roles.map(role => (
            <p
              key={role.title}
              css={{ marginTop: theme.space(1), marginBottom: theme.space(1) }}
            >
              <strong>{role.title}</strong>&nbsp;<span>
                ({role.dates[0]} to {role.dates[1]})
              </span>
            </p>
          ))}
        </div>
        <p css={{ marginTop: theme.space(1), marginBottom: theme.space(1) }}>
          <em>{highlights.join(", ")}</em>
        </p>
      </Content>
    </Container>
  );
}
