import React from "react";
import Link from "next/link";
import Page from "../components/layout/main";

const H1 = props => (
  <h1 className="text-2xl text-pink-600 tracking-wide mb-2" {...props} />
);

const H2 = props => (
  <h2 className="text-xl text-pink-600 tracking-wide mb-2" {...props} />
);

export default function About() {
  return (
    <Page>
      <section class="mb-8">
        <H1>About Me</H1>
        <p>
          I'm a front-end-focused web developer currently working on complex
          React applications. I value details, accessibility, and constant
          improvement when building web applications. I've worked with
          technologies like GraphQL + Apollo, Elixir & Phoenix, JWT, Jest.
        </p>
      </section>
      <section class="mb-8">
        <H2>Experience</H2>
        <ul>
          <li>HelloSign (aquired by Dropbox)</li>
          <li>Loudr (aquired by Spotify)</li>
        </ul>
      </section>
      <H2>Education</H2>
      <p>I have a B.S. in Management Science from UC San Diego.</p>
    </Page>
  );
}
