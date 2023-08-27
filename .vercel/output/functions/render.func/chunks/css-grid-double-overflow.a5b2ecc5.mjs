import { j as createVNode, F as Fragment, k as spreadAttributes } from './astro.c61b1d12.mjs';
import 'cookie';
import 'kleur/colors';
import 'path-to-regexp';
import 'mime';
import 'string-width';
import 'html-escaper';

const images = {
					
				};

				function updateImageReferences(html) {
					return html.replaceAll(
						/__ASTRO_IMAGE_="([^"]+)"/gm,
						(full, imagePath) => spreadAttributes({src: images[imagePath].src, ...images[imagePath].attributes})
					);
				}

				const html = updateImageReferences("<p>Here’s a deceptively tricky layout I encountered at work recently:</p>\n<div class=\"not-prose full-width flex justify-center\">\n<img alt=\"Sketch of layout\" src=\"/posts/css-grid-double-overflow-sketch.svg\">\n</div>\n<h3>It has:</h3>\n<ul>\n<li>Flex and grid layouts combined</li>\n<li>Multiple overflow containers</li>\n<li>Set and variable width columns</li>\n</ul>\n<p>Here’s how I solved it!</p>\n<div class=\"not-prose full-width w-75\">\n<p class=\"codepen\" data-height=\"700\" data-default-tab=\"css,result\" data-slug-hash=\"ExLLRaQ\" data-user=\"npbee\" style=\"height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;\">\n  <span>See the Pen <a href=\"https://codepen.io/npbee/pen/ExLLRaQ\">\n  Double Overflowing Columns with CSS Grid</a> by Nick Ball (<a href=\"https://codepen.io/npbee\">@npbee</a>)\n  on <a href=\"https://codepen.io\">CodePen</a>.</span>\n</p>\n<script async src=\"https://cpwebassets.codepen.io/assets/embed/ei.js\"></script>\n</div>");

				const frontmatter = {"title":"Double overflow with CSS grid","date":"2022-10-02T00:00:00.000Z","description":"A deceptively tricky layout"};
				const file = "/Users/nickball/code/npb/src/content/blog/css-grid-double-overflow.md";
				const url = undefined;
				function rawContent() {
					return "\nHere's a deceptively tricky layout I encountered at work recently:\n\n<div class=\"not-prose full-width flex justify-center\">\n<img alt=\"Sketch of layout\" src=\"/posts/css-grid-double-overflow-sketch.svg\" />\n</div>\n\n<h3>It has:</h3>\n\n- Flex and grid layouts combined\n- Multiple overflow containers\n- Set and variable width columns\n\nHere's how I solved it!\n\n<div class=\"not-prose full-width w-75\">\n<p class=\"codepen\" data-height=\"700\" data-default-tab=\"css,result\" data-slug-hash=\"ExLLRaQ\" data-user=\"npbee\" style=\"height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;\">\n  <span>See the Pen <a href=\"https://codepen.io/npbee/pen/ExLLRaQ\">\n  Double Overflowing Columns with CSS Grid</a> by Nick Ball (<a href=\"https://codepen.io/npbee\">@npbee</a>)\n  on <a href=\"https://codepen.io\">CodePen</a>.</span>\n</p>\n<script async src=\"https://cpwebassets.codepen.io/assets/embed/ei.js\"></script>\n</div>\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}
				async function Content() {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return contentFragment;
				}
				Content[Symbol.for('astro.needsHeadRendering')] = true;

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, images, rawContent, url };
