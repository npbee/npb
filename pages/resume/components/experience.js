import React from "react";
import * as theme from "components/ui/theme";
import styled from "react-emotion";
import { distanceInWordsStrict, format } from "date-fns";

function formatDate(date) {
  return typeof date === "string" ? date : format(date, "MMM. YYYY");
}

function duration(dateA, dateB) {
  return distanceInWordsStrict(dateA, dateB, { partialMethod: "round" });
}

const Grid = styled.div({
  alignItems: "center",
  display: "grid",
  gridGap: "10px",
  gridTemplateColumns: "50% auto",
});

const Container = styled.div({
  display: "flex",
  flexDirection: "row",
  position: "relative",
});

const Content = styled.div({
  transform: `translateY(-6px)`,
  position: "relative",
  paddingBottom: theme.space(4),
  width: "100%",
});

const Header = styled(Grid)({
  paddingBottom: theme.space(1),
});

const CompanyHeader = styled.h2({
  margin: 0,
});

const CompanyLink = styled.a(props => ({
  color: props.color,
}));

export default function Experience(props) {
  const { color, name, site, roles, dates, highlights, copy } = props;

  return (
    <Container>
      <Content>
        <Header>
          <CompanyHeader>
            <CompanyLink href={site} color={color}>
              {name}
            </CompanyLink>
          </CompanyHeader>
          <span css={{ color: theme.get("colors.muted") }}>
            {duration(dates[0], dates[1])}
          </span>
        </Header>
        <div
          css={{
            marginBottom: theme.space(3),
            marginTop: theme.space(1),
          }}
        >
          {roles.map(role => (
            <Grid
              key={role.title}
              css={{ marginTop: theme.space(1), marginBottom: theme.space(1) }}
            >
              <strong>{role.title}</strong>
              <span css={{ color: theme.get("colors.muted") }}>
                {formatDate(role.dates[0])} ~ {formatDate(role.dates[1])}
              </span>
            </Grid>
          ))}
        </div>
        <p css={{ marginTop: theme.space(1), marginBottom: theme.space(1) }}>
          <em>{highlights.join(", ")}</em>
          {copy}
        </p>
      </Content>
    </Container>
  );
}
