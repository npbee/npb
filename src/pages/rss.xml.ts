import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: 'Nick Ball',
    description: 'Web development',
    site: context.site,
    items: blog.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.slug}`,
      content: sanitizeHtml(parser.render(post.body)),
    })),
    customData: [
      `<language>en-us</language>`,
      `<atom:link href="${new URL('rss.xml', context.site)}" rel="self" type="application/rss+xml" />`
    ].join(''),
    xmlns: {
      'atom': 'http://www.w3.org/2005/Atom'
    },
    stylesheet: '/rss/styles.xsl'
  });
}
