import Link from "next/link";

export default () => {
  return (
    <Link href="/">
      <a className="avatar">
        <img
          css={{ borderRadius: "100%", width: "65px" }}
          src="/static/avatar.jpeg"
        />
      </a>
    </Link>
  );
};
