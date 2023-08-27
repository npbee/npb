/* empty css                           */import { d as createAstro, e as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead } from '../astro.c61b1d12.mjs';
import { $ as $$Base } from './_...slug_.astro.c2987629.mjs';
import 'cookie';
import 'kleur/colors';
import 'path-to-regexp';
import 'mime';
import 'string-width';
import 'html-escaper';

const $$Astro = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "Nick Ball | About", "description": "About Nick Ball, Web developer based in Portland, OR" }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<div class="text prose max-w-none dark:prose-invert">
    <img src="/images/me.jpeg" alt="Nick Ball" class="w-24 rounded-full">
    <h1 class="text text-xl font-semibold md:text-2xl">About me —</h1>
    <p class="text-light text-lg font-medium md:text-xl">
      I help teams build web apps of all shapes and sizes. I love shipping
      practical, accessible experiences that improve people's lives.
    </p>
    <p class="text">
      I'm a web developer based out of Portland, Oregon. I work at Dropbox as a
      software engineer building the Forms web application. I work heavily with
      technologies like <strong>React</strong>, <strong>GraphQL</strong>,
      <strong>Elixir</strong>, and <strong>Phoenix</strong>. I'm particularly
      interested in component-driven architecture, testing, and developer
      tooling. I love focusing on small details to get the user experience just
      right.
    </p>
    <p>In the past I've built things such as:</p>
    <ul class="my-0">
      <li>Drag-and-drop heavy interfaces with <strong>React</strong></li>
      <li>Rich text editors with <strong>Prosemirror</strong></li>
      <li>
        Component libraries with <strong>React</strong> and <strong>CSS</strong>
      </li>
      <li>
        Build and test pipelines with <strong>Webpack</strong> and <strong>continuous integration</strong>
      </li>
      <li>Interactive flow charts</li>
      <li>Undo / redo implementations</li>
    </ul>
    <p>
      I was previously at
      <a href="https://loudr.fm/" target="_blank" rel="noopener noreferrer nofollow" class="font-medium">Loudr</a> (acquired by Spotify). I have a B.S. in Management Science from UC San
      Diego.
    </p>
  </div>
` })}`;
}, "/Users/nickball/code/npb/src/pages/about.astro", void 0);

const $$file = "/Users/nickball/code/npb/src/pages/about.astro";
const $$url = "/about";

export { $$About as default, $$file as file, $$url as url };
