import React from "react";
import { distanceInWordsStrict, format } from "date-fns";

function formatDate(date) {
  return typeof date === "string" ? date : format(date, "MMM. YYYY");
}

function duration(dateA, dateB) {
  return distanceInWordsStrict(dateA, dateB, { partialMethod: "round" });
}

const Grid = props => <div {...props} />;

const Container = props => <div {...props} />;

const Content = props => <div {...props} />;

const Header = props => <div {...props} />;

const CompanyHeader = ({ children, ...rest }) => <h2 {...rest}>{children}</h2>;

const CompanyLink = ({ children, ...rest }) => <a {...rest}>{children}</a>;

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
          <span css={{ color: "#777777" }}>{duration(dates[0], dates[1])}</span>
        </Header>
        <div>
          {roles.map(role => (
            <Grid key={role.title}>
              <strong>{role.title}</strong>
              <span>
                {formatDate(role.dates[0])} ~ {formatDate(role.dates[1])}
              </span>
            </Grid>
          ))}
        </div>
        <p>
          <em>{highlights.join(", ")}</em>
          {copy}
        </p>
      </Content>
    </Container>
  );
}
