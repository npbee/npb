// Shiki transformer: wraps each highlighted block in a figure whose caption
// names the language and counts the lines.
const LANGUAGE_NAMES = {
  plaintext: "text",
  ts: "typescript",
  js: "javascript",
  txt: "text",
  sh: "shell",
  bash: "shell",
};

const el = (tagName, className, children) => ({
  type: "element",
  tagName,
  properties: className ? { className: [className] } : {},
  children,
});
const text = (value) => ({ type: "text", value });

export const codeFigure = {
  name: "code-figure",
  root(root) {
    const pre = root.children.find(
      (node) => node.type === "element" && node.tagName === "pre",
    );
    if (!pre) return;

    const lang = this.options.lang ?? "plaintext";
    const lines = this.source.replace(/\n+$/, "").split("\n").length;

    root.children = [
      el("figure", "code", [
        el("figcaption", null, [
          el("span", "code-lang", [text(LANGUAGE_NAMES[lang] ?? lang)]),
          el("span", "code-lines", [
            text(`${lines} ${lines === 1 ? "line" : "lines"}`),
          ]),
        ]),
        pre,
      ]),
    ];
  },
};
