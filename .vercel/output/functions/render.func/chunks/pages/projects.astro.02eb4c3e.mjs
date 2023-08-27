/* empty css                           */import { d as createAstro, e as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead } from '../astro.c61b1d12.mjs';
import { g as getCollection, $ as $$Base } from './_...slug_.astro.c2987629.mjs';
import { $ as $$ProjectPreview } from './index.astro.5bfd6923.mjs';
import 'cookie';
import 'kleur/colors';
import 'path-to-regexp';
import 'mime';
import 'string-width';
import 'html-escaper';

const $$Astro = createAstro();
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Projects;
  let projects = await getCollection("projects");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "Posts | Nick Ball", "description": "Projects by Nick Ball, Web developer based in Portland, OR." }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<main class="space-y-4">
    <h1 class="text-accent text-xl font-semibold">Projects</h1>
    <div class="space-y-8">
      ${projects.map((project) => renderTemplate`${renderComponent($$result2, "ProjectPreview", $$ProjectPreview, { "project": project })}`)}
    </div>
  </main>
` })}`;
}, "/Users/nickball/code/npb/src/pages/projects.astro", void 0);

const $$file = "/Users/nickball/code/npb/src/pages/projects.astro";
const $$url = "/projects";

export { $$Projects as default, $$file as file, $$url as url };
