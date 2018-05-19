import { type, spacing } from "../../lib/theme";
import Experience from "./components/experience";
import Resume from "components/layout/resume";
import SmallHeader from "components/ui/small-header";
import styled from "react-emotion";

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

const H1 = styled.h1({
  fontSize: "3rem",
  marginBottom: spacing(1),
});

const Section = styled.section({
  marginBottom: spacing(4),
});

export default () => {
  return (
    <Resume>
      <div css={{ marginBottom: spacing(4) }}>
        <H1>Nick Ball</H1>
        <p css={{ margin: `${spacing(1)} auto` }}>San Francisco, CA</p>
        <p css={{ margin: `${spacing(1)} auto` }}>
          <a
            href="https://github.com/npbee"
            target="_blank"
            rel="noopener"
            css={{ color: "#333" }}
          >
            GitHub
          </a>
        </p>
      </div>

      <Section>
        <SmallHeader>Experience</SmallHeader>
        {experiences.map(exp => <Experience key={exp.name} {...exp} />)}
      </Section>

      <Section>
        <SmallHeader className="small-header">Education</SmallHeader>
        <p>
          B.S. Management Science
          <em css={{ display: "block" }}>
            University of California, San Diego
          </em>
        </p>
      </Section>
    </Resume>
  );
};
