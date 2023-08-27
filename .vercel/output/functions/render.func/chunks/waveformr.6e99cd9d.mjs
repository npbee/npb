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

				const html = updateImageReferences("<p>A tool for building SVG audio waveforms. Built with <a href=\"https://astro.build/\">Astro</a>, <a href=\"https://react.dev/\">React</a>, and <a href=\"https://deno.com/deploy\">Deno Deploy</a>.</p>");

				const frontmatter = {"title":"waveformr.com","graphic":"waveformr.png","link":"https://waveformr.com"};
				const file = "/Users/nickball/code/npb/src/content/projects/waveformr.md";
				const url = undefined;
				function rawContent() {
					return "\nA tool for building SVG audio waveforms. Built with [Astro](https://astro.build/), [React](https://react.dev/), and [Deno Deploy](https://deno.com/deploy).\n";
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
