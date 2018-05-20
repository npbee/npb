import React from "react";
import { Text, Box } from "components/ui/blocks";
import Experience from "./components/experience";
import Resume from "components/layout/resume";
import SmallHeader from "components/ui/small-header";

const hellosign = {
  color: "#00b3e6",
  name: "HelloSign",
  logo: "hellosign.png",
  site: "https://www.hellosign.com",
  roles: [
    { title: "Senior Front-end Engineer", dates: ["Oct 2017", "Present"] },
    { title: "Front-end Engineer", dates: ["Oct 2016", "Oct 2017"] },
  ],
  dates: ["Oct. 2016", "Present"],
  highlights: ["React", "UI", "Component Library", "Elixir"],
};

const loudr = {
  color: "#05AFC1",
  name: "Loudr",
  logo: "loudr.png",
  site: "https://www.loudr.fm",
  roles: [
    { title: "Front-end Engineer", dates: ["Jan 2016", "Oct. 2016"] },
    { title: "Jr. Front-end Engineer", dates: ["Nov. 2014", "Jan 2016"] },
  ],
  dates: ["Nov. 2014", "Oct. 2016"],
  highlights: ["React", "Knockout", "Framework Design", "Tooling & Deployment"],
};

const sayMedia = {
  color: "#CF1F37",
  name: "Say Media, Inc.",
  logo: "say.png",
  site: "https://www.saymedia.com/",
  roles: [
    { title: "Senior Ad Operator", dates: ["Nov 2013", "Nov. 2014"] },
    { title: "Ad Operator", dates: ["Aug. 2008", "Nov. 2013"] },
  ],
  dates: ["Aug. 2008", "Nov. 2014"],
  highlights: [],
};

const experiences = [hellosign, loudr, sayMedia];

const Section = props => <Box is="section" mb={4} {...props} />;

export default function ResumeContent() {
  return (
    <Resume>
      <Box mb={4}>
        <Text is="h1" fontSize={6} mb={1}>
          Nick Ball
        </Text>
        <Text my={1} mx="auto">
          San Francisco, CA
        </Text>
        <Text my={1} mx="auto">
          <a
            href="https://github.com/npbee"
            target="_blank"
            rel="noopener noreferrer"
            css={{ color: "#333" }}
          >
            GitHub
          </a>
        </Text>
      </Box>

      <Section>
        <SmallHeader>Experience</SmallHeader>
        {experiences.map(exp => <Experience key={exp.name} {...exp} />)}
      </Section>

      <Section>
        <SmallHeader>Education</SmallHeader>
        <p>
          B.S. Management Science
          <Text is="em" display="block">
            University of California, San Diego
          </Text>
        </p>
      </Section>
    </Resume>
  );
}
