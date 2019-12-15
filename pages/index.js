import React from "react";
import Link from "next/link";
import posts from "./posts";
import Page from "../components/layout/main";

const jobBrandColor = "#00A5D5";

export default function Home() {
  return (
    <Page>
      <section className="container">
        <p className="text-gray-700 text-2xl md:text-3xl mb-16 leading-relaxed">
          Hi, I&apos;m <strong>Nick Ball</strong>, a web developer focused on
          the front end. I enjoy functional programming, design systems, and
          component-based architecture. I work as a{" "}
          <strong>front-end engineer</strong>
          &nbsp;at <JobLink />.
        </p>
      </section>

      <section className="mb-16 container">
        <h2 className="text-gray-700 mb-2 uppercase text-sm font-semibold tracking-wider">
          Posts
        </h2>
        <ul>
          {posts.posts.map(post => (
            <Post key={post.id} {...post} />
          ))}
        </ul>
      </section>
      <section className="container mb-16">
        <h2 className="text-gray-700 mb-2 uppercase text-sm font-semibold tracking-wider">
          About Me
        </h2>
        <p>
          I currently work at <JobLink /> as a Frontend Engineer building
          complex user interfaces that make it easier for users to work with PDF
          documents and web forms. I work heavily with technologies like{" "}
          <strong>React</strong>, <strong>GraphQL</strong>,{" "}
          <strong>Elixir</strong>, and <strong>Phoenix</strong>.
        </p>
      </section>
      <section className="mb-16">
        <h2 className="text-gray-700 mb-2 uppercase text-sm font-semibold tracking-wider">
          Projects
        </h2>
        <CardList>
          <Card
            img="static/projects/the-air-on-earth.png"
            title="The Air on Earth"
            tags={["svelte", "sapper", "web audio", "Soundcloud"]}
            href="https://theaironearth.com"
            source="https://github.com/npbee/theaironearth"
            moreInfo="/projects/the-air-on-earth"
          >
            Website for my musical projects. Built with Svelte/Sapper as a
            static site. Includes a in-site audio player streaming from
            Soundcloud.
          </Card>
          <Card
            img="static/projects/yellow-belly.png"
            title="Yellow Belly Tap"
            tags={["Headless CMS", "GraphQL", "11ty", "Tailwind"]}
            href="https://www.yellowbellytap.com/"
          >
            Website for Santa Barbara restaurant, Yellow Belly. Built as a
            static site using 11ty with data being pulled in dynamically via a
            headless CMS.
          </Card>
          <Card
            img="static/projects/zach-hanson.png"
            title="Zach Hanson"
            tags={["static", "11ty", "Tailwind"]}
            href="https://zachhanson.net"
          >
            Website for audio engineer, Zach Hanson. Built as a static site with
            11ty and tailwind. Custom data hooks allowed a CMS-like experience.
          </Card>
        </CardList>
      </section>
    </Page>
  );
}

function JobLink() {
  return (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        href="https://www.hellosign.com"
      >
        HelloSign
      </a>
      <style jsx>{`
        a {
          color: ${jobBrandColor};
          transition: all 200ms;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}

function Post({ id, date, title }) {
  const year = new Date(date).getFullYear();
  const href = `/posts/${year}/${id}`;

  return (
    <li className="mb-4">
      <Link href={href}>
        <a className="text-xl" href={href}>
          {title}
        </a>
      </Link>
      <p className="text-sm">{date}</p>
    </li>
  );
}

const cardWidth = 375;

function CardList(props) {
  const { children } = props;

  return (
    <ul>
      {React.Children.map(children, child => (
        <li>{child}</li>
      ))}
      <style jsx>{`
        ul {
          width: 100%;
          max-width: 1200px;
          display: grid;
          grid-gap: 1rem;
          grid-auto-rows: 1fr;
          grid-template-columns: 100%;
        }
        li {
          max-width: none;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        ul.measured {
          opacity: 1;
        }

        @media screen and (min-width: ${cardWidth * 2}px) {
          ul {
            grid-template-columns: repeat(
              auto-fit,
              minmax(${cardWidth}px, 1fr)
            );
          }
        }
      `}</style>
    </ul>
  );
}

function Card(props) {
  const {
    moreInfo,
    img,
    alt,
    title,
    children,
    tags = [],
    href,
    source,
  } = props;

  return (
    <div
      className="card flex flex-col rounded shadow hover:shadow-md block"
      href={href}
    >
      <img
        className="w-full h-48 object-cover object-left-top border-gray-200 border-b"
        src={img}
        alt={alt}
      />
      <div className="px-6 py-4 flex-1">
        <p className="text-normal text-gray-700 font-medium mb-4 tracking-wide">
          {title}
        </p>
        <p className="text-gray-700 text-sm mb-4">{children}</p>

        {moreInfo ? (
          <Link href={moreInfo}>
            <a className={cardLinkClass()}>More Info</a>
          </Link>
        ) : null}
        <CardExternalLink href={href}>Link</CardExternalLink>
        {source ? (
          <CardExternalLink href={source}>Source</CardExternalLink>
        ) : null}
      </div>
      {tags.length ? (
        <div className="px-6 py-4 -m-1">
          {tags.map(tag => (
            <span
              key={tag}
              className="inline-block bg-purple-100 rounded-full px-3 py-1 text-xs text-purple-700 m-1"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <style jsx>{`
        .card {
          height: 100%;
          max-width: none;
          transition-property: all;
          transition-duration: 200ms;
        }
      `}</style>
    </div>
  );
}

function cardLinkClass() {
  return [
    "flex",
    "items-center",
    "hover:underline",
    "text-sm",
    "font-medium",
    "cursor-pointer",
  ].join(" ");
}

function CardExternalLink(props) {
  const { href, children } = props;

  return (
    <a
      href={href}
      className={cardLinkClass()}
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      {children}
      <svg
        width="1em"
        height="1em"
        className="octicon octicon-link-external ml-1 fill-current"
        viewBox="0 0 12 16"
        version="1.1"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"
        ></path>
      </svg>
    </a>
  );
}
