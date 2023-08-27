/* empty css                           */import { c as createCollectionToGlobResultMap, a as createGetCollection, b as createGetEntry, d as createAstro, e as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, g as renderSlot, h as renderComponent } from '../astro.c61b1d12.mjs';

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/css-grid-double-overflow.md": () => import('../css-grid-double-overflow.e64d15c1.mjs'),"/src/content/blog/eleventy-datocms-netlify.md": () => import('../eleventy-datocms-netlify.d6ee065c.mjs'),"/src/content/blog/in-search-of-mocks.md": () => import('../in-search-of-mocks.c078f9a8.mjs'),"/src/content/blog/learning-elixir.md": () => import('../learning-elixir.905eb369.mjs'),"/src/content/blog/local-first-challenges.md": () => import('../local-first-challenges.22171ccb.mjs'),"/src/content/blog/on-full-stack.md": () => import('../on-full-stack.702c54f7.mjs'),"/src/content/blog/rich-text-2018.md": () => import('../rich-text-2018.15f89095.mjs'),"/src/content/blog/sentry-for-single-page-apps.md": () => import('../sentry-for-single-page-apps.de1fe2f8.mjs'),"/src/content/blog/ux-case-study-google-inbox.md": () => import('../ux-case-study-google-inbox.009daba2.mjs'),"/src/content/projects/helloworks-demo.md": () => import('../helloworks-demo.bed630f9.mjs'),"/src/content/projects/the-air-on-earth.md": () => import('../the-air-on-earth.1a1d376d.mjs'),"/src/content/projects/waveformr.md": () => import('../waveformr.ecc7dbd5.mjs')

});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({

});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"blog":{"type":"content","entries":{"css-grid-double-overflow":"/src/content/blog/css-grid-double-overflow.md","on-full-stack":"/src/content/blog/on-full-stack.md","eleventy-datocms-netlify":"/src/content/blog/eleventy-datocms-netlify.md","in-search-of-mocks":"/src/content/blog/in-search-of-mocks.md","ux-case-study-google-inbox":"/src/content/blog/ux-case-study-google-inbox.md","sentry-for-single-page-apps":"/src/content/blog/sentry-for-single-page-apps.md","learning-elixir":"/src/content/blog/learning-elixir.md","local-first-challenges":"/src/content/blog/local-first-challenges.md","rich-text-2018":"/src/content/blog/rich-text-2018.md"}},"projects":{"type":"content","entries":{"helloworks-demo":"/src/content/projects/helloworks-demo.md","the-air-on-earth":"/src/content/projects/the-air-on-earth.md","waveformr":"/src/content/projects/waveformr.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/css-grid-double-overflow.md": () => import('../css-grid-double-overflow.1a2c9412.mjs'),"/src/content/blog/eleventy-datocms-netlify.md": () => import('../eleventy-datocms-netlify.68490297.mjs'),"/src/content/blog/in-search-of-mocks.md": () => import('../in-search-of-mocks.0624125e.mjs'),"/src/content/blog/learning-elixir.md": () => import('../learning-elixir.568c2aee.mjs'),"/src/content/blog/local-first-challenges.md": () => import('../local-first-challenges.9c2a7b11.mjs'),"/src/content/blog/on-full-stack.md": () => import('../on-full-stack.bff03691.mjs'),"/src/content/blog/rich-text-2018.md": () => import('../rich-text-2018.e49fcc98.mjs'),"/src/content/blog/sentry-for-single-page-apps.md": () => import('../sentry-for-single-page-apps.aeaff89c.mjs'),"/src/content/blog/ux-case-study-google-inbox.md": () => import('../ux-case-study-google-inbox.dd7a7b30.mjs'),"/src/content/projects/helloworks-demo.md": () => import('../helloworks-demo.cc526746.mjs'),"/src/content/projects/the-air-on-earth.md": () => import('../the-air-on-earth.fbf88dc4.mjs'),"/src/content/projects/waveformr.md": () => import('../waveformr.b3cb07cd.mjs')

});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const getEntry = createGetEntry({
	getEntryImport: createGlobLookup(collectionToEntryMap),
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const $$Astro$8 = createAstro();
const $$Logo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Logo;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" viewBox="-104.542 2.396 72.542 80.104" xml:space="preserve" width="25px" fill="currentColor"><g><path d="M-70.792 56.307c0 1.402 1.294 2.895 2.588 2.895s2.329-1.229 2.329-2.895V29.396c0-1.666-1.035-2.894-2.329-2.894-1.208 0-2.588 1.228-2.588 2.894v26.911zm13.631-28.752v39.272h-13.631v16.479h-8.713V18.875h22.344v8.68zM-98.722 18.877l16.523-.001M-82.198 18.876v47.951h-8.713V28.87c0-1.841-1.036-2.104-2.071-2.104-1.725 0-2.847 2.278-2.847 2.278v37.782h-8.713V27.556c.041-1.296.012-.859.041-1.296.234-3.613 1.547-7.382 5.779-7.382l16.524-.002zM-37.82 66.827l-16.524.001V2.396h8.713v16.479H-32V58.147c0 3.945-1.076 8.68-5.82 8.68m-5.223-7.626c1.294 0 2.329-1.227 2.329-2.893V29.396c0-1.666-1.035-2.894-2.329-2.894s-2.588 1.49-2.588 2.894v26.913c0 1.666 1.38 2.892 2.588 2.892z"></path></g></svg>`;
}, "/Users/nickball/code/npb/src/components/Logo.astro", void 0);

