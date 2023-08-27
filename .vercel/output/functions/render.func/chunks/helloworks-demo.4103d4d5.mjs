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

				const html = updateImageReferences("<p>An interactive demo page for the product I built at Dropbox, Dropbox Forms. Built with <a href=\"https://preactjs.com/\">Preact</a>.</p>");

				const frontmatter = {"title":"Dropbox Forms Demo","graphic":"helloworks.png","link":"https://www.hellosign.com/products/dropbox-forms#demo"};
				const file = "/Users/nickball/code/npb/src/content/projects/helloworks-demo.md";
				const url = undefined;
				function rawContent() {
					return "\nAn interactive demo page for the product I built at Dropbox, Dropbox Forms. Built with [Preact](https://preactjs.com/).\n";
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
