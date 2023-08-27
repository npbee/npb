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

				const html = updateImageReferences("<p>A personal site for my musical alias, <em>The Air on Earth</em>. Optimized images, a site-wide audio player, and lots of custom style flourishes. Built with <a href=\"https://kit.svelte.dev/\">SvelteKit</a>.</p>");

				const frontmatter = {"title":"theaironearth.com","graphic":"the-air-on-earth.svg","link":"https://theaironearth.com"};
				const file = "/Users/nickball/code/npb/src/content/projects/the-air-on-earth.md";
				const url = undefined;
				function rawContent() {
					return "\nA personal site for my musical alias, _The Air on Earth_. Optimized images, a site-wide audio player, and lots of custom style flourishes. Built with [SvelteKit](https://kit.svelte.dev/).\n";
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