const $$Astro$7 = createAstro();
const $$NavLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$NavLink;
  const { href } = Astro2.props;
  const pathname = new URL(Astro2.request.url).pathname;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(pathname.includes(href) ? "text-accent-12 underline" : "text", "class")}${addAttribute(href, "href")}>${renderSlot($$result, $$slots["default"])}</a>`;
}, "/Users/nickball/code/npb/src/components/NavLink.astro", void 0);

const $$Astro$6 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header class="container mx-auto flex max-w-2xl items-center justify-between p-8">
  <a href="/" class="text hover:text-accent-10 dark:hover:text-accent-dark-10">
    ${renderComponent($$result, "Logo", $$Logo, {})}
  </a>
  <ul class="flex gap-4 text-sm text-gray-11">
    <li>${renderComponent($$result, "NavLink", $$NavLink, { "href": "/about" }, { "default": ($$result2) => renderTemplate`About` })}</li>
    <li>${renderComponent($$result, "NavLink", $$NavLink, { "href": "/projects" }, { "default": ($$result2) => renderTemplate`Projects` })}</li>
    <li>${renderComponent($$result, "NavLink", $$NavLink, { "href": "/posts" }, { "default": ($$result2) => renderTemplate`Posts` })}</li>
  </ul>
</header>`;
}, "/Users/nickball/code/npb/src/components/Header.astro", void 0);

const $$Astro$5 = createAstro();
const $$GithubLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$GithubLink;
  return renderTemplate`${maybeRenderHead()}<a href="https://github.com/npbee" class="text-light flex items-center gap-2 text-xs">
  <span class="w-4">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
  </span>
  <span>GitHub</span>
</a>`;
}, "/Users/nickball/code/npb/src/components/GithubLink.astro", void 0);

const $$Astro$4 = createAstro();
const $$TwitterLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$TwitterLink;
  return renderTemplate`${maybeRenderHead()}<a href="https://twitter.com/_nickball" class="text-light flex items-center gap-2 text-xs">
  <span class="w-4">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
  </span>
  <span>Twitter</span>
</a>`;
}, "/Users/nickball/code/npb/src/components/TwitterLink.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$3 = createAstro();
const $$ThemeToggle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ThemeToggle;
  return renderTemplate(_a || (_a = __template(["", '<button id="themeToggle" class="text-light hover:text astro-X3PJSKD3">\n  <svg id="sun" class="hidden w-5 dark:block astro-X3PJSKD3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4" class="astro-X3PJSKD3"></circle><path d="M12 2v2" class="astro-X3PJSKD3"></path><path d="M12 20v2" class="astro-X3PJSKD3"></path><path d="m4.93 4.93 1.41 1.41" class="astro-X3PJSKD3"></path><path d="m17.66 17.66 1.41 1.41" class="astro-X3PJSKD3"></path><path d="M2 12h2" class="astro-X3PJSKD3"></path><path d="M20 12h2" class="astro-X3PJSKD3"></path><path d="m6.34 17.66-1.41 1.41" class="astro-X3PJSKD3"></path><path d="m19.07 4.93-1.41 1.41" class="astro-X3PJSKD3"></path></svg>\n  <svg id="moon" class="visible w-5 dark:hidden astro-X3PJSKD3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" class="astro-X3PJSKD3"></path></svg>\n</button>\n\n\n<script>\nconst theme = (() => {\n  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {\n    return localStorage.getItem("theme");\n  }\n  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {\n    return "dark";\n  }\n  return "light";\n})();\n\nif (theme === "light") {\n  document.documentElement.classList.remove("dark");\n} else {\n  document.documentElement.classList.add("dark");\n}\n\nwindow.localStorage.setItem("theme", theme);\n\nconst handleToggleClick = () => {\n  const element = document.documentElement;\n  element.classList.toggle("dark");\n\n  const isDark = element.classList.contains("dark");\n  localStorage.setItem("theme", isDark ? "dark" : "light");\n};\n\ndocument\n  .getElementById("themeToggle")\n  .addEventListener("click", handleToggleClick);\n<\/script>'])), maybeRenderHead());
}, "/Users/nickball/code/npb/src/components/ThemeToggle.astro", void 0);

