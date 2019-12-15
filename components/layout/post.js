import React from "react";
import Main from "./main";
import { withRouter } from "next/router";
import PageMeta from "../page-meta";

function Post({ date, Content, description, title, router }) {
  return (
    <Main layout="post">
      <PageMeta title={title} description={description} path={router.asPath} />
      <div className=" text-xs uppercase font-semibold text-gray-700 tracking-wider">
        {date}
      </div>
      <article className="container">
        <Content />
      </article>
    </Main>
  );
}

export default withRouter(Post);
