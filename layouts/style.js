export default `
    * { box-sizing: border-box }
    body {
        margin: 0;
        background: #f9f9f9;
        color: #444;
        font-family: 'Chronicle Display A', 'Chronicle Display B', georgia, times, serif;
        font-weight: 300;
        font-size: 1rem;
    }

    .syntax-comment,
    pre .hljs-comment {
        color: #999999;
        font-size: 0.8rem;
    }

    .syntax-red,
    pre .hljs-variable,
    pre .hljs-attribute,
    pre .hljs-tag,
    pre .hljs-regexp,
    pre .html .doctype,
    pre .css .id,
    pre .css .class,
    pre .css .pseudo {
        color: #f2777a;
    }

    .syntax-orange,
    pre .hljs-number,
    pre .hljs-preprocessor,
    pre .hljs-built_in,
    pre .hljs-literal,
    pre .hljs-params,
    pre .hljs-constant {
        color: #f99157;
    }

    .syntax-yellow,
    pre .hljs-class,
    pre .css .rules .attribute {
        color: #ffcc66;
    }

    .syntax-green,
    pre .hljs-string,
    pre .hljs-value,
    pre .hljs-inheritance,
    pre .hljs-header {
        color: #99cc99;
    }

    .syntax-aqua,
    pre .css .hexcolor {
        color: #66cccc;
    }

    .syntax-blue,
    pre .hljs-function,
    pre .javascript .hljs-title {
        color: #6699cc;
    }

    .syntax-purple,
    pre .hljs-keyword,
    pre .lang-javascript .hljs-function {
        color: #cc99cc;
    }

    pre code {
        display: block;
        background: #2d2d2d;
        color: #cccccc;
        font-family: Menlo, Monaco, Consolas, monospace;
        line-height: 1.5;
        border-radius: 3px;
        padding: 10px;
        overflow: auto;
        min-width: 300px;
    }
`;
