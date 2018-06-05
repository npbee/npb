export default `
    * { box-sizing: border-box }
    body {
        margin: 0;
        background: #f9f9f9;
        color: rgba(0, 0, 0, .7);
        font-family: athelas, georgia, serif;
        font-family: avenir next, avenir, sans-serif;
        font-weight: 300;
        font-size: 1rem;
    }

  pre code {
    display: block;
    background: white;
    color: #4d4d4c;
    font-family: Menlo, Monaco, Consolas, monospace;
    line-height: 1.5;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #eeeeee;
    border-radius: 2px;
    overflow-x: auto;
  }
/*

Gruvbox style (dark) (c) Pavel Pertsev (original style at https://github.com/morhetz/gruvbox)

*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
}

.hljs,
.hljs-subst {
  color: #ebdbb2;
}

/* Gruvbox Red */
.hljs-deletion,
.hljs-formula,
.hljs-keyword,
.hljs-link,
.hljs-selector-tag {
  color: #fb4934;
}

/* Gruvbox Blue */
.hljs-built_in,
.hljs-emphasis,
.hljs-name,
.hljs-quote,
.hljs-strong,
.hljs-title,
.hljs-variable {
  color: #83a598;
}

/* Gruvbox Yellow */
.hljs-attr,
.hljs-params,
.hljs-template-tag,
.hljs-type {
  color: #fabd2f;
}

/* Gruvbox Purple */
.hljs-builtin-name,
.hljs-doctag,
.hljs-literal,
.hljs-number {
  color: #8f3f71;
}

/* Gruvbox Orange */
.hljs-code,
.hljs-meta,
.hljs-regexp,
.hljs-selector-id,
.hljs-template-variable {
  color: #fe8019;
}

/* Gruvbox Green */
.hljs-addition,
.hljs-meta-string,
.hljs-section,
.hljs-selector-attr,
.hljs-selector-class,
.hljs-string,
.hljs-symbol {
  color: #b8bb26;
}

/* Gruvbox Aqua */
.hljs-attribute,
.hljs-bullet,
.hljs-class,
.hljs-function,
.hljs-function .hljs-keyword,
.hljs-meta-keyword,
.hljs-selector-pseudo,
.hljs-tag {
  color: #8ec07c;
}

/* Gruvbox Gray */
.hljs-comment {
  color: #928374;
}

/* Gruvbox Purple */
.hljs-link_label,
.hljs-literal,
.hljs-number {
  color: #d3869b;
}

.hljs-comment,
.hljs-emphasis {
  font-style: italic;
}

.hljs-section,
.hljs-strong {
  font-weight: bold;
}
`;
