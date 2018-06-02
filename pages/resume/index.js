import React from "react";
import Experience from "./components/experience";
import Resume from "components/layout/resume";
import SmallHeader from "components/ui/small-header";
import * as theme from "components/ui/theme";
import styled from "react-emotion";
import HelloSign from "./hellosign.md";

const hellosign = {
  color: "#00b3e6",
  name: "HelloSign",
  logo: "hellosign.png",
  site: "https://www.hellosign.com",
  roles: [
    {
      title: "Senior Front-end Engineer",
      dates: [new Date(2017, 9), "Present"],
    },
    {
      title: "Front-end Engineer",
      dates: [new Date(2016, 9), new Date(2017, 9)],
    },
  ],
  dates: [new Date(2016, 9, 1), new Date()],
  copy: <HelloSign />,
  highlights: ["React", "UI", "Component Library", "Elixir"],
};

const loudr = {
  color: "#05AFC1",
  name: "Loudr",
  logo: "loudr.png",
  site: "https://www.loudr.fm",
  roles: [
    {
      title: "Front-end Engineer",
      dates: [new Date(2016, 0), new Date(2016, 9)],
    },
    {
      title: "Jr. Front-end Engineer",
      dates: [new Date(2014, 10), new Date(2016, 0)],
    },
  ],
  dates: [new Date(2014, 10), new Date(2016, 9)],
  highlights: ["React", "Knockout", "Framework Design", "Tooling & Deployment"],
};

const sayMedia = {
  color: "#CF1F37",
  name: "Say Media, Inc.",
  logo: "say.png",
  site: "https://www.saymedia.com/",
  roles: [
    {
      title: "Senior Ad Operator",
      dates: [new Date(2013, 10), new Date(2014, 10)],
    },
    { title: "Ad Operator", dates: [new Date(2008, 7), new Date(2013, 10)] },
  ],
  dates: [new Date(2008, 7), new Date(2014, 10)],
  highlights: [],
};

const experiences = [hellosign, loudr, sayMedia];

const Section = styled.section({
  marginBottom: theme.space(4),
});

const H1 = styled.h1({
  fontSize: theme.fontSize(1),
  marginBottom: theme.space(1),
});

const InfoText = styled.p({
  marginTop: theme.space(1),
  marginBottom: theme.space(1),
  marginLeft: "auto",
  marginRight: "auto",
});

export default function ResumeContent() {
  return (
    <Resume>
      <Section>
        <H1>Nick Ball</H1>
        <InfoText>San Francisco, CA</InfoText>
        <InfoText>
          <a
            href="https://github.com/npbee"
            target="_blank"
            rel="noopener noreferrer"
            css={{ color: "#333" }}
          >
            GitHub
          </a>
        </InfoText>
      </Section>

      <Section>
        <SmallHeader>Experience</SmallHeader>
        {experiences.map(exp => <Experience key={exp.name} {...exp} />)}
      </Section>

      <Section>
        <SmallHeader>Education</SmallHeader>
        <p>
          B.S. Management Science
          <em css={{ display: "block" }}>
            University of California, San Diego
          </em>
        </p>
      </Section>
    </Resume>
  );
}