const $$Astro$2 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="bg-gray-2 px-8 py-8 dark:bg-gray-dark-1">
  <div class="container mx-auto flex max-w-2xl items-center justify-between px-8">
    <ul class="flex gap-8 text-base">
      <li>${renderComponent($$result, "GithubLink", $$GithubLink, {})}</li>
      <li>${renderComponent($$result, "TwitterLink", $$TwitterLink, {})}</li>
    </ul>
    ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, {})}
  </div>
</footer>`;
}, "/Users/nickball/code/npb/src/components/Footer.astro", void 0);

const $$Astro$1 = createAstro();
const $$Base = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Base;
  let { title, description } = Astro2.props;
  let url = Astro2.url;
  return renderTemplate`<html lang="en" class="dark">
  <!-- Global Metadata -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">

  <!-- Primary Meta Tags -->
  <title>${title}</title>
  <meta name="title"${addAttribute(title, "content")}>
  <!-- <meta name="description" content={description} /> -->

  <!-- Google / Search Engine Tags -->
  <meta itemprop="image" content="https://npbee.me/images/me.jpeg">
  <meta itemprop="name"${addAttribute(title, "content")}>
  <meta itemprop="description"${addAttribute(description, "content")}>

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://npbee.me/images/me.jpeg">
  <meta property="og:url"${addAttribute(url, "content")}>
  <meta property="og:title"${addAttribute(title, "content")}>
  <meta property="og:description"${addAttribute(description, "content")}>

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="https://npbee.me/images/me.jpeg">
  <meta name="twitter:title"${addAttribute(title, "content")}>
  <meta name="twitter:description"${addAttribute(description, "content")}>
  <meta name="twitter:creator" content="_nickball">

  <link rel="icon" type="image/png" href="/favicon/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="/favicon/android-chrome-192x192.png" sizes="192x192">
  <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96">
  <link rel="icon" type="image/png" href="/favicon/favicon-16x16.png" sizes="16x16">

  ${maybeRenderHead()}<body class="text flex h-full flex-col">
    ${renderComponent($$result, "Header", $$Header, {})}
    <div class="container mx-auto mb-48 max-w-2xl flex-1 px-8">
      ${renderSlot($$result, $$slots["default"])}
    </div>
    ${renderComponent($$result, "Footer", $$Footer, {})}
  </body></html>`;
}, "/Users/nickball/code/npb/src/layouts/Base.astro", void 0);

const $$Astro = createAstro();
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { slug } = Astro2.params;
  if (!slug) {
    throw new Error("Not found");
  }
  const entry = await getEntry("blog", slug);
  if (entry === void 0) {
    return Astro2.redirect("/404");
  }
  const { Content } = await entry.render();
  let formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(entry.data.date));
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": entry.data.title, "description": entry.data.description }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<main class="prose max-w-none flex-1 dark:prose-invert prose-headings:text-2xl">
    <div class="space-y-1 text-left">
      <h1 class="mb-0 leading-none">
        ${entry.data.title}
      </h1>
      <p class="text-light text-sm">${formattedDate}</p>
    </div>
    ${renderComponent($$result2, "Content", Content, {})}
  </main>
` })}`;
}, "/Users/nickball/code/npb/src/pages/posts/[...slug].astro", void 0);

const $$file = "/Users/nickball/code/npb/src/pages/posts/[...slug].astro";
const $$url = "/posts/[...slug]";

const ____slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Base as $, ____slug_ as _, $$GithubLink as a, $$TwitterLink as b, getCollection as g };
