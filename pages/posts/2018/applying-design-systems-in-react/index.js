import Post from "components/layout/post";
import Content from "./index.md";

export default function() {
  return (
    <div>
      <Post date="January 18th, 2018" raw>
        <Content />
      </Post>
    </div>
  );
}
