/* empty css                           */import { d as createAstro, e as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, h as renderComponent, g as renderSlot } from '../astro.c61b1d12.mjs';
import { a as $$GithubLink, b as $$TwitterLink, g as getCollection, $ as $$Base } from './_...slug_.astro.c2987629.mjs';

const $$Astro$5 = createAstro();
const $$ExternalWindowIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ExternalWindowIcon;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg>`;
}, "/Users/nickball/code/npb/src/components/ExternalWindowIcon.astro", void 0);

const $$Astro$4 = createAstro();
const $$ProjectPreview = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ProjectPreview;
  let { project } = Astro2.props;
  let { title, link } = project.data;
  let { Content } = await project.render();
  return renderTemplate`${maybeRenderHead()}<article class="">
  <h3 class="text-xl font-semibold leading-loose">
    <a class="text flex gap-2 font-semibold no-underline hover:text-accent-10 hover:underline dark:hover:text-accent-dark-10"${addAttribute(link, "href")} target="_blank" rel="noreferrer nofollow">
      ${title}
      <span class="text-light flex w-3">${renderComponent($$result, "ExternalWindowIcon", $$ExternalWindowIcon, {})}</span></a>
  </h3>
  <div class="prose dark:prose-invert">
    ${renderComponent($$result, "Content", Content, {})}
  </div>
</article>`;
}, "/Users/nickball/code/npb/src/components/ProjectPreview.astro", void 0);

const $$Astro$3 = createAstro();
const $$Intro = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Intro;
  return renderTemplate`${maybeRenderHead()}<div class="intro prose max-w-none">
  <h1 class="text text-xl font-semibold md:text-2xl">Hi, I'm Nick —</h1>
  <p class="text-light lead text-lg font-medium md:text-xl">
    A web developer based out of Portland, Oregon.
  </p>
  <p class="text">
    I work at <a href="https://dropbox.com">Dropbox</a> as a software engineer
    building the <a href="https://helloworks.com">Forms</a> web application. I
    help teams build web apps of all shapes and sizes. I love shipping
    practical, accessible experiences that help people get things done. <a href="/about">More about me</a>
  </p>
  <ul class="not-prose m-0 flex list-none space-x-8 p-0 py-1">
    <li>
      ${renderComponent($$result, "GithubLink", $$GithubLink, {})}
    </li>
    <li>${renderComponent($$result, "TwitterLink", $$TwitterLink, {})}</li>
  </ul>
</div>`;
}, "/Users/nickball/code/npb/src/components/Intro.astro", void 0);

const $$Astro$2 = createAstro();
const $$PageHeading = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$PageHeading;
  let { href } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} class="text-accent font-semibold underline">
  ${renderSlot($$result, $$slots["default"])}
</a>`;
}, "/Users/nickball/code/npb/src/components/PageHeading.astro", void 0);

const $$Astro$1 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  let allBlogPosts = await getCollection("blog");
  let projects = await getCollection("projects");
  let sortedPosts = allBlogPosts.sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
  );
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "Nick Ball", "description": "Web developer based in Portland, OR." }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<div class="space-y-16">
    ${renderComponent($$result2, "Intro", $$Intro, {})}

    <hr class="h-px w-4 border-none bg-gray-10">

    <section class="space-y-2">
      ${renderComponent($$result2, "PageHeading", $$PageHeading, { "href": "/projects" }, { "default": ($$result3) => renderTemplate`<h2>Projects</h2>` })}
      <div class="space-y-8">
        ${projects.map((project) => renderTemplate`${renderComponent($$result2, "ProjectPreview", $$ProjectPreview, { "project": project })}`)}
      </div>
    </section>

    <section class="space-y-4">
      ${renderComponent($$result2, "PageHeading", $$PageHeading, { "href": "/posts" }, { "default": ($$result3) => renderTemplate`Posts` })}
      <div class="space-y-8">
        <ul class="space-y-1">
          ${sortedPosts.map((post) => renderTemplate`<li>
                <a class="xno-underline group flex items-center gap-4 text-lg hover:text-accent-12 hover:underline dark:hover:text-accent-dark-12"${addAttribute(`/posts/${post.slug}`, "href")}>
                  <span class="text-light">
                    ${new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  }).format(post.data.date)}
                  </span>
                  <span class="text">${post.data.title}</span>
                </a>
              </li>`)}
        </ul>
      </div>
    </section>
  </div>
` })}`;
}, "/Users/nickball/code/npb/src/pages/index.astro", void 0);

const $$file$1 = "/Users/nickball/code/npb/src/pages/index.astro";
const $$url$1 = "";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let allBlogPosts = await getCollection("blog");
  let sortedPosts = allBlogPosts.sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
  );
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "Posts | Nick Ball", "description": "Posts by Nick Ball, Web developer based in Portland, OR." }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<main class="space-y-4">
    <h1 class="text-xl font-semibold">Posts</h1>
    <ul class="space-y-1">
      ${sortedPosts.map((post) => renderTemplate`<li>
            <a class="group flex items-center gap-4 text-lg"${addAttribute(`/posts/${post.slug}`, "href")}>
              <span class="text-light group-hover:text-accent-10 dark:group-hover:text-accent-dark-10">
                ${new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  }).format(post.data.date)}
              </span>
              <span class="text group-hover:text-accent-10 dark:group-hover:text-accent-dark-10">
                ${post.data.title}
              </span>
            </a>
          </li>`)}
    </ul>
  </main>
` })}`;
}, "/Users/nickball/code/npb/src/pages/posts/index.astro", void 0);

const $$file = "/Users/nickball/code/npb/src/pages/posts/index.astro";
const $$url = "/posts";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$ProjectPreview as $, index as a, index$1 as i };
