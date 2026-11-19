import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import MarkdownIt from "markdown-it";

// html: false (the default) escapes raw HTML in posts, so the output is safe
// to embed without a separate sanitizer
const parser = new MarkdownIt();

// Feed readers resolve relative image paths against their own origin
const renderImage = parser.renderer.rules.image!;
parser.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  token.attrSet("src", new URL(token.attrGet("src") ?? "", env.site).href);
  return renderImage(tokens, idx, options, env, self);
};

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: 'Nick Ball',
    description: 'Web development',
    site: context.site,
    items: blog.toSorted((a, b) => b.data.date.valueOf() - a.data.date.valueOf()).map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.id}`,
      content: parser.render(post.body ?? "", { site: context.site }),
    })),
    customData: [
      `<language>en-us</language>`,
      `<atom:link href="${new URL('rss.xml', context.site)}" rel="self" type="application/rss+xml" />`
    ].join(''),
    xmlns: {
      'atom': 'http://www.w3.org/2005/Atom'
    },
  });
}
